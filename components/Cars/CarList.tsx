"use client";
import React, { useEffect, useState } from "react";
import MediumAd from "./MediumAd";
import { fetchAds } from "@/lib/api";

const CarList = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const getCarsFromBackend = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCars = await fetchAds(); // Fetch the data
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
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center w-full sm:gap-x-6 gap-x-2">
      {cars.map((car) => (
        <div key={car.ad_id}>
          <MediumAd
            image={car.ad_images[0].image_url}
            bodyType={car.body_type}
            make={car.make}
            modle={car.model}
            manufacture={car.build_year}
            mileage={car.mileage}
            fuel={car.fuel_type}
            price={car.price}
            engine={car.engine}
            transmission={car.transmission}
            id={car.ad_id}
            location={car.ad_location}
          />
        </div>
      ))}
    </div>
  );
};

export default CarList;
