import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) throw new Error("No token found in cookies");

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (error) {
    console.error("Error in getDataFromToken:", error.message);
    throw new Error("Token validation failed. Ensure it's valid and not expired.");
  }
};
