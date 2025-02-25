import React, { useRef } from "react";
import { useSearch } from "../providers/SearchProvider";
import { Button, Input } from "@heroui/react";
import { MailIcon, SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useStartTyping } from "react-use";

const Search = () => {
  const { query, setQuery } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchButton = () => {
    setQuery(query);

    if (pathname !== "/buy") router.push("/buy");
  };

  useStartTyping(() => {
    if (pathname !== "/buy") router.push("/buy");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchButton();
    }
  };

  const handleOnChange = (e: any) => {
    e.preventDefault();
    const str = e.target.value.toString().trim();
    setQuery(str);
    if (pathname !== "/buy") {
      setTimeout(() => {
        router.push("/buy");
      }, 2000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full gap-2">
        <Input
          ref={inputRef}
          size="md"
          color="primary"
          className="px-0 rounded-full w-[100%] sm:w-[100%] "
          placeholder="search your dream car"
          type="text"
          onKeyDown={handleKeyPress}
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
