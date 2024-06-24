"use client";

import React, { useEffect, useRef, useState } from "react";
import SmallAd from "./SmallAd";
import { DEMO_DATA } from "./data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SmallAdsRowProps {
  topic: string;
}

const SmallAdsRow = ({ topic }: SmallAdsRowProps) => {
  const [cars, setCars] = useState([]);
  const getCarsFromBackend = async () => {};

  useEffect(() => {
    getCarsFromBackend();
  }, []);

  return (
    <div className="pt-4 sm:pt-12">
      <div>
        <h1 className="text-lg font-bold text-center mb:0 sm:mb-2">{topic}</h1>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          pagination={false}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 1,
            },
            575: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 5,
            },
            1199: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          className=" h-[200px] sm:h-[250px] w-full"
        >
          {DEMO_DATA.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!flex justify-center items-center  "
            >
              <SmallAd
                make={item.make}
                model={item.modle}
                price={item.price}
                image={item.url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SmallAdsRow;
