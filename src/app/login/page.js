"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("response: ", response);
      router.push("/profile");
    } catch (error) {
      console.error("Login failed", error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable the button only if both email and password are non-empty
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h1 className="text-2xl font-semibold">
        {loading ? "Processing..." : "Login"}
      </h1>
      
      {/* Email Input */}
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={user.email}
        className="px-3 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      {/* Password Input */}
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={user.password}
        className="px-3 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      {/* Login Button */}
      <button
        onClick={onLogin}
        className={`py-2 px-4 m-2 rounded-lg text-white ${
          buttonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600"
        }`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Enter Credentials" : "Login"}
      </button>

      {/* Signup Link */}
      <Link href="/signup">
        <p className="text-indigo-500 hover:underline">Visit Signup page</p>
      </Link>
    </div>
  );
}
