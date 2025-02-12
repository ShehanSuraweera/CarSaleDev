// components/CarAd.tsx
"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import { fetchAd } from "@/src/lib/api";
import { Loader2, LoaderPinwheel } from "lucide-react";
import { Bars, ThreeCircles } from "react-loader-spinner";
import { AdData } from "@/src/types";
import TimeAgo from "./TimeAgo";

interface AdProps {
  adData: AdData;
}

const Ad: React.FC<AdProps> = ({ adData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold">
        {adData?.build_year +
          " " +
          adData?.make +
          " " +
          adData?.model +
          " " +
          adData?.frame_code}
      </h1>

      <p className="text-gray-600 ">
        {adData?.owner_display_name + " - " + adData?.vehicle_condition}
      </p>
      <span className="text-sm text-gray-600">
        {adData?.cities?.districts?.name} district - {adData?.cities.name}
      </span>
      <div className="flex justify-end mb-4 text-xs">
        <TimeAgo createdAt={adData?.created_at || ""} />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full ">
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#2980b9",
                "--swiper-pagination-color": "#2980b9",
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={12}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-auto "
          >
            {adData?.ad_images.map(
              (image: { image_url: string; created_at: string }) => (
                <SwiperSlide
                  key={image.created_at}
                  className="flex items-center justify-center text-xl text-center"
                >
                  <Image
                    id={image.created_at}
                    src={
                      image.image_url === "" || !image.image_url
                        ? "/images/no-image.png"
                        : image.image_url
                    }
                    alt={image.image_url}
                    width={500}
                    height={500}
                    className="block w-full h-[250px]  sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-contain  rounded-xl   px-2 py-1 mb-2"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={4}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full mt-4 h-auto md:mb-5 pb-2 xl:w-[85%]"
          >
            {adData?.ad_images.map(
              (image: { image_url: string; created_at: string }) => (
                <SwiperSlide
                  key={image.created_at}
                  className=" swiper-slide-thumb-active"
                >
                  <Image
                    id={image.created_at}
                    src={
                      image.image_url === "" || !image.image_url
                        ? "/images/no-image.png"
                        : image.image_url
                    }
                    alt={image.image_url}
                    width={500}
                    height={500}
                    className="block w-full h-[60px] sm:h-[70px] lg:h-[90px] xl:h-[100px] object-contain hover:cursor-pointer mb-1   p-1 shadow-md rounded-md"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
        <div className="w-full mt-4 lg:mt-0 xl:px-10">
          <div className="flex justify-between w-full gap-2 text-white rounded-md ">
            <div className="font-semibold text-lg mb-2 bg-[#130F40] w-1/2 p-2 text-center rounded-xl shadow-md">
              {adData?.owner_contact}
              <div
                className={`text-xs font-light ${
                  adData?.is_negotiable ? "block" : "hidden"
                }`}
              >
                Call
              </div>
            </div>
            <div className="flex flex-col w-1/2 p-2 mb-2 text-lg font-semibold text-center shadow-md bg-slate-500 rounded-xl">
              {adData?.price === "" || !adData?.price
                ? "Negotiable"
                : `Rs. ${formatNumber(Number(adData?.price))}`}
              <div className="text-xs font-light ">
                {adData?.is_negotiable && adData?.price && "(Negotiable)"}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-1 mt-4 text-sm md:text-base gap-x-4">
            <p className="mb-1">
              <strong>Odometer : </strong> {adData?.mileage} km
            </p>
            <p className="mb-1">
              <strong>Body type : </strong> {adData?.body_type}
            </p>
            <p className="mb-1">
              <strong>Engine : </strong> {adData?.engine}
            </p>
            <p className="mb-1">
              <strong>Transmission : </strong> {adData?.transmission}
            </p>
            <p className="mb-1">
              <strong>Fuel Type : </strong> {adData?.fuel_type}
            </p>
            <p className="mb-1">
              <strong>YOM : </strong> {adData?.build_year}
            </p>
            <p className="mb-1">
              <strong>YOR : </strong> {adData?.reg_year}
            </p>
            <p className="mb-1">
              <strong>Make : </strong> {adData?.make}
            </p>
            <p className="mb-1">
              <strong>Model : </strong>
              {adData?.model + " " + adData?.frame_code}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-6 xl:px-10 md:text-base">
        <h3 className="mb-2 font-semibold">Owner Comments</h3>
        <pre className="w-full overflow-hidden text-sm break-words whitespace-pre-wrap md:text-base text-ellipsis">
          {adData?.owner_comments}
        </pre>
      </div>
      <div className="flex justify-end mt-4 text-sm">
        <span>{adData?.views} views</span>
      </div>
    </>
  );
};

export default Ad;
