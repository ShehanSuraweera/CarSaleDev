"use client";
import { Button } from "@heroui/button";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUser } from "../UserContext";
import toast from "react-hot-toast";

const SeconderyNavBar = () => {
  const { user, loading } = useUser();

  const handleSellButton = () => {
    router.push("/sell");
    if (!user && !loading) {
      toast.error("Please login to post an ad");
    }
  };

  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="flex flex-row justify-center w-full gap-5 mt-2 ">
      {pathName !== "/profile" && (
        <Button color="warning" onPress={handleSellButton}>
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
