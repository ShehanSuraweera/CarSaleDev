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
      <div className="flex justify-center ">
        <Input
          size="lg"
          color="primary"
          className="px-0 rounded-full w-[90%] sm:w-[50%] "
          endContent={
            <Button
              variant="shadow"
              color="primary"
              className="px-0 text-black rounded-large "
              onPress={handleSearchButton}
            >
              <SearchIcon className="pointer-events-none " />
            </Button>
          }
          placeholder="search your dream car"
          type="text"
          value={query}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </div>
  );
};

export default Search;
