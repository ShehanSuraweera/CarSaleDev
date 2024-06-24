import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input, Textarea } from "@nextui-org/input";
import {
  carMakes,
  districts,
  transmissionTypes,
  toyotaModels,
  bodyTypes,
  yom,
} from "@/data/search";

const OwnerDetails = () => {
  return (
    <div className=" sm:w-[90%] shadow-md w-full   p-8">
      <h2>Owner Details</h2>
      <div className="flex flex-col items-start justify-start gap-8 mt-4">
        <Input
          type="string"
          label="Name"
          labelPlacement="outside"
          className="sm:max-w-96"
          value="Shehan"
          description="This will display as owner name of the AD"
        />
        <Input
          type="string"
          label="Contact"
          value="0769785809"
          labelPlacement="outside"
          className="sm:max-w-96"
          description="This will display as contact number of the AD"
        />
        <Select
          labelPlacement="outside"
          label="Location"
          value="Hanwella"
          description="This will display as Location"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Toyota, Honda, Mazda"
        >
          {districts.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default OwnerDetails;
