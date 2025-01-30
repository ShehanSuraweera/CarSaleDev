"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation"; // For navigation
import toast from "react-hot-toast";
import { createAccountAction } from "@/src/actions/users";
import { Loader2 } from "lucide-react";
import { Form } from "@heroui/react";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateAccountButton = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setConfirmPassword("");
      return;
    }

    const formData = new FormData(event.currentTarget);
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
    <>
      <div className="hidden w-full p-2 my-10 rounded-md shadow-md sm:block sm:p-10">
        <div className="text-center sm:text-2xl font-semibold text-[#130F40]">
          Welcome to CeylonCars – Sri Lanka’s #1 Vehicle Selling Platform!
        </div>
        <div className="text-center sm:text-lg mt-5 font-normal text-[#423b86]">
          Thank you for joining CeylonCars, the most trusted and secure
          marketplace for buying and selling vehicles in Sri Lanka. Whether
          you're looking for your dream ride or selling your car at the best
          price, we've got you covered. Enjoy a seamless experience with
          advanced search filters, real-time listings, and a safe transaction
          process. Start exploring today and drive your passion forward!
        </div>
      </div>
      <div className="flex items-center justify-around w-full py-4 mt-10 mb-64 rounded-md shadow-md sm:mt-4 sm:p-10 grow">
        <div className="sm:w-1/2">
          <h1 className="text-3xl text-center">Register</h1>
          <Form
            action="submit"
            validationBehavior="native"
            onSubmit={handleCreateAccountButton}
            className="flex-col items-center gap-4 mt-4 "
          >
            <Input
              isRequired
              name="email"
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
            <Input
              isRequired
              labelPlacement="outside"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
            <Input
              isRequired
              labelPlacement="outside"
              name="confirmPassword"
              type="password"
              label="confirm Password"
              placeholder="confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isPending}
            />
            <Button
              disabled={isPending}
              color="primary"
              type="submit"
              className="w-[60%] mt-8"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </Form>
          <div className="flex justify-center mt-2">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-black underline dark:text-slate-400"
                href={"/login"}
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
