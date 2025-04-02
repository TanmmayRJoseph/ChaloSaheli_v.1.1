import Saarthi from "../models/saarthi.js";

export const createSaarthi = async ({
  name,
  phoneNo,
  gender,
  vechile, 
  dob,
  emailId,
  city,
  password,
}) => {
  console.log("Received data:", { name, phoneNo, gender, vechile, dob, emailId, city, password }); // Debugging
  if (!name || !phoneNo || !gender || !vechile || !dob || !emailId || !city || !password) {
    throw new Error("All fields are required");
  }

  try {
    const saarthi = await Saarthi.create({
      name,
      phoneNo,
      gender,
      vechile, // corrected typo
      dob,
      emailId,
      city,
      password,
    });

    return saarthi;
  } catch (error) {
    throw new Error(`Error creating Saarthi: ${error.message}`);
  }
};

