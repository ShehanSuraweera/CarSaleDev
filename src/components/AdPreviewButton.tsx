import React, { useEffect, useState } from "react";
import AdPreview from "./AdPreview";
import toast from "react-hot-toast";
import { Button, useDisclosure } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AdPreviewButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const [isDisable, setIsDisable] = useState(true);

  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );

  const validateForm = () => {
    const a = adFormData;
    if (
      a.owner_display_name !== "" &&
      a.city.name !== "" &&
      a.vehicle_type?.id !== 0 &&
      a.make.name !== "" &&
      a.model.name !== "" &&
      a.build_year !== "" &&
      a.transmission_type.name !== "" &&
      a.body_type.name !== "" &&
      a.vehicle_condition.name !== "" &&
      a.fuel_type.name !== "" &&
      a.images.length > 0 &&
      !errors.owner_contact
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    console.log(validateForm());
    if (validateForm()) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [adFormData]);

  const handlAdPreview = () => {
    if (!validateForm()) {
      toast.error("Please Input valid details!");
      return;
    }

    onOpen();
  };
  return (
    <>
      <AdPreview isOpen={isOpen} onOpenChange={onOpenChange} />
      {!validateForm() && (
        <div className="flex justify-center text-sm text-center">
          <span className="text-red-500">
            Please fill all required fields *{" "}
          </span>
        </div>
      )}
      <div className="flex justify-center w-full h-10 mt-10 mb-16">
        <Button
          color="success"
          radius="lg"
          onPress={handlAdPreview}
          className=" md:w-[40%] w-[80%] h-[50px]  bg-[#FDC221] dark:bg-[#01172F] dark:text-[#FDC221] "
          isDisabled={isDisable}
        >
          {pathname === "/sell"
            ? "Show Ad Preview and Post Ad"
            : "Show Ad Preview and Edit Ad"}
        </Button>
      </div>
    </>
  );
};

export default AdPreviewButton;
