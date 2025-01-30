"use client";
import Search from "@/src/components/Search";
import SmallAdsRow from "@/src/components/Cars/SmallAdsRow";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import hideSearch from "@/src/assets/icons/hide-arrow.png";
import Image from "next/image";
import { SearchIcon } from "../components/icons";
import sellVehicle from "@/src/assets/icons/sell-vehicles.png";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";
import toast from "react-hot-toast";
import WelcomeComponent from "../components/WelcomeComponent";

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleSearchButton = () => {
    router.push("/buy");
  };

  const handleSellVehicleButton = () => {
    if (!user && !loading) {
      toast.error("Please login to post an ad");
    }
    router.push("/sell");
  };

  return (
    <section className="">
      <Button
        color="warning"
        className="block w-full mt-2 capitalize sm:hidden "
        onPress={() => handleSearchButton()}
      >
        <div className="flex items-center justify-center gap-2">
          <div>
            <SearchIcon />
          </div>
          <div>search vehicles</div>
        </div>
      </Button>
      <Button
        color="success"
        className="block w-full mt-2 capitalize sm:hidden "
        onPress={() => handleSellVehicleButton()}
      >
        <div className="flex items-center justify-center gap-2">
          <div>
            <Image
              src={sellVehicle}
              alt="Sell Vehicle"
              width={24}
              height={24}
            />
          </div>
          <div>Sell Vehicles</div>
        </div>
      </Button>
      <div className="justify-center hidden w-full sm:block">
        <Search />
      </div>

      <WelcomeComponent />
      <SmallAdsRow topic="Trending Toyota Cars" make="Toyota" type="Cars" />
      <SmallAdsRow topic="Trending Honda Cars" make="Honda" type="Cars" />
      <SmallAdsRow topic="Trending Suzuki Cars" make="Suzuki" type="Cars" />
    </section>
  );
}
