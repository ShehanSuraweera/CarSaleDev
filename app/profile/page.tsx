"use client";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Button } from "@heroui/button";
import apiClient from "@/services/api-client";
import { useRouter } from "next/navigation";

const Page = () => {
  const { ready, user, setUser } = useContext(UserContext) ?? {};
  const router = useRouter();

  // Handle Logout
  async function handleLogout() {
    try {
      await apiClient.post("/auth/logout"); // Log the user out
      localStorage.removeItem("user");
      if (setUser) {
        setUser(null);
      }
      // Remove user from localStorage
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally display an error message if logout fails
    }
  }

  if (!ready) {
    return <div>Loading...</div>; // Show loading while the user data is fetched
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <>
          <div>User Name: {user.name}</div>
          <div>User Email: {user.email}</div>
        </>
      ) : (
        <div>No user data available</div>
      )}
      <div>
        <Button onPress={handleLogout}>Log Out</Button>
      </div>
    </div>
  );
};

export default Page;
