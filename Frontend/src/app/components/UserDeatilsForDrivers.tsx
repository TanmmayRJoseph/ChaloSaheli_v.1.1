"use client";
import React, { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

interface RideRequestProps {
  user?: {
    _id: string;
    name: string;
    phoneNo: number;
  };
  rideId: string;
  pickup: string;
  destination: string;
  fare: number;
}

const RideRequest: React.FC<RideRequestProps> = ({
  user = { _id: "", name: "Unknown", phoneNo: 0 },
  rideId,
  pickup,
  destination,
  fare,
}) => {
  const [otp, setOtp] = useState("");
 
  const router = useRouter();
  const handleStartRide = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/ride/start-ride",
        {
          params: { rideId, otp },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Ride started successfully!");
        router.push( `/saarthiRiding?name=${encodeURIComponent(user?.name)}&phoneNo=${user?.phoneNo}&pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}&fare=${fare}&rideId=${rideId}`);
      } else {
        alert("Failed to start ride. Please try again.");
      }
    } catch (error) {
      console.error("Error starting ride:", error);
      alert("An error occurred while starting the ride.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-pink-600">New Ride Request</h2>
      <p>
        <strong>Passenger:</strong> {user?.name || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {user?.phoneNo || "N/A"}
      </p>
      <p>
        <strong>Pickup:</strong> {pickup}
      </p>
      <p>
        <strong>Destination:</strong> {destination}
      </p>
      <p>
        <strong>Fare:</strong> ₹{fare}
      </p>

      <form onSubmit={handleStartRide} className="mt-4">
        <label className="block text-sm font-medium">Enter OTP:</label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter 6-digit OTP"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
        >
          Start Ride
        </button>
       
      </form>
    </div>
  );
};

export default RideRequest;
