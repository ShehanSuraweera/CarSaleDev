import React from "react";
import { Skeleton } from "@heroui/react";

const AdSkeleton = () => {
  return (
    <div className="w-full h-full p-4 sm:p-6">
      <Skeleton className="w-3/4 h-8 mb-2 rounded-lg" />
      <Skeleton className="w-1/2 h-5 mb-2 rounded-lg" />
      <Skeleton className="w-1/3 h-4 mb-4 rounded-lg" />
      <div className="flex justify-end mb-4 rounded-lg">
        <Skeleton className="w-1/4 h-4 rounded-lg" />
      </div>

      {/* Image Swiper */}
      <div className="w-full mb-4">
        <Skeleton className="w-full h-[250px]  sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] rounded-xl" />
      </div>
      <div className="flex justify-around gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-md w-28" />
        ))}
      </div>

      {/* Contact & Price */}
      <div className="flex gap-2 mt-4">
        <Skeleton className="w-1/2 h-10 rounded-lg" />
        <Skeleton className="w-1/2 h-10 rounded-lg" />
      </div>

      {/* Details */}
      <div className="mt-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-full h-5 mb-2 rounded-lg" />
        ))}
      </div>

      {/* Owner Comments */}
      <div className="mt-6">
        <Skeleton className="w-1/3 h-6 mb-2 rounded-lg" />
        <Skeleton className="w-full h-16 rounded-md" />
      </div>

      {/* Views */}
      <div className="flex justify-end mt-4">
        <Skeleton className="w-1/6 h-4 rounded-lg" />
      </div>
    </div>
  );
};

export default AdSkeleton;
