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
  DropdownSection,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import hideSearch from "@/src/assets/icons/hide-arrow.png";
import { SearchIcon } from "@/src/components/icons";
import { useSearch } from "@/src/providers/SearchProvider";
import Search from "@/src/components/Search";
import Filter from "@/src/components/Filter";
import { ArrowDown, ArrowDownWideNarrow, FilterIcon } from "lucide-react";

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
        make_id: filters.make.id,
        model_id: filters.model.id,
        minPrice: filters.minPrice.id,
        maxPrice: filters.maxPrice.id,
        maxMileage: filters.maxMileage.id,
        buildYear: filters.buildYear.id,
        body_type_id: filters.body_type.id,
        transmission_type_id: filters.transmission_type.id,
        district_id: filters.district.id,
        city_id: filters.city.id,
        vehicle_type_id: filters.vehicle_type.id,
        vehicle_condition_id: filters.vehicle_condition.id,
        fuel_type_id: filters.fuel_type.id,
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
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [filterToRemove]: { id: "", name: "" }, // Reset the specific filter
    }));
  };

  return (
    <div className="">
      <Drawer
        isOpen={isOpen}
        placement="left"
        onOpenChange={onOpenChange}
        size="xs"
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

      <div className="flex items-center justify-center w-full gap-2 mt-2 mb-4 ">
        <Button
          color="primary"
          variant="flat"
          className="sm:hidden"
          onPress={onOpen}
          size="sm"
        >
          <ArrowDownWideNarrow />
          Filters
        </Button>
        <Search />
      </div>

      <div className="justify-center hidden w-full sm:block">
        <Filter />
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-8 mb-5 sm:justify-center sm:gap-5 sm:flex-nowrap sm:flex-row">
        {Object.entries(filters).map(([key, value]) =>
          value.name !== "" ? (
            <Chip
              key={key}
              size="sm"
              variant="solid"
              color="primary"
              onClose={() => handleChipClose(key)}
            >
              {value.name}
            </Chip>
          ) : null
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
