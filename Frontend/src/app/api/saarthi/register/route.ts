import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/config/db";
import Saarthi from "@/models/saarthi";
import bcrypt from "bcrypt";

//register route for registering the new user(saarthi) to the app
/*
name
phoneNo
gender
vechile
dob
emailId
city
password
*/
export async function POST(req: NextRequest) {
  try {
    const { name, phoneNo, gender, vechile, dob, emailId, city, password } =
      await req.json();
    if (
      !name ||
      !phoneNo ||
      !gender ||
      !vechile ||
      !dob ||
      !emailId ||
      !city ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const user = await Saarthi.findOne({ emailId });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const saarthi = await Saarthi.create({
      name,
      phoneNo,
      gender,
      vechile,
      dob,
      emailId,
      city,
      password: hashedPassword,
    });
    await saarthi.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
