"use client";

import MediumAd from "./MediumAd";
import { motion } from "framer-motion";

import { Car } from "@/src/types"; // Assuming you have a Car type defined
import { Bars } from "react-loader-spinner";

const CarList: React.FC<{
  cars: Car[];
  loading: boolean;
  error: string | null;
}> = ({ cars, loading, error }) => {
  if (loading) {
    return (
      <div className="z-50 flex items-center justify-center w-full h-screen p-20 sm:h-full">
        <Bars color="#fbc531" height={50} width={50} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <div className="flex flex-wrap items-center justify-center w-full sm:gap-x-6 gap-x-2">
        {cars.map((car) => (
          <div key={car.ad_id}>
            <MediumAd
              image={car.ad_images[0]?.image_url || "/images/no-image.png"}
              bodyType={car.body_type}
              frame_code={car.frame_code}
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
    </motion.div>
  );
};

export default CarList;
