"use client";
import React, { createContext, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
}

// Creating context with an initial type
export const SocketContext = createContext<SocketContextType | null>(null);

const socket = io("http://localhost:5000");

const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server with Socket from frontend");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup function to avoid memory leaks
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
