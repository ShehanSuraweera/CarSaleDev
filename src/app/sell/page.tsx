"use client";
import React, { useState, useEffect } from "react";
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
  const { adFormData } = useSelector((state: RootState) => state.adForm);

  // Track which sections have been rendered at least once
  const [renderedComponents, setRenderedComponents] = useState({
    vehicleTypes: false,
    vehicleAbout: false,
    vehicleBackground: false,
    priceHandle: false,
  });

  useEffect(() => {
    if (
      adFormData.owner_display_name &&
      adFormData.owner_contact &&
      adFormData.city.name
    ) {
      setRenderedComponents((prev) => ({ ...prev, vehicleTypes: true }));
    }
    if (adFormData.vehicle_type.id !== 0) {
      setRenderedComponents((prev) => ({ ...prev, vehicleAbout: true }));
    }
    if (
      adFormData.transmission_type.name &&
      adFormData.build_year &&
      adFormData.body_type?.name &&
      adFormData.model.name
    ) {
      setRenderedComponents((prev) => ({ ...prev, vehicleBackground: true }));
    }
    if (adFormData.fuel_type.name && adFormData.vehicle_condition.name) {
      setRenderedComponents((prev) => ({ ...prev, priceHandle: true }));
    }
  }, [adFormData]);

  return (
    <>
      <Form validationBehavior="native">
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
          <OwnerDetails />

          {(renderedComponents.vehicleTypes ||
            (adFormData.owner_display_name &&
              adFormData.owner_contact &&
              adFormData.city.name)) && <VehicleTypes />}

          {(renderedComponents.vehicleAbout ||
            adFormData.vehicle_type.id !== 0) && <VehicleAbout />}

          {(renderedComponents.vehicleBackground ||
            (adFormData.transmission_type.name &&
              adFormData.build_year &&
              adFormData.body_type?.name &&
              adFormData.model.name)) && <VehicleBackground />}

          {(renderedComponents.priceHandle ||
            (adFormData.fuel_type.name &&
              adFormData.vehicle_condition.name)) && (
            <>
              <PriceHandle />
              <div className="sm:w-[90%] shadow-md w-full p-8">
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
