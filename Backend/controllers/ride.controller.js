import {
  createRide,
  getFare,
  confirmRide,
  startRideService,
} from "../services/ride.service.js";
import {
  getSaarthiInTheRadius,
  getAddressCoordinate,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import Ride from "../models/ride.js";

export const createRideController = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(200).json({ ride });
    const pickupCoordinate = await getAddressCoordinate(pickup);

    // console.log(pickupCoordinate);//!Debugging console

    const saarthiInRadius = await getSaarthiInTheRadius(
      pickupCoordinate.ltd,
      pickupCoordinate.lng,
      2000
    );

    // console.log(saarthiInRadius); //!Debugging console

    ride.otp = "";
    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");
    saarthiInRadius.map((Saarthi) => {
      // console.log(Saarthi, ride);//!Debugging console
      sendMessageToSocketId(Saarthi.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

//* Get Fare
export const getFareController = async (req, res) => {
  const { pickup, destination } = req.query;
  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//* Confirm Ride
export const confirmRideController = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); // Debugging Step

    const { rideId, captainId } = req.body; // ✅ Extract from req.body

    if (!rideId || !captainId) {
      console.error("Missing Required Fields: ", { rideId, captainId });
      return res
        .status(400)
        .json({ error: "Ride ID and Captain ID are required" });
    }

    const ride = await confirmRide({ rideId, captainId });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.log("Error in confirmRideController:", error);
    return res.status(500).json({ error: error.message });
  }
};

//* Start Ride
export const startRide = async (req, res) => {
  const { rideId, otp } = req.query;
  try {
    const ride = await startRideService({
      rideId,
      otp,
      captain: req.captain._id,
    });

    console.log("Ride started and here is the ride with all details:", ride); //!Debugging console

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log("Error in startRide:", error);
    return res.status(500).json({ error: error.message });
  }
};
