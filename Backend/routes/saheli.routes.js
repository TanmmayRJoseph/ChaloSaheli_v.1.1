import express from "express";
const router = express.Router();
import { registerSaheli , loginSaheli} from "../controllers/saheli.controller.js";



router.post("/register",registerSaheli)
router.post("/login",loginSaheli)

export default router