"use client";

import InputImages from "@/src/components/InputImages";
import OwnerDetails from "@/src/components/OwnerDetails";
import PriceHandle from "@/src/components/PriceHandle";
import VehicleAbout from "@/src/components/VehicleAbout";
import VehicleBackground from "@/src/components/VehicleBackground";
import { fetchAd } from "@/src/lib/api";
import { setAdData, updateField } from "@/src/redux/features/ad/adFormSlice";
import { AdData } from "@/src/types";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import AdPreviewButton from "@/src/components/AdPreviewButton";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { ad_id } = useParams();

  // async function convertImagesToBlobUrls(imageUrls: string[]) {
  //   const blobUrls = await Promise.all(
  //     imageUrls.map(async (url) => {
  //       const response = await fetch(url);
  //       const blob = await response.blob();
  //       return URL.createObjectURL(blob);
  //     })
  //   );
  //   return blobUrls;
  // }

  const fetchAdData = useCallback(async () => {
    if (!ad_id) return;
    setLoading(true);
    try {
      const vehicleAd = await fetchAd(ad_id as string);

      vehicleAd.images = [];
      // const blobUrls = await convertImagesToBlobUrls(vehicleAd.images);

      // // Create a new object instead of modifying the original one
      // const updatedVehicleAd = { ...vehicleAd, images: blobUrls };

      // console.log("updatedVehicleAd", updatedVehicleAd);

      // if (updatedVehicleAd) {
      //   dispatch(setAdData(updatedVehicleAd));
      // }

      if (vehicleAd) {
        dispatch(setAdData(vehicleAd));
      }
    } catch (error) {
      console.error("Error fetching ad data:", error);
    }
    setLoading(false);
  }, [ad_id]);

  useEffect(() => {
    fetchAdData();
  }, [fetchAdData]);

  const handleChange = (field: keyof AdData, value: any) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <div className="container w-full mx-0 my-3 rounded-lg sm:my-2 md:px-12 sm:p-6 xl:px-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <OwnerDetails />
          <VehicleAbout />
          <VehicleBackground />
          <PriceHandle />
          <InputImages />
          <AdPreviewButton />
        </>
      )}
    </div>
  );
}
