"use client";

import React, { useEffect, useState } from "react";
import { SelectItem } from "@heroui/select";
import { mileageOptions, priceOptions } from "@/src/data/search";
import { useSearch } from "../providers/SearchProvider";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { getYear } from "date-fns";
import {
  fetchModels,
  getAllDistricts,
  getAllMakes,
  getBodyTypes,
  getTransmissionTypes,
} from "../lib/api";

const Filter = () => {
  const { filters, setFilters } = useSearch();
  const [districts, setDistricts] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [transmissionTypes, setTransmissionTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchDistricts = async () => {
      try {
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchBodyTypes = async () => {
      try {
        const data = await getBodyTypes();
        setBodyTypes(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBodyTypes();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllMakes = async () => {
      try {
        const data = await getAllMakes();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllMakes();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const getModels = async () => {
      try {
        const data = await fetchModels({
          make_id: filters.make_id,
        });
        setModels(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getModels();
  }, [filters.make_id]);

  useEffect(() => {
    setIsLoading(true);
    const fetchTransmissionTypes = async () => {
      try {
        const data = await getTransmissionTypes();
        setTransmissionTypes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransmissionTypes();
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
              defaultItems={makes}
              selectedKey={filters.make_id}
              onSelectionChange={(e) => setFilters({ ...filters, make_id: e })}
              isLoading={isLoading}
            >
              {(make: { id: string; name: string }) => (
                <AutocompleteItem key={make.id}>{make.name}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="models"
              className="w-full sm:max-w-44"
              placeholder="All Models"
              defaultItems={models}
              selectedKey={filters.model_id}
              onSelectionChange={(e) => setFilters({ ...filters, model_id: e })}
              isLoading={isLoading}
            >
              {(models: { id: string; name: string }) => (
                <AutocompleteItem key={models.id}>
                  {models.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Body type"
              className="w-full sm:max-w-44"
              placeholder="All types"
              selectedKey={filters.body_type_id}
              defaultItems={bodyTypes}
              onSelectionChange={(e) =>
                setFilters({ ...filters, body_type_id: e })
              }
              isLoading={isLoading}
            >
              {(body: { id: string; name: string }) => (
                <AutocompleteItem key={body.id}>{body.name}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Transmission"
              placeholder="All types"
              className="sm:max-w-44"
              onSelectionChange={(e) =>
                setFilters({ ...filters, transmission_type_id: e })
              }
              defaultItems={transmissionTypes}
              selectedKey={filters.transmission_type_id}
              isLoading={isLoading}
            >
              {(item: { id: string; name: string }) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              )}
            </Autocomplete>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 gap-x-8 sm:mt-8 sm:gap-12">
            <Autocomplete
              variant="underlined"
              label="District"
              className="sm:max-w-44"
              onSelectionChange={(e) =>
                setFilters({ ...filters, district_id: e })
              }
              defaultItems={districts}
              selectedKey={filters.district_id}
              allowsCustomValue={true}
              isLoading={isLoading}
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
              isLoading={isLoading}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
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
              isLoading={isLoading}
            >
              {mileageOptions.map((item) => (
                <AutocompleteItem key={item.value}>
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
              isLoading={isLoading}
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
