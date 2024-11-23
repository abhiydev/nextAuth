import { connect } from "@/dbConfig/dbconfig.js";
import User from "@/models/usermodel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req) {
  try {
    // Parse request body
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields (username, email, password) are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();
    console.log("User Saved:", savedUser);

    // Send verification email
    const verificationResponse = await sendEmail({
      email,
      emailType: "VERIFY",
      userID: savedUser._id,
    });

    console.log("Verification email sent:", verificationResponse);

    // Respond with success message
    return NextResponse.json(
      {
        message: "User created successfully. Verification email sent.",
        success: true,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
