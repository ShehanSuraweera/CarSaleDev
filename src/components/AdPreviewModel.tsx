import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useState } from "react";
import CarAd from "./Cars/CarAd";
import TimeAgo from "./TimeAgo";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

export interface CarAdProps {
  build_year: string;
  make: string;
  model: string;
  frame_code: string;
  owner_display_name: string;
  vehicle_condition: string;
  ad_location: string;
  created_at: string;
  ad_images: string;
  owner_contact: string;
  price: string;
  is_negotiable: boolean;
  mileage: string;
  body_type: string;
  engine: string;
  transmission: string;
  fuel_type: string;
  reg_year: string;
  owner_comments: string;
  views: number;
  colour: string;
}

interface AdPreviewModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  car: CarAdProps;
}

const AdPreviewModel = ({
  isOpen,
  onOpen,
  onOpenChange,
  car,
}: AdPreviewModelProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="container w-full mx-0 my-3 rounded-lg sm:my-2 md:px-12 sm:p-6 xl:px-40">
                  <div className="px-2 py-2 bg-white rounded-md shadow-md sm:py-5 dark:bg-slate-900 sm:px-10 lg:px-24 ">
                    <h1 className="mb-2 text-2xl font-semibold">
                      {car?.build_year +
                        " " +
                        car?.make +
                        " " +
                        car?.model +
                        " " +
                        car?.frame_code}
                    </h1>

                    <p className="mb-4 text-gray-600">
                      {car?.owner_display_name +
                        " - " +
                        car?.vehicle_condition +
                        " - " +
                        car?.ad_location}
                    </p>
                    <div className="flex justify-end mb-4 text-xs">
                      <TimeAgo createdAt={car?.created_at || ""} />
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                      <div className="w-full ">
                        <Swiper
                          style={
                            {
                              "--swiper-navigation-color": "#2980b9",
                              "--swiper-pagination-color": "#2980b9",
                            } as React.CSSProperties
                          }
                          loop={true}
                          spaceBetween={12}
                          navigation={true}
                          thumbs={{ swiper: thumbsSwiper }}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="w-full h-auto "
                        >
                          {car?.ad_images.map(
                            (image: { image_url: string }) => (
                              <SwiperSlide
                                key={image.image_url}
                                className="flex items-center justify-center text-xl text-center"
                              >
                                <Image
                                  id={image.image_url}
                                  src={
                                    image.image_url === "" || !image.image_url
                                      ? "/images/no-image.png"
                                      : image.image_url
                                  }
                                  alt={image.image_url}
                                  width={500}
                                  height={500}
                                  className="block w-full h-[250px]  sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-contain  rounded-xl   px-2 py-1 mb-2"
                                />
                              </SwiperSlide>
                            )
                          )}
                        </Swiper>
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          loop={true}
                          spaceBetween={4}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="w-full mt-4 h-auto md:mb-5 pb-2 xl:w-[85%]"
                        >
                          {car?.ad_images.map(
                            (image: {
                              image_url: string;
                              created_at: string;
                            }) => (
                              <SwiperSlide
                                key={image.created_at}
                                className=" swiper-slide-thumb-active"
                              >
                                <Image
                                  id={image.created_at}
                                  src={
                                    image.image_url === "" || !image.image_url
                                      ? "/images/no-image.png"
                                      : image.image_url
                                  }
                                  alt={image.image_url}
                                  width={500}
                                  height={500}
                                  className="block w-full h-[60px] sm:h-[70px] lg:h-[90px] xl:h-[100px] object-contain hover:cursor-pointer mb-1   p-1 shadow-md rounded-md"
                                />
                              </SwiperSlide>
                            )
                          )}
                        </Swiper>
                      </div>
                      <div className="w-full mt-4 lg:mt-0 xl:px-10">
                        <div className="flex justify-between w-full gap-2 text-white rounded-md ">
                          <div className="font-semibold text-lg mb-2 bg-[#130F40] w-1/2 p-2 text-center rounded-xl shadow-md">
                            {car?.owner_contact}
                            <div
                              className={`text-xs font-light ${
                                car?.is_negotiable ? "block" : "hidden"
                              }`}
                            >
                              Call
                            </div>
                          </div>
                          <div className="flex flex-col w-1/2 p-2 mb-2 text-lg font-semibold text-center shadow-md bg-slate-500 rounded-xl">
                            {car?.price === "negotiable"
                              ? car?.price
                              : `Rs. ${formatNumber(Number(car?.price))}`}
                            <div className="text-xs font-light ">
                              {car?.is_negotiable && "(Negotiable)"}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between gap-1 mt-4 text-sm md:text-base gap-x-4">
                          <p className="mb-1">
                            <strong>Odometer : </strong> {car?.mileage} km
                          </p>
                          <p className="mb-1">
                            <strong>Body type : </strong> {car?.body_type}
                          </p>
                          <p className="mb-1">
                            <strong>Engine : </strong> {car?.engine}
                          </p>
                          <p className="mb-1">
                            <strong>Transmission : </strong> {car?.transmission}
                          </p>
                          <p className="mb-1">
                            <strong>Fuel Type : </strong> {car?.fuel_type}
                          </p>
                          <p className="mb-1">
                            <strong>YOM : </strong> {car?.build_year}
                          </p>
                          <p className="mb-1">
                            <strong>YOR : </strong> {car?.reg_year}
                          </p>
                          <p className="mb-1">
                            <strong>Make : </strong> {car?.make}
                          </p>
                          <p className="mb-1">
                            <strong>Model : </strong>
                            {car?.model + " " + car?.frame_code}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-6 xl:px-10 md:text-base">
                      <h3 className="mb-2 font-semibold">Owner Comments</h3>
                      <pre className="w-full overflow-hidden text-sm break-words whitespace-pre-wrap md:text-base text-ellipsis">
                        {car?.owner_comments}
                      </pre>
                    </div>
                    <div className="flex justify-end mt-4 text-sm">
                      <span>{car?.views} views</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdPreviewModel;
