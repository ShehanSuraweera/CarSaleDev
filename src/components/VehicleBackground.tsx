import React, { useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@heroui/react";

// Define the type for the props
type VehicleBackgroundProps = {
  condition: { key: string; label: string }[];
  yor: { key: string; label: string }[];
  engine: { key: string; label: string }[];
  fuel: { key: string; label: string }[];
  setVehicleBackground: (details: {
    condition: string;
    yor: string;
    milage: string;
    engine: string;
    colour: string;
    fuelType: string;
  }) => void;
};

const VehicleBackground: React.FC<VehicleBackgroundProps> = ({
  condition,
  yor,
  engine,
  fuel,
  setVehicleBackground,
}) => {
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [vehicleYor, setVehicleYor] = useState("");
  const [vehicleMilage, setVehicleMilage] = useState("");
  const [vehicleEngine, setVehicleEngine] = useState("");
  const [vehicleColour, setVehicleColour] = useState("");
  const [vehicleFuelType, setVehicleFuelType] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const updateVehicleBackground = () => {
    setVehicleBackground({
      condition: vehicleCondition,
      yor: vehicleYor,
      milage: vehicleMilage,
      engine: vehicleEngine,
      colour: vehicleColour,
      fuelType: vehicleFuelType,
    });
  };

  useEffect(() => {
    updateVehicleBackground();
  }, [
    vehicleCondition,
    vehicleYor,
    vehicleMilage,
    vehicleEngine,
    vehicleColour,
    vehicleFuelType,
  ]);

  const handleConditionChange = (value: string) => {
    if (value === "registered") {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
    setVehicleCondition(value);
    updateVehicleBackground();
  };

  const handleYorChange = (value: string) => {
    setVehicleYor(value);
    updateVehicleBackground();
  };

  const handleMilageChange = (value: string) => {
    setVehicleMilage(value);
    updateVehicleBackground();
  };

  const handleEngineChange = (value: string) => {
    setVehicleEngine(value);
    updateVehicleBackground();
  };

  const handleColourChange = (value: string) => {
    setVehicleColour(value);
    updateVehicleBackground();
  };

  const handleFuelTypeChange = (value: string) => {
    setVehicleFuelType(value);
    updateVehicleBackground();
  };

  return (
    <div className=" sm:w-[90%] shadow-md   p-8">
      <h1 className="text-lg font-medium">
        Let's start finding your car's background
      </h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5">
        <Select
          isRequired={true}
          labelPlacement="outside"
          label="Condition"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Registered, Unregistered, "
          onChange={(e) => handleConditionChange(e.target.value)}
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
          onChange={(e) => handleYorChange(e.target.value)}
          isDisabled={!isRegistered}
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
          value={vehicleMilage}
          onChange={(e) => handleMilageChange(e.target.value)}
        />
        {/* <Select
          labelPlacement="outside"
          label="Engine"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g VVTi 1.5L "
          onChange={(e) => handleEngineChange(e.target.value)}
        >
          {engine.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select> */}
        <Input
          type="string"
          label="Engine"
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g e.g VVTi 1.5L "
          value={vehicleEngine}
          onChange={(e) => handleEngineChange(e.target.value)}
        />
        <Input
          type="string"
          label="Colour"
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Silver, White"
          onChange={(e) => handleColourChange(e.target.value)}
        />
        <Select
          isRequired={true}
          labelPlacement="outside"
          label="Fuel Type"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Petrol, Diesel, Hybrid "
          onChange={(e) => handleFuelTypeChange(e.target.value)}
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
