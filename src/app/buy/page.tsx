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
import { useEffect, useState } from "react";
import hideSearch from "@/src/assets/icons/hide-arrow.png";
import { SearchIcon } from "@/src/components/icons";

export default function Page() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const { onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);
  const [placement, setPlacement] = useState<
    "top" | "right" | "bottom" | "left"
  >("top");

  const handleOpen = (open: boolean) => {
    onOpen();
    setIsOpen(open);
  };

  const getCarsFromBackend = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCars = await fetchAds(); // Fetch the data
      setCars(fetchedCars); // Update state with the fetched cars
    } catch (err: any) {
      console.error("Error fetching ads:", err);
      setError(err.message || "Failed to load ads");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getCarsFromBackend();
  }, []);

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onOpenChange={handleOpen}
        size="lg"
        defaultOpen={false}
        radius="md"
      >
        <DrawerContent>
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
      <CarList cars={cars} loading={loading} error={error} />
    </div>
  );
}
