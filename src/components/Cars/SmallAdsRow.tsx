"use client";

import React, { useEffect, useRef, useState } from "react";
import SmallAd from "./SmallAd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchTrendingAds } from "@/src/lib/api";

interface SmallAdsRowProps {
  topic: string;
  make: string;
  type: string;
}

const SmallAdsRow = ({ topic, make, type }: SmallAdsRowProps) => {
  const [cars, setCars] = useState<any[]>([]); // Holds the fetched car ads
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const getCarsFromBackend = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCars = await fetchTrendingAds(make, type); // Fetch the data
      setCars(fetchedCars); // Update state with the fetched cars
    } catch (err: any) {
      console.error("Error fetching ads:", err);
      setError(err.message || "Failed to load ads");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    getCarsFromBackend();
  }, [make]);

  return (
    <div className="pt-4 sm:pt-12">
      <div>
        {cars.length > 0 && (
          <h1 className="mb-4 text-lg font-bold text-center sm:mb-2">
            {topic}
          </h1>
        )}
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
              slidesPerView: 1,
              spaceBetween: 3,
            },
            575: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          className="w-full h-full h-"
        >
          {cars.map((car) => (
            <SwiperSlide
              key={car.ad_id}
              className="!flex justify-center items-center  "
            >
              <SmallAd
                make={car.make}
                model={car.model}
                price={car.price}
                image={car.ad_images[0].image_url}
                ad_id={car.ad_id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SmallAdsRow;
