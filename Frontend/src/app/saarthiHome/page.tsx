"use client";

import { useState, useEffect, useContext } from "react";
import { SocketContext } from "@/context/socketContext";
import RideRequest from "@/app/components/UserDeatilsForDrivers";
import axios from "axios";

interface DUser {
  _id: string;
  name: string;
  phoneNo: number;
  vechile: string;
}

interface Ride {
  _id: string;
  passenger: { name: string; phoneNo: number };
  pickup: string;
  destination: string;
  fare: number;
}

export default function DriverDashboard() {
  const { socket } = useContext(SocketContext)!;
  const [user, setUser] = useState<DUser | null>(null);
  const [ride, setRide] = useState<Ride[]>([]);
  const [newRideNotification, setNewRideNotification] = useState<string | null>(null);
  const [rideRequest, setRideRequest] = useState<Ride | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User data loaded:", parsedUser);
        socket.emit("join", { userType: "Saarthi", userId: parsedUser._id });
      } catch (error) {
        console.log("Error parsing user:", error);
      }
    }
  }, [socket]);

  useEffect(() => {
    socket?.on("new-ride", (data) => {
      console.log("New ride received:", data);
      setRide((prevRides) => [...prevRides, data]);
      setNewRideNotification("New ride request received!");
      setTimeout(() => setNewRideNotification(null), 5000);
    });
  }, [socket]);

  async function confirmRide(rideId: string) {
    if (!user?._id) {
      console.error("Captain ID is missing");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/ride/confirm", {
        rideId,
        captainId: user._id,
      });

      console.log("Ride confirmed:", response.data);
      setNewRideNotification(null);
      setRideRequest(response.data);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }

  return (
    <div className="min-h-screen bg-pink-100 text-pink-900 p-4">
      <header className="flex justify-between items-center p-4 bg-pink-200 rounded-lg shadow-md">
        <div>
          <h1 className="text-xl font-bold">{user ? user.name : "Loading..."}</h1>
          <p className="text-sm">Online - Ready for rides</p>
        </div>
        <p className="text-lg font-semibold">Earnings: ₹12,500</p>
      </header>

      <main className="mt-4  w-full grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Driver Info</h2>
          <p><b>Phone:</b> {user ? user.phoneNo : "Loading..."}</p>
          <p><b>Car:</b> {user ? user.vechile : "Loading..."}</p>
          <p><b>Rating:</b> ⭐4.9</p>
        </div>
      </main>
      {newRideNotification && (
        <div className="bg-green-500 text-white p-3 text-center rounded mt-4">
          {newRideNotification}
        </div>
      )}
      {ride.length === 0 ? (
        <p>No new ride requests.</p>
      ) : (
        ride.map((r) => (
          <div key={r._id} className="border p-4 my-2 rounded bg-white shadow">
            <p><strong className="underline font-extrabold">Pickup:</strong> {r.pickup}</p>
            <p><strong className="underline font-extrabold">Drop:</strong> {r.destination}</p>
            <p><strong className="underline font-extrabold">Fare:</strong> ₹{r.fare}</p>
            <button
              onClick={() => confirmRide(r._id)}
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
            >
              Accept
            </button>
          </div>
        ))
      )}

      {rideRequest && (
        <RideRequest
        user={{ _id: user?._id || "", name: user?.name || "", phoneNo: user?.phoneNo || 0 }}
        rideId={rideRequest._id}
        pickup={rideRequest.pickup}
        destination={rideRequest.destination}
        fare={rideRequest.fare}
         
        />
      )}
    </div>
  );
}
