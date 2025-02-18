import React from "react";
import { useSearch } from "../providers/SearchProvider";
import { Button, Input } from "@heroui/react";
import { MailIcon, SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Search = () => {
  const { query, setQuery } = useSearch();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchButton = () => {
    setQuery(query);

    if (pathname !== "/buy") router.push("/buy");
  };

  const handleOnChange = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full gap-2">
        <Input
          size="md"
          color="primary"
          className="px-0 rounded-full w-[100%] sm:w-[100%] "
          placeholder="search your dream car"
          type="text"
          endContent={
            <Button
              variant="light"
              color="primary"
              className="w-5 px-0 text-black rounded-medium min-w-8 "
              onPress={handleSearchButton}
              size="md"
            >
              <SearchIcon className="w-5 pointer-events-none " />
            </Button>
          }
          value={query}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </div>
  );
};

export default Search;
