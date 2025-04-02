import Saarthi from "./models/saarthi.js";
import Saheli from "./models/saheli.js";
import { Server } from "socket.io";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  
  
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "Saheli") {
        await Saheli.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "Saarthi") {
        await Saarthi.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    
    
    
    socket.on("update-location-saarthi", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await Saarthi.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

   
   
   
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};