"use client";
import { Button } from "@heroui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const SeconderyNavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="flex flex-row justify-center w-full gap-5 mt-2 ">
      {pathName !== "/profile" && (
        <Button
          color="warning"
          onPress={() => {
            router.push("/sell");
          }}
        >
          POST FREE
        </Button>
      )}

      {pathName !== "/buy" && (
        <Button
          color="primary"
          variant="ghost"
          onPress={() => {
            router.push("/buy");
          }}
        >
          BUY
        </Button>
      )}
    </div>
  );
};

export default SeconderyNavBar;
