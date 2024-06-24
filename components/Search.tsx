"use client";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import React from "react";
// import DropDown from "./DropDown";
import { Select, SelectItem } from "@nextui-org/select";
import {
  carMakes,
  toyotaModels,
  bodyTypes,
  districts,
  yom,
  mileageOptions,
  transmissionTypes,
  priceOptions,
} from "@/data/search";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const Search = () => {
  return (
    <div className="flex justify-center mb-8 font-sans text-sm sm:m-1 ">
      <div className=" bg-white dark:bg-[#01172F] w-[100%]  lg:w-[90%] xl:w-[85%] h-auto px-8 xl:p-10 sm:px-4 pt-1 pb-4 sm:py-8 rounded-br-lg rounded-tl-lg shadow-lg  ">
        <div className="flex flex-wrap justify-center w-full gap-4 mx-0 mt-5 sm:gap-6 ">
          <Select
            labelPlacement="outside"
            label="Make"
            className="w-full text-black sm:max-w-44"
            placeholder="All makes"
          >
            {carMakes.map((make) => (
              <SelectItem key={make.key}>{make.label}</SelectItem>
            ))}
          </Select>
          <Select
            labelPlacement="outside"
            label="models"
            className="w-full sm:max-w-44"
            placeholder="All Models"
          >
            {toyotaModels.map((models) => (
              <SelectItem key={models.key}>{models.label}</SelectItem>
            ))}
          </Select>
          <Select
            labelPlacement="outside"
            label="Body type"
            className="w-full sm:max-w-44"
            placeholder="All types"
          >
            {bodyTypes.map((body) => (
              <SelectItem key={body.key}>{body.label}</SelectItem>
            ))}
          </Select>

          <div className="w-full min-w-44 sm:w-1/5 sm:max-w-44">
            <Input
              type="string"
              label="Keyword"
              labelPlacement="outside"
              placeholder="Search by keyword"
            />
          </div>

          <div className="flex flex-col justify-end min-w-44    flex-wrap   w-[50%] sm:w-[25%] lg:w-[20%]  mt-2">
            <div className="w-1/2"></div>

            <Button
              radius="md"
              className="text-black font-medium bg-[#FDC221] "
            >
              Search
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 gap-x-8 sm:mt-8 sm:gap-4">
          <Select variant="underlined" label="Location" className="sm:max-w-40">
            {districts.map((district) => (
              <SelectItem key={district.key}>{district.label}</SelectItem>
            ))}
          </Select>

          <Select
            variant="underlined"
            label="Max price"
            className="sm:max-w-40"
          >
            {priceOptions.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>

          <Select
            variant="underlined"
            label="Transmission"
            className="sm:max-w-40"
          >
            {transmissionTypes.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>

          <Select
            variant="underlined"
            label="Max Mileage"
            className="sm:max-w-40"
          >
            {mileageOptions.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>

          <Select variant="underlined" label="YOM" className="sm:max-w-40">
            {yom.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Search;
