"use client";  // This should be the first line in your file

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("Verification Response:", response.data); // Log successful response
      setVerified(true);
    } catch (err) {
      console.error("Verification Error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || ""); // Ensure token is not null or undefined
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `Token: ${token}` : "No token found"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">
            Go to Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-500">Verification Failed</h2>
          <p>Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
}
