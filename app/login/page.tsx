"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useRouter } from "next/navigation";
import apiClient from "@/services/api-client";

const page: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });

      if (response.data.user) {
        alert("Login Successfull");
        // Update the context with user data
        userContext?.setUser(response.data.user);
        // Optionally store user in localStorage to persist the session
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      setRedirect(true);
      router.push("/");
    } catch (error) {
      alert("Login failed try again...!");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-around mt-4 mb-64 grow">
      <div className="w-1/2">
        <h1 className="text-3xl text-center">Login</h1>
        <form
          action="submit"
          className="flex flex-col gap-2 mt-4"
          onSubmit={handleLoginSubmit}
        >
          <Input
            type="text"
            label="user name"
            labelPlacement="outside"
            placeholder="enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            label=" password"
            labelPlacement="outside"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        <div className="flex justify-center mt-2">
          <span className="text-gray-500 ">
            Don't have an account?{" "}
            <Link className="text-black underline" href={"/register"}>
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
