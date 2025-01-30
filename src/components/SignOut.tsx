import { Button } from "@heroui/button";
import { Loader2, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { signOutAction } from "../actions/users";
import toast from "react-hot-toast";
import { useUser } from "../UserContext";

function SignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { supabaseBrowserClient } = useUser();

  const handleClickSignOutButton = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      const { error } = await supabaseBrowserClient.auth.signOut();
      if (errorMessage || error) {
        toast.error(errorMessage || error.message);
      } else {
        toast.success("Successfully signed out");
        router.push("/");
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
