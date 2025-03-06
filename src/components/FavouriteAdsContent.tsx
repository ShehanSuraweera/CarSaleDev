"use client";
import React, { SVGProps, useEffect, useState } from "react";
import { AdData } from "../types";
import { getLikedAds } from "../lib/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { motion } from "framer-motion";
import MediumAdSkeleton from "./MediumAdSkeleton";
import MediumAd from "./Cars/MediumAd";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const FavouriteAdsContent = () => {
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.user);
  const [ads, setAds] = useState<AdData[]>([]);
  const [isadsLoading, setIsAdsLoading] = useState(false);
  const router = useRouter();

  const Skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const getAdsFromBackend = async () => {
      if (!user) return;
      try {
        setIsAdsLoading(true);
        const fetchedAds = await getLikedAds(user.id);
        setAds(fetchedAds.ads);
      } catch (error: any) {
        setError(error.message || "Failed to load ads");
      } finally {
        setIsAdsLoading(false);
      }
    };

    getAdsFromBackend();
  }, [user]);

  return (
    <>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center justify-center w-full mt-4 sm:gap-x-6 gap-x-2">
          {isadsLoading &&
            Skeletons.map((skeleton) => <MediumAdSkeleton key={skeleton} />)}

          {/* No Results */}
          {!isadsLoading && ads.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-full mt-10">
              <div className="text-xl font-semibold text-center">
                <p className="text-center">Oops! No Favorite Ads Found</p>
              </div>
              <div className="mt-4 text-center">
                <p>
                  It looks like you haven't added any ads to your favorites yet.
                </p>
                <p>
                  Start exploring and save your favorite ads to see them here!
                </p>
              </div>
              <Button
                className="px-6 py-2 mt-6 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                onPress={() => {
                  router.push("/buy");
                }}
              >
                Explore Ads
              </Button>
            </div>
          )}
          {ads.map((car) => (
            <motion.div key={car.ad_id}>
              <MediumAd
                image={car.images?.[0] || "/images/no-image.png"}
                bodyType={car.body_type?.name}
                frame_code={car.frame_code}
                make={car.make?.name}
                modle={car.model?.name}
                manufacture={car.build_year}
                mileage={car.mileage}
                fuel={car.fuel_type.name}
                price={car?.price?.toString()}
                engine={car.engine}
                transmission={car.transmission_type?.name}
                id={car.ad_id}
                location={car?.city?.name}
                created_at={car.created_at}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default FavouriteAdsContent;
