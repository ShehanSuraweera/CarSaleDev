"use client";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import React, { use, useEffect, useState } from "react";
// import DropDown from "./DropDown";
import { Select, SelectItem } from "@heroui/select";
import {
  carMakes,
  toyotaModels,
  bodyTypes,
  yom,
  mileageOptions,
  transmissionTypes,
  priceOptions,
} from "@/src/data/search";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useSearch } from "../providers/SearchProvider";
import { Autocomplete, AutocompleteItem, Chip, Slider } from "@heroui/react";
import { getYear } from "date-fns";
import { getAllDistricts } from "../lib/api";

const Filter = () => {
  const { filters, setFilters } = useSearch();
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, k) => ({
    key: (currentYear - k).toString(),
    label: (currentYear - k).toString(),
  }));

  return (
    <>
      <div className="flex justify-center font-sans text-sm sm:mb-8 sm:m-1 ">
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
              selectedKey={filters.model}
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
              selectedKey={filters.type}
              defaultItems={bodyTypes}
              onSelectionChange={(e) => setFilters({ ...filters, type: e })}
            >
              {(body) => (
                <AutocompleteItem key={body.label}>
                  {body.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Transmission"
              placeholder="All types"
              className="sm:max-w-44"
              onSelectionChange={(e) =>
                setFilters({ ...filters, transmission: e })
              }
              defaultItems={transmissionTypes}
              selectedKey={filters.transmission}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Autocomplete>

            {/* <div className="flex flex-col justify-end min-w-44     flex-wrap   w-[50%] sm:w-[25%] lg:w-[20%]  ">
              <div className="w-1/2"></div>

              <Button
                radius="md"
                className="text-black font-medium bg-[#FDC221] "
                disabled={true}
              >
                Search
              </Button>
            </div> */}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 gap-x-8 sm:mt-8 sm:gap-12">
            <Autocomplete
              variant="underlined"
              label="Location"
              className="sm:max-w-44"
              onSelectionChange={(e) =>
                setFilters({ ...filters, district_id: e })
              }
              defaultItems={districts}
              selectedKey={filters.district_id}
              allowsCustomValue={true}
            >
              {(district: { id: string; name: string }) => (
                <AutocompleteItem key={district.id}>
                  {district.name}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Max price"
              className="sm:max-w-44"
              onSelectionChange={(e) => {
                setFilters({ ...filters, maxPrice: e });
              }}
              defaultItems={priceOptions}
              selectedKey={filters.maxPrice}
            >
              {(item) => (
                <AutocompleteItem key={item.label}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Max Mileage"
              className="sm:max-w-44"
              defaultItems={mileageOptions}
              onSelectionChange={(e) => {
                setFilters({ ...filters, maxMileage: e });
              }}
              selectedKey={filters.maxMileage}
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
              className="sm:max-w-44"
              onSelectionChange={(e) => {
                setFilters({ ...filters, buildYear: e });
              }}
              selectedKey={filters.buildYear}
              defaultItems={years}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
