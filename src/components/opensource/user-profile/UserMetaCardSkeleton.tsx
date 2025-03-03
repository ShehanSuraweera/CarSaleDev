"use client";
import React from "react";
import { Skeleton } from "@heroui/react"; // Assuming you have a Skeleton component in your UI library

export default function UserMetaCardSkeleton() {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          {/* Avatar Skeleton */}
          <Skeleton className="w-20 h-20 rounded-full" />

          {/* User Info Skeleton */}
          <div className="order-3 xl:order-2">
            <Skeleton className="w-48 h-6 mb-2 rounded-md" /> {/* Name */}
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <Skeleton className="w-24 h-4 rounded-md" /> {/* User Type */}
              <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
              <Skeleton className="w-32 h-4 rounded-md" /> {/* Email */}
            </div>
          </div>

          {/* Social Links Skeleton */}
          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="rounded-full h-11 w-11" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
