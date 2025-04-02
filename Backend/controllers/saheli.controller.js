import { createSaheli } from "../services/saheli.service.js";
import Saheli from "../models/saheli.js";

export const registerSaheli = async (req, res, next) => {
  const {
    name,
    phoneNo,
    gender,
    emergencyNo,
    dob,
    emailId,
    address,
    password,
  } = req.body;

  const saheli = await createSaheli({
    name,
    phoneNo,
    gender,
    emergencyNo,
    dob,
    emailId,
    address,
    password,
  });
  const token = saheli.generateAuthToken();
  res.status(201).json({ saheli, token });
}; //*register a new saheli

export const loginSaheli = async (req, res, next) => {
  const { emailId, password } = req.body;

  const saheli = await Saheli.findOne({ emailId });

  if (!saheli) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isMatch = await saheli.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = saheli.generateAuthToken();
  const loggedInUser = { ...saheli.toObject(), token };
  res.cookie("token", token, {
    httpOnly: true,
  });
  res
    .status(200)
    .json({ message: "Login successful", saheli, token, loggedInUser });
}; //*login a saheli
