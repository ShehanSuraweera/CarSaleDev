"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/src/actions/users";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/src/UserContext";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { supabaseBrowserClient } = useUser();

  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);
      const { error } = await supabaseBrowserClient.auth.signInWithPassword({
        email,
        password,
      });

      if (errorMessage || error) {
        toast.error(errorMessage || error.message);
      } else {
        toast.success("Successfully logged in");
        router.push("/");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-around mt-4 mb-64 grow">
      <div className="text-center ">
        <div className="mb-5 text-2xl "> Welcome Back to CeylonCars!</div>
        <div className="text-lg text-gray-500">
          Your gateway to Sri Lanka’s #1 vehicle marketplace. Buy, sell, and
          explore the best deals with trust and security. Login now and start
          your journey!
        </div>
      </div>

      <div className="w-full p-5 pt-10 mt-10 rounded-md shadow-md sm:w-1/2">
        <h1 className="text-3xl text-center">Login</h1>
        <form
          action="submit"
          className="flex flex-col gap-8 mt-4"
          //onSubmit={login}
        >
          <Input
            name="email"
            type="text"
            label="Email"
            labelPlacement="outside"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            labelPlacement="outside"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
          <Button
            color="primary"
            formAction={handleClickLoginButton}
            type="submit"
            className="mt-5"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>
        <div className="flex justify-center mt-2">
          <span className="text-gray-500 ">
            Don't have an account?{" "}
            <Link
              className="text-black underline dark:text-slate-400"
              href={"/register"}
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
