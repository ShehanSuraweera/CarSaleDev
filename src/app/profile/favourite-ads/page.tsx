import React from "react";
import NavTabs from "../NavTabs";
import FavouriteAdsContent from "@/src/components/FavouriteAdsContent";

const page = () => {
  return (
    <div className="flex-1 p-4">
      <NavTabs />
      <FavouriteAdsContent />
    </div>
  );
};

export default page;
