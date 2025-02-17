import React from "react";
import AdPreview from "./AdPreview";
import toast from "react-hot-toast";
import { Button, useDisclosure } from "@heroui/react";
import { usePathname } from "next/navigation";

const AdPreviewButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const pathname = usePathname();

  const validateForm = () => {
    console.log(pathname);
    return true;
  };
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
      <div className="flex justify-center w-full h-10 ">
        <Button
          color="success"
          radius="lg"
          onPress={handlAdPreview}
          className=" md:w-[40%] w-[80%] h-[50px]  bg-[#FDC221] dark:bg-[#01172F] dark:text-[#FDC221] "
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
