import express from "express";
import {
  createRideController,
  getFareController,
  confirmRideController,
  startRide,
  endRide,
} from "../controllers/ride.controller.js";
import { authSaarthi, authSaheli } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/createRide", authSaheli, createRideController);
router.get("/getFare", getFareController);
router.post("/confirm", confirmRideController);
router.get("/start-ride", authSaarthi, startRide);
router.post("/end-ride", authSaarthi, endRide);

export default router;
