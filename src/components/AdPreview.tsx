import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useEffect, useState, useTransition } from "react";
import { AdData } from "../types";
import Ad from "./Ad";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../redux/store";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { createAd, editAd } from "../lib/api";
import { useUser } from "../UserContext";

const AdPreview = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { adFormData } = useSelector((state: RootState) => state.adForm);
  const image_urls = adFormData?.images || [];
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const formData = () => {
    const formData = new FormData();

    // Append all fields from `adFormData` to the FormData object
    Object.entries(adFormData).forEach(([key, value]) => {
      if (value === null || value === undefined) return; // Skip null/undefined values

      if (key === "images" && Array.isArray(value)) {
        value.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, value.toString());
      }
    });

    formData.append("model_id", adFormData.model.id.toString());

    return formData;
  };

  // Sync adData directly with Redux store and adFormData
  const handlePostAd = async () => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        // Call the API to create the ad
        const result = await createAd(formData(), image_urls);

        if (result === "Adposted") {
          toast.success(
            "Your ad has been uploaded successfully. We'll notify you when updates are available.",
            { duration: 5000 }
          );
          setIsLoading(false);
          persistor.purge();
          router.push("/profile");
        } else {
          toast.error(result);
          console.error("Failed to post ad:", result);
        }
      } catch (error) {
        console.error("Error posting ad:", error);
        toast.error("An error occurred while posting the ad.");
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleEditAd = async () => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        // Call the API to create the ad
        const result = await editAd(formData(), image_urls);

        if (result === "AdEdited") {
          toast.success(
            "Your ad has been edited successfully. We'll notify you when updates are available.",
            { duration: 5000 }
          );
          setIsLoading(false);
          persistor.purge();
          router.push("/profile");
        } else {
          toast.error(result);
          console.error("Failed to post ad:", result);
        }
      } catch (error) {
        console.error("Error posting ad:", error);
        toast.error("An error occurred while posting the ad.");
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        className="pb-5"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your Ad Preview
              </ModalHeader>
              <ModalBody className="w-full px-20 py-4">
                <Ad adData={adFormData} />
              </ModalBody>
              <ModalFooter className="flex justify-end w-full">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                {pathname === "/sell" ? (
                  <Button
                    color="warning"
                    className="w-[50%] h-25 font-semibold"
                    type="submit"
                    isLoading={isLoading}
                    onPress={handlePostAd}
                  >
                    Post Ad
                  </Button>
                ) : (
                  <Button
                    color="warning"
                    className="w-[50%] h-25 font-semibold"
                    type="submit"
                    isLoading={isLoading}
                    onPress={handleEditAd}
                  >
                    Edit Ad
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdPreview;
