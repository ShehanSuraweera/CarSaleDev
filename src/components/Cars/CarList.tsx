"use client";
import { Loader2 } from "lucide-react";
import MediumAd from "./MediumAd";

import { Car } from "@/src/types"; // Assuming you have a Car type defined

const CarList: React.FC<{
  cars: Car[];
  loading: boolean;
  error: string | null;
}> = ({ cars, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full ">
        <Loader2 className="w-10 h-0 text-[#F5A524] animate-spin" />
        <span className="ml-2 text-lg font-semibold text-[#F5A524]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center w-full sm:gap-x-6 gap-x-2">
      {cars.map((car) => (
        <div key={car.ad_id}>
          <MediumAd
            image={car.ad_images[0]?.image_url || "/images/no-image.png"}
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
            created_at={car.created_at}
          />
        </div>
      ))}
    </div>
  );
};

export default CarList;
