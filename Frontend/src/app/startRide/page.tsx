"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SocketContext } from "@/context/socketContext";

export default function StartRide() {
  const router = useRouter();
  const { socket } = useContext(SocketContext)!;
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const captain = searchParams.get("captain") || "";
  const vechile = searchParams.get("vechile") || "";
  const fare = searchParams.get("fare") || "";
  const pickup = searchParams.get("pickup") || "";
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  socket.on("ride-ended", () => {
    router.push(
      `/end-ride?destination=${destination}&captain=${captain}&vechile=${vechile}&fare=${fare}&pickup=${pickup}`
    );
  });

  return (
    <div className="w-screen h-screen bg-pink-50 flex flex-col relative overflow-y-auto p-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 right-6"
      >
        <Image
          src="/image/ChaloSaheliLogo.png"
          alt="Chalo Saheli Logo"
          width={50}
          height={50}
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center flex-1">
        {/* Ride Status Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="text-4xl font-bold text-pink-600"
          >
            Ride In Progress 🚗
          </motion.h1>
          <motion.p
            custom={1}
            variants={fadeUp}
            className="text-pink-500 text-lg mt-3"
          >
            Heading to: <span className="font-semibold">{destination}</span>
          </motion.p>
        </motion.div>

        {/* Driver Info Card */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-pink-100 w-full max-w-3xl rounded-2xl shadow p-6 mb-8 border border-pink-200"
        >
          <h2 className="text-pink-600 font-bold text-2xl">{captain}</h2>
          <p className="text-lg text-pink-500">{vechile}</p>
          <p className="text-base text-pink-400">4.9 ★ Rating</p>
        </motion.div>

        {/* Ride Status Timeline */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center w-full max-w-2xl px-4 mb-8"
        >
          <div className="flex flex-col items-center text-pink-500">
            <div className="w-5 h-5 bg-pink-500 rounded-full mb-2" />
            <p className="text-sm font-medium">Pickup</p>
          </div>
          <div className="flex-1 h-1 bg-pink-200 mx-4" />
          <div className="flex flex-col items-center text-pink-500">
            <div className="w-5 h-5 bg-pink-500 rounded-full mb-2" />
            <p className="text-sm font-medium">Drop</p>
          </div>
        </motion.div>

        {/* Estimated Time and Fare */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-pink-200 w-full max-w-2xl p-6 rounded-2xl text-center mb-8"
        >
          <p className="text-pink-600 text-xl font-semibold">
            Estimated Time: 15 mins
          </p>
          <p className="text-pink-500 text-base mt-2">
            Distance: 6.3 km | Fare: ₹{fare}
          </p>
        </motion.div>

        {/* Live Map Placeholder */}
        {/* <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="h-64 w-full max-w-3xl bg-white border border-pink-200 rounded-2xl shadow-inner flex items-center justify-center mb-8"
        >
          <p className="text-pink-400 text-lg">[Live Map will appear here]</p>
        </motion.div> */}

        {/* Action Buttons */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex w-full max-w-2xl justify-between gap-5"
        >
          <button
            onClick={() => router.push("/sosoptions")}
            className="flex-1 bg-white border border-pink-500 text-pink-600 px-6 py-4 rounded-full text-lg font-semibold hover:bg-pink-100 transition"
          >
            Need Help
          </button>
          <button
            onClick={() => router.push("/end-ride")}
            className="flex-1 bg-pink-500 text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition"
          >
            Make Payment
          </button>
        </motion.div>
      </div>
    </div>
  );
}
