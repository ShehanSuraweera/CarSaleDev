"use client";
import React, { useEffect, useTransition } from "react";
import { useState } from "react";
import InputImages from "@/src/components/InputImages";
import {
  Spinner,
  Radio,
  RadioGroup,
  Checkbox,
  Input,
  Textarea,
  Button,
  Form,
  useDisclosure,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { updateField } from "@/src/redux/features/ad/adFormSlice";
import AdPreview from "@/src/components/AdPreview";
import VehicleAbout from "@/src/components/VehicleAbout";
import OwnerDetails from "@/src/components/OwnerDetails";
import VehicleBackground from "@/src/components/VehicleBackground";
import VehicleTypes from "@/src/components/VehicleTypes";
import PriceHandle from "@/src/components/PriceHandle";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );

  // Update localStorage whenever adData changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("AdData", JSON.stringify(adFormData));
    }
  }, [adFormData]);

  const validateForm = () => {
    return true;
  };

  // Your profile page content here

  const handlAdPreview = () => {
    if (!validateForm()) {
      toast.error("Please Input valid details!");
      return;
    }

    onOpen();
  };

  return (
    <>
      <Form validationBehavior="native">
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
          <OwnerDetails />
          <VehicleTypes />
          {adFormData.vehicle_type !== "" && <VehicleAbout />}

          {adFormData.make !== "" && <VehicleBackground />}

          {adFormData.vehicle_condition !== "" && <PriceHandle />}

          {adFormData.fuel_type !== "" && (
            <>
              <div className=" sm:w-[90%] shadow-md  w-full  p-8">
                <Textarea
                  variant="flat"
                  label="Owner Comments:"
                  value={adFormData.owner_comments}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        field: "owner_comments",
                        value: e.target.value,
                      })
                    )
                  }
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="col-span-12 mb-6 md:col-span-6 md:mb-0"
                  name="owner_comments"
                />
              </div>
              <InputImages />
            </>
          )}

          <div>
            {isPending && (
              <div className="fixed z-50 flex items-center inset-1/2 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                  <Spinner
                    color="success"
                    label="loading"
                    labelColor="success"
                  />
                </div>
              </div>
            )}
          </div>
          <>
            <AdPreview isOpen={isOpen} onOpenChange={onOpenChange} />
            <div className="flex justify-center w-full h-10 ">
              <Button
                color="success"
                radius="lg"
                onPress={handlAdPreview}
                isDisabled={isPending}
                isLoading={isPending}
                className=" md:w-[40%] w-[80%] h-[50px]  bg-[#FDC221] dark:bg-[#01172F] dark:text-[#FDC221] "
              >
                Show Ad Preview and Post Ad
              </Button>
            </div>
          </>
        </div>
      </Form>
    </>
  );
}
