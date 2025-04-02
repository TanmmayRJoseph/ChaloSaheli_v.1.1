import Saarthi from "../models/saarthi.js";
import { createSaarthi } from "../services/saarthi.service.js";
import jwt from "jsonwebtoken";
export const registerSaarthi = async (req, res) => {
  const { name, phoneNo, gender, vechile, dob, emailId, city, password } =
    req.body;
  const isSaarthiRegistered = await Saarthi.findOne({ emailId });
  if (isSaarthiRegistered) {
    return res.status(400).json({ error: "Saarthi already registered" });
  }
  const saarthi = await createSaarthi({
    name,
    phoneNo,
    gender,
    vechile,
    dob,
    emailId,
    city,
    password,
  });
  const token = saarthi.generateAuthToken();
  res.status(201).json({ saarthi, token });
};

export const loginSaarthi = async (req, res) => {
  const { emailId, password } = req.body;
  const saarthi = await Saarthi.findOne({ emailId });
  if (!saarthi) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isMatch = await saarthi.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = saarthi.generateAuthToken();
  const loggedInUser = { ...saarthi.toObject(), token };
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,//its for https
    sameSite: "None", // Required for cross-origin cookies
  });
  res
    .status(200)
    .json({ message: "Login successful", saarthi, token, loggedInUser });
};

export const singleSaarthi = async (req, res) => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      res.status(400).json({ error: "unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({ user: decoded });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};
