import Saheli from "../models/saheli.js";

export const createSaheli = async ({
  name,
  phoneNo,
  gender,
  emergencyNo,
  dob,
  emailId,
  address,
  password,
}) => {
  if (
    !name ||
    !phoneNo ||
    !gender ||
    !emergencyNo ||
    !dob ||
    !emailId ||
    !address ||
    !password
  ) {
    throw new Error("All fields are required");
  }

  const saheli = Saheli.create({
    name,
    phoneNo,
    gender,
    emergencyNo,
    dob,
    emailId,
    address,
    password,
  });

  return saheli;
};
