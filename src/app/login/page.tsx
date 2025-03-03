"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { loginAction, signInWithGoogle } from "@/src/actions/users";
import {
  loginWithEmailPassword,
  loginWithGoogle,
} from "@/src/redux/features/user/userSlice";
import toast from "react-hot-toast";
// import { useUser } from "@/src/UserContext";
import { Divider, Form } from "@heroui/react";
import OneTapComponent from "@/src/components/OneTapComponent";
import googleIcon from "@/src/assets/icons/google-icon.svg";
import { GoogleIcon } from "@/src/components/icons";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { createSupabaseClient } from "@/src/auth/client";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  // const { supabaseBrowserClient } = useUser();
  const supabase = createSupabaseClient();

  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClickLoginButton = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const result = await dispatch(
        loginWithEmailPassword({ email, password })
      ).unwrap();

      if (typeof result !== "string" && result.user) {
        toast.success("Successfully logged in");
        router.push("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      const errorMessage =
        (error as { message: string }).message || "Login failed";
      toast.error(errorMessage); // Show error message
    }
  };

  async function handleSignInWithGoogle(response: any) {
    try {
      const result = await dispatch(
        loginWithGoogle(response.credential)
      ).unwrap();

      if (typeof result !== "string" && result.user) {
        toast.success("Successfully logged in with Google");
        router.push("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      const errorMessage =
        (error as { message: string }).message || "Google login failed";
      toast.error(errorMessage); // Show error message
    }
  }

  const handleGoogleLoginButton = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-around mt-4 mb-64 grow">
      <div className="text-center ">
        <div className="mb-5 text-2xl "> Welcome Back to Wandi.lk!</div>
        <div className="text-lg text-gray-500">
          Your gateway to Sri Lanka’s #1 vehicle marketplace. Buy, sell, and
          explore the best deals with trust and security. Login now and start
          your journey!
        </div>
      </div>

      <div className="w-full p-5 pt-10 mt-10 rounded-md shadow-md sm:w-1/2">
        <h1 className="text-3xl text-center">Login</h1>
        <Form
          validationBehavior="native"
          onSubmit={handleClickLoginButton}
          className="flex flex-col items-center justify-center w-full gap-8 mt-4"
          //onSubmit={login}
        >
          <Input
            isRequired
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
            isRequired
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
            isLoading={loading}
            color="primary"
            type="submit"
            variant="flat"
            className="w-full py-6 mt-1"
          >
            Login
          </Button>
        </Form>

        {/* <div className="flex justify-center mt-5">
          <div
            id="g_id_onload"
            data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            data-context="signup"
            data-nonce=""
            data-ux_mode="popup"
            data-callback={handleSignInWithGoogle}
            data-itp_support="true"
            data-use_fedcm_for_prompt="true"
          ></div>

          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="filled_blue"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </div> */}

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
        <Divider className="mt-5" />
        <Button
          color="primary"
          onPress={handleGoogleLoginButton}
          className="w-full py-6 mt-8 rounded-xl"
          startContent={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      </div>
      <OneTapComponent />
    </div>
  );
};

export default Page;
