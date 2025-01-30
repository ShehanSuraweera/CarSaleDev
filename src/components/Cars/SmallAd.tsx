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
    <div className="flex flex-col items-center justify-center w-full  h-[300px] md:h-[310px] gap-4 px-0 pt-4 mx-1 mb-4  rounded-md shadow-md  hover:cursor-pointer">
      <Image
        className=" w-[100%]  h-[70%]   rounded-md p-0 object-contain "
        width={500}
        height={500}
        src={image || "/images/no-image.png"}
        alt={make + " " + model}
        onClick={handleAd}
        loading="lazy"
      />

      <div className="flex flex-col items-center justify-end p-1">
        <h2 className=" font-semibold text-[#130F40] text-[14px] md:text-sm dark:text-white">
          {make}
        </h2>
        <h2 className=" font-semibold text-[#130F40] text-[14px] md:text-sm dark:text-white">
          {model}
        </h2>
        <h3 className=" text-[#8b8787] text-sm md:text-sm">Rs. {price}</h3>
      </div>
    </div>
  );
};

export default SmallAd;
