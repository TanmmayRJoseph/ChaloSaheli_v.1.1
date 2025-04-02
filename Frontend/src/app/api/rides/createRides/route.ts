import { NextRequest, NextResponse } from "next/server";
import { createRides } from "@/services/rideServices";
import {
  getSaarthiInRadius,
  getAddressCoordinates,
} from "@/services/mapsServices";
import { sendMessageToSocketId } from "@/services/socketFrontend";
import jwt from "jsonwebtoken";
import Ride from "@/models/ride";
import Saheli from "@/models/saheli";
import connectToDatabase from "@/config/db";

export async function POST(req: NextRequest) {
  try {
    // ✅ Connect to DB before any operation

    await connectToDatabase();
    // Extract token from cookies or headers
    const cookieToken = req.cookies.get("token")?.value;
    const headerToken = req.headers.get("authorization")?.split(" ")[1];
    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    // Verify JWT token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      if (!decodedToken || typeof decodedToken !== "object") {
        throw new Error("Invalid token");
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json(
          { error: "Token expired. Please log in again." },
          { status: 401 }
        );
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const { pickupLocation, dropLocation, vehicleType } = await req.json();
    if (!pickupLocation || !dropLocation || !vehicleType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Validate if the passenger exists in `Saheli`
    const passenger = await Saheli.findById(decodedToken.id);
    if (!passenger) {
      return NextResponse.json(
        { error: "Passenger not found" },
        { status: 404 }
      );
    }

    // ✅ Create ride with correct schema reference
    const ride = await createRides({
      passenger: passenger._id, // Ensure proper reference
      pickupLocation,
      dropLocation,
      vehicleType,
    });

    // Get pickup location coordinates
    const pickupCoordinates = await getAddressCoordinates(pickupLocation);
    if (!pickupCoordinates?.lat || !pickupCoordinates?.lng) {
      return NextResponse.json(
        { error: "Invalid pickup location coordinates" },
        { status: 400 }
      );
    }

    // Find available captains within 2km radius
    const captainsInRadius = await getSaarthiInRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2000
    );

    if (!captainsInRadius.length) {
      return NextResponse.json(
        { message: "No captains found nearby" },
        { status: 200 }
      );
    }

    console.log("Finding ride:", ride._id);

    // ✅ Populate passenger properly
    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate({
      path: "passenger",
      model: "Saheli", // Explicitly define the model
    });

    if (!rideWithUser) {
      return NextResponse.json(
        { error: "Ride not found after creation" },
        { status: 500 }
      );
    }

    // console.log("Ride with passenger:", rideWithUser);

    // Notify captains in range
    let notifiedCaptains = [];
    for (const captain of captainsInRadius) {
      try {
        if (notifiedCaptains.length < 3) {
          // console.log(`Sending ride request to captain ${captain.id}`);
          
        }
        console.log(`Sending ride request to captain ${captain.id}`);
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
        notifiedCaptains.push(captain.id);
      } catch (error) {
        console.error(
          `Failed to send message to captain ${captain.id}:`,
          error
        );
      }
    }

    // ✅ Exclude OTP before returning
    const { otp, ...rideWithoutOtp } = rideWithUser.toObject();

    return NextResponse.json(
      {
        message: "Ride request sent to nearby captains",
        rideDetails: rideWithoutOtp,
        captainsNotified: notifiedCaptains,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating ride:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
