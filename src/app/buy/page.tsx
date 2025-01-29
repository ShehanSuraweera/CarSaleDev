"use client";
import CarList from "@/src/components/Cars/CarList";
import Search from "@/src/components/Search";
import { fetchAds } from "@/src/lib/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

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
      <Search />
      <CarList cars={cars} loading={loading} error={error} />
    </div>
  );
}
