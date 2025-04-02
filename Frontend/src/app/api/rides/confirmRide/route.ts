import { NextRequest, NextResponse } from "next/server";
import { sendMessageToSocketId } from "@/services/socketFrontend";
import { confirmRide } from "@/services/rideServices";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const { rideId, captainId } = await req.json();

    // Validate input
    if (!rideId || !captainId) {
      return NextResponse.json(
        { message: "Ride ID and Captain ID are required" },
        { status: 400 }
      );
    }

    // Confirm ride in the database
    const ride = await confirmRide(rideId, captainId);

    if (!ride || !ride.passenger?.socketId) {
      return NextResponse.json(
        {
          message:
            "Ride not found, already confirmed, or passenger not connected",
        },
        { status: 404 }
      );
    }

    console.log(
      `✅ Ride confirmed. Emitting "ride-confirmed" event to passenger socket: ${ride.passenger.socketId}`
    );

    // Emit socket event to the passenger
    const eventSent = sendMessageToSocketId(ride.passenger.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return NextResponse.json(
      { message: "Ride confirmed", eventSent },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Error confirming ride:", error);
    return NextResponse.json(
      { message: "Failed to confirm ride", error },
      { status: 500 }
    );
  }
}






