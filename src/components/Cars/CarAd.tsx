// components/CarAd.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { fetchAd } from "@/src/lib/api";
import { Bars } from "react-loader-spinner";
import { AdData } from "@/src/types";
import Ad from "../Ad";
import AdSkeleton from "../AdSkeleton";

interface CarAdProps {
  ad_id: string;
}

const CarAd: React.FC<CarAdProps> = ({ ad_id }) => {
  const [adData, setAdData] = useState<AdData>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleAd = useCallback(async () => {
    setLoading(true);
    const vehicleAd = await fetchAd(ad_id);
    setAdData(vehicleAd || null);
    setLoading(false);
  }, [ad_id]); // Make sure to include `ad_id` in the dependency array

  useEffect(() => {
    handleAd();
  }, [handleAd]); // Use the memoized function here

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <AdSkeleton />
      </div>
    );
  }
  if (!adData) {
    return null; // Ensures a valid return type instead of undefined
  }

  return <Ad adData={adData} />;
};

export default CarAd;
