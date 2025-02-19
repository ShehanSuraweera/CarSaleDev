"use client";
import React from "react";
import InputImages from "@/src/components/InputImages";
import { Spinner, Textarea, Form } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { updateField } from "@/src/redux/features/ad/adFormSlice";
import VehicleAbout from "@/src/components/VehicleAbout";
import OwnerDetails from "@/src/components/OwnerDetails";
import VehicleBackground from "@/src/components/VehicleBackground";
import VehicleTypes from "@/src/components/VehicleTypes";
import PriceHandle from "@/src/components/PriceHandle";
import AdPreviewButton from "@/src/components/AdPreviewButton";

export default function Page() {
  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );

  return (
    <>
      <Form validationBehavior="native">
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
          <OwnerDetails />
          <VehicleTypes />
          {adFormData.vehicle_type.id !== 0 && <VehicleAbout />}

          {adFormData.make.name !== "" ||
            (adFormData.vehicle_type.id !== 0 && <VehicleBackground />)}

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
        </div>
      </Form>
      <AdPreviewButton />
    </>
  );
}
