"use client";
import apiClient from "@/services/api-client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation

const Page: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const router = useRouter();

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/register", {
        username,
        email,
        password,
        name,
        phone,
        city,
      });
      alert("Registration Successful. Now you can log in");
      router.push("/login");
    } catch (error) {
      alert("Registration failed! Try again.");
    }
  };

  return (
    <div className="flex items-center justify-around w-full mt-4 mb-64 grow">
      <div className="w-1/2">
        <h1 className="text-3xl text-center">Register</h1>
        <form
          action="submit"
          className="flex flex-col gap-2 mt-4"
          onSubmit={handleRegisterSubmit}
        >
          <Input
            type="text"
            label="user name"
            placeholder="enter your user name"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <Input
            type="password"
            label="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="text"
            label="name"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="Phone"
            placeholder="enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            type="text"
            label="City"
            placeholder="enter your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            type="email"
            label="email"
            placeholder="youre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </form>
        <div className="flex justify-center mt-2">
          <span className="text-gray-500 ">
            Already have an account?{" "}
            <Link className="text-black underline" href={"/login"}>
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
