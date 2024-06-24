import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

// Define the type for the props
type VehicleAboutProps = {
  carMakes: { key: string; label: string }[];
  toyotaModels: { key: string; label: string }[];
  yom: { key: string; label: string }[];
  transmissionTypes: { key: string; label: string }[];
  bodyTypes: { key: string; label: string }[];
};
const VehicleAbout: React.FC<VehicleAboutProps> = ({
  carMakes,
  toyotaModels,
  yom,
  transmissionTypes,
  bodyTypes,
}) => {
  return (
    <div className=" sm:w-[90%] shadow-md   p-8">
      <h1 className="text-lg font-medium">
        Let's start finding your car's make
      </h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5">
        <Select
          labelPlacement="outside"
          label="Make"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Toyota, Honda, Mazda"
        >
          {carMakes.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Model"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Allion, Vezel, Maruti"
        >
          {toyotaModels.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Frame Code"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 260, RU1, "
        >
          {carMakes.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Build year"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  2010, 2011, 2012,..."
        >
          {yom.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Transmission"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Automatic, Manual,..."
        >
          {transmissionTypes.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Body type"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Sedan, SUV, Hatchback, ... "
        >
          {bodyTypes.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default VehicleAbout;
