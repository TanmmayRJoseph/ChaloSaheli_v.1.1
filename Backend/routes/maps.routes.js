import express from "express";
import { authSaheli } from "../middleware/auth.middleware.js";
import {
  getCoordinate,
  getDistanceTimes,
  getAutoCompleteSuggestionss,
} from "../controllers/map.controller.js";
const router = express.Router();

router.get("/getCoordinates", authSaheli, getCoordinate);
router.get("/getAutoCompleteSuggestions",getAutoCompleteSuggestionss);
router.get("/getDistanceTimes", getDistanceTimes);

export default router;
