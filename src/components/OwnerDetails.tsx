import React, { useContext, useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input, Textarea } from "@heroui/input";

import { UserProfileData } from "../types";

const OwnerDetails = ({
  name,
  phone,
  city,
  setName,
  setPhone,
  setCity,
}: UserProfileData & {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    setName(name || "");
    setPhone(phone || "");
    setCity(city || "");
  }, [name, phone, city, setName, setPhone, setCity]); // Update state when props change

  return (
    <div className=" sm:w-[90%] shadow-md w-full   p-8">
      <h2>Owner Details</h2>
      <div className="flex flex-col items-start justify-start gap-8 mt-4">
        <Input
          name="owner_display_name"
          isRequired={true}
          type="string"
          label="Name"
          labelPlacement="outside"
          className="sm:max-w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
          description="This will display as owner name of the AD"
        />
        <Input
          name="owner_contact"
          isRequired={true}
          type="string"
          label="Contact"
          value={phone}
          labelPlacement="outside"
          className="sm:max-w-96"
          onChange={(e) => setPhone(e.target.value)}
          description="This will display as contact number of the AD"
        />
        <Input
          name="ad_location"
          isRequired={true}
          type="string"
          label="Location"
          value={city}
          labelPlacement="outside"
          className="sm:max-w-96"
          onChange={(e) => setCity(e.target.value)}
          description="This will display as Location"
        />
        {/* <Select
          labelPlacement="outside"
          label="Location"
          value={user.city}
          onChange={(e) => setCity(e.target.value)}
          description="This will display as Location"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Toyota, Honda, Mazda"
        >
          {districts.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select> */}
      </div>
    </div>
  );
};

export default OwnerDetails;
