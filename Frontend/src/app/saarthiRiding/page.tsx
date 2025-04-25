"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SaarthiRiding() {
  const router = useRouter();
  const params = useSearchParams();

  const name = params.get("name");
  const phoneNo = params.get("phoneNo");
  const pickup = params.get("pickup");
  const destination = params.get("destination");
  const fare = params.get("fare");
  const [rideEnded, setRideEnded] = useState(false);

  const handleEndRide = () => {
    setRideEnded(true);
    router.push("/saarthiHome");
    // You can call an API here to update ride status on the backend
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-pink-200"
      >
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-pink-600 text-center mb-6"
        >
          Ride Started 🚗
        </motion.h2>

        <div className="space-y-4">
          <div className="bg-pink-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Passenger</p>
            <p className="font-semibold text-pink-800">{name}</p>
            <p className="text-sm">📞 {phoneNo}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Pickup</p>
              <p className="font-medium text-pink-900">{pickup}</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-medium text-pink-900">{destination}</p>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg shadow-sm text-center">
            <p className="text-sm text-gray-600">Fare</p>
            <p className="text-xl font-bold text-pink-700">₹{fare}</p>
          </div>
        </div>

        {!rideEnded ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleEndRide}
            className="mt-6 w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition"
          >
            End Ride
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mt-6 text-center text-green-600 font-bold"
          >
            ✅ Ride Ended Successfully!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
