import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      msg: "Logout successful",
      success: true,
    });

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
