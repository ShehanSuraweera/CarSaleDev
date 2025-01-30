"use client";
import apiClient from "@/src/services/api-client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation"; // For navigation
import toast from "react-hot-toast";
import { createAccountAction } from "@/src/actions/users";
import { Loader2 } from "lucide-react";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateAccountButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/login");
        toast.success(
          "A verification email has been sent to your email address"
        );
      }
    });
  };

  return (
    <div className="flex items-center justify-around w-full mt-4 mb-64 grow">
      <div className="w-1/2">
        <h1 className="text-3xl text-center">Register</h1>
        <form action="submit" className="flex flex-col gap-2 mt-4">
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
          <Button
            disabled={isPending}
            type="submit"
            formAction={handleCreateAccountButton}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <div className="flex justify-center mt-2">
          <span className="text-gray-500">
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
