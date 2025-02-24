"use client";
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
import { useCallback, useEffect, useRef, useState } from "react";
import hideSearch from "@/src/assets/icons/hide-arrow.png";
import { SearchIcon } from "@/src/components/icons";
import { useSearch } from "@/src/providers/SearchProvider";
import Search from "@/src/components/Search";
import Filter from "@/src/components/Filter";
import { ArrowDownWideNarrow } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import MediumAdSkeleton from "@/src/components/MediumAdSkeleton";
import { motion } from "framer-motion";
import MediumAd from "@/src/components/Cars/MediumAd";
import clsx from "clsx";
import { useScroll } from "react-use";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { query, filters, setFilters } = useSearch();
  const [cars, setCars] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if more ads exist
  const Skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getCarsFromBackend = useCallback(async () => {
    if (loading) return;
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
        page: page,
        limit: 10,
      });

      setCars((prevCars) => [...prevCars, ...fetchedCars]);

      // Stop fetching if no more cars are available
      if (fetchedCars.length < 10) setHasMore(false);
    } catch (err: any) {
      console.error("Error fetching ads:", err);
      setError(err.message || "Failed to load ads");
    } finally {
      setLoading(false);
    }
  }, [query, filters, page]);

  // Fetch ads when filters or query change
  // Fetch ads when filters or query change
  useEffect(() => {
    console.log("Filters changed");
    setPage(1); // Reset pagination
    setCars([]); // Clear previous results
    setHasMore(true); // Reset scrolling state
  }, [query, filters, setFilters]);

  // Fetch more ads when page changes
  useEffect(() => {
    if (page > 1) {
      getCarsFromBackend();
    } else {
      getCarsFromBackend(); // Fetch initial data when page is reset to 1
    }
  }, [page]);

  // Load more data
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleChipClose = (filterToRemove: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [filterToRemove]: { id: "", name: "" },
    }));
  };

  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef); // Get scroll position
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   console.log(y);
  //   if (y > lastScrollY && y > 50) {
  //     setIsVisible(false); // Hide on scroll down
  //   } else {
  //     setIsVisible(true); // Show on scroll up
  //   }
  //   setLastScrollY(y);
  // }, [y, lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past 50px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      {/* Mobile Filter Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onOpenChange={onOpenChange}
        size="xs"
        radius="md"
      >
        <DrawerContent className="block bg-white dark:bg-[#01172F]">
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

      {/* Search & Filter */}

      <div
        ref={scrollRef}
        className={clsx(
          `sticky top-10  z-50 flex items-center justify-center w-full gap-2 p-2 bg-white dark:bg-[#01172F] transition-transform duration-300 ${
            isVisible ? "flex" : "hidden"
          }`
        )}
      >
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

      {/* Applied Filters */}
      <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-8 mb-5">
        {Object.entries(filters).map(
          ([key, value]) =>
            value.name && (
              <Chip
                key={key}
                size="sm"
                variant="solid"
                color="primary"
                onClose={() => handleChipClose(key)}
              >
                {value.name}
              </Chip>
            )
        )}
      </div>

      {/* No Results */}
      {!loading && cars.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full mt-10">
          <SearchIcon width={150} height={150} />
          <div className="text-xl font-semibold">
            <p>Ooops! No cars found</p>
          </div>
          <div>
            <p>Try adjusting your search to find what you are looking for</p>
          </div>
        </div>
      )}

      {/* Car List with Infinite Scroll */}
      <InfiniteScroll
        dataLength={cars.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex flex-wrap items-center justify-center w-full sm:gap-x-6 gap-x-2">
            {Skeletons.map((skeleton) => (
              <MediumAdSkeleton key={skeleton} />
            ))}
          </div>
        }
        endMessage={
          cars.length > 0 && (
            <p className="mt-5 mb-20 text-center">
              <b>Yay! You have seen it all</b>
            </p>
          )
        }
      >
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "backIn", duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center w-full sm:gap-x-6 gap-x-2">
            {loading &&
              Skeletons.map((skeleton) => <MediumAdSkeleton key={skeleton} />)}
            {cars.map((car) => (
              <motion.div key={car.ad_id}>
                <MediumAd
                  image={car.images?.[0] || "/images/no-image.png"}
                  bodyType={car.body_type?.name}
                  frame_code={car.frame_code}
                  make={car.make?.name}
                  modle={car.model?.name}
                  manufacture={car.build_year}
                  mileage={car.mileage}
                  fuel={car.fuel_type.name}
                  price={car?.price?.toString()}
                  engine={car.engine}
                  transmission={car.transmission_type?.name}
                  id={car.ad_id}
                  location={car?.city?.name}
                  created_at={car.created_at}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </InfiniteScroll>
    </div>
  );
}
