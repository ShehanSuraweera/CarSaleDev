"use client";

import { createContext, useContext, useState } from "react";

interface SearchContextProps {
  query: string;
  filters: {
    make: { id: string; name: string };
    model: { id: string; name: string };
    minPrice: { id: string; name: string };
    maxPrice: { id: string; name: string };
    body_type: { id: string; name: string };
    transmission_type: { id: string; name: string };
    maxMileage: { id: string; name: string };
    buildYear: { id: string; name: string };
    district: { id: string; name: string };
    city: { id: string; name: string };
  };
  setQuery: (query: string) => void;
  setFilters: (filters: any) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    make: { id: "", name: "" },
    model: { id: "", name: "" },
    minPrice: { id: "", name: "" },
    maxPrice: { id: "", name: "" },
    body_type: { id: "", name: "" },
    transmission_type: { id: "", name: "" },
    maxMileage: { id: "", name: "" },
    buildYear: { id: "", name: "" },
    district: { id: "", name: "" },
    city: { id: "", name: "" },
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
