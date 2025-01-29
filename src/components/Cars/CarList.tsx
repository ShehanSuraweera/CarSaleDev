"use client";
import MediumAd from "./MediumAd";

import { Car } from "@/src/types"; // Assuming you have a Car type defined

const CarList: React.FC<{
  cars: Car[];
  loading: boolean;
  error: string | null;
}> = ({ cars, loading, error }) => {
  //const [cars, setCars] = useState<any[]>([]);
  //const [loading, setLoading] = useState<boolean>(true); // Loading state
  //const [error, setError] = useState<string | null>(null); // Error state

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
