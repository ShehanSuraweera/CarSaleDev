"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useUser } from "@/src/UserContext";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import LoadingOverlay from "@/src/components/LoadingOverlay";

function UserConfirm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const [status, setStatus] = useState("Confirming...");
  const { supabaseBrowserClient } = useUser();

  useEffect(() => {
    const confirmUser = async () => {
      if (!token_hash || type !== "signup") {
        setStatus("Invalid or missing confirmation token.");
        return;
      }

      try {
        const supabase = supabaseBrowserClient(); // Call the function to get the client
        const { error } = await supabase.auth.verifyOtp({
          type: "signup",
          token_hash: token_hash,
        });

        if (error) {
          setStatus("Error confirming signup: " + error.message);
        } else {
          toast.success("Signup confirmed! Redirecting...");
          setStatus("Signup confirmed! Redirecting...");
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (err) {
        toast.error("Something went wrong. Redirecting...");
        setStatus("Something went wrong.! Redirecting...");
        setTimeout(() => router.push("/register"), 2000);
      }
    };

    confirmUser();
  }, [token_hash, type, router, supabaseBrowserClient]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="animate-spin" />
      <p className="text-lg">{status}</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <LoadingOverlay />
        </div>
      }
    >
      <UserConfirm />
    </Suspense>
  );
}
