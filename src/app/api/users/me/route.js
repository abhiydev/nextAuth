import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function GET(request) {
  try {
    const userID = await getDataFromToken(request); // Corrected the call to getDataFromToken
    const user = await User.findOne({ _id: userID }).select("-password"); // Fixed `.select()` typo
    return NextResponse.json({ msg: "User found", data: user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // Fixed `.message` typo and added status code
  }
}
