// components/CarAd.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Allion240 from "../../images/Allion240.jpg";
import Allion240_1 from "../../images/240_1.jpg";
import Allion240_2 from "../../images/240_2.jpg";
import Allion240_3 from "../../images/240_3.jpg";
import Allion240_4 from "../../images/240_4.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";

const images = [
  { src: Allion240, alt: "allion", id: "1" },
  { src: Allion240_1, alt: "allion_1", id: "2" },
  { src: Allion240_2, alt: "allion_2", id: "3" },
  { src: Allion240_3, alt: "allion_3", id: "4" },
  { src: Allion240_4, alt: "allion_4", id: "5" },
];

const CarAd: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="container w-full mx-0 my-0 rounded-lg sm:my-2 md:px-12 sm:p-6 xl:px-40">
      <div className="px-2 py-2 bg-white rounded-md shadow-md sm:py-5 dark:bg-slate-900 sm:px-10 lg:px-24 ">
        <h1 className="mb-2 text-2xl font-semibold">2003 Toyota Allion 240</h1>
        <p className="mb-4 text-gray-600">Auto Car Sales - Used - Colombo</p>
        <div className="flex justify-end mb-4 text-xs">
          <span>57 minutes ago</span>
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
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center text-xl text-center"
                >
                  <Image
                    id={image.id}
                    src={image.src}
                    alt={image.alt}
                    className="block w-full h-[250px]  sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-contain  rounded-xl   px-2 py-1 mb-2"
                  />
                </SwiperSlide>
              ))}
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
              {images.map((image, index) => (
                <SwiperSlide key={index} className=" swiper-slide-thumb-active">
                  <Image
                    id={image.id}
                    src={image.src}
                    alt={image.alt}
                    className="block w-full h-[60px] sm:h-[70px] lg:h-[90px] xl:h-[100px] object-contain hover:cursor-pointer mb-1   p-1 shadow-md rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full mt-4 lg:mt-0 xl:px-10">
            <div className="flex justify-between w-full gap-2 text-white rounded-md ">
              <div className="font-semibold text-lg mb-2 bg-[#130F40] w-1/2 p-2 text-center rounded-xl shadow-md">
                0774499551
              </div>
              <div className="w-1/2 p-2 mb-2 text-lg font-semibold text-center shadow-md bg-slate-500 rounded-xl">
                Rs. 9,000,000
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1 mt-4 text-sm md:text-base gap-x-4">
              <p className="mb-1">
                <strong>Odometer : </strong> 150,000 km
              </p>
              <p className="mb-1">
                <strong>Body type : </strong> Sedan
              </p>
              <p className="mb-1">
                <strong>Engine : </strong> 1.5L VVTi
              </p>
              <p className="mb-1">
                <strong>Transmission : </strong> Automatic
              </p>
              <p className="mb-1">
                <strong>Fuel Type : </strong> Petrol
              </p>
              <p className="mb-1">
                <strong>YOM : </strong> 2010
              </p>
              <p className="mb-1">
                <strong>YOR : </strong> 2011
              </p>
              <p className="mb-1">
                <strong>Make : </strong> Toyota
              </p>
              <p className="mb-1">
                <strong>Model : </strong> Allion 240
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 xl:px-10 md:text-base">
          <h3 className="mb-2 font-semibold">Owner Comments</h3>
          <p className="text-sm md:text-base">
            TOYOTA ALLION G GRADE KV – XXXX HOME USED TOYOTA ALLION G GRADE
            2008//2013 MINT CONDITION CAR FOR SALE. • PUSH START • AUTOMATIC
            TRANSMISSION • 77.600 KM MILEAGE & EMISSION CERTIFICATE AVAILABLE •
            2ND OWNER • 1500 CC • DUAL MULTIFUNCTION STEERING WHEEL • SKY BLUE
            EXTERIOR • GRAY INTERIOR WITH TEAK PANEL • REAR WIPER • RETRACTABLE
            WINKER MIRRORS • FOG LAMPS • TV DVD REVERSE CAMERA 100% Running
            condition 100% Interior condition Leasing can be arranged within one
            day. Exchange also considered. Can be seen @ "Sameera Auto Traders"
            121A Pagoda Rd, Nugegoda 82/A, Pagoda Rd, Nugegoda 109, SUNETHRADEVI
            RD, KOHUWALA
          </p>
        </div>
        <div className="flex justify-end mt-4 text-sm">
          <span>365 views</span>
        </div>
      </div>
    </div>
  );
};

export default CarAd;
