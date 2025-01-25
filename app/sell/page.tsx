"use client";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import {
  carMakes,
  districts,
  transmissionTypes,
  toyotaModels,
  bodyTypes,
  yom,
  fuelTypes,
  engines,
  conditions,
  vehicleTypes,
} from "@/data/search";

import { useState } from "react";
import OwnerDetails from "@/components/OwnerDetails";
import VehicleAbout from "@/components/VehicleAbout";
import VehicleBackground from "@/components/VehicleBackground";
import apiClient from "@/services/api-client";
import InputImages from "@/components/InputImages";
import { convertAndUploadBlobs } from "@/config/uploadBlobs";
import { useRouter } from "next/navigation";
import {
  Modal,
  Spinner,
  Radio,
  RadioGroup,
  Checkbox,
  Input,
  Textarea,
  Button,
  Alert,
} from "@heroui/react";

// Function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function Page() {
  const { user } = useContext(UserContext) || {};
  const [vehicle, setVehicle] = useState("Car");
  const [price, setPrice] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState("yes");
  const [ownerComments, setOwnerComments] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const router = useRouter();
  const [ownerDetails, setOwnerDetails] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    email: user?.email || "",
  });
  const [vehicleAbout, setVehicleAbout] = useState({
    make: "",
    model: "",
    frameCode: "",
    yom: "",
    transmission: "",
    bodyType: "",
  });
  const [vehicleBackground, setVehicleBackground] = useState({
    condition: "",
    yor: "",
    milage: "",
    engine: "",
    colour: "",
    fuelType: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]); // State to hold image URLs

  // Function to handle image updates from the child component
  const handleImagesChange = (images: string[]) => {
    setImageUrls(images);
  };

  const title = "Upload Succesfull";
  const description =
    "Your ad has been uploaded successfully. We'll notify you when updates are available.";

  const handlePriceChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setPrice(value);
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setFormattedPrice("Rs. " + formatNumber(numericValue));
    } else {
      setFormattedPrice("");
    }
  };
  const handleDisplayPriceChange = (value: string) => {
    setDisplayPrice(value);
  };

  const handleOnClose = () => {
    setSuccessPopup(false);
    router.push("/profile");
  };

  const handlePostAd = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      imageUrls.forEach((url) => {
        formData.append("images", url);
      });

      // Append other form data to the FormData object
      formData.append("owner_username", user?.user_name || "");
      formData.append("make", vehicleAbout.make);
      formData.append("model", vehicleAbout.model);
      formData.append("frame_code", vehicleAbout.frameCode);
      formData.append("build_year", String(vehicleAbout.yom));
      formData.append("transmission", vehicleAbout.transmission);
      formData.append("body_type", vehicleAbout.bodyType);
      formData.append("vehicle_condition", vehicleBackground.condition);
      formData.append("reg_year", String(vehicleBackground.yor));
      formData.append("mileage", String(vehicleBackground.milage));
      formData.append("engine", vehicleBackground.engine);
      formData.append("colour", vehicleBackground.colour);
      formData.append("fuel_type", vehicleBackground.fuelType);
      formData.append("price", String(price));
      formData.append("owner_comments", ownerComments);
      formData.append("owner_contact", ownerDetails.phone);
      formData.append("ad_location", ownerDetails.city);
      formData.append("owner_display_name", ownerDetails.name);
      formData.append("is_negotiable", isNegotiable ? "TRUE" : "FALSE");
      formData.append("vehicle_type", vehicle);

      const response = await apiClient.post("/uploads/create", formData, {
        // Post the ad to the server
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let adId = 0;

      if (response.status === 201) {
        const data = response.data; // Access data directly
        adId = data.adId;
        console.log("Ad ID:", data.adId);
        console.log("Ad posted successfully!"); // Access adId
      } else {
        console.error("Failed to post ad:", response.status);
      }

      const bucketName = "ad_pics"; // Supabase storage bucket name
      try {
        await convertAndUploadBlobs(
          imageUrls,
          adId.toString(),

          bucketName
        ); // Upload images to Supabase storage
        console.log("All images uploaded successfully!");

        setSuccessPopup(true);
        setLoading(false); // Set loading to false when upload is complete
      } catch (error) {
        console.error("Error uploading images:", error);
        setLoading(false); // Hide loading state if there's an error
      }
    } catch (error) {
      console.error("Error posting ad:", error);
      setLoading(false); // Hide loading state if there's an error
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
      <OwnerDetails setOwnerDetails={setOwnerDetails} />

      <div className=" sm:w-[90%] shadow-md w-full p-8   ">
        <h2></h2>
        <div className="flex flex-col gap-3 ">
          <RadioGroup
            label="Select your Vehicle type"
            value={vehicle}
            onValueChange={setVehicle}
          >
            {vehicleTypes.map((item, index) => (
              <Radio key={index} value={item.label}>
                {" "}
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
          <p className="text-default-500 text-small">Selected: {vehicle}</p>
        </div>
      </div>

      <VehicleAbout
        carMakes={carMakes}
        toyotaModels={toyotaModels}
        yom={yom}
        transmissionTypes={transmissionTypes}
        bodyTypes={bodyTypes}
        setVehicleAbout={setVehicleAbout}
      />
      <VehicleBackground
        yor={yom}
        condition={conditions}
        engine={engines}
        fuel={fuelTypes}
        setVehicleBackground={setVehicleBackground}
      />

      <div className=" sm:w-[90%] shadow-md  w-full  p-8">
        <RadioGroup
          label="Do you like to display price ?"
          orientation="horizontal"
          value={displayPrice}
          onValueChange={handleDisplayPriceChange}
          className="mb-6"
          size="sm"
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>
        {displayPrice === "yes" && (
          <>
            <div className="flex flex-col justify-between gap-4 sm:flex-row ">
              <Input
                type="number"
                label="Price (Rs)"
                labelPlacement="outside"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g 6000000, 1500000 "
                value={price}
                onChange={handlePriceChange}
                endContent={
                  <Checkbox
                    defaultSelected={false}
                    onChange={(e) =>
                      !isNegotiable
                        ? setIsNegotiable(true)
                        : setIsNegotiable(false)
                    }
                    className=""
                    size="sm"
                  >
                    Negotiable
                  </Checkbox>
                }
              />
              <div className=" sm:w-[50%] mt-4 sm:mt-0 text-sm flex flex-col gap-2">
                {formattedPrice && <p>You entered price : </p>}
                <p className="text-lg font-semibold">{formattedPrice}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className=" sm:w-[90%] shadow-md  w-full  p-8">
        <Textarea
          variant="flat"
          label="Owner Comments:"
          labelPlacement="outside"
          placeholder="Enter your description"
          className="col-span-12 mb-6 md:col-span-6 md:mb-0"
          value={ownerComments}
          onChange={(e) => setOwnerComments(e.target.value)}
        />
      </div>
      <InputImages onImagesChange={handleImagesChange} />
      <div>
        {loading && (
          <div className="fixed z-50 flex items-center inset-1/2 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <Spinner color="success" label="loading" labelColor="success" />
            </div>
          </div>
        )}
      </div>

      <>
        {successPopup ? (
          <Alert
            color="success"
            description={description}
            isVisible={successPopup}
            title={title}
            variant="faded"
            onClose={() => handleOnClose()}
          />
        ) : (
          <div className="flex justify-center w-full h-10 ">
            <Button
              color="success"
              radius="lg"
              onPress={handlePostAd}
              isDisabled={loading}
              className=" md:w-[40%] w-[80%]  bg-[#FDC221] dark:bg-[#01172F] dark:text-[#FDC221] "
            >
              Post AD
            </Button>
          </div>
        )}
      </>
    </div>
  );
}
