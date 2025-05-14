"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EndRide() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const pickup = searchParams.get("pickup") || "";
  const fare = searchParams.get("fare") || "";
  const name = searchParams.get("name") || "";
  const vehicle = searchParams.get("vehicle") || "";

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRating = (rate: number) => setRating(rate);
  const handleSubmitFeedback = () => {
    const submission = {
      rating,
      feedback,
      driver: name,
      vehicle,
      pickup,
      destination,
    };
    console.log("Feedback Submitted:", submission);
    setFeedback("");
    setRating(0);
    router.push("/rideBooking");
    alert("Thanks for your feedback!");
    // TODO: Send this data to backend
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="h-screen bg-pink-50 p-6 flex flex-col relative overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto space-y-6">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" className="text-center">
          <motion.h1 custom={0} variants={fadeUp} className="text-3xl font-bold text-pink-600">
            Ride Completed! 🎉
          </motion.h1>
          <motion.p custom={1} variants={fadeUp} className="text-pink-500 text-lg">
            Thank you for riding with <span className="font-semibold">Chalo Saheli</span>
          </motion.p>
        </motion.div>

        {/* Fare Summary */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md p-4 border border-pink-200"
        >
          <h2 className="text-pink-600 font-semibold text-xl mb-2">Trip Summary</h2>
          <div className="text-pink-500 space-y-1">
            <p>📍 From: {pickup}</p>
            <p>🏁 To: {destination}</p>
            <p>⏱️ Duration: 17 mins</p>
            <p>🛣️ Distance: 6.2 km</p>
            <p className="text-lg font-bold mt-2">💰 Fare: ₹{fare}</p>
          </div>
        </motion.div>

        {/* Driver Info */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md p-4 border border-pink-200 flex items-center gap-4"
        >
          <div>
            <h2 className="text-pink-600 font-bold text-xl">{name}</h2>
            <p className="text-sm text-pink-500">{vehicle}</p>
            <p className="text-sm text-pink-400">4.9 ★ Rating</p>
          </div>
        </motion.div>

        {/* Rate Driver */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-pink-100 rounded-xl p-4 text-center"
        >
          <p className="text-pink-600 font-semibold mb-2">Rate your driver</p>
          <div className="flex justify-center gap-2 text-2xl mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer ${
                  (hoveredRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Leave a feedback (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 text-black rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSubmitFeedback}
            className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition"
          >
            Submit Feedback
          </button>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex justify-between gap-4 mt-4"
      >
        <button
          onClick={() => router.push("/rideBooking")}
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
        <Image src="/image/ChaloSaheliLogo.png" alt="Chalo Saheli Logo" width={80} height={80} />
      </motion.div>
    </div>
  );
}
