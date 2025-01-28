import { Button } from "@heroui/button";
import React from "react";
import { UserIcon } from "./icons";
import { Tab, Tabs } from "@heroui/react";
import MiddleTab from "./MiddleTab";

const SideBar = () => {
  const [selected, setSelected] = React.useState("photos");

  return (
    <div className="">
      <div className="flex flex-col items-center w-full gap-2 mt-5">
        <div className="flex flex-row items-end justify-center w-full gap-2 mt-10"></div>
      </div>
    </div>
  );
};

export default SideBar;
