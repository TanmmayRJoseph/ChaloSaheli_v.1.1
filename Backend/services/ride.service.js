import { sendMessageToSocketId } from "../socket.js";
import Ride from "../models/ride.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from "crypto";
import mongoose from "mongoose";

function generateOTP(num) {
  function generateOtp(num) {
    return crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
  }
  return generateOtp(num);
}

export async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 5,
    car: 8,
    moto: 3,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };
  console.log(distanceTime); //!Debugging step console here
  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };
  console.log(fare); //!Debugging step
  return fare;
}

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("Missing required fields");
  }

  const fare = await getFare(pickup, destination);
  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp: generateOTP(6),
    fare: fare[vehicleType],
  });
  return ride;
};

// export const confirmRide = async ({ rideId }) => {
//   if (!rideId) {
//     throw new Error("Missing required fields");
//   }
//   await Ride.findOneAndUpdate(
//     {_id: rideId },
//     { status: "accepted", driver: captainId }
//   );
//   const ride = await Ride.findOne({ _id: rideId }).populate("user").populate("driver");
//   if (!ride) {
//     throw new Error("Ride not found");
//   }

//   if (ride.status === "accepted") {
//     throw new Error("Ride already confirmed");
//   }
// return ride;
// };

export async function confirmRide({ rideId, captainId }) {
  console.log("Confirming Ride...");
  console.log("Received rideId:", rideId);
  console.log("Received captainId:", captainId);

  if (!rideId || !captainId) {
    console.error("Error: Ride ID and Captain ID are required");
    throw new Error("Ride ID and Captain ID are required");
  }

  if (!mongoose.Types.ObjectId.isValid(rideId)) {
    console.error("Invalid rideId format:", rideId);
    throw new Error("Invalid Ride ID format");
  }

  // Update both driver and captain fields
  const updatedRide = await Ride.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", driver: captainId, captain: captainId }, // Ensure both fields are updated
    { new: true }
  );

  if (!updatedRide) {
    console.error("Ride not found");
    throw new Error("Ride not found");
  }

  console.log("Ride confirmed successfully!");

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  return ride;
}

export const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Missing required fields");
  }

  const ride = await Ride.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
};
