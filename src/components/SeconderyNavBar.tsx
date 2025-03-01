"use client";
import { Button } from "@heroui/button";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SeconderyNavBar = () => {
  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );

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
