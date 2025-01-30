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
    <div className="flex items-center justify-around mt-4 mb-64 grow">
      <div className="w-1/2">
        <h1 className="text-3xl text-center">Login</h1>
        <form
          action="submit"
          className="flex flex-col gap-2 mt-4"
          //onSubmit={login}
        >
          <Input
            name="email"
            type="text"
            label="email"
            labelPlacement="outside"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <Input
            name="password"
            type="password"
            label=" password"
            labelPlacement="outside"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
          <Button formAction={handleClickLoginButton} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
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

export default Page;
