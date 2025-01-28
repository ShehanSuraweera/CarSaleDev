import React from "react";
import Image, { StaticImageData } from "next/image";
import enginepic from "../../icons/engine.svg";
import mileagepic from "../../icons/mileage.svg";
import bodytypepic from "../../icons/bodytypepic.svg";
import transmissionpic from "../../icons/transmissionpic.svg";
import fuelpic from "../../icons/fuelpic.svg";
import { useRouter } from "next/navigation";

interface MediumAdProps {
  id: string;
  make: string;
  modle: string;
  mileage: string;
  engine: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  price: string;
  image: string | StaticImageData;
  manufacture: string;
  location: string;
}
const MediumAd = ({
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
}: MediumAdProps) => {
  const router = useRouter();

  const handleAd = () => {
    router.push(`/vehicle/${id}`);
  };

  return (
    <div className=" mb-7  shadow-md mt-2 sm:mt-10 w-full sm:w-[250px] overflow-hidden sm:h-[500px] md:w-[370px] md:h-[550px] h-[300px] lg:w-[400px] dark:bg-[#000B17]  rounded-lg   flex flex-col justify-center items-center hover:cursor-pointer  ">
      <Image
        className="w-[85%] rounded-md object-contain h-[60%]  mt-2 "
        src={image}
        alt={make + modle}
        width={500}
        height={500}
        onClick={handleAd}
      ></Image>
      <div className=" mt-1 font-semibold sm:text-lg   text-xs text-[#130F40]">
        {make}
      </div>
      <div className=" font-medium sm:text-lg text-xs text-[#130F40]">
        {modle + " " + manufacture}
      </div>

      <div className=" w-[100%] h-full bg-slate-50 dark:bg-[#000E1E]  mt-1  rounded-md py-2 items-center justify-center flex flex-col">
        <div className=" text-xs sm:text-sm md:text-base lg:text-lg text-[#2980b9]  w-full text-center font-semibold">
          Rs. {price}
        </div>
        <div className="  mt-2 md:mt-4  flex justify-between sm:justify-around   gap-y-1 sm:gap-y-2 md:gap-y-4  sm:gap-x-12 text-[#847E7E]   items-center  flex-wrap w-[95%]">
          <div className="flex items-center gap-1 text-xs sm:text-sm float-start sm:gap-2">
            <Image
              src={mileagepic}
              className="w-3 sm:w-5"
              alt="mileage"
            ></Image>
            {mileage}
          </div>
          <div className="flex items-center justify-start gap-1 text-xs sm:text-sm sm:gap-2">
            <Image
              src={bodytypepic}
              alt="bodytype"
              className="w-3 sm:w-5"
            ></Image>
            {bodyType}
          </div>
          <div className="flex items-center justify-start gap-1 text-xs sm:text-sm sm:gap-2">
            <Image
              src={transmissionpic}
              alt="transmission"
              className="w-3 sm:w-5 "
            ></Image>
            {transmission}
          </div>
          <div className="flex items-center justify-start gap-1 text-xs sm:text-sm sm:gap-2">
            <Image src={fuelpic} alt="fueltype" className="w-3 sm:w-5"></Image>
            {fuel}
          </div>
          <div className="items-center justify-start hidden gap-2 text-xs sm:text-sm sm:flex">
            <Image src={enginepic} alt="engine" className="w-5"></Image>
            {engine}
          </div>
          <div className="flex items-center  justify-between w-[100%] text-[#130F40] mt-2  sm:text-sm text-xs  ">
            <div>{location}</div>
            <div>1 hour</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumAd;
