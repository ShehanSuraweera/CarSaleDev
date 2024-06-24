"use client";
import React from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  carMakes,
  districts,
  transmissionTypes,
  toyotaModels,
  bodyTypes,
  yom,
  fuelTypes,
  engines,
  conditions,
} from "@/data/search";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import OwnerDetails from "@/components/OwnerDetails";
import VehicleAbout from "@/components/VehicleAbout";
import VehicleBackground from "@/components/VehicleBackground";

// Function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function Page() {
  const [selected, setSelected] = useState("Car");
  const [price, setPrice] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState("yes");

  const handlePriceChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setPrice(value);
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setFormattedPrice("Rs. " + formatNumber(numericValue));
    } else {
      setFormattedPrice("");
    }
  };
  const handleDisplayPriceChange = (value: string) => {
    setDisplayPrice(value);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
      <div className=" sm:w-[90%] shadow-md w-full p-8   ">
        <h2></h2>
        <div className="flex flex-col gap-3 ">
          <RadioGroup
            label="Select your Vehicle type"
            value={selected}
            onValueChange={setSelected}
          >
            <Radio value="Car">Car</Radio>
            <Radio value="Van">Van</Radio>
            <Radio value="SUV/Jeep">SUV/Jeep</Radio>
            <Radio value="london">London</Radio>
            <Radio value="tokyo">Tokyo</Radio>
          </RadioGroup>
          <p className="text-default-500 text-small">Selected: {selected}</p>
        </div>
      </div>
      <OwnerDetails />
      <VehicleAbout
        carMakes={carMakes}
        toyotaModels={toyotaModels}
        yom={yom}
        transmissionTypes={transmissionTypes}
        bodyTypes={bodyTypes}
      />
      <VehicleBackground
        yor={yom}
        condition={conditions}
        engine={engines}
        fuel={fuelTypes}
      />

      <div className=" sm:w-[90%] shadow-md  w-full  p-8">
        <RadioGroup
          label="Do you like display price ?"
          orientation="horizontal"
          value={displayPrice}
          onValueChange={handleDisplayPriceChange}
          className="mb-6"
          size="sm"
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
        {displayPrice === "yes" && (
          <>
            <div className="flex flex-col justify-between gap-4 sm:flex-row ">
              <Input
                type="number"
                label="Price (Rs)"
                labelPlacement="outside"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g 6000000, 1500000 "
                value={price}
                onChange={handlePriceChange}
                endContent={
                  <Checkbox defaultSelected={false} className="" size="sm">
                    Negotiable
                  </Checkbox>
                }
              />
              <div className=" sm:w-[50%] mt-4 sm:mt-0 text-sm flex flex-col gap-2">
                {formattedPrice && <p>You entered price : </p>}
                <p className="text-lg font-semibold">{formattedPrice}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className=" sm:w-[90%] shadow-md  w-full  p-8">
        <Textarea
          variant="flat"
          label="Owner Comments:"
          labelPlacement="outside"
          placeholder="Enter your description"
          className="col-span-12 mb-6 md:col-span-6 md:mb-0"
        />
      </div>
      <div className="flex justify-center w-full h-10 ">
        <Button
          color="success"
          radius="lg"
          className=" md:w-[40%] w-[80%]  bg-[#FDC221] dark:bg-[#01172F] dark:text-[#FDC221] "
        >
          Post AD
        </Button>
      </div>
    </div>
  );
}
