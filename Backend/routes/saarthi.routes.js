import express from "express";
import { registerSaarthi , loginSaarthi,singleSaarthi} from "../controllers/saarthi.controller.js";
const router = express.Router();

router.post("/register", registerSaarthi);
router.post("/login",loginSaarthi)
router.get("/singleUser",singleSaarthi)


export default router;