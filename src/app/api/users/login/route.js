import { connect } from "@/dbConfig/dbconfig.js";
import User from "@/models/usermodel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log("Request Body: ", reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    // Check if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create the token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d", // Fixed typo: changed `expireIn` to `expiresIn`
    });

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { msg: "Login successful", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60, // 1 day
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error in login:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
