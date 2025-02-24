import { Skeleton } from "@heroui/react";
import React from "react";

const SmallAdSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[200px] sm:h-[220px] md:h-[310px] gap-4 px-0 pt-4 mx-1 mb-4 rounded-md shadow-md">
      {/* Skeleton for image */}
      <Skeleton className="w-[80%] sm:w-[90%] sm:h-[100px] md:h-[140px] h-[80px] rounded-md" />

      {/* Skeleton for text */}
      <div className="flex flex-col items-center justify-end w-full p-1">
        <Skeleton className="w-3/4 h-4 mb-2 rounded-md" />
        <Skeleton className="w-1/2 h-4 mb-2 rounded-md" />
        <Skeleton className="w-1/3 h-4 rounded-md" />
      </div>
    </div>
  );
};

export default SmallAdSkeleton;
