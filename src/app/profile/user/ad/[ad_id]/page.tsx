"use client";
import React, { useEffect, useState } from "react";
import { AdData } from "@/src/types";
import { fetchAd } from "@/src/lib/api";
import AdSkeleton from "@/src/components/AdSkeleton";
import Ad from "@/src/components/Ad";
import SmallAdsRow from "@/src/components/Cars/SmallAdsRow";
import NavTabs from "../../../NavTabs";

interface CarAdProps {
  params: Promise<{ ad_id: string }>;
}

export default function Page({ params }: CarAdProps) {
  const unwrappedParams = React.use(params); // Unwrap params using React.use()
  const ad_id = unwrappedParams.ad_id;

  const [adData, setAdData] = useState<AdData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAd = async () => {
      setLoading(true);
      try {
        const vehicleAd = await fetchAd(ad_id);
        setAdData(vehicleAd);
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
      setLoading(false);
    };

    handleAd();
  }, [ad_id]);

  return (
    <div className="flex-1 p-4">
      <NavTabs />
      <div className="container w-full mx-0  rounded-lg  ">
        <div className="px-2 py-2 mb-5 bg-white rounded-md shadow-md sm:py-5 dark:bg-slate-950 sm:px-10 lg:px-24">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full ">
              <AdSkeleton />
            </div>
          ) : adData ? (
            <Ad adData={adData} />
          ) : (
            <p className="text-center text-gray-500">Ad not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
