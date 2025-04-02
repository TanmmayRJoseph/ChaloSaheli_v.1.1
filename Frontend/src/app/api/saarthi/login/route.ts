import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/config/db";
import Saarthi from "@/models/saarthi";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // Ensure database is connected
    await connectToDatabase();

    const reqBody = await req.json();
    const { emailId } = reqBody;

    // Check if user exists
    const user = await Saarthi.findOne({ emailId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ensure JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables.");
    }

    // Create JWT payload
    const payload = {
      id: user._id.toString(),
      emailId: user.emailId,
      name: user.name,
      phoneNo: user.phoneNo,
      gender: user.gender,
      vehicle: user.vechile,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove password from user object before sending response
    const loggedInUser = { ...user.toObject(), token };
    delete loggedInUser.password;

    // Set token in HTTP-only cookie
    const response = NextResponse.json(
      { message: "Login successful", token, loggedInUser },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
