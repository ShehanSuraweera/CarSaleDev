"use client";
import CarList from "@/src/components/Cars/CarList";
import Search from "@/src/components/Search";
import { fetchAds } from "@/src/lib/api";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import hideSearch from "@/src/assets/icons/hide-arrow.png";
import { SearchIcon } from "@/src/components/icons";
import { useWindowSize } from "react-use";
import { useSearch } from "@/src/providers/SearchProvider";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowSize();

  const { onOpen } = useDisclosure();
  const [isOpen, setIsOpen] = useState(width < 640 && true);
  const [placement, setPlacement] = useState<
    "top" | "right" | "bottom" | "left"
  >("top");

  const handleOpen = (open: boolean) => {
    onOpen();
    setIsOpen(open);
  };

  const { query, filters } = useSearch();
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
  }, [query, filters]);

  return (
    <div className="">
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onOpenChange={handleOpen}
        size="xs"
        defaultOpen={false}
        radius="md"
        className="block sm:hidden"
      >
        <DrawerContent className="block bg-white sm:hidden">
          {(onClose) => (
            <>
              {/* <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader> */}
              <DrawerBody>
                <Search />
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
      <Button
        color="warning"
        className="block w-full mt-2 capitalize sm:hidden "
        onPress={() => handleOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-2">
          <div>
            <SearchIcon />
          </div>
          <div>search vehicles</div>
        </div>
      </Button>
      <div className="justify-center hidden w-full sm:block">
        <Search />
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
