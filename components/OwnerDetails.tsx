import React, { useContext, useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input, Textarea } from "@heroui/input";
import {
  carMakes,
  districts,
  transmissionTypes,
  toyotaModels,
  bodyTypes,
  yom,
} from "@/data/search";

import { UserContext } from "@/app/UserContext";

interface OwnerDetailsProps {
  setOwnerDetails: (details: {
    name: string;
    phone: string;
    city: string;
    email: string;
  }) => void;
}

const OwnerDetails: React.FC<OwnerDetailsProps> = ({ setOwnerDetails }) => {
  const { user } = useContext(UserContext) || {};

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    setOwnerDetails({ name, phone, city, email });
  }, [name, phone, city, email, setOwnerDetails]);

  return (
    <div className=" sm:w-[90%] shadow-md w-full   p-8">
      <h2>Owner Details</h2>
      <div className="flex flex-col items-start justify-start gap-8 mt-4">
        <Input
          type="string"
          label="Name"
          labelPlacement="outside"
          className="sm:max-w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
          description="This will display as owner name of the AD"
        />
        <Input
          type="string"
          label="Contact"
          value={phone}
          labelPlacement="outside"
          className="sm:max-w-96"
          onChange={(e) => setPhone(e.target.value)}
          description="This will display as contact number of the AD"
        />
        <Input
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
