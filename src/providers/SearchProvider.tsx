"use client";

import { createContext, useContext, useState } from "react";

interface SearchContextProps {
  query: string;
  filters: {
    make_id: string;
    model_id: string;
    minPrice: string;
    maxPrice: string;
    body_type_id: string;
    transmission_type_id: string;
    maxMileage: string;
    buildYear: string;
    district_id: string;
    city_id: string;
  };
  setQuery: (query: string) => void;
  setFilters: (filters: any) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    make_id: "",
    model_id: "",
    minPrice: "",
    maxPrice: "",
    body_type_id: "",
    transmission_type_id: "",
    maxMileage: "",
    buildYear: "",
    district_id: "",
    city_id: "",
  });

  return (
    <SearchContext.Provider value={{ query, setQuery, filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
