"use client";

import React, { useCallback, useEffect, useState } from "react";
import SmallAd from "./SmallAd";
import { fetchTrendingAds, getAllMakes } from "@/src/lib/api";
import { motion } from "framer-motion";
import SmallAdSkeleton from "../SmallAdSkeleton";
import { Button } from "@heroui/button";
import { ArrowLeftCircle, Link, MoveLeftIcon } from "lucide-react";
import { useSearch } from "@/src/providers/SearchProvider";
import { useRouter } from "next/navigation";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import LoadingOverlay from "../LoadingOverlay";

interface SmallAdsRowProps {
  topic: string;
  make_id: string;
  vehicle_type_id: string;

  make_name: string;
}

const SmallAdsRow = ({
  topic,
  make_id,
  vehicle_type_id,
  make_name,
}: SmallAdsRowProps) => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { filters, setFilters } = useSearch();
  const [isTransit, setIsTransit] = useState(false);
  const router = useRouter();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const getCarsFromBackend = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCars = await fetchTrendingAds(make_id, vehicle_type_id);
      setCars(fetchedCars);
    } catch (err: any) {
      console.error("Error fetching ads:", err);
      setError(err.message || "Failed to load ads");
    } finally {
      setLoading(false);
    }
  }, [make_id, vehicle_type_id]);

  useEffect(() => {
    getCarsFromBackend();
  }, [getCarsFromBackend]);

  const handleLinkClick = () => {
    setIsTransit(true);
    setFilters({
      ...filters,
      vehicle_type: {
        id: vehicle_type_id,
        name: "",
      },
      make: {
        id: make_id,
        name: make_name,
      },
    });
    router.push("/buy");
    setIsTransit(false);
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      {isTransit && <LoadingOverlay />}
      <div className="pt-4 sm:pt-12">
        {/* Title with button */}
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

        {/* Swiper (with manual drag and auto swipe) */}
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#ffffff",
              "--swiper-naigation-display": "none",
            } as React.CSSProperties
          }
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              if (index < 3) {
                return `<span class="${className}"></span>`;
              }
              return "";
            },
          }}
          grabCursor={true}
        >
          {loading
            ? skeletons.map((skeleton) => (
                <SwiperSlide key={skeleton} className="flex justify-center">
                  <SmallAdSkeleton />
                </SwiperSlide>
              ))
            : cars.map((car) => (
                <SwiperSlide key={car.ad_id} className="flex justify-center">
                  <SmallAd
                    make={car.models.makes.name}
                    model={car.models.name}
                    price={car.price}
                    image={
                      car.ad_images[0]?.image_url || "/images/no-image.png"
                    }
                    ad_id={car.ad_id}
                  />
                </SwiperSlide>
              ))}
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-next !rounded-full !w-10 !h-10  !items-center !justify-center !shadow-lg hover:!bg-gray-100 transition-colors !hidden"></div>
          <div className="swiper-button-prev !rounded-full !w-10 !h-10 !items-center !justify-center !shadow-lg hover:!bg-gray-100 transition-colors !hidden"></div>

          {/* Custom Pagination */}
          <div className="swiper-pagination !relative !mt-6 !flex !justify-center !gap-2" />
        </Swiper>
      </div>
    </motion.div>
  );
};

export default SmallAdsRow;
