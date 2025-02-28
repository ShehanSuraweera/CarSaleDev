import React from "react";
import NavTabs from "../NavTabs";
import MyadsContent from "@/src/components/MyadsContent";

const page = () => {
  return (
    <div className="flex-1 p-4">
      <NavTabs />
      <MyadsContent />
    </div>
  );
};

export default page;
