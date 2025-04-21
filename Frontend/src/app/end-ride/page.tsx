"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EndRide() {
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
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col relative">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="text-center mb-6"
      >
        <motion.h1
          custom={0}
          variants={fadeUp}
          className="text-3xl font-bold text-pink-600"
        >
          Ride Completed! 🎉
        </motion.h1>
        <motion.p
          custom={1}
          variants={fadeUp}
          className="text-pink-500 text-lg"
        >
          Thank you for riding with{" "}
          <span className="font-semibold">Chalo Saheli</span>
        </motion.p>
      </motion.div>

      {/* Fare Summary */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-md p-4 mb-6 border border-pink-200"
      >
        <h2 className="text-pink-600 font-semibold text-xl mb-2">
          Trip Summary
        </h2>
        <div className="text-pink-500 space-y-1">
          <p>📍 From: Indiranagar</p>
          <p>🏁 To: MG Road</p>
          <p>⏱️ Duration: 17 mins</p>
          <p>🛣️ Distance: 6.2 km</p>
          <p className="text-lg font-bold mt-2">💰 Fare: ₹120</p>
        </div>
      </motion.div>

      {/* Driver Info */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-md p-4 mb-6 border border-pink-200 flex items-center gap-4"
      >
        <div>
          <h2 className="text-pink-600 font-bold text-xl">Priya Sharma</h2>
          <p className="text-sm text-pink-500">Swift Dzire • KA 05 MP 1122</p>
          <p className="text-sm text-pink-400">4.9 ★ Rating</p>
        </div>
      </motion.div>

      {/* Rate Driver */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-pink-100 rounded-xl p-4 text-center mb-6"
      >
        <p className="text-pink-600 font-semibold mb-2">Rate your driver</p>
        <div className="flex justify-center gap-2 text-yellow-400 text-2xl">
          ⭐⭐⭐⭐⭐
        </div>
        <textarea
          placeholder="Leave a feedback (optional)"
          className="mt-4 w-full p-3 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex justify-between gap-4"
      >
        <button
          onClick={() => router.push("/book")}
          className="flex-1 bg-pink-500 text-white px-4 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
        >
          Book Another Ride
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex-1 bg-white border border-pink-500 text-pink-600 px-4 py-3 rounded-full font-semibold hover:bg-pink-100 transition"
        >
          Go Home
        </button>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-6 right-6"
      >
        <Image
          src="/image/ChaloSaheliLogo.png"
          alt="Chalo Saheli Logo"
          width={80}
          height={80}
        />
      </motion.div>
    </div>
  );
}
