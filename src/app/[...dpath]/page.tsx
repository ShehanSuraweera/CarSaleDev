"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import LoadingOverlay from "@/src/components/LoadingOverlay";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 1000); // Redirect after 3 seconds

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [router]);

  return (
    <div>
      <LoadingOverlay />
    </div>
  );
};

export default Page;
