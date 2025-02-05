"use client";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import React, { useState } from "react";
// import DropDown from "./DropDown";
import { Select, SelectItem } from "@heroui/select";
import {
  carMakes,
  toyotaModels,
  bodyTypes,
  districts,
  yom,
  mileageOptions,
  transmissionTypes,
  priceOptions,
} from "@/src/data/search";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useSearch } from "../providers/SearchProvider";
import { Autocomplete, AutocompleteItem, Chip, Slider } from "@heroui/react";

const Search = () => {
  const { query, setQuery, filters, setFilters } = useSearch();

  const handleChipClose = (filterToRemove: string) => {
    setFilters((prevFilters: any) => {
      const updatedFilters = { ...prevFilters };

      // Find and reset the corresponding filter key
      Object.keys(updatedFilters).forEach((key) => {
        if (updatedFilters[key] === filterToRemove) {
          updatedFilters[key] = ""; // Reset field for text inputs or dropdowns
        }
      });

      return updatedFilters;
    });
  };

  return (
    <>
      <div className="flex justify-center mb-8 font-sans text-sm sm:m-1 ">
        <div className=" bg-white dark:bg-[#01172F] w-[100%]  lg:w-[90%] xl:w-[85%] h-auto px-8 xl:px-10 sm:px-4 pt-1 pb-4 sm:py-8 rounded-br-lg rounded-tl-lg shadow-lg  ">
          <div className="flex flex-wrap justify-center w-full gap-4 mx-0 mt-5 sm:gap-6 ">
            <Autocomplete
              labelPlacement="outside"
              label="Make"
              className="w-full text-black sm:max-w-44"
              placeholder="All makes"
              defaultItems={carMakes}
              selectedKey={filters.make || undefined}
              onSelectionChange={(e) => setFilters({ ...filters, make: e })}
            >
              {(make) => (
                <AutocompleteItem key={make.key}>{make.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="models"
              className="w-full sm:max-w-44"
              placeholder="All Models"
              defaultItems={toyotaModels}
              onSelectionChange={(e) => setFilters({ ...filters, model: e })}
            >
              {(models) => (
                <AutocompleteItem key={models.key}>
                  {models.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Body type"
              className="w-full sm:max-w-44"
              placeholder="All types"
              onSelectionChange={(e) => setFilters({ ...filters, type: e })}
            >
              {bodyTypes.map((body) => (
                <AutocompleteItem key={body.key}>{body.label}</AutocompleteItem>
              ))}
            </Autocomplete>

            <div className="w-full min-w-44 sm:w-1/5 sm:max-w-44">
              <Input
                type="string"
                label="Keyword"
                labelPlacement="outside"
                placeholder="Search by keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-end min-w-44    flex-wrap   w-[50%] sm:w-[25%] lg:w-[20%]  mt-2">
              <div className="w-1/2"></div>

              {/* <Button
                radius="md"
                className="text-black font-medium bg-[#FDC221] "
                disabled={true}
              >
                Search
              </Button> */}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 gap-x-8 sm:mt-8 sm:gap-4">
            <Autocomplete
              variant="underlined"
              label="Location"
              className="sm:max-w-40"
              onSelectionChange={(e) => setFilters({ ...filters, location: e })}
              defaultItems={districts}
            >
              {(district) => (
                <AutocompleteItem key={district.key}>
                  {district.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Max price"
              className="sm:max-w-40"
              onSelectionChange={(e) => {
                setFilters({ ...filters, maxPrice: e });
              }}
              defaultItems={priceOptions}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Transmission"
              className="sm:max-w-40"
              onSelectionChange={(e) =>
                setFilters({ ...filters, transmission: e })
              }
              defaultItems={transmissionTypes}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Max Mileage"
              className="sm:max-w-40"
              defaultItems={mileageOptions}
              onSelectionChange={(e) => {
                setFilters({ ...filters, maxMileage: e });
              }}
            >
              {mileageOptions.map((item) => (
                <AutocompleteItem key={item.label}>
                  {item.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Manufacture After"
              className="sm:max-w-40"
              onSelectionChange={(e) => {
                setFilters({ ...filters, buildYear: e });
              }}
            >
              {yom.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Autocomplete>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-2 mt-8 sm:justify-center sm:flex-nowrap sm:flex-row">
        {Object.values(filters).map((filter, index) => (
          <div
            key={index}
            className="flex sm:w-full gap-2 w-[30%]   justify-center items-center flex-wrap "
          >
            <Chip
              key={index}
              size="sm"
              variant="solid"
              color="warning"
              className={`${filter ? "flex" : "hidden"} `}
            >
              {filter}
            </Chip>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
