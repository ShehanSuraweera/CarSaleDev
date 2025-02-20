import React from "react";
import Image from "next/image";
import enginepic from "../../assets/icons/engine.svg";
import mileagepic from "../../assets/icons/mileage.svg";
import bodytypepic from "../../assets/icons/bodytypepic.svg";
import transmissionpic from "../../assets/icons/transmissionpic.svg";
import fuelpic from "../../assets/icons/fuelpic.svg";
import { usePathname, useRouter } from "next/navigation";
import TimeAgo from "../TimeAgo";
import { Button } from "@heroui/button";
import { Divider, useDisclosure } from "@heroui/react";
import { MediumAdProps } from "@/src/types";
import ConfirmationModal from "../ConfirmationModal";
import { deleteAd } from "@/src/lib/api";
import toast from "react-hot-toast";

const MediumAd = ({
  frame_code,
  make,
  modle,
  mileage,
  engine,
  fuel,
  transmission,
  manufacture,
  price,
  bodyType,
  image,
  id,
  location,
  created_at,
}: MediumAdProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const handleAd = () => {
    router.push(`/vehicle/${id}`);
  };

  const handleEditAdButtton = () => {
    router.push(`/ad-edit/${id}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  function formatKilometers(value: number): string {
    return value.toLocaleString("en-US") + " km";
  }

  const deleteAdFunction = async () => {
    const res = await deleteAd(id);
    return res;
  };
  const handleConfirm = async () => {
    try {
      const result = await deleteAdFunction();
      if (result === "ad_deleted") {
        toast.success("Successfully deleted");
        router.refresh(); // Refresh the page to reflect the changes
      } else {
        toast.error("Failed to delete ad");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the ad");
    } finally {
      onClose();
    }
  };

  function removeParentheses(text: string): string {
    return text.replace(/\s*\(.*?\)\s*/g, "").trim();
  }

  function extractTextInsideParentheses(input: string): string | null {
    const match = input.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
  }

  return (
    <>
      <div className=" mb-7 relative   shadow-md mt-2 sm:mt-2 w-[325px] sm:w-[280px] overflow-hidden sm:h-[300px] md:w-[370px] md:h-[340px] h-[250px] lg:w-[400px] dark:bg-[#000B17]  rounded-lg   flex flex-col justify-center items-center hover:cursor-pointer  ">
        {pathname === "/profile" && (
          <div className="absolute top-0 right-0 z-10 flex gap-2 p-2 bg-white bg-opacity-100 rounded-lg">
            <Button
              size="sm"
              color="warning"
              variant="bordered"
              onPress={handleEditAdButtton}
            >
              Edit Ad
            </Button>
            <Button size="sm" color="danger" onPress={onOpen}>
              Delete Ad
            </Button>
          </div>
        )}

        <Image
          className="sm:w-[55%] w-[70%]  rounded-md object-cover  sm:h-[110px] h-[120px] mt-2 "
          src={image || "/images/no-image.png"}
          alt={make + modle}
          width={500}
          height={500}
          onClick={handleAd}
        />
        <div className=" mt-1 font-semibold md:text-lg   text-xs text-[#130F40] dark:text-[#FDC221]">
          {make}
        </div>
        <div className=" font-medium md:text-lg text-xs text-[#130F40] dark:text-[#FDC221]">
          {modle + " " + frame_code + " " + manufacture}
        </div>

        <div className=" w-[100%] h-[140px] sm:h-[150px] md:h-[160px] bg-slate-50 dark:bg-[#000E1E]  mt-1  rounded-md py-2 items-center justify-between flex flex-col">
          <div className=" text-xs sm:text-sm md:text-base lg:text-lg text-[#2980b9]  w-full text-center font-semibold">
            {price === "" || !price
              ? "Negotiable"
              : `Rs. ${formatNumber(Number(price))}`}
          </div>
          <div className="  mt-2 md:mt-4  flex justify-between sm:justify-around   gap-y-1 sm:gap-y-2 md:gap-y-4  sm:gap-x-12 text-[#847E7E]   items-center  flex-wrap w-[95%]">
            <div className="flex items-center gap-1 text-xs md:text-sm float-start sm:gap-2">
              <Image
                src={mileagepic}
                className="w-3 sm:w-5"
                alt="mileage"
              ></Image>
              {mileage && formatKilometers(Number(mileage))}
            </div>
            <div className="flex items-center justify-start gap-1 text-xs md:text-sm sm:gap-2">
              <Image
                src={bodytypepic}
                alt="bodytype"
                className="w-3 sm:w-5"
              ></Image>
              {bodyType}
            </div>
            <div className="flex items-center justify-start gap-1 text-xs md:text-sm sm:gap-2">
              <Image
                src={transmissionpic}
                alt="transmission"
                className="w-3 sm:w-5 "
              ></Image>
              {extractTextInsideParentheses(transmission)}
            </div>
            <div className="flex items-center justify-start gap-1 text-xs md:text-sm sm:gap-2">
              <Image
                src={fuelpic}
                alt="fueltype"
                className="w-3 sm:w-5"
              ></Image>
              {fuel && removeParentheses(fuel)}
            </div>
            <div className="items-center justify-start hidden gap-2 text-xs md:text-sm sm:flex">
              <Image src={enginepic} alt="engine" className="w-5"></Image>
              {engine}
            </div>

            <div className="flex items-center  justify-between w-[100%] text-[#130F40] mt-2  md:text-sm text-xs  dark:text-slate-500 ">
              <div>{location}</div>
              <div>
                <TimeAgo createdAt={created_at || ""} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {pathname === "/profile" && (
        <>
          <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleConfirm}
            title="Delete ad"
            message="Are you sure you want to delete this ad? This action cannot be undone, and all data associated with this ad will be permanently removed."
            confirmText="Yes, Delete"
            cancelText="No, Keep It"
            backdrop="blur"
          />
        </>
      )}
    </>
  );
};

export default MediumAd;
