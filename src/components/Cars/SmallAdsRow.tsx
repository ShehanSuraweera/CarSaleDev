"use client";

import React, { useCallback, useEffect, useState } from "react";
import SmallAd from "./SmallAd";
import { fetchTrendingAds } from "@/src/lib/api";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Marquee from "react-fast-marquee";
import { Bars } from "react-loader-spinner";
import { Button } from "@heroui/button";
import { Link, Link2Off } from "lucide-react";
import { useSearch } from "@/src/providers/SearchProvider";
import { useRouter } from "next/navigation";
import SmallAdSkeleton from "../SmallAdSkeleton";

interface SmallAdsRowProps {
  topic: string;
  make_id: string;
  vehicle_type_id: string;
}

const SmallAdsRow = ({ topic, make_id, vehicle_type_id }: SmallAdsRowProps) => {
  const [cars, setCars] = useState<any[]>([]); // Holds the fetched car ads
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { filters, setFilters } = useSearch();
  const router = useRouter();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const getCarsFromBackend = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCars = await fetchTrendingAds(make_id, vehicle_type_id); // Fetch the data
      setCars(fetchedCars); // Update state with the fetched cars
    } catch (err: any) {
      console.error("Error fetching ads:", err);
      setError(err.message || "Failed to load ads");
    } finally {
      setLoading(false); // Stop loading
    }
  }, [make_id, vehicle_type_id]);

  useEffect(() => {
    getCarsFromBackend();
  }, [getCarsFromBackend]);

  const handleLinkClick = () => {
    setFilters({
      ...filters,
      vehicle_type: { id: vehicle_type_id, name: "" },
      make: { id: make_id, name: "" },
    });
    router.push("/buy");
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="pt-4 sm:pt-12">
        {loading && (
          <Marquee gradient={false} speed={20}>
            {skeletons.map((skeleton) => (
              <div
                key={skeleton}
                className="!flex justify-center items-center w-40 h-70 md:w-52 md:h-80 lg:w-60 lg:h-96"
              >
                <SmallAdSkeleton />
              </div>
            ))}
          </Marquee>
        )}
        <div>
          {cars.length > 0 && (
            <h1 className="mb-4 text-lg font-bold text-center sm:mb-2">
              <Button
                variant="light"
                color="primary"
                className="text-lg font-bold"
                onPress={handleLinkClick}
              >
                {topic}
                <Link />
              </Button>
            </h1>
          )}
        </div>

        <div>
          <Marquee gradient={false} speed={20}>
            {cars.map((car) => (
              <div
                key={car.ad_id}
                className="!flex justify-center items-center w-40 h-70 md:w-52 md:h-80 lg:w-60 lg:h-96"
              >
                <SmallAd
                  make={car.models.makes.name}
                  model={car.models.name}
                  price={car.price}
                  image={car.ad_images[0]?.image_url || "/images/no-image.png"}
                  ad_id={car.ad_id}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </motion.div>
  );
};

export default SmallAdsRow;
