import carImage from "@/src/assets/images/welcomeBlog.svg";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
// Ensure this is a car image with no background
import Search from "./Search";
import { gsap } from "gsap";

function WelcomeComponent() {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Fade-in animation for the text and image
    gsap.from([textRef.current, imageRef.current], {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div className="w-full p-5 my-10 rounded-md shadow-md bg-gradient-to-r from-[#F0F4F8] to-[#D9E2EC] dark:bg-gradient-to-r dark:from-[#01172F] dark:to-[#003366]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div
          ref={textRef}
          className="flex-1 text-center md:text-left space-y-6 text-[#01172F] dark:text-[#FDC221]"
        >
          <h1 className="text-4xl md:text-5xl font-bold  ">
            Welcome to Sri Lanka's #1 Vehicle Selling Platform!
          </h1>
          <p className="text-lg md:text-lg">
            Find your dream car with ease. Explore thousands of vehicles and get
            the best deals.
          </p>
          <div className="mt-6">
            <Search />
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imageRef}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="w-full max-w-md">
            <Image
              src={carImage}
              alt="Car"
              width={500}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;
