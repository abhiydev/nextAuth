"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data.msg); // Confirm logout success
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.log("Logout failed:", error.message);
    }
  };

  const getUserDetail = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id); // Set user ID to `data`
    } catch (error) {
      console.log("Failed to fetch user details:", error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <br />
      <h2>{data === "" ? "User data not received" : data}</h2>
      {data && (
        <Link href={`/profile/${data}`}>
          <p className="text-blue-500 underline">Go to detailed profile</p>
        </Link>
      )}
      <p>This is a profile page</p>
      <button
        onClick={getUserDetail}
        className="bg-blue-500 p-2 m-2 border rounded text-white"
      >
        Get User Details
      </button>
      <hr />
      <button
        onClick={logout}
        className="bg-red-500 p-2 m-2 border rounded text-white"
      >
        Logout
      </button>
    </div>
  );
}
