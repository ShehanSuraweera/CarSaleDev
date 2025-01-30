import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/react";

// Define the type for the props
type VehicleAboutProps = {
  carMakes: { key: string; label: string }[];
  toyotaModels: { key: string; label: string }[];
  yom: { key: string; label: string }[];
  transmissionTypes: { key: string; label: string }[];
  bodyTypes: { key: string; label: string }[];
  setVehicleAbout: (details: {
    make: string;
    model: string;
    frameCode: string;
    yom: string;
    transmission: string;
    bodyType: string;
  }) => void;
};
const VehicleAbout: React.FC<VehicleAboutProps> = ({
  carMakes,
  toyotaModels,
  yom,
  transmissionTypes,
  bodyTypes,
  setVehicleAbout,
}) => {
  // Local state for each dropdown
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [frameCode, setFrameCode] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");

  // Update parent state whenever local state changes
  const updateVehicleAbout = () => {
    setVehicleAbout({
      make,
      model,
      frameCode,
      yom: buildYear,
      transmission,
      bodyType,
    });
  };

  useEffect(() => {
    updateVehicleAbout();
  }, [make, model, frameCode, buildYear, transmission, bodyType]);

  // Call `updateVehicleAbout` whenever one of the dropdowns changes
  const handleMakeChange = (value: string) => {
    setMake(value);
    updateVehicleAbout();
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    updateVehicleAbout();
  };

  const handleFrameCodeChange = (value: string) => {
    setFrameCode(value);
    updateVehicleAbout();
  };

  const handleBuildYearChange = (value: string) => {
    setBuildYear(value);
    updateVehicleAbout();
  };

  const handleTransmissionChange = (value: string) => {
    setTransmission(value);
    updateVehicleAbout();
  };

  const handleBodyTypeChange = (value: string) => {
    setBodyType(value);
    updateVehicleAbout();
  };

  return (
    <div className=" sm:w-[90%] shadow-md   p-8">
      <h1 className="text-lg font-medium">
        Let's start finding your car's make
      </h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5">
        <Select
          isRequired={true}
          labelPlacement="outside"
          label="Make"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Toyota, Honda, Mazda"
          onChange={(e) => handleMakeChange(e.target.value)}
        >
          {carMakes.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select>

        {/* <Select
          labelPlacement="outside"
          label="Model"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Allion, Vezel, Maruti"
          onChange={(e) => handleModelChange(e.target.value)}
        >
          {toyotaModels.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select> */}
        <Input
          isRequired={true}
          type="string"
          label="Model"
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Allion, Vezel, Maruti"
          value={model}
          onChange={(e) => handleModelChange(e.target.value)}
        />
        {/* <Select
          labelPlacement="outside"
          label="Frame Code"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 260, RU1, "
          onChange={(e) => handleFrameCodeChange(e.target.value)}
        >
          {carMakes.map((make) => (
            <SelectItem key={make.key} value={make.key}>
              {make.label}
            </SelectItem>
          ))}
        </Select> */}
        <Input
          type="string"
          label="Frame Code"
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 260, RU1, "
          value={frameCode}
          onChange={(e) => handleFrameCodeChange(e.target.value)}
        />
        <Select
          isRequired={true}
          labelPlacement="outside"
          label="Build year"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  2010, 2011, 2012,..."
          onChange={(e) => handleBuildYearChange(e.target.value)}
        >
          {yom.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired={true}
          labelPlacement="outside"
          label="Transmission"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Automatic, Manual,..."
          onChange={(e) => handleTransmissionChange(e.target.value)}
        >
          {transmissionTypes.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired={true}
          labelPlacement="outside"
          label="Body type"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Sedan, SUV, Hatchback, ... "
          onChange={(e) => handleBodyTypeChange(e.target.value)}
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
