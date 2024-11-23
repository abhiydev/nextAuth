import { NextResponse } from "next/server";

// Middleware to handle authentication and redirection
export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define public paths where authentication is not required
  const isPublicPath = path === "/signup" || path === "/login" || path === "/verifyemail";

  // Get the token from cookies
  const token = request.cookies.get("token")?.value || "";

  // Redirect authenticated users from public paths to the home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Redirect unauthenticated users to the login page for private paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If none of the conditions are met, continue the request
  return NextResponse.next();
}

// Path configuration to match specific routes
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
