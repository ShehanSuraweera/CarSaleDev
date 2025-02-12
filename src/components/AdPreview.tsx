import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useEffect, useState, useTransition } from "react";
import { AdData, AdFormData } from "../types";
import Ad from "./Ad";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createAd } from "../lib/api";
import { useUser } from "../UserContext";
import { J } from "framer-motion/dist/types.d-CdW9auKD";

const AdPreview = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { adFormData } = useSelector((state: RootState) => state.adForm);
  const image_urls = useSelector(
    (state: RootState) => state.adForm.adFormData.imageUrls
  );
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize `adData` state
  const [adData, setAdData] = useState<AdData>({
    ad_id: "",
    make: adFormData.make || "",
    model: adFormData.model || "",
    frame_code: adFormData.frame_code || "",
    build_year: adFormData.build_year || "",
    transmission: adFormData.transmission || "",
    body_type: adFormData.body_type || "",
    vehicle_condition: adFormData.vehicle_condition || "",
    reg_year: adFormData.reg_year || "",
    mileage: adFormData.mileage || "",
    engine: adFormData.engine || "",
    colour: adFormData.colour || "",
    fuel_type: adFormData.fuel_type || "",
    price: adFormData.price || "",
    owner_comments: adFormData.owner_comments || "",
    owner_contact: adFormData.owner_contact || "",
    owner_display_name: adFormData.owner_display_name || "",
    is_negotiable: adFormData.is_negotiable || false,
    created_at: "",
    ad_images: image_urls.map((url) => ({
      image_url: url,
      created_at: "",
    })), // Initialize `ad_images` with correct format
    views: 0,
    cities: { name: "", districts: { name: "" } }, // Ensure `cities` matches the `AdData` type
  });

  // Sync `adData` with Redux store when `adFormData` or `image_urls` changes
  useEffect(() => {
    setAdData((prevAdData) => ({
      ...prevAdData,
      make: adFormData.make || "",
      model: adFormData.model || "",
      frame_code: adFormData.frame_code || "",
      build_year: adFormData.build_year || "",
      transmission: adFormData.transmission || "",
      body_type: adFormData.body_type || "",
      vehicle_condition: adFormData.vehicle_condition || "",
      reg_year: adFormData.reg_year || "",
      mileage: adFormData.mileage || "",
      engine: adFormData.engine || "",
      colour: adFormData.colour || "",
      fuel_type: adFormData.fuel_type || "",
      price: adFormData.price || "",
      owner_comments: adFormData.owner_comments || "",
      owner_contact: adFormData.owner_contact || "",
      owner_display_name: adFormData.owner_display_name || "",
      is_negotiable: adFormData.is_negotiable || false,
      ad_images: image_urls.map((url) => ({
        image_url: url,
        created_at: "",
      })),
    }));
  }, [adFormData, image_urls]);

  const handlePostAd = async () => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        const formData = new FormData();

        // Append all fields from `adData` to the FormData object
        Object.entries(adData).forEach(([key, value]) => {
          if (key === "ad_images") {
            // Handle `ad_images` separately
            value.forEach((image: { image_url: string }, index: number) => {
              formData.append(`images[${index}]`, image.image_url);
            });
          } else if (key === "cities") {
            // Handle nested `cities` object
            formData.append("city_name", value.name);
            formData.append("district_name", value.districts.name);
          } else if (key === "is_negotiable") {
            // Handle boolean value
            formData.append(key, value ? "true" : "false");
          } else {
            // Append other fields
            formData.append(key, value);
          }
        });

        // Append user ID
        formData.append("user_id", user?.id as string);

        console.log("Posting ad with data:", adData);

        // Call the API to create the ad
        const result = await createAd(formData, image_urls);

        if (result === "Adposted") {
          toast.success(
            "Your ad has been uploaded successfully. We'll notify you when updates are available.",
            {
              duration: 5000,
            }
          );
          setIsLoading(false);
          localStorage.removeItem("AdData");
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
                <Ad adData={adData} />
              </ModalBody>
              <ModalFooter className="flex justify-end w-full">
                <div>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                </div>
                <Button
                  color="warning"
                  className="w-[50%] h-25 font-semibold"
                  type="submit"
                  isLoading={isLoading}
                  onPress={handlePostAd}
                >
                  Post Ad
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdPreview;
