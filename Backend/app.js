import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import morgan from "morgan";
import saheliRoutes from "./routes/saheli.routes.js";
import saarthiRoutes from "./routes/saarthi.routes.js";
import mapsRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

connectDB(); //Connect to database

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", //allowed origin
    credentials: true, //access-control-allow-credentials:true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully🏃🏃",
    progress: "Project completed 100% ",
    status: 200,
  });
});

app.use("/saheli", saheliRoutes); //Saheli routes
app.use("/saarthi", saarthiRoutes); //Saarthi routes
app.use("/maps", mapsRoutes); //Maps routes
app.use("/ride", rideRoutes); //Ride routes

export default app;
