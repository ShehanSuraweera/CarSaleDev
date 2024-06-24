import React from "react";
import { DEMO_DATA } from "./data";
import MediumAd from "./MediumAd";

const CarList = () => {
  return (
    <div className=" flex flex-wrap w-full sm:gap-x-6 gap-x-2 items-center justify-center">
      {DEMO_DATA.map((item) => (
        <div key={item.id}>
          <MediumAd
            image={item.url}
            bodyType={item.bodyType}
            make={item.make}
            modle={item.modle}
            manufacture={item.manufacture}
            mileage={item.mileage}
            fuel={item.fuel}
            price={item.price}
            engine={item.engine}
            transmission={item.transsmision}
            id=""
          />
        </div>
      ))}
    </div>
  );
};

export default CarList;
