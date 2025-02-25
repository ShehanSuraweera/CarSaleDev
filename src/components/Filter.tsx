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
  getFuelTypes,
  getTransmissionTypes,
  getVehicleTypes,
} from "../lib/api";

const Filter = () => {
  const { filters, setFilters } = useSearch();
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [makes, setMakes] = useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [bodyTypes, setBodyTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const [vehicleTypes, setVehicleTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const [fuelTypes, setFuelTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const [transmissionTypes, setTransmissionTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const [maxPrice, setMaxPrice] =
    useState<{ id: string; name: string }[]>(priceOptions);
  const [maxMileage, setMaxMileage] =
    useState<{ id: string; name: string }[]>(mileageOptions);
  const [manufactureAfter, setManufactureAfter] = useState<
    { id: string; name: string }[]
  >([]);

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
        const data = await getBodyTypes({
          vehicle_type_id: filters.vehicle_type.id || "",
        });
        setBodyTypes(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBodyTypes();
  }, [filters.vehicle_type.id]);

  useEffect(() => {
    setIsLoading(true);
    const fetchVehicleTypes = async () => {
      try {
        const data = await getVehicleTypes();
        setVehicleTypes(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchFuelTypes = async () => {
      try {
        const data = await getFuelTypes();
        setFuelTypes(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFuelTypes();
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
          make_id: filters.make.id,
        });
        setModels(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getModels();
  }, [filters.make.id]);

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
    id: (currentYear - k).toString(),
    name: (currentYear - k).toString(),
  }));

  useEffect(() => {
    setManufactureAfter(years);
  }, []);

  return (
    <>
      <div className="flex justify-center font-sans text-xs sm:text-sm sm:mb-8 sm:m-1 ">
        <div className=" bg-white dark:bg-[#01172F] w-[100%]  lg:w-[90%] xl:w-[85%] h-auto px-10 xl:px-10 sm:px-4 pt-1 pb-4 sm:py-8 rounded-br-lg rounded-tl-lg shadow-lg  ">
          <div className="flex flex-wrap justify-center w-full gap-6 mx-0 mt-5 sm:gap-6 ">
            <Autocomplete
              labelPlacement="outside"
              label="Make"
              className="w-full text-black sm:max-w-44"
              placeholder="All makes"
              defaultItems={makes}
              selectedKey={filters.make.id}
              onSelectionChange={(e) => {
                setFilters({
                  ...filters,
                  make: {
                    id: e,
                    name: makes.find((m) => m.id == e)?.name || "",
                  },
                });
              }}
              isLoading={isLoading}
            >
              {(make: { id: string; name: string }) => (
                <AutocompleteItem key={make.id}>{make.name}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Models"
              className="w-full sm:max-w-44"
              placeholder="All Models"
              defaultItems={models}
              selectedKey={filters.model.id}
              onSelectionChange={(e) =>
                setFilters({
                  ...filters,
                  model: {
                    id: e,
                    name: models.find((m) => m.id == e)?.name || "",
                  },
                })
              }
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
              label="Vehicle Type"
              className="w-full sm:max-w-44"
              placeholder="All types"
              selectedKey={filters.vehicle_type.id}
              defaultItems={vehicleTypes}
              onSelectionChange={(e) =>
                setFilters({
                  ...filters,
                  vehicle_type: {
                    id: e,
                    name: vehicleTypes.find((m) => m.id == e)?.name || "",
                  },
                })
              }
              isLoading={isLoading}
            >
              {(body: { id: string; name: string }) => (
                <AutocompleteItem key={body.id}>{body.name}</AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Body type"
              className="w-full sm:max-w-44"
              placeholder="All types"
              selectedKey={filters.body_type.id}
              defaultItems={bodyTypes}
              onSelectionChange={(e) =>
                setFilters({
                  ...filters,
                  body_type: {
                    id: e,
                    name: bodyTypes.find((m) => m.id == e)?.name || "",
                  },
                })
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
                setFilters({
                  ...filters,
                  transmission_type: {
                    id: e,
                    name: transmissionTypes.find((m) => m.id == e)?.name || "",
                  },
                })
              }
              defaultItems={transmissionTypes}
              selectedKey={filters.transmission_type.id}
              isLoading={isLoading}
            >
              {(item: { id: string; name: string }) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              )}
            </Autocomplete>
            <Autocomplete
              labelPlacement="outside"
              label="Fuel Type"
              className="w-full sm:max-w-44"
              placeholder="All types"
              selectedKey={filters.fuel_type.id}
              defaultItems={fuelTypes}
              onSelectionChange={(e) =>
                setFilters({
                  ...filters,
                  fuel_type: {
                    id: e,
                    name: fuelTypes.find((m) => m.id == e)?.name || "",
                  },
                })
              }
              isLoading={isLoading}
            >
              {(body: { id: string; name: string }) => (
                <AutocompleteItem key={body.id}>{body.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 gap-x-8 sm:mt-8 sm:gap-12">
            <Autocomplete
              variant="underlined"
              label="District"
              className="sm:max-w-44"
              onSelectionChange={(e) =>
                setFilters({
                  ...filters,
                  district: {
                    id: e,
                    name: districts.find((m) => m.id == e)?.name || "",
                  },
                })
              }
              defaultItems={districts}
              selectedKey={filters.district.id}
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
                setFilters({
                  ...filters,
                  maxPrice: {
                    id: e,
                    name: maxPrice.find((m) => m.id == e)?.name || "",
                  },
                });
              }}
              defaultItems={maxPrice}
              selectedKey={filters.maxPrice.id}
              isLoading={isLoading}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Max Mileage"
              className="sm:max-w-44"
              defaultItems={maxMileage}
              onSelectionChange={(e) => {
                setFilters({
                  ...filters,
                  maxMileage: {
                    id: e,
                    name: maxMileage.find((m) => m.id == e)?.name || "",
                  },
                });
              }}
              selectedKey={filters.maxMileage.id}
              isLoading={isLoading}
            >
              {mileageOptions.map((item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              ))}
            </Autocomplete>

            <Autocomplete
              variant="underlined"
              label="Manufacture After"
              className="sm:max-w-44"
              onSelectionChange={(e) => {
                setFilters({
                  ...filters,
                  buildYear: {
                    id: e,
                    name: manufactureAfter.find((m) => m.id == e)?.name || "",
                  },
                });
              }}
              selectedKey={filters.buildYear.id}
              defaultItems={manufactureAfter}
              isLoading={isLoading}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
