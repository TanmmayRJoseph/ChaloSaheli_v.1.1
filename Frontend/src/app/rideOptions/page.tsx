"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const RideOptions = () => {
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

  const rides = [
    {
      name: "Gulmohar Ride",
      src: "/image/gulmohar.jpg",
      detail:
        "Blossom into comfort with Gulmohar Ride! Like the vibrant petals of a flower, this ride unfolds luxury and safety, ensuring a smooth journey for every Saheli on the move.",
    },
    {
      name: "Raftar Ride",
      src: "/image/raftar.jpeg",
      detail:
        "Speed meets sisterhood with Raftar Ride! Hop on and zoom through the city with a swift, hassle-free ride that gets you where you need to be—fast and fearless!",
    },
    {
      name: "Jhilmil Ride",
      src: "/image/jhilmil.jpeg",
      detail:
        "A ride as lively as your spirit! Jhilmil Ride brings the rhythm of the streets to life, with a touch of tradition and a whole lot of safety, making everyday commutes a joyous affair",
    },
  ];

  const toggleFlip = (name: string) => {
    setFlipped((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6 overflow-x-hidden">
      <motion.h1
        className="text-3xl font-bold text-pink-600 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How would you like to ride, Saheli?
      </motion.h1>
      <motion.p
        className="text-pink-500 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Choose your comfort - and travel your way, safely and hassle-free!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rides.map((ride) => (
          <div key={ride.name} className="w-[300px] h-[360px]">
            <motion.div
              className="relative w-full h-full"
              initial={false}
              animate={{ rotateY: flipped[ride.name] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side */}
              <div
                className="absolute w-full h-full backface-hidden text-center bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{ zIndex: 2 }}
              >
                <div className="w-[270px] h-[300px] overflow-hidden rounded-lg">
                  <Image
                    src={ride.src}
                    alt={ride.name}
                    width={250}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <motion.button
                  className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFlip(ride.name)}
                >
                  {ride.name}
                </motion.button>
              </div>

              {/* Back Side */}
              <div
                className="absolute w-full h-full backface-hidden text-pink-800 text-sm bg-white p-4 rounded-lg shadow-lg flex items-center justify-center text-center"
                style={{
                  transform: "rotateY(180deg)",
                }}
              >
                <p>{ride.detail}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Flip CSS styles */}
      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default RideOptions;
