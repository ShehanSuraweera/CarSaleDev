"use client";
import CarList from "@/src/components/Cars/CarList";
import { fetchAds } from "@/src/lib/api";
import {
  Button,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import hideSearch from "@/src/assets/icons/hide-arrow.png";
import { SearchIcon } from "@/src/components/icons";
import { useSearch } from "@/src/providers/SearchProvider";
import Search from "@/src/components/Search";
import Filter from "@/src/components/Filter";
import { ArrowDown } from "lucide-react";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { query, filters, setFilters } = useSearch();
  const [cars, setCars] = useState<any[]>([]);

  const getCarsFromBackend = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCars = await fetchAds({
        query,
        make: filters.make,
        model: filters.model,
        type: filters.type,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        maxMileage: filters.maxMileage,
        buildYear: filters.buildYear,
        bodyType: filters.bodyType,
        transmission: filters.transmission,
        location: filters.location,
        district_id: filters.district_id,
        city_id: filters.city_id,
      });
      setCars(fetchedCars);
    } catch (err: any) {
      console.error("Error fetching ads:", err);
      setError(err.message || "Failed to load ads");
    } finally {
      setLoading(false);
    }
  }, [query, filters]);

  useEffect(() => {
    getCarsFromBackend();
  }, [getCarsFromBackend]);

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
    <div className="">
      <Drawer
        isOpen={isOpen}
        placement="top"
        onOpenChange={onOpenChange}
        size="sm"
        defaultOpen={false}
        radius="md"
        className="block sm:hidden"
      >
        <DrawerContent className="block bg-white sm:hidden">
          {(onClose) => (
            <>
              <DrawerHeader className="flex justify-center">
                Search Filters
              </DrawerHeader>
              <DrawerBody>
                <Filter />
              </DrawerBody>
              <DrawerFooter>
                <div className="flex justify-center w-full">
                  <Button color="danger" variant="light" onPress={onClose}>
                    <Image
                      src={hideSearch}
                      className="w-6 h-6"
                      alt="Hide Search"
                    />
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <Search />
      <div className="flex justify-center w-full mt-2 sm:hidden">
        <Button
          color="primary"
          variant="flat"
          className="w-full "
          onPress={onOpen}
        >
          Filters <ArrowDown />
        </Button>
      </div>
      <div className="justify-center hidden w-full sm:block">
        <Filter />
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-8 mb-5 sm:justify-center sm:gap-5 sm:flex-nowrap sm:flex-row">
        {Object.values(filters).map((filter, index) =>
          filter === "" || filter == undefined ? null : (
            <div
              key={index}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 "
            >
              <Chip
                size="sm"
                variant="solid"
                color="primary"
                className="flex"
                onClose={() => handleChipClose(filter)}
              >
                {filter}
              </Chip>
            </div>
          )
        )}
      </div>

      {!loading && cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full mt-10">
          <SearchIcon width={150} height={150} />
          <div className="text-xl font-semibold">
            <p>Ooops! No cars found</p>{" "}
          </div>
          <div>
            <p>Try adjusting your seacrh to find what you are looking for</p>{" "}
          </div>
        </div>
      ) : (
        <CarList cars={cars} loading={loading} error={error} />
      )}
    </div>
  );
}
