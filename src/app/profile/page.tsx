"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Chip,
  Divider,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import {
  fetchUserAds,
  getAllDistricts,
  getCitiesByDistrict,
  getUserProfileData,
  updateUserProfile,
} from "@/src/lib/api";
import CarList from "@/src/components/Cars/CarList";
import SignOut from "@/src/components/SignOut";
import { UserProfileData } from "@/src/types";
import { MapPin, Phone, UserRoundPen } from "lucide-react";
import { useUser } from "@/src/UserContext";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { set } from "date-fns";

const Page = () => {
  const router = useRouter();

  const [selected, setSelected] = useState("");
  const [cars, setCars] = useState<any[]>([]);
  const [carsLoading, setCarsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);
  const { onOpen } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  const [districts, setDistricts] = useState();
  const [cities, setCities] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  useEffect(() => {
    if (userProfileData?.name === null) {
      setIsOpen(true);
    }
  }, [setIsOpen, userProfileData]);

  const { user, loading } = useUser();

  // Fetch districts on mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistricts();
  }, []);

  // Fetch cities when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const data = await getCitiesByDistrict(Number(selectedDistrict));
          setCities(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict]);

  const handleUpdateProfileModel = (open: boolean) => {
    onOpen();
    setIsOpen(open);
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    let formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", userProfileData?.name || "");
    formData.append("phone", userProfileData?.phone || "");
    formData.append("city", userProfileData?.city || "");

    try {
      const response = await updateUserProfile(formData);

      toast.success("Profile updated successfully");
      handleUpdateProfileModel(!isOpen); // Close modal on success
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Fetch user profile data when user state updates
  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const fetchUserProfile = await getUserProfileData(user.id as string);
          setUserProfileData(fetchUserProfile); // Ensure profile data is set correctly
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      })();
    }
  }, [user]); // Only depend on `user`,

  // Fetch cars when "myAds" tab is selected
  useEffect(() => {
    const getCarsFromBackend = async () => {
      if (!user) return;

      try {
        setCarsLoading(true);
        const fetchedCars = await fetchUserAds(user.id as string);
        setCars(fetchedCars);
      } catch (error: any) {
        setError(error.message || "Failed to load ads");
      } finally {
        setCarsLoading(false);
      }
    };

    if (selected === "myAds") {
      getCarsFromBackend();
    }
  }, [selected, user]); // Ensure `user` is in the dependency array

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    if (field === "district_id") {
      setSelectedDistrict(e.target.value);
    }
    setUserProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        [field]: e.target.value,
      };
    });
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-5 bg-slate-50">
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center mb-5 ">
          <div>
            <Button color="warning" onPress={() => router.push("/sell")}>
              Post Ad
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-2 rounded-md ">
          <Tabs
            size="lg"
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="profile" title="Profile">
              <div>
                {user ? (
                  userProfileData ? (
                    <>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                      >
                        <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                          <div>Name</div>

                          <div>{userProfileData?.name}</div>
                        </div>
                        <Divider />
                        <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                          <div>Email</div>
                          <div>{userProfileData?.email}</div>
                        </div>
                        <Divider />
                        <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                          <div>Phone</div>
                          <div>{userProfileData?.phone}</div>
                        </div>
                        <Divider />

                        <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                          <div>District</div>

                          <div>{userProfileData?.cities?.districts?.name}</div>
                        </div>
                        <Divider />
                        <div className="flex items-center p-4 space-x-4 text-base rounded-md shadow-md">
                          <div>City</div>

                          <div>{userProfileData?.cities?.name}</div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                          <Button
                            color="secondary"
                            variant="flat"
                            onPress={() => handleUpdateProfileModel(!isOpen)}
                          >
                            Update Profile
                          </Button>
                        </div>
                        <Modal
                          isOpen={isOpen}
                          placement="top-center"
                          onOpenChange={handleUpdateProfileModel}
                          className="w-full"
                        >
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1">
                                  Update Profile
                                </ModalHeader>
                                <ModalBody>
                                  <Form
                                    className="w-full "
                                    validationBehavior="native"
                                    onSubmit={handleUpdateProfile}
                                  >
                                    <Input
                                      endContent={
                                        <UserRoundPen className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                                      }
                                      name="name"
                                      label="Name"
                                      required
                                      placeholder="Enter your name"
                                      variant="bordered"
                                      value={userProfileData?.name || ""}
                                      onChange={(e) =>
                                        setUserProfileData({
                                          ...userProfileData,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                    <Input
                                      endContent={
                                        <Phone className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                                      }
                                      name="phone"
                                      label="Phone"
                                      placeholder="Enter your phone"
                                      type="text"
                                      required
                                      variant="bordered"
                                      value={userProfileData?.phone || ""}
                                      onChange={(e) =>
                                        setUserProfileData({
                                          ...userProfileData,
                                          phone: e.target.value,
                                        })
                                      }
                                    />
                                    <Input
                                      endContent={
                                        <MapPin className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                                      }
                                      name="city"
                                      required
                                      label="City"
                                      placeholder="Enter your city"
                                      type="text"
                                      variant="bordered"
                                      value={userProfileData?.city || ""}
                                      onChange={(e) =>
                                        setUserProfileData({
                                          ...userProfileData,
                                          city: e.target.value,
                                        })
                                      }
                                    />
                                    <Autocomplete
                                      isRequired={true}
                                      labelPlacement="outside"
                                      label="District"
                                      name="district"
                                      defaultItems={districts}
                                      onSelectionChange={(e) =>
                                        handleInputChange(
                                          {
                                            target: { value: e },
                                          } as React.ChangeEvent<HTMLInputElement>,
                                          "district_id"
                                        )
                                      }
                                      className="w-full text-black sm:max-w-96"
                                      placeholder="e.g  Colombo, Kandy, Galle"
                                    >
                                      {(district: {
                                        id: string;
                                        name: string;
                                      }) => (
                                        <AutocompleteItem
                                          key={district.id}
                                          value={district.id}
                                        >
                                          {district.name}
                                        </AutocompleteItem>
                                      )}
                                    </Autocomplete>
                                    {/* <Autocomplete
                                      isRequired={true}
                                      labelPlacement="outside"
                                      label="City"
                                      name="city"
                                      isDisabled={!selectedDistrict}
                                      defaultItems={cities}
                                      //selectedKey={userProfileData?.cities?.id}
                                      onSelectionChange={(e) =>
                                        handleInputChange(
                                          {
                                            target: { value: e },
                                          } as React.ChangeEvent<HTMLSelectElement>,
                                          "city_id"
                                        )
                                      }
                                      className="w-full text-black sm:max-w-96"
                                      placeholder="e.g  Nugegoda, Peradeniya, Hikkaduwa,..."
                                      description="This will display as Location"
                                    >
                                      {(city: { id: string; name: string }) => (
                                        <AutocompleteItem
                                          key={city.id}
                                          value={city.id}
                                        >
                                          {city.name}
                                        </AutocompleteItem>
                                      )}
                                    </Autocomplete> */}
                                    <div className="flex items-center justify-end w-full gap-4 pr-5 mt-5">
                                      <Button
                                        color="primary"
                                        variant="flat"
                                        onPress={onClose}
                                      >
                                        Cancel
                                      </Button>
                                      <Button type="submit" color="danger">
                                        Update
                                      </Button>
                                    </div>
                                  </Form>
                                </ModalBody>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </motion.div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-20">
                      <Bars color="#fbc531" height={50} width={50} />
                    </div>
                  )
                ) : (
                  <div>No user data available</div>
                )}
              </div>
            </Tab>
            <Tab key="myAds" title="myAds">
              {carsLoading ? (
                <div className="flex items-center justify-center h-20">
                  <Bars color="#fbc531" height={50} width={50} />
                </div>
              ) : cars.length > 0 ? (
                <CarList cars={cars} loading={loading} error={error} />
              ) : (
                <div>No ads available!</div>
              )}
            </Tab>

            <Tab
              key="favourites"
              title={
                <div className="flex items-center space-x-1">
                  <span>favourites</span>
                  <Chip size="sm" variant="faded">
                    0
                  </Chip>
                </div>
              }
            >
              favourites
            </Tab>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-md ">
        <SignOut />
      </div>
    </div>
  );
};

export default Page;
