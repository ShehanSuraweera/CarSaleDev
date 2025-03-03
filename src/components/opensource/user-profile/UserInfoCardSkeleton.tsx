"use client";
import { Skeleton } from "@heroui/react"; // Assuming you have a Skeleton component in your UI library

export default function UserInfoCardSkeleton() {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          {/* Heading Skeleton */}
          <Skeleton className="w-48 h-6 mb-6 rounded-md" />{" "}
          {/* Heading: "Personal Information" */}
          {/* Personal Information Skeleton */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {/* Name Skeleton */}
            <div>
              <Skeleton className="w-20 h-4 mb-2 rounded-md" />{" "}
              {/* Label: "Name" */}
              <Skeleton className="w-32 h-5 rounded-md" /> {/* Value */}
            </div>

            {/* Email Address Skeleton */}
            <div>
              <Skeleton className="w-24 h-4 mb-2 rounded-md" />{" "}
              {/* Label: "Email Address" */}
              <Skeleton className="w-40 h-5 rounded-md" /> {/* Value */}
            </div>

            {/* Phone Skeleton */}
            <div>
              <Skeleton className="w-20 h-4 mb-2 rounded-md" />{" "}
              {/* Label: "Phone" */}
              <Skeleton className="w-32 h-5 rounded-md" /> {/* Value */}
            </div>

            {/* User Type Skeleton */}
            <div>
              <Skeleton className="w-20 h-4 mb-2 rounded-md" />{" "}
              {/* Label: "User Type" */}
              <Skeleton className="w-32 h-5 rounded-md" /> {/* Value */}
            </div>
          </div>
        </div>

        {/* Edit Button Skeleton */}
        <Skeleton className="w-full h-12 rounded-full lg:w-32" />
      </div>
    </div>
  );
}
