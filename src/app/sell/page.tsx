"use client";
import React, { ReactEventHandler, useEffect, useTransition } from "react";
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
  Select,
  SelectItem,
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [vehicleCondition, setVehicleCondition] = useState("");

  const router = useRouter();

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

  const handleConditionChange = (value: string) => {
    if (value === "registered") {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
    setVehicleCondition(value);
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

  const handlePostAd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    let data = new FormData(e.currentTarget);
    console.log("data object", data);
    startTransition(async () => {
      const formData = new FormData();
      imageUrls.forEach((url) => {
        data.append("images", url);
      });
      data.append;
      console.log("FormData entries:", Array.from(formData.entries()));

      data.append("user_id", user?.id as string);
      data.append("is_negotiable", isNegotiable ? "TRUE" : "FALSE");
      // formData.append("make", vehicleAbout.make);
      // formData.append("model", vehicleAbout.model);
      // formData.append("frame_code", vehicleAbout.frameCode);
      // formData.append("build_year", String(vehicleAbout.yom));
      // formData.append("transmission", vehicleAbout.transmission);
      // formData.append("body_type", vehicleAbout.bodyType);
      // formData.append("vehicle_condition", vehicleBackground.condition);
      // formData.append("reg_year", String(vehicleBackground.yor));
      // formData.append("mileage", String(vehicleBackground.milage));
      // formData.append("engine", vehicleBackground.engine);
      // formData.append("colour", vehicleBackground.colour);
      // formData.append("fuel_type", vehicleBackground.fuelType);
      // formData.append("price", String(price));
      // formData.append("owner_comments", ownerComments);
      // formData.append("owner_contact", ownerPhone);
      // formData.append("ad_location", ownerCity);
      // formData.append("owner_display_name", ownerName);
      // formData.append("is_negotiable", isNegotiable ? "TRUE" : "FALSE");
      // formData.append("vehicle_type", vehicle);

      // console.log("formData", formData);
      console.log("data", JSON.stringify(Object.fromEntries(data.entries())));

      localStorage.setItem(
        "adFormData",
        JSON.stringify(Object.fromEntries(data.entries()))
      );

      const result = await createAd(data, imageUrls);

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
        <div className=" sm:w-[90%] shadow-md w-full   p-8">
          <h2>Owner Details</h2>
          <div className="flex flex-col items-start justify-start gap-8 mt-4">
            <Input
              name="owner_display_name"
              isRequired={true}
              type="string"
              label="Name"
              labelPlacement="outside"
              className="sm:max-w-96"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              description="This will display as owner name of the AD"
            />
            <Input
              name="owner_contact"
              isRequired={true}
              type="string"
              label="Contact"
              value={ownerPhone}
              labelPlacement="outside"
              className="sm:max-w-96"
              onChange={(e) => setOwnerPhone(e.target.value)}
              description="This will display as contact number of the AD"
            />
            <Input
              name="ad_location"
              isRequired={true}
              type="string"
              label="Location"
              value={ownerCity}
              labelPlacement="outside"
              className="sm:max-w-96"
              onChange={(e) => setOwnerCity(e.target.value)}
              description="This will display as Location"
            />
          </div>
        </div>
        <div className=" sm:w-[90%] shadow-md w-full p-8   ">
          <h2></h2>
          <div className="flex flex-col gap-3 ">
            <RadioGroup
              name="vehicle_type"
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

        <div className=" sm:w-[90%] shadow-md   p-8">
          <h1 className="text-lg font-medium">
            Let's start finding your car's make
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mt-5">
            <Select
              isRequired={true}
              labelPlacement="outside"
              label="Make"
              name="make"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g  Toyota, Honda, Mazda"
            >
              {carMakes.map((make) => (
                <SelectItem key={make.key} value={make.key}>
                  {make.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              isRequired={true}
              type="string"
              label="Model"
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Allion, Vezel, Maruti"
              name="model"
            />

            <Input
              type="string"
              label="Frame Code"
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g 260, RU1, "
              name="frame_code"
            />
            <Select
              isRequired={true}
              labelPlacement="outside"
              label="Build year"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g  2010, 2011, 2012,..."
              name="build_year"
            >
              {yom.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              isRequired={true}
              labelPlacement="outside"
              label="Transmission"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Automatic, Manual,..."
              name="transmission"
            >
              {transmissionTypes.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              isRequired={true}
              labelPlacement="outside"
              label="Body type"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Sedan, SUV, Hatchback, ... "
              name="body_type"
            >
              {bodyTypes.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className=" sm:w-[90%] shadow-md   p-8">
          <h1 className="text-lg font-medium">
            Let's start finding your car's background
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mt-5">
            <Select
              isRequired={true}
              labelPlacement="outside"
              label="Condition"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g  Registered, Unregistered, "
              name="vehicle_condition"
              value={vehicleCondition}
              onChange={(e) => {
                handleConditionChange(e.target.value);
              }}
            >
              {conditions.map((make) => (
                <SelectItem key={make.key} value={make.key}>
                  {make.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              labelPlacement="outside"
              label="Year of Registration"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g  2024, 2023, 2022"
              name="reg_year"
              isDisabled={!isRegistered}
            >
              {yom.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              type="string"
              label="Milage (km)"
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g 60000, 150000 "
              name="mileage"
            />

            <Input
              type="string"
              label="Engine"
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g e.g VVTi 1.5L "
              name="engine"
            />
            <Input
              type="string"
              label="Colour"
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Silver, White"
              name="colour"
            />
            <Select
              isRequired={true}
              labelPlacement="outside"
              label="Fuel Type"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Petrol, Diesel, Hybrid "
              name="fuel_type"
            >
              {fuelTypes.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
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
                  name="price"
                  type="number"
                  label="Price (Rs)"
                  labelPlacement="outside"
                  className="w-full text-black sm:max-w-96"
                  placeholder="e.g 6000000, 1500000 "
                  value={price}
                  onChange={handlePriceChange}
                  endContent={
                    <Checkbox
                      name="is_negotiable"
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
            name="owner_comments"
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
