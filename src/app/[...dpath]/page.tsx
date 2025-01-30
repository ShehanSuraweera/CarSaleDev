"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
      Loading...
      <Loader2 className=" animate-spin"></Loader2>
    </div>
  );
};

export default Page;
