import React from "react";
import { Kbd } from "@heroui/kbd";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";

const SearchInput = () => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}></Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="flex-shrink-0 text-base pointer-events-none text-default-400" />
      }
      type="search"
    />
  );
};

export default SearchInput;
