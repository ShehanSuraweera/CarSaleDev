import React from "react";
import BMW_i7 from "../../images/2024-bmw-i7.jpg";
import Image, { StaticImageData } from "next/image";

interface SmallAdProps {
  make: string;
  model: string;
  price: string;
  image: string | StaticImageData;
}

const SmallAd = ({ make, price, image, model }: SmallAdProps) => {
  return (
    <div className=" mb-2 px-0 mx-1  pt-4  w-[250px] h-auto shadow-md  rounded-md flex justify-center flex-col items-center gap-4 hover:cursor-pointer  ">
      <Image className=" w-[80%] rounded-md p-0 " src={image} alt="BMW 2024" />
      <div className="flex flex-col items-center justify-end p-1">
        <h2 className=" font-semibold text-[#130F40] text-[10px] md:text-sm dark:text-white">
          {make}
        </h2>
        <h2 className=" font-semibold text-[#130F40] text-[10px] md:text-sm dark:text-white">
          {model}
        </h2>
        <h3 className=" text-[#8b8787] text-xs md:text-sm">{price}</h3>
      </div>
    </div>
  );
};

export default SmallAd;
