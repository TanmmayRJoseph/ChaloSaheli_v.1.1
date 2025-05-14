"use client";

import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { SocketContext } from "@/context/socketContext";
import DriverLoading from "../components/WaitingForDrivers";
import RideConfirmation from "@/app/components/ConfirmedRide";

import { useRouter } from "next/navigation";

const containerStyle = {
  width: "100%",
  height: "100%",
};

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

interface Suggestion {
  description: string;
}
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

export default function RideBooking() {
  const isSuggestionClicked = useRef(false);
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  // const [startRide, setStartRide] = useState(false); //today
  // const [sendingDataToStartRide, setSendingDataToStartRide] =
  //   useState<RideStarted | null>(null);

  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [route, setRoute] = useState("");
  const [showRides, setShowRides] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [fares, setFares] = useState({ Moto: 0, Auto: 0, Car: 0 });
  const [selectedRide, setSelectedRide] = useState<null | {
    type: string;
    price: string;
  }>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { socket } = useContext(SocketContext)!;
  const rides: { type: keyof typeof fares; price: string }[] = [
    { type: "Moto", price: "$5" },
    { type: "Auto", price: "$8" },
    { type: "Car", price: "$12" },
  ];
  const [waitingForDrivers, setWaitingForDrivers] = useState(false);
  const [confirmRideDetails, setconfirmRideDetails] =
    useState<RideDetails | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        socket.emit("join", { userType: "Saheli", userId: parsedUser._id });
      } catch (error) {
        console.log(error);
      }
    }
  }, [socket]);

  //*Confirm Ride Socket Event
  socket?.on("ride-confirmed", (ride) => {
    console.log("here is the ride", ride);
    setWaitingForDrivers(false);

    setconfirmRideDetails(ride);
  });

  // socket.on("ride-ended", () => {
  //   setShowRides(false);

  //   setconfirmRideDetails(null);
  //   setPickup("");
  //   setDestination("");
  //   // load the map again
  //   router.push("/rideBooking");
  //   router.refresh();
  // });

  // * Start ride socket event
  useEffect(() => {
    const handleRideStarted = (ride: RideStarted) => {
      console.log("here is the ride", ride);

      setconfirmRideDetails(null);
      setShowRides(false);

      router.push(
        `/startRide?destination=${encodeURIComponent(
          ride.destination
        )}&captain=${encodeURIComponent(
          ride.captain.name
        )}&vechile=${encodeURIComponent(
          ride.captain.vechile
        )}&fare=${encodeURIComponent(
          ride.fare.toString()
        )}&status=started&otp=${encodeURIComponent(
          ride.otp
        )}&pickup=${encodeURIComponent(ride.pickup)}`
      );
    };

    // ✅ Attach the socket listener correctly
    socket?.on("ride-started", handleRideStarted);

    // ✅ Cleanup to avoid memory leaks
    return () => {
      socket?.off("ride-started", handleRideStarted);
    };
  }, [socket, router]);

  //*location DONT CHANGE
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // * Fetch place suggestions for pickup point DONT CHANGE
  useEffect(() => {
    if (isSuggestionClicked.current) {
      isSuggestionClicked.current = false;
      return;
    }
    const fetchPickupSuggestions = async () => {
      if (pickup.length > 2) {
        try {
          const response = await axios.get(
            "http://localhost:5000/maps/getAutoCompleteSuggestions",
            {
              params: { address: pickup },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }, // ✅ Sending as query parameter
            }
          );
          setPickupSuggestions(response.data.suggestions);
        } catch (error) {
          console.error("Error fetching pickup suggestions:", error);
        }
      } else {
        setPickupSuggestions([]); // Clear suggestions if input is too short
      }
    };

    const delayDebounce = setTimeout(fetchPickupSuggestions, 500); // Debounce API calls to avoid overloading
    return () => clearTimeout(delayDebounce);
  }, [pickup]);

  // * Fetch place suggestions for destination DONT CHANGE
  useEffect(() => {
    if (isSuggestionClicked.current) {
      isSuggestionClicked.current = false;
      return;
    }
    const fetchPlaceSuggestions = async () => {
      if (destination.length > 2) {
        try {
          const response = await axios.get(
            `http://localhost:5000/maps/getAutoCompleteSuggestions`,
            {
              params: { address: destination },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }, // Send input as `address` to match backend API
            }
          );
          setSuggestions(response.data.suggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]); // Clear suggestions if input is too short
      }
    };
    const delayDebounce = setTimeout(fetchPlaceSuggestions, 500); // Debounce API calls to avoid overloading
    return () => clearTimeout(delayDebounce);
  }, [destination]);

  //* Calculate Fare DONT CHANGE
  const calculateFare = async () => {
    if (!pickup || !destination) {
      alert("Please enter both pickup and drop locations.");
      return;
    }

    if (typeof pickup !== "string" || typeof destination !== "string") {
      alert("Invalid input format. Please enter valid addresses.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/ride/getFare", {
        params: { pickup, destination },
      });

      console.log("API Response:", response.data); // Debugging step

      if (response.data && typeof response.data === "object") {
        console.log("Setting fares:", response.data); // Log received fare data

        setFares({
          Moto: response.data.moto, // Correct key name from API
          Auto: response.data.auto,
          Car: response.data.car,
        });

        setShowRides(true);
      } else {
        console.error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error calculating fare:", error || error);
    }
  };

  const handleRideSelection = (ride: { type: string; price: string }) => {
    setSelectedRide(ride);
    setShowPopup(true);
  }; //runs when ride is selected

  // * Create Ride DONT CHANGE
  async function createRide() {
    const response = await axios.post(
      "http://localhost:5000/ride/createRide",
      {
        pickup,
        destination,
        vehicleType: selectedRide?.type.toLowerCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setShowPopup(false);
    setWaitingForDrivers(true);
  }

  return (
    <div className="flex h-screen w-screen bg-pink-100 p-6">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-1/2 p-6">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Book Your Ride!
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <div className="relative mb-4">
            <input
              type="text"
              name="pickup"
              placeholder="Enter pickup point"
              className="border border-pink-300 rounded w-full p-3 text-black"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            {/* Pickup Suggestions Box */}
            {pickupSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white w-full border border-gray-200 rounded shadow-lg mt-1 max-h-60 overflow-y-auto text-black">
                {pickupSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-3 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      isSuggestionClicked.current = true;
                      setPickup(suggestion.description);
                      setPickupSuggestions([]); // Hide suggestions after selection
                    }}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination Input with Suggestions */}
          <div className="relative">
            <input
              type="text"
              name="destination"
              placeholder="Enter drop location"
              className="border border-pink-300 rounded w-full p-3 mb-4 text-black"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {/* Destination Suggestions Box */}
            {suggestions.length > 0 && (
              <ul className="absolute bg-white w-full border border-gray-200 rounded shadow-lg mt-1 max-h-60 overflow-y-auto text-black">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-3 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      isSuggestionClicked.current = true;
                      setDestination(suggestion.description);
                      setSuggestions([]); // Hide suggestions after selection
                    }}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="Select suitable route"
            className="border text-black border-pink-300 rounded w-full p-3 mb-4"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3"
            onClick={calculateFare}
          >
            Select Ride
          </button>
        </div>

        {showRides && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Available Rides
            </h2>
            {rides.map((ride, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border-b border-pink-200 cursor-pointer"
                onClick={() => handleRideSelection(ride)}
              >
                <span className="text-lg text-black">{ride.type}</span>
                <span className="font-semibold text-lg text-black">
                  ₹{fares[ride.type]}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Right Section - Google Map */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="h-5/6 w-5/6 rounded-lg shadow-lg overflow-hidden">
          <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API || ""}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={currentLocation || { lat: 20, lng: 77 }}
              zoom={14}
            >
              {currentLocation && <Marker position={currentLocation} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Popup Window */}
      {showPopup && selectedRide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Ride Details
            </h2>
            <p className="text-lg text-black mb-2">
              <span className="font-bold underline">Pickup:</span> {pickup}
            </p>
            <p className="text-lg text-black mb-2">
              <span className="font-bold underline">Destination:</span>{" "}
              {destination}
            </p>
            <p className="text-lg text-black mb-2">
              <span className="font-bold underline">Route:</span> {route}
            </p>
            <p className="text-lg text-black mb-4">
              <span className="font-bold underline">Selected Vehicle:</span>{" "}
              {selectedRide.type}
            </p>
            <button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 mb-4"
              onClick={createRide}
            >
              Look for Drivers
            </button>
            <button
              className="w-full bg-gray-300 hover:bg-gray-400 text-black p-3"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Driver Loading */}
      {waitingForDrivers && <DriverLoading />}
      {confirmRideDetails && <RideConfirmation ride={confirmRideDetails} />}
      {/* {startRide && <StartRide ride={sendingDataToStartRide} />} */}
    </div>
  );
}
