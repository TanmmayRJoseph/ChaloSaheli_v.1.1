"use client";

import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-pink-100 p-6">
      {/* Heading Section */}
      <div className="flex justify-between items-center text-center px-6">
        <Image
          src="/image/girlhead.png"
          height={60}
          width={60}
          alt="Girl Head"
          className="scale-x-[-1] ml-32"
        />
        <h3 className="text-2xl font-bold text-pink-600 text-center max-w-2xl">
          Ride with Confidence, Travel with Care - <br /> Where Women Safety Comes First
        </h3>
        <Image
          src="/image/girlhead.png"
          height={60}
          width={60}
          alt="Girl Head"
          className="mr-32"
        />
      </div>

      {/* Navigation Bar */}
      <div className=" border-t-2 border-pink-500 mt-4">
        <nav className=" flex justify-evenly space-x-8 text-pink-600 text-lg font-semibold mt-3">
          <Link href="/" className="hover:text-pink-800">
            Home
          </Link>
          <Link href="/rideOptions" className="hover:text-pink-800">
            Offerings
          </Link>
          <Link href="/why-us" className="hover:text-pink-800">
            Why Us?
          </Link>
          <Link href="/login-as" className="hover:text-pink-800">
            Login / Sign Up
          </Link>
        </nav>
        <div className=" border-t-2 border-pink-500 mt-2"></div>
      </div>

      {/* Main image section with borders and animations */}
      <div className="img flex py-10 px-10 justify-center gap-8 flex-wrap">
        <div className="imgsection transition-transform duration-300 hover:scale-105 border-4 border-pink-300 rounded-xl shadow-md">
          <Image
            src="/image/CS BIKE.png"
            height={400}
            width={400}
            alt="Bike"
            className="scale-x-[-1] rounded-lg"
          />
        </div>

        <div className="imgsection transition-transform duration-300 hover:scale-105 border-4 border-pink-300 rounded-xl shadow-md">
          <Image
            src="/image/CS AUTO.png"
            height={400}
            width={400}
            alt="Auto"
            className="scale-x-[-1] rounded-lg"
          />
        </div>

        <div className="imgsection transition-transform duration-300 hover:scale-105 border-4 border-pink-300 rounded-xl shadow-md">
          <Image
            src="/image/CSCAR.png"
            height={400}
            width={400}
            alt="Car"
            className="scale-x-[-1] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
