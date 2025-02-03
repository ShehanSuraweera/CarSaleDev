"use client";
import React, { useEffect, useRef, useTransition } from "react";
import {
  carMakes,
  transmissionTypes,
  toyotaModels,
  bodyTypes,
  yom,
  fuelTypes,
  engines,
  conditions,
  vehicleTypes,
} from "@/src/data/search";
import { getYear } from "date-fns";

import { useState } from "react";
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
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/src/auth/client";
import { createAd, getUserProfileData } from "@/src/lib/api";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";

import { Swiper as SwiperClass } from "swiper";
import Image from "next/image"; // Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const [yearOfRegistration, setYearOfRegistration] = useState<
    { key: string; label: string }[]
  >([]);
  const [isBrandNew, setIsBrandNew] = useState(false);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const thumbsSwiperRef = useRef<SwiperClass | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Ensure thumbsSwiper is set properly when Swiper initializes
  useEffect(() => {
    if (isOpen) {
      if (thumbsSwiperRef.current) {
        setThumbsSwiper(thumbsSwiperRef.current);
      }
    } else {
      setThumbsSwiper(null);
    }
  }, [isOpen]);

  const [formattedPrice, setFormattedPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState("yes");

  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const inputRefs = {
    owner_display_name: useRef<HTMLInputElement | null>(null),
    owner_contact: useRef<HTMLInputElement | null>(null),
    ad_location: useRef<HTMLInputElement | null>(null),
    vehicle_type: useRef<HTMLDivElement | null>(null),
    make: useRef<HTMLInputElement | null>(null),
    model: useRef<HTMLInputElement | null>(null),

    build_year: useRef<HTMLInputElement | null>(null),
    transmission: useRef<HTMLInputElement | null>(null),
    body_type: useRef<HTMLInputElement | null>(null),
    vehicle_condition: useRef<HTMLInputElement | null>(null),
    fuel_type: useRef<HTMLInputElement | null>(null),
    price: useRef<HTMLInputElement | null>(null),
    reg_year: useRef<HTMLInputElement | null>(null),
  };
  const [imageUrls, setImageUrls] = useState<string[]>([]); // State to hold image URLs

  const [adData, setAdData] = useState({
    make: "",
    model: "",
    frame_code: "",
    build_year: "",
    transmission: "",
    body_type: "",
    vehicle_condition: "",
    reg_year: "",
    mileage: "",
    engine: "",
    colour: "",
    fuel_type: "",
    price: "",
    owner_comments: "",
    owner_contact: "",
    ad_location: "",
    owner_display_name: "",
    is_negotiable: false,
    vehicle_type: "Cars",
  });

  // Only access localStorage in the browser
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedData = JSON.parse(localStorage.getItem("AdData") || "{}");

      setAdData((prevData) => ({
        ...prevData,
        make: savedData.make || "",
        model: savedData.model || "",
        frame_code: savedData.frame_code || "",
        build_year: savedData.build_year || "",
        transmission: savedData.transmission || "",
        body_type: savedData.body_type || "",
        vehicle_condition: savedData.vehicle_condition || "",
        reg_year: savedData.reg_year || "",
        mileage: savedData.mileage || "",
        engine: savedData.engine || "",
        colour: savedData.colour || "",
        fuel_type: savedData.fuel_type || "",
        price: savedData.price || "",
        owner_comments: savedData.owner_comments || "",
        owner_contact: savedData.owner_contact || "",
        ad_location: savedData.ad_location || "",
        owner_display_name: savedData.owner_display_name || "",
        is_negotiable:
          savedData.is_negotiable !== undefined
            ? savedData.isNegotiable
            : false,
        vehicle_type: savedData.vehicle_type || "Cars",
      }));
    }
  }, []);

  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    let firstErrorField: keyof typeof inputRefs | null = null;

    // Required fields validation
    if (!adData.owner_display_name.trim()) {
      errors.owner_display_name = "Name is required";
      if (!firstErrorField) firstErrorField = "owner_display_name";
    }
    if (!adData.owner_contact.trim()) {
      errors.owner_contact = "Contact is required";
      if (!firstErrorField) firstErrorField = "owner_contact";
    }
    if (!adData.ad_location.trim()) {
      errors.ad_location = "Location is required";
      if (!firstErrorField) firstErrorField = "ad_location";
    }
    if (!adData.vehicle_type.trim()) {
      errors.vehicle_type = "Vehicle type is required";
      if (!firstErrorField) firstErrorField = "vehicle_type";
    }
    if (!adData.make.trim()) {
      errors.make = "Car make is required";
      if (!firstErrorField) firstErrorField = "make";
    }
    if (!adData.model.trim()) {
      errors.model = "Car model is required";
      if (!firstErrorField) firstErrorField = "model";
    }
    if (!adData.body_type.trim()) {
      errors.body_type = "Body type is required";
      if (!firstErrorField) firstErrorField = "body_type";
    }
    if (!adData.transmission.trim()) {
      errors.transmission = "Transmission is required";
      if (!firstErrorField) firstErrorField = "transmission";
    }
    if (!adData.build_year.trim()) {
      errors.build_year = "Build year is required";
      if (!firstErrorField) firstErrorField = "build_year";
    }
    if (!adData.vehicle_condition.trim()) {
      errors.vehicle_condition = "Vehicle condition is required";
      if (!firstErrorField) firstErrorField = "vehicle_condition";
    }
    if (!adData.fuel_type.trim()) {
      errors.fuel_type = "Fuel type is required";
      if (!firstErrorField) firstErrorField = "fuel_type";
    }
    if (displayPrice === "yes" && !adData.price.trim()) {
      errors.price = "Price is required";
      if (!firstErrorField) firstErrorField = "price";
    }
    if (displayPrice === "yes" && !adData.price.trim()) {
      errors.price = "Price is required";
      if (!firstErrorField) firstErrorField = "price";
    } else if (
      (displayPrice === "yes" && !/^\d+$/.test(adData.price)) ||
      Number(adData.price) < 0
    ) {
      errors.price = "Price must be a valid number";
      if (!firstErrorField) firstErrorField = "price";
    }

    if (
      adData.vehicle_condition === "Registered (Used)" &&
      !adData.reg_year.trim()
    ) {
      errors.reg_year = "Registration year is required";
      if (!firstErrorField) firstErrorField = "reg_year";
    }

    // Phone number validation (example: must be 10 digits)
    if (!/^\d{10}$/.test(adData.owner_contact)) {
      errors.owner_contact = "Contact must be a 10-digit number";
      if (!firstErrorField) firstErrorField = "owner_contact";
    }

    setValidationErrors(errors);

    if (firstErrorField) {
      inputRefs[firstErrorField].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // If no errors, return true
    return Object.keys(errors).length === 0;
  };

  // Update localStorage whenever adData changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("AdData", JSON.stringify(adData));
    }
  }, [adData]);

  useEffect(() => {
    if (adData.build_year) {
      const years = Array.from(
        { length: currentYear - Number(adData.build_year) + 1 },
        (_, k) => ({
          key: (Number(adData.build_year) + k).toString(),
          label: (Number(adData.build_year) + k).toString(),
        })
      );
      setYearOfRegistration(years);
    }
  }, [adData.build_year, setAdData]);
  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setAdData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

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

          setAdData((prevData) => ({
            ...prevData,
            owner_display_name: fetchUserProfile[0].name || "",
            owner_contact: fetchUserProfile[0].phone || "",
            ad_location: fetchUserProfile[0].city || "",
          }));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      });
    }
  }, [user]);

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, k) => ({
    key: (currentYear - k).toString(),
    label: (currentYear - k).toString(),
  }));
  // Function to handle image updates from the child component
  const handleImagesChange = (images: string[]) => {
    setImageUrls(images);
  };

  const handleConditionChange = (value: string) => {
    setAdData((prevData) => ({
      ...prevData,
      vehicle_condition: value,
      mileage: value === "Brand new" ? "" : prevData.mileage, // Clear mileage only for "Brand new"
    }));

    setIsRegistered(value == "Registered (Used)");
    setIsBrandNew(value === "Brand new");
  };

  // Your profile page content here

  const handlePriceChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setAdData((prevData) => ({
      ...prevData,
      price: value,
    }));

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
  const formData = new FormData();
  const handlAdPreview = () => {
    if (!validateForm()) {
      toast.error("Please Input valid details!");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    onOpen();
  };

  const handlePostAd = async () => {
    startTransition(async () => {
      Object.entries(adData).forEach(([key, value]) => {
        if (key === "is_negotiable") {
          formData.append("is_negotiable", value ? "TRUE" : "FALSE");
        } else {
          formData.append(
            key,
            typeof value === "boolean" ? value.toString() : value
          );
        }
      });

      imageUrls.forEach((url) => {
        formData.append("images", url);
      });

      formData.append("user_id", user?.id as string);

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
        toast.error(result);
        console.error("Failed to post ad:", result);
      }
    });

    onOpen();
  };
  return (
    <>
      <Form validationBehavior="native">
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:px-5 sm:gap-8 sm:p-4">
          <div className=" sm:w-[90%] shadow-md w-full   p-8">
            <h2>Owner Details</h2>
            <div className="flex flex-col items-start justify-start gap-8 mt-4">
              <Input
                ref={(ref) => {
                  inputRefs.owner_display_name.current = ref;
                }}
                name="owner_display_name"
                isRequired={true}
                type="string"
                label="Name"
                labelPlacement="outside"
                className="sm:max-w-96"
                value={adData.owner_display_name}
                onChange={(e) => handleInputChange(e, "owner_display_name")}
                description="This will display as owner name of the AD"
              />

              <Input
                name="owner_contact"
                ref={(ref) => {
                  inputRefs.owner_contact.current = ref;
                }}
                isRequired={true}
                type="string"
                label="Contact"
                value={adData.owner_contact}
                labelPlacement="outside"
                className="sm:max-w-96"
                onChange={(e) => handleInputChange(e, "owner_contact")}
                description="This will display as contact number of the AD"
              />
              <Input
                name="ad_location"
                ref={(ref) => {
                  inputRefs.ad_location.current = ref;
                }}
                isRequired={true}
                type="string"
                label="Location"
                value={adData.ad_location}
                labelPlacement="outside"
                className="sm:max-w-96"
                onChange={(e) => handleInputChange(e, "ad_location")}
                description="This will display as Location"
              />
            </div>
          </div>
          <div className=" sm:w-[90%] shadow-md w-full p-8   ">
            <h2></h2>
            <div className="flex flex-col gap-3 ">
              <RadioGroup
                name="vehicle_type"
                ref={(ref) => {
                  inputRefs.vehicle_type.current = ref;
                }}
                isRequired={true}
                label="Select your Vehicle type"
                value={adData.vehicle_type}
                onValueChange={(value) => {
                  setAdData((prevData) => ({
                    ...prevData,
                    vehicle_type: value,
                  }));
                }}
              >
                {vehicleTypes.map((item, index) => (
                  <Radio key={index} value={item.label}>
                    {" "}
                    {item.label}
                  </Radio>
                ))}
              </RadioGroup>
              <p className="text-default-500 text-small">
                Selected: {adData.vehicle_type}
              </p>
            </div>
          </div>

          <div className=" sm:w-[90%] shadow-md   p-8">
            <h1 className="text-lg font-medium">
              Let's start finding your car's make
            </h1>
            <div className="flex flex-wrap justify-center gap-8 mt-5">
              <Autocomplete
                ref={(ref: HTMLInputElement | null) => {
                  inputRefs.make.current = ref;
                }}
                isInvalid={!!validationErrors.make}
                isRequired={true}
                labelPlacement="outside"
                label="Make"
                name="make"
                inputValue={adData.make}
                defaultItems={carMakes}
                defaultSelectedKey={adData.make}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "make"
                  )
                }
                className="w-full text-black sm:max-w-96"
                placeholder="e.g  Toyota, Honda, Mazda"
              >
                {(item) => (
                  <AutocompleteItem
                    onChange={() =>
                      handleInputChange(
                        {
                          target: { value: item.key },
                        } as React.ChangeEvent<HTMLInputElement>,
                        "make"
                      )
                    }
                    key={item.key}
                    value={item.key}
                  >
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Autocomplete
                ref={(ref: HTMLInputElement | null) => {
                  inputRefs.model.current = ref;
                }}
                isRequired={true}
                isInvalid={!!validationErrors.model}
                type="string"
                label="Model"
                allowsCustomValue={true}
                inputValue={adData.model}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "model"
                  )
                }
                labelPlacement="outside"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g Allion, Vezel, Maruti"
                name="model"
              >
                {toyotaModels.map((model) => (
                  <AutocompleteItem key={model.key}>
                    {model.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Input
                type="string"
                label="Frame Code"
                labelPlacement="outside"
                value={adData.frame_code}
                onChange={(e) => handleInputChange(e, "frame_code")}
                className="w-full text-black sm:max-w-96"
                placeholder="e.g 260, RU1, "
                name="frame_code"
              />
              <Autocomplete
                ref={(ref: HTMLInputElement | null) => {
                  inputRefs.build_year.current = ref;
                }}
                isInvalid={!!validationErrors.build_year}
                isRequired={true}
                labelPlacement="outside"
                label="Build year"
                defaultItems={years}
                inputValue={adData.build_year}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "build_year"
                  )
                }
                className="w-full text-black sm:max-w-96"
                placeholder="e.g  2010, 2011, 2012,..."
                name="build_year"
              >
                {(item) => (
                  <AutocompleteItem key={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                ref={(ref: HTMLInputElement | null) => {
                  inputRefs.transmission.current = ref;
                }}
                isRequired={true}
                isInvalid={!!validationErrors.transmission}
                labelPlacement="outside"
                label="Transmission"
                defaultItems={transmissionTypes}
                inputValue={adData.transmission}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "transmission"
                  )
                }
                className="w-full text-black sm:max-w-96"
                placeholder="e.g Automatic, Manual,..."
                name="transmission"
              >
                {(item) => (
                  <AutocompleteItem key={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                ref={(ref: HTMLInputElement | null) => {
                  inputRefs.body_type.current = ref;
                }}
                isRequired={true}
                labelPlacement="outside"
                isInvalid={!!validationErrors.body_type}
                label="Body type"
                inputValue={adData.body_type}
                defaultItems={bodyTypes}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "body_type"
                  )
                }
                className="w-full text-black sm:max-w-96"
                placeholder="e.g Sedan, SUV, Hatchback, ... "
                name="body_type"
              >
                {(item) => (
                  <AutocompleteItem key={item.label}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </div>

          <div className=" sm:w-[90%] shadow-md  p-8">
            <h1 className="text-lg font-medium">
              Let's start finding your car's background
            </h1>
            <div className="flex flex-wrap justify-center gap-8 mt-5">
              <Autocomplete
                ref={(ref: null) => {
                  inputRefs.vehicle_condition.current = ref;
                }}
                isRequired={true}
                labelPlacement="outside"
                label="Condition"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g  Registered, Unregistered, "
                name="vehicle_condition"
                inputValue={adData.vehicle_condition}
                defaultItems={conditions}
                isInvalid={!!validationErrors.vehicle_condition}
                onInputChange={(e) => {
                  if (e) handleConditionChange(e);
                }}
                onSelectionChange={(e) => {
                  if (e) handleConditionChange(e as string);
                }}
              >
                {(item) => (
                  <AutocompleteItem key={item.label} value={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                ref={(ref: HTMLInputElement) => {
                  inputRefs.reg_year.current = ref;
                }}
                labelPlacement="outside"
                label="Year of Registration"
                defaultItems={yearOfRegistration}
                inputValue={adData.reg_year}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "reg_year"
                  )
                }
                className={`w-full text-black sm:max-w-96 `}
                placeholder="e.g  2024, 2023, 2022"
                name="reg_year"
                isDisabled={!isRegistered || !adData.build_year}
                isInvalid={!!validationErrors.reg_year}
              >
                {(item) => (
                  <AutocompleteItem key={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Input
                type="string"
                label="Milage (km)"
                value={adData.mileage}
                onChange={(e) => handleInputChange(e, "mileage")}
                labelPlacement="outside"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g 60000, 150000 "
                name="mileage"
                isDisabled={isBrandNew}
              />

              <Autocomplete
                type="string"
                label="Engine"
                value={adData.engine}
                allowsCustomValue={true}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "engine"
                  )
                }
                labelPlacement="outside"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g e.g VVTi 1.5L "
                name="engine"
              >
                <AutocompleteItem key="VVTi 1.5L">VVTi 1.5L</AutocompleteItem>
              </Autocomplete>

              <Autocomplete
                type="string"
                allowsCustomValue={true}
                label="Colour"
                inputValue={adData.colour}
                onInputChange={(e) =>
                  handleInputChange(
                    {
                      target: { value: e },
                    } as React.ChangeEvent<HTMLInputElement>,
                    "colour"
                  )
                }
                labelPlacement="outside"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g Silver, White"
                name="colour"
              >
                <AutocompleteItem key="Silver">Silver</AutocompleteItem>
              </Autocomplete>
              <Select
                ref={(ref: null) => {
                  inputRefs.fuel_type.current = ref;
                }}
                isRequired={true}
                value={adData.fuel_type}
                onChange={(e) => handleInputChange(e, "fuel_type")}
                labelPlacement="outside"
                label="Fuel Type"
                className="w-full text-black sm:max-w-96"
                placeholder="e.g Petrol, Diesel, Hybrid "
                name="fuel_type"
                isInvalid={!!validationErrors.fuel_type}
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
                    value={adData.price}
                    onChange={handlePriceChange}
                    isInvalid={!!validationErrors.price}
                    endContent={
                      <Checkbox
                        name="is_negotiable"
                        defaultSelected={false}
                        onChange={(e) =>
                          !adData.is_negotiable
                            ? setAdData((prev) => ({
                                ...prev,
                                is_negotiable: true,
                              }))
                            : setAdData((prev) => ({
                                ...prev,
                                is_negotiable: false,
                              }))
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
              value={adData.owner_comments}
              onChange={(e) => handleInputChange(e, "owner_comments")}
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
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
        className="pb-5 "
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
              <ModalBody>
                <div className="container w-full mx-0 my-3 rounded-lg sm:my-2 sm:p-6">
                  <div className="px-2 py-2 bg-white rounded-md shadow-md sm:py-5 dark:bg-slate-900 sm:px-10 lg:px-24 ">
                    <h1 className="mb-2 text-2xl font-semibold">
                      {adData.build_year +
                        " " +
                        adData.make +
                        " " +
                        adData.model +
                        " " +
                        adData.frame_code}
                    </h1>

                    <p className="mb-4 text-gray-600">
                      {adData.owner_display_name +
                        " - " +
                        adData.vehicle_condition +
                        " - " +
                        adData.ad_location}
                    </p>
                    <div className="flex justify-end mb-4 text-xs">
                      1 minute ago
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                      <div className="w-full ">
                        <Swiper
                          style={
                            {
                              "--swiper-navigation-color": "#2980b9",
                            } as React.CSSProperties
                          }
                          loop={true}
                          spaceBetween={12}
                          navigation={true}
                          thumbs={
                            thumbsSwiper ? { swiper: thumbsSwiper } : undefined
                          }
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="w-full h-auto "
                        >
                          {imageUrls.map((image) => (
                            <SwiperSlide
                              key={image}
                              className="flex items-center justify-center text-xl text-center"
                            >
                              <Image
                                key={image}
                                id={image}
                                src={
                                  image === "" || !image
                                    ? "/images/no-image.png"
                                    : image
                                }
                                alt={image}
                                width={500}
                                height={500}
                                className=" w-full h-[250px]  sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[400px] object-contain  rounded-xl   px-2 py-1 mb-2"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <Swiper
                          onSwiper={(swiper) => {
                            thumbsSwiperRef.current = swiper;
                            setThumbsSwiper(swiper);
                          }}
                          loop={true}
                          spaceBetween={4}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="w-full mt-4 h-auto md:mb-5 pb-2 xl:w-[85%]"
                        >
                          {imageUrls.map((image) => (
                            <SwiperSlide
                              key={image}
                              className=" swiper-slide-thumb-active"
                            >
                              <Image
                                id={image}
                                src={image || "/images/no-image.png"}
                                alt={image}
                                width={500}
                                height={500}
                                className="block w-full h-[250px]  sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[150px] object-contain  rounded-xl   px-2 py-1 mb-2"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <div className="w-full mt-4 lg:mt-0 xl:px-10">
                        <div className="flex justify-between w-full gap-2 text-white rounded-md ">
                          <div className="font-semibold text-lg mb-2 bg-[#130F40] w-1/2 p-2 text-center rounded-xl shadow-md">
                            {adData.owner_contact}
                            <div
                              className={`text-xs font-light ${
                                adData.is_negotiable ? "block" : "hidden"
                              }`}
                            >
                              Call
                            </div>
                          </div>
                          <div className="flex flex-col w-1/2 p-2 mb-2 text-lg font-semibold text-center shadow-md bg-slate-500 rounded-xl">
                            {adData.price === "negotiable"
                              ? adData.price
                              : `Rs. ${formatNumber(Number(adData.price))}`}
                            <div className="text-xs font-light ">
                              {adData.is_negotiable && "(Negotiable)"}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between gap-1 mt-4 text-sm md:text-base gap-x-4">
                          <p className="mb-1">
                            <strong>Odometer : </strong> {adData.mileage} km
                          </p>
                          <p className="mb-1">
                            <strong>Body type : </strong> {adData.body_type}
                          </p>
                          <p className="mb-1">
                            <strong>Engine : </strong> {adData.engine}
                          </p>
                          <p className="mb-1">
                            <strong>Transmission : </strong>{" "}
                            {adData.transmission}
                          </p>
                          <p className="mb-1">
                            <strong>Fuel Type : </strong> {adData.fuel_type}
                          </p>
                          <p className="mb-1">
                            <strong>YOM : </strong> {adData.build_year}
                          </p>
                          <p className="mb-1">
                            <strong>YOR : </strong>{" "}
                            {adData.reg_year
                              ? adData.reg_year
                              : "Not Registered"}
                          </p>
                          <p className="mb-1">
                            <strong>Make : </strong> {adData.make}
                          </p>
                          <p className="mb-1">
                            <strong>Model : </strong>
                            {adData.model + " " + adData.frame_code}
                          </p>
                          <p className="mb-1">
                            <strong>Colour : </strong> {adData.colour}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-6 xl:px-10 md:text-base">
                      <h3 className="mb-2 font-semibold">Owner Comments</h3>
                      <pre className="w-full overflow-hidden text-sm break-words whitespace-pre-wrap md:text-base text-ellipsis">
                        {adData.owner_comments}
                      </pre>
                    </div>
                    <div className="flex justify-end mt-4 text-sm">
                      <span>0 views</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end w-full">
                <div>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                </div>
                <Button
                  color="warning"
                  className=" w-[50%] h-25 font-semibold"
                  type="submit"
                  onPress={handlePostAd}
                >
                  Post Ad
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
