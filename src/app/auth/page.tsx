"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useUser } from "@/src/UserContext";

function UserConfirm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const [status, setStatus] = useState("Confirming...");
  const { supabaseBrowserClient } = useUser();

  useEffect(() => {
    const confirmUser = async () => {
      if (!tokenHash || type !== "signup") {
        setStatus("Invalid or missing confirmation token.");
        return;
      }

      try {
        const { auth } = await supabaseBrowserClient();

        const { error } = await auth.verifyOtp({
          type: "signup",
          token_hash: tokenHash,
        });

        if (error) {
          setStatus("Error confirming signup: " + error.message);
        } else {
          setStatus("Signup confirmed! Redirecting...");
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (err) {
        setStatus("Something went wrong.");
      }
    };

    confirmUser();
  }, [tokenHash, type, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">{status}</p>
    </div>
  );
}

export default function Page() {
  <Suspense>
    <UserConfirm />
  </Suspense>;
}
