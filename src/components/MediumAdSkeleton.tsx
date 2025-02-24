import { Skeleton } from "@heroui/react";
import React from "react";

const MediumAdSkeleton = () => {
  return (
    <div className="mb-7 relative shadow-md mt-2 sm:mt-2 w-[325px] sm:w-[280px] overflow-hidden sm:h-[300px] md:w-[370px] md:h-[340px] h-[250px] lg:w-[400px] dark:bg-[#000B17] rounded-lg flex flex-col justify-center items-center">
      <Skeleton className="sm:w-[55%] w-[70%] rounded-md sm:h-[110px] h-[120px] mt-2" />
      <Skeleton className="w-3/4 h-4 mt-1 rounded-md" />
      <Skeleton className="w-1/2 h-4 mt-1 rounded-md" />
      <div className="w-[100%] h-[140px] sm:h-[150px] md:h-[160px] bg-slate-50 dark:bg-[#000E1E] mt-1 rounded-md py-2 items-center justify-between flex flex-col">
        <Skeleton className="w-1/2 h-4 rounded-md" />
        <div className="  mt-2 md:mt-4  flex justify-between sm:justify-around gap-x-2   gap-y-1 sm:gap-y-2 md:gap-y-4  sm:gap-x-12 text-[#847E7E]   items-center  flex-wrap w-[95%]">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-1/4 h-4 rounded-md" />
        </div>
        <div className="flex items-center  justify-between w-[100%] text-[#130F40] mt-2  md:text-sm text-xs  dark:text-slate-500 px-2">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-1/4 h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default MediumAdSkeleton;
