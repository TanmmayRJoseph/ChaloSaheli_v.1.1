"use client";
import React, { useState } from "react";

interface RideRequestProps {
  user?: {  // Make user optional to avoid undefined errors
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
  user = { _id: "", name: "Unknown", phoneNo: 0 }, // Default user object
  pickup,
  destination,
  fare
}) => {
  const [otp, setOtp] = useState("");

  const handleStartRide = () => {
    if (otp.length === 6) {
      alert("Ride Started!");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-pink-600">New Ride Request</h2>
      <p><strong>Passenger:</strong> {user?.name || "N/A"}</p>
      <p><strong>Phone:</strong> {user?.phoneNo || "N/A"}</p>
      <p><strong>Pickup:</strong> {pickup}</p>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Fare:</strong> ₹{fare}</p>
      <div className="mt-4">
        <label className="block text-sm font-medium">Enter OTP:</label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter 6-digit OTP"
        />
      </div>
      <button
        onClick={handleStartRide}
        className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
      >
        Start Ride
      </button>
    </div>
  );
};

export default RideRequest;
