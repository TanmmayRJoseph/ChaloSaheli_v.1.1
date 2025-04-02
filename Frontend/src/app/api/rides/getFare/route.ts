import { NextRequest, NextResponse } from "next/server";
import { getFare } from "@/services/rideServices";


export async function POST(req: NextRequest) {
  const { pickupLocation, dropLocation } = await req.json();
  if (!pickupLocation || !dropLocation) {
    return NextResponse.json(
      { error: "Please provide origin and destination" },
      { status: 400 }
    );
  }
  try {
    const fare = await getFare(pickupLocation, dropLocation);
    console.log("Calculated fare:", fare);
    return NextResponse.json({ fare }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}