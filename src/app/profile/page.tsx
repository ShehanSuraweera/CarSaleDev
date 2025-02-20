"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Autocomplete,
  AutocompleteItem,
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

const Page = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [cars, setCars] = useState<any[]>([]);
  const [carsLoading, setCarsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  useEffect(() => {
    if (userProfileData?.name === null) {
      onOpen();
    }
  }, [userProfileData, onOpen]);

  useEffect(() => {
    setIsLoading(true);
    const fetchDistricts = async () => {
      try {
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (selectedDistrict !== null) {
      setIsLoading(true);
      const fetchCities = async () => {
        try {
          const data = await getCitiesByDistrict(selectedDistrict);
          setCities(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const fetchUserProfile = await getUserProfileData(user.id);
          setUserProfileData(fetchUserProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    const getCarsFromBackend = async () => {
      if (!user) return;
      try {
        setCarsLoading(true);
        const fetchedCars = await fetchUserAds(user.id);
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
  }, [selected, user]);

  const handleUpdateProfileModel = (open: boolean) => {
    onOpen();
    setIsOpen(open);
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("name", userProfileData?.name || "");
      formData.append("phone", userProfileData?.phone || "");
      formData.append("city_id", String(selectedCityId));

      const response = await updateUserProfile(formData);

      if (response === "Profile updated") {
        toast.success("Profile updated successfully");
        handleUpdateProfileModel(false); // Close modal on success
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof UserProfileData
  ) => {
    setUserProfileData((prevData) =>
      prevData ? { ...prevData, [field]: e.target.value } : null
    );
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-5 mb-16 bg-slate-50 dark:bg-black">
      <div className="flex flex-col items-center justify-center w-full">
        {/* <div className="flex justify-center mb-5">
          <Button color="warning" onPress={() => router.push("/sell")}>
            Post Ad
          </Button>
        </div> */}
        <Tabs
          size="lg"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
        >
          <Tab key="profile" title="Profile">
            {user ? (
              userProfileData ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col gap-3 p-4 rounded-md shadow-md">
                    <div>Name: {userProfileData.name}</div>
                    <Divider />
                    <div>Email: {userProfileData.email}</div>
                    <Divider />
                    <div>Phone: {userProfileData.phone}</div>
                    <Divider />
                    <div>District: {userProfileData.district.name}</div>
                    <Divider />
                    <div>City: {userProfileData.city.name}</div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={() => {
                        handleUpdateProfileModel(!isOpen);
                      }}
                    >
                      Update Profile
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-20">
                  <Bars color="#fbc531" height={50} width={50} />
                </div>
              )
            ) : (
              <div>No user data available</div>
            )}
          </Tab>
          <Tab key="myAds" title="My Ads">
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
        </Tabs>
      </div>
      <SignOut />

      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={handleUpdateProfileModel}
      >
        <ModalContent>
          {(onClose) => (
            <>
              ``
              <ModalHeader>Update Profile</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleUpdateProfile}>
                  <Input
                    name="name"
                    label="Name"
                    required
                    value={userProfileData?.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                  <Input
                    name="phone"
                    label="Phone"
                    required
                    value={userProfileData?.phone || ""}
                    onChange={(e) => handleInputChange(e, "phone")}
                  />
                  <Autocomplete
                    label="District"
                    defaultItems={districts}
                    onSelectionChange={(id) => setSelectedDistrict(Number(id))}
                  >
                    {districts.map((district) => (
                      <AutocompleteItem key={district.id} value={district.id}>
                        {district.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    label="City"
                    defaultItems={cities}
                    isDisabled={isLoading || !selectedDistrict}
                    onSelectionChange={(id) => {
                      setSelectedCityId(Number(id));
                    }}
                    isLoading={isLoading}
                  >
                    {cities.map((city) => (
                      <AutocompleteItem key={city.id} value={city.id}>
                        {city.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <ModalFooter>
                    <Button variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" color="danger">
                      Update
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
