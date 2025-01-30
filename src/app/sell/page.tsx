"use client";
import React, { useEffect, useTransition } from "react";
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
} from "@/src/data/search";

import { useState } from "react";
import OwnerDetails from "@/src/components/OwnerDetails";
import VehicleAbout from "@/src/components/VehicleAbout";
import VehicleBackground from "@/src/components/VehicleBackground";
import InputImages from "@/src/components/InputImages";
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
  Form,
} from "@heroui/react";
import { User } from "@supabase/supabase-js";
import { UserProfileData } from "@/src/types";
import { createSupabaseClient } from "@/src/auth/client";
import { createAd, getUserProfileData } from "@/src/lib/api";
import toast from "react-hot-toast";

// Function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);

  const [vehicle, setVehicle] = useState("Car");
  const [price, setPrice] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState("yes");
  const [ownerComments, setOwnerComments] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [ownerName, setOwnerName] = useState(userProfileData?.name || "");
  const [ownerPhone, setOwnerPhone] = useState(userProfileData?.phone || "");
  const [ownerCity, setOwnerCity] = useState(userProfileData?.city || "");
  const [ownerEmail, setOwnerEmail] = useState(userProfileData?.email || "");

  const router = useRouter();

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

  useEffect(() => {
    const { auth } = createSupabaseClient();

    const { data: authListener } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      startTransition(async () => {
        try {
          const fetchUserProfile = await getUserProfileData(user.id as string);

          setOwnerName(fetchUserProfile[0].name || "");
          setOwnerPhone(fetchUserProfile[0].phone || "");
          setOwnerCity(fetchUserProfile[0].city || "");
          setOwnerEmail(fetchUserProfile[0].email || "");
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      });
    }
  }, [user]);

  // Function to handle image updates from the child component
  const handleImagesChange = (images: string[]) => {
    setImageUrls(images);
  };

  // Your profile page content here

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

  const handlePostAd = async () => {
    startTransition(async () => {
      const formData = new FormData();
      imageUrls.forEach((url) => {
        formData.append("images", url);
      });

      console.log("FormData entries:", Array.from(formData.entries()));

      formData.append("user_id", user?.id as string);
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
      formData.append("owner_contact", ownerPhone);
      formData.append("ad_location", ownerCity);
      formData.append("owner_display_name", ownerName);
      formData.append("is_negotiable", isNegotiable ? "TRUE" : "FALSE");
      formData.append("vehicle_type", vehicle);

      const result = await createAd(formData, imageUrls);

      if (result === "Adposted") {
        toast.success(
          "Your ad has been uploaded successfully. We'll notify you when updates are available.",
          {
            duration: 5000,
          }
        );
        router.push("/profile");
      } else {
        toast.error("Failed to post ad");
        console.error("Failed to post ad:", result);
      }
    });
  };
  return (
    <Form validationBehavior="native" onSubmit={handlePostAd}>
      <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
        <OwnerDetails
          name={ownerName}
          phone={ownerPhone}
          city={ownerCity}
          setName={setOwnerName}
          setPhone={setOwnerPhone}
          setCity={setOwnerCity}
          email=""
          avatar_url=""
        />

        <div className=" sm:w-[90%] shadow-md w-full p-8   ">
          <h2></h2>
          <div className="flex flex-col gap-3 ">
            <RadioGroup
              isRequired={true}
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
          {isPending && (
            <div className="fixed z-50 flex items-center inset-1/2 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <Spinner color="success" label="loading" labelColor="success" />
              </div>
            </div>
          )}
        </div>

        <>
          <div className="flex justify-center w-full h-10 ">
            <Button
              color="success"
              radius="lg"
              type="submit"
              isDisabled={isPending}
              isLoading={isPending}
              className=" md:w-[40%] w-[80%]  bg-[#FDC221] dark:bg-[#01172F] dark:text-[#FDC221] "
            >
              Post AD
            </Button>
          </div>
        </>
      </div>
    </Form>
  );
}
