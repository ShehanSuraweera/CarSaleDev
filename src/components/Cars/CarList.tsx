"use client";

import MediumAd from "./MediumAd";
import { motion } from "framer-motion";
import { AdData } from "@/src/types"; // Assuming you have a Car type defined
import { Bars } from "react-loader-spinner";
import { Skeleton } from "@heroui/react";
import MediumAdSkeleton from "../MediumAdSkeleton";

const CarList: React.FC<{
  cars: AdData[];
  loading: boolean;
  error: string | null;
}> = ({ cars, loading, error }) => {
  const Skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "backIn", duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center justify-center w-full sm:gap-x-6 gap-x-2">
        {loading &&
          Skeletons.map((skeleton) => <MediumAdSkeleton key={skeleton} />)}
        {cars.map((car) => (
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
  );
};

export default CarList;
