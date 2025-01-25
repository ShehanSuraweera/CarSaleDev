import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface SmallAdProps {
  make: string;
  model: string;
  price: string;
  image: string | StaticImageData;
  ad_id: string;
}

const SmallAd = ({ make, price, image, model, ad_id }: SmallAdProps) => {
  const router = useRouter();
  const handleAd = async () => {
    router.push(`/vehicle/${ad_id}`);
  };

  return (
    <div className=" mb-2 px-0 mx-1  pt-4  w-[250px] h-auto shadow-md  rounded-md flex justify-center flex-col items-center gap-4 hover:cursor-pointer  ">
      <Image
        className=" w-[80%] rounded-md p-0 "
        width={500}
        height={500}
        src={image}
        alt="BMW 2024"
        onClick={handleAd}
      />

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
