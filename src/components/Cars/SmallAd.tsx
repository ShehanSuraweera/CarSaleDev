import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import LikeButton from "../LikeButton";

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

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div
      className="flex flex-col hover:shadow-2xl items-center justify-center w-full  h-[200px] sm:h-[220px] md:h-[310px] gap-4 px-0 pt-4 mx-1 mb-4  rounded-md shadow-md  hover:cursor-pointer"
      onClick={handleAd}
    >
      <div className="absolute top-0 right-0 z-10 flex gap-2 bg-white rounded-lg sm:p-2 dark:bg-black sm:dark:bg-transparent ">
        <LikeButton adId={ad_id} />
      </div>
      <Image
        className=" w-[80%] block sm:w-[90%]  sm:h-[100px] md:h-[140px]  h-[80px]  rounded-md p-0 object-cover "
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
        <h3 className=" text-[#8b8787] text-sm md:text-sm">
          {price === "" || !price
            ? "Negotiable"
            : `Rs. ${formatNumber(Number(price))}`}
        </h3>
      </div>
    </div>
  );
};

export default SmallAd;
