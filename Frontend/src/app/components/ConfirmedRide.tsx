"use client";
import React from "react";

interface RideDetails {
  captain: {
    _id: string;
    name: string;
    phoneNo: string;
    vechile: string;
    city: string;
  };
  pickup: string;
  destination: string;
  otp?: string; // Added optional OTP field
}

const RideConfirmation: React.FC<{ ride: RideDetails }> = ({ ride }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ride Confirmed</h2>
      <p className="text-gray-600 mb-2">Your ride has been accepted by:</p>
      <div className="p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">{ride.captain?.name}</h3>
        <p className="text-gray-600">Phone: {ride.captain?.phoneNo}</p>
        <p className="text-gray-600">Vehicle: {ride.captain?.vechile}</p>
        <p className="text-gray-600">City: {ride.captain?.city}</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-semibold">Pickup:</p>
        <p className="text-gray-600">{ride.pickup}</p>
        <p className="text-gray-700 font-semibold mt-2">Destination:</p>
        <p className="text-gray-600">{ride.destination}</p>
      </div>
      {ride.otp && (
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-blue-700 font-semibold">OTP for Ride: {ride.otp}</p>
        </div>
      )}
    </div>
  );
};

export default RideConfirmation;
