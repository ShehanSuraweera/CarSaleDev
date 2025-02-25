import React, { useRef, useState, useEffect, useMemo } from "react";
import { useSearch } from "../providers/SearchProvider";
import { Button, Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useStartTyping } from "react-use";
import debounce from "lodash/debounce";

const Search = () => {
  const { query, setQuery } = useSearch();
  // Local state to update the input value in real time
  const [localQuery, setLocalQuery] = useState(query);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  // Create a debounced function to update the global query after 500ms of inactivity
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 800),
    [setQuery]
  );

  // Clean up the debounce function on unmount
  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  useStartTyping(() => {
    if (pathname !== "/buy") {
      setTimeout(() => {
        router.push("/buy");
      }, 2000);
    }
    inputRef.current?.focus();
  });

  const handleSearchButton = () => {
    // On button click, update immediately if needed and redirect
    setQuery(localQuery);
    if (pathname !== "/buy") router.push("/buy");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchButton();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Update local state for real-time feedback
    setLocalQuery(newValue);
    // Use debounced function to update the global query
    debouncedSetQuery(newValue);
  };

  return (
    <div className="flex items-center justify-center w-full sm:w-[80%] gap-2 px-5 sm:py-2 py-1 text-black shadow-md rounded-2xl bg-slate-300 dark:bg-slate-800 dark:text-white">
      <Input
        ref={inputRef}
        size="md"
        variant="underlined"
        color="primary"
        className="px-0 rounded-full w-[100%]"
        placeholder="search your dream ..."
        type="text"
        onKeyDown={handleKeyPress}
        endContent={
          <Button
            variant="light"
            color="primary"
            className="w-5 px-0 text-black rounded-medium min-w-8"
            onPress={handleSearchButton}
            size="md"
          >
            <SearchIcon className="w-5 pointer-events-none" />
          </Button>
        }
        value={localQuery}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Search;
