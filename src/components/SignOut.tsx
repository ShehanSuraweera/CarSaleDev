"use client";
import { Button } from "@heroui/button";
import { Loader2, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { signOutAction } from "../actions/users";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { clearUser } from "../redux/features/user/userSlice";
import { resetAdIds } from "../redux/features/ad/likedAdSlice";

function SignOut() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = () => {
    startTransition(async () => {
      try {
        // Clear user state in Redux

        const { errorMessage } = await signOutAction();

        if (errorMessage) {
          toast.error(errorMessage);
        }
        dispatch(clearUser());
        dispatch(resetAdIds());

        // Show success message
        toast.success("Successfully signed out");

        // Redirect to home page
        router.push("/");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || "Failed to sign out");
        } else {
          toast.error("Failed to sign out");
        }
      }
    });
  };

  return (
    <Button
      className=""
      color="danger"
      startContent={<UserIcon />}
      variant="bordered"
      disabled={isPending}
      onPress={handleClickSignOutButton}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Log out"}
    </Button>
  );
}

export default SignOut;
