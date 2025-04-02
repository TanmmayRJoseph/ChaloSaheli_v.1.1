import Ride from "@/models/ride";
import { getDistanceTime } from "@/services/mapsServices";
import { connectToDatabase } from "@/config/db";
import crypto from "crypto"; // Fixed missing import
import mongoose from "mongoose";


interface DistanceTime {
  distance: number;
  duration: number;
}

export async function getFare(pickupLocation: string, dropLocation: string) {
  if (!pickupLocation || !dropLocation) {
    throw new Error("Missing required fields");
  }

  const distanceTime: DistanceTime = await getDistanceTime(
    pickupLocation,
    dropLocation
  );

  console.log("Raw distanceTime response:", distanceTime); // Debugging

  //---------------------------------------------------------------------------
  const baseFare = { auto: 30, car: 50, motorcycle: 20 };
  const perKmRate = { auto: 5, car: 8, motorcycle: 3 };
  const perMinuteRate = { auto: 2, car: 3, motorcycle: 1.5 };

  // Convert meters to km safely
  const distanceKm =
    typeof distanceTime.distance === "number" && !isNaN(distanceTime.distance)
      ? distanceTime.distance / 1000
      : 0;
  const durationMinutes =
    typeof distanceTime.duration === "number" && !isNaN(distanceTime.duration)
      ? distanceTime.duration / 60
      : 0;

  console.log("Converted Distance (km):", distanceKm);
  console.log("Converted Duration (min):", durationMinutes);

  // Corrected fare calculation
  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceKm * perKmRate.auto +
        durationMinutes * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distanceKm * perKmRate.car +
        durationMinutes * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        distanceKm * perKmRate.motorcycle +
        durationMinutes * perMinuteRate.motorcycle
    ),
  };

  return fare;
  //---------------------------------------------------------------------------
}

function getOtp(num: number) {
  function generateOtp(num: number) {
    return crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
  }
  return generateOtp(num);
}

interface RideParams {
  passenger: string;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: "auto" | "car" | "motorcycle";
}

export async function createRides({
  passenger,
  pickupLocation,
  dropLocation,
  vehicleType,
}: RideParams) {
  await connectToDatabase(); // Ensure DB is connected before inserting

  if (!passenger || !pickupLocation || !dropLocation || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Get fare before creating the ride
  const fare = await getFare(pickupLocation, dropLocation);
  console.log("Fare response:", fare); // Debugging log
  console.log("Vehicle type received:", vehicleType);

  if (
    !fare ||
    typeof fare !== "object" ||
    !Object.keys(fare).includes(vehicleType)
  ) {
    console.error("Invalid fare object or vehicle type missing:", {
      fare,
      vehicleType,
    });
    throw new Error("Invalid fare object or vehicle type.");
  }

  console.log("Fare calculated:", fare);

  const ride = await Ride.create({
    passenger,
    pickupLocation,
    dropLocation,
    otp: getOtp(6), // Generate OTP internally
    vehicleType,
    fare: fare[vehicleType], // Use calculated fare
  });

  return ride;
}

export async function confirmRide(rideId: string,captainId: string) {
  console.log("Confirming Ride...");
  console.log("Received rideId:", rideId);
  console.log("Received driverIdOrPhone:", captainId);

  if (!rideId || !captainId) {
    console.error("Error: Ride ID and Driver ID or phone number are required");
    throw new Error("Ride ID and Driver ID or phone number are required");
  }

  if (!mongoose.Types.ObjectId.isValid(rideId)) {
    console.error("Invalid rideId format:", rideId);
    throw new Error("Invalid Ride ID format");
  }

  if (!rideId) {
    console.error("Invalid rideId format:", rideId);
    throw new Error("Invalid Ride ID format");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "confirmed",
      driver: captainId,
    }
  );
  console.log("Ride confirmed successfully!");
  const ride = await Ride.findOne({ _id: rideId }).populate("passenger").populate("driver");

  if (!ride) {
    console.error("Ride not found");
    throw new Error("Ride not found");
  }
  ride.status = "accepted";
  return ride;
}
