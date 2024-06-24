import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";

// Define the type for the props
type VehicleBackgroundProps = {
  condition: { key: string; label: string }[];
  yor: { key: string; label: string }[];
  engine: { key: string; label: string }[];
  fuel: { key: string; label: string }[];
};

const VehicleBackground: React.FC<VehicleBackgroundProps> = ({
  condition,
  yor,
  engine,
  fuel,
}) => {
  return (
    <div className=" sm:w-[90%] shadow-md   p-8">
      <h1 className="text-lg font-medium">
        Let's start finding your car's background
      </h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5">
        <Select
          labelPlacement="outside"
          label="Condition"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Registered, Unregistered, "
        >
          {condition.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Year of Registration"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  2024, 2023, 2022"
        >
          {yor.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="string"
          label="Milage (km)"
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 60000, 150000 "
        />
        <Select
          labelPlacement="outside"
          label="Engine"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g VVTi 1.5L "
        >
          {engine.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="string"
          label="Colour"
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Silver, White"
        />
        <Select
          labelPlacement="outside"
          label="Fuel Type"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Petrol, Diesel, Hybrid "
        >
          {fuel.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default VehicleBackground;
