"use client";

import React, { useEffect, useRef, useState } from "react";
import SmallAd from "./SmallAd";
import { fetchTrendingAds } from "@/src/lib/api";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Marquee from "react-fast-marquee";
import { Bars } from "react-loader-spinner";

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
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="pt-4 sm:pt-12">
        <div>
          {cars.length > 0 && (
            <h1 className="mb-4 text-lg font-bold text-center sm:mb-2">
              {topic}
            </h1>
          )}
        </div>
        {loading ? (
          <div className="flex items-center justify-center w-full h-full p-5 ">
            <div>
              <Bars color="#fbc531" height={50} width={50} />
            </div>
          </div>
        ) : (
          <div>
            <Marquee gradient={false} speed={20}>
              {cars.map((car) => (
                <div
                  key={car.ad_id}
                  className="!flex justify-center items-center w-40 h-70 md:w-52 md:h-80 lg:w-60 lg:h-96"
                >
                  <SmallAd
                    make={car.make}
                    model={car.model}
                    price={car.price}
                    image={
                      car.ad_images[0]?.image_url || "/images/no-image.png"
                    }
                    ad_id={car.ad_id}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SmallAdsRow;
