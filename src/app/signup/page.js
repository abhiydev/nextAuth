"use client";

// import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/users/signup", user); // Correct API route
      console.log("Signup success.", response.data);
      router.push("/login");
    } catch (err) {
      console.error("Signup failed.", err.response?.data || err.message);
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button if all fields are filled
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1>{loading ? "Processing..." : "SignUp"}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Username"
        value={user.username}
        className="px-2 py-1 rounded-lg text-black"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={user.email}
        className="px-2 py-1 rounded-lg text-black"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={user.password}
        className="px-2 py-1 rounded-lg text-black"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`rounded-lg border py-2 px-4 m-2 ${
          buttonDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "hover:bg-indigo-500 hover:text-black"
        }`}
      >
        Signup
      </button>

      <Link href="/login">
        <p>Visit Login Page</p>
      </Link>
    </div>
  );
}
