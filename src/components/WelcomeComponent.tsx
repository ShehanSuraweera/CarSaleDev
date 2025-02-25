import React from "react";
import Image from "next/image";
import homeImage from "@/src/assets/images/home_image_1.webp";
import Search from "./Search";

function WelcomeComponent() {
  return (
    <div className="relative w-full p-5 my-10 rounded-md shadow-md h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={homeImage} // Change to the correct path or external URL
          alt="Car Dealership"
          layout="fill"
          className="object-cover rounded-md opacity-100"
        />
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 p-10 text-2xl font-semibold text-center text-white bg-black bg-opacity-50 rounded-md">
        Welcome to Sri Lanka's Number 01 Vehicle Selling Platform!
      </div>

      <div className="relative z-10 flex items-center justify-center p-4 text-2xl font-semibold text-center text-white bg-black bg-opacity-50 rounded-md sm:p-10 top-10">
        <Search />
      </div>
    </div>
  );
}

export default WelcomeComponent;
