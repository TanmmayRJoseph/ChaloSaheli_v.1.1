"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define the interface for the ride prop
interface RideStarted {
  _id: string;
  user: {
    _id: string;
    name: string;
    phoneNo: number;
    gender: string;
    emergencyNo: number;
    dob: string;
    emailId: string;
    address: string;
    userType: string;
    socketId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  captain: {
    _id: string;
    name: string;
    phoneNo: string;
    gender: string;
    vechile: string;
    dob: string;
    emailId: string;
    city: string;
    userType: string;
    socketId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  pickup: string;
  destination: string;
  fare: number;
  status: string;
  otp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


interface StartRideProps {
  ride?: RideStarted | null;
}

export default function StartRide({ ride }: StartRideProps) {
  console.log("ride details in startRide page", ride);
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative">
      {/* Ride Status Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="text-center mb-6"
      >
        <motion.h1
          custom={0}
          variants={fadeUp}
          className="text-2xl font-bold text-pink-600"
        >
          Ride In Progress 🚗
        </motion.h1>
        <motion.p
          custom={1}
          variants={fadeUp}
          className="text-pink-500 text-sm"
        >
          Heading to: <span className="font-semibold">{ride?.destination}</span>
        </motion.p>
      </motion.div>

      {/* Driver Info Card */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-pink-50 rounded-xl shadow p-4 mb-4 border border-pink-200"
      >
        <h2 className="text-pink-600 font-bold text-lg">{ride?.captain.name}</h2>
        <p className="text-sm text-pink-500">{ride?.captain.vechile}</p>
        <p className="text-sm text-pink-400">4.9 ★ Rating</p>
      </motion.div>

      {/* Ride Status Timeline */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center px-2 mb-4"
      >
        <div className="flex flex-col items-center text-pink-500">
          <div className="w-3 h-3 bg-pink-500 rounded-full mb-1" />
          <p className="text-xs">Pickup</p>
        </div>
        <div className="flex-1 h-1 bg-pink-200 mx-2" />
        <div className="flex flex-col items-center text-pink-500">
          <div className="w-3 h-3 bg-pink-500 rounded-full mb-1" />
          <p className="text-xs">Drop</p>
        </div>
      </motion.div>

      {/* Estimated Time and Fare */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-pink-100 p-3 rounded-xl text-center mb-4"
      >
        <p className="text-pink-600 text-sm font-semibold">
          Estimated Time: 15 mins
        </p>
        <p className="text-pink-500 text-xs">Distance: 6.3 km | Fare: ₹{ride?.fare}</p>
      </motion.div>

      {/* Live Map Placeholder */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="h-40 bg-white border border-pink-200 rounded-xl shadow-inner mb-4 flex items-center justify-center"
      >
        <p className="text-pink-400 text-sm">[Live Map will appear here]</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex justify-between gap-3"
      >
        <button
          onClick={() => router.push("/sosoptions")}
          className="flex-1 bg-white border border-pink-500 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-100 transition"
        >
          Need Help
        </button>
        <button
          onClick={() => router.push("/end-ride")}
          className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition"
        >
          Make Payment
        </button>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-4 right-4"
      >
        <Image
          src="/image/ChaloSaheliLogo.png"
          alt="Chalo Saheli Logo"
          width={35}
          height={35}
        />
      </motion.div>
    </div>
  );
}
