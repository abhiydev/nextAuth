import { connect } from "@/dbConfig/dbconfig.js";
import User from "@/models/usermodel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req) {
  try {
    const { token } = await req.json();
    const user = await User.findOne({ "verifyToken": token });

    if (!user) {
      return NextResponse.json({ error: "Invalid token or user not found" }, { status: 400 });
    }

    if (user.verifyTokenExpiry < Date.now()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // If token is valid, mark email as verified
    user.isVerified = true;
    user.verifyToken = undefined; // Remove token
    user.verifyTokenExpiry = undefined; // Remove expiry

    await user.save();

    return NextResponse.json({ message: "Email successfully verified" }, { status: 200 });
  } catch (error) {
    console.error("Verification Error:", error.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
