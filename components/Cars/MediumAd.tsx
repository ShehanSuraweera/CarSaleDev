import React from "react";
import Image, { StaticImageData } from "next/image";
import allion240 from "../../images/Allion240.jpg";
import enginepic from "../../icons/engine.svg";
import mileagepic from "../../icons/mileage.svg";
import bodytypepic from "../../icons/bodytypepic.svg";
import transmissionpic from "../../icons/transmissionpic.svg";
import fuelpic from "../../icons/fuelpic.svg";

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
}: MediumAdProps) => {
  return (
    <div className=" mb-7  shadow-md w-[182px] sm:w-[270px] md:w-[360px] lg:w-[400px] h-auto rounded-lg   flex flex-col justify-center items-center hover:cursor-pointer  ">
      <Image
        className="w-[85%] rounded-md  mt-2 "
        src={image}
        alt={make + modle}
      ></Image>
      <div className=" mt-1 font-semibold sm:text-lg   text-xs text-[#130F40]">
        {make}
      </div>
      <div className=" font-medium sm:text-lg text-xs text-[#130F40]">
        {modle + " " + manufacture}
      </div>

      <div className=" w-[100%] h-full bg-slate-50  mt-1  rounded-md py-2 items-center justify-center flex flex-col">
        <div className=" text-xs sm:text-sm md:text-base lg:text-lg text-[#2980b9]  w-full text-center font-semibold">
          {price}
        </div>
        <div className="  mt-2 md:mt-4  flex justify-between sm:justify-around   gap-y-1 sm:gap-y-2 md:gap-y-4  sm:gap-x-12 text-[#847E7E]   items-center  flex-wrap w-[95%]">
          <div className="sm:text-sm text-xs  flex float-start items-center gap-1 sm:gap-2">
            <Image
              src={mileagepic}
              className=" w-3 sm:w-5"
              alt="mileage"
            ></Image>
            {mileage}
          </div>
          <div className="sm:text-sm text-xs    flex justify-start items-center sm:gap-2 gap-1">
            <Image
              src={bodytypepic}
              alt="bodytype"
              className="sm:w-5 w-3"
            ></Image>
            {bodyType}
          </div>
          <div className="sm:text-sm text-xs   sm:gap-2 gap-1 flex items-center justify-start">
            <Image
              src={transmissionpic}
              alt="transmission"
              className="sm:w-5 w-3 "
            ></Image>
            {transmission}
          </div>
          <div className="sm:text-sm text-xs   flex items-center justify-start sm:gap-2 gap-1">
            <Image src={fuelpic} alt="fueltype" className="sm:w-5 w-3"></Image>
            {fuel}
          </div>
          <div className="sm:text-sm text-xs  hidden sm:flex  justify-start items-center gap-2">
            <Image src={enginepic} alt="engine" className="w-5"></Image>
            {engine}
          </div>
          <div className="flex items-center  justify-between w-[100%] text-[#130F40] mt-2  sm:text-sm text-xs  ">
            <div>Colombo</div>
            <div>1 hour</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumAd;
