import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/features/ad/adFormSlice";
import {
  getAllCities,
  getAllDistricts,
  getCitiesByDistrict,
  getUserProfileData,
} from "../lib/api";
import { useUser } from "../UserContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Define district and city types
interface District {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

const OwnerDetails = () => {
  const dispatch = useDispatch();
  const { adFormData } = useSelector((state: RootState) => state.adForm);

  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [districts, setDistricts] = useState<District[]>([]);
  const [allCities, setAllCities] = useState<City[]>([]);
  const [citiesByDistrict, setCitiesByDistrict] = useState<City[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const cities = await getAllCities();
        setAllCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchAllCities();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      startTransition(async () => {
        try {
          const userProfile = await getUserProfileData(user.id as string);

          dispatch(
            updateField({
              field: "owner_display_name",
              value: userProfile.name || "",
            })
          );
          dispatch(
            updateField({
              field: "owner_contact",
              value: userProfile.phone || "",
            })
          );
          dispatch(
            updateField({
              field: "city",
              value: {
                id: Number(userProfile?.city?.id),
                name: userProfile?.city?.name,
              },
            })
          );
          dispatch(
            updateField({
              field: "district",
              value: {
                id: Number(userProfile?.disrict?.id),
                name: userProfile?.district?.name,
              },
            })
          );

          setSelectedDistrict(
            userProfile?.cities?.districts?.id?.toString() ?? null
          );
          setSelectedCity(userProfile?.cities?.id?.toString() ?? null);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      });
    }
  }, [user, dispatch]);

  const getDistrictName = (districtId: number | null) => {
    if (!districtId) return "";
    const district = districts.find((d) => d.id === districtId);
    return district ? district.name : "";
  };

  const getCityName = (cityId: number | null) => {
    if (!cityId) return "";
    const city = allCities.find((c) => c.id === cityId);
    return city ? city.name : "";
  };

  const handleCityDisableState = useCallback(() => {
    setIsCityDisabled(!selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    handleCityDisableState();
  }, [handleCityDisableState]);

  // Fetch cities when district changes
  useEffect(() => {
    setIsLoading(true);
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const data = await getCitiesByDistrict(Number(selectedDistrict));
          setCitiesByDistrict(data);
        } catch (error) {
          console.error("Error fetching cities by district:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict]);

  // Fetch districts on mount
  useEffect(() => {
    setIsLoading(true);
    const fetchDistricts = async () => {
      try {
        const data = await getAllDistricts();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  const handleDistrictChange = (e: string) => {
    setSelectedDistrict(e);
    setSelectedCity(null); // Reset city selection when district changes
  };

  const handleLocationUpdateButton = () => {
    if (!selectedCity) {
      toast.error("Please select a city");
    } else {
      dispatch(
        updateField({
          field: "district",
          value: {
            id: Number(selectedDistrict),
            name: getDistrictName(Number(selectedDistrict)),
          },
        })
      );
      dispatch(
        updateField({
          field: "city",
          value: {
            id: Number(selectedCity),
            name: getCityName(Number(selectedCity)),
          },
        })
      );
      onOpenChange();
    }
  };

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="sm:w-[90%] shadow-md w-full p-8">
          <h2>Owner Details</h2>
          <div className="flex flex-col items-start gap-8 mt-4">
            <Input
              name="owner_display_name"
              isRequired
              type="text"
              label="Name"
              labelPlacement="outside"
              className="sm:max-w-96"
              description="This will display as owner name of the AD"
              value={adFormData?.owner_display_name || ""}
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "owner_display_name",
                    value: e.target.value,
                  })
                )
              }
            />
            <Input
              name="owner_contact"
              isRequired
              type="text"
              label="Contact"
              labelPlacement="outside"
              className="sm:max-w-96"
              description="This will display as contact number of the AD"
              value={adFormData?.owner_contact || ""}
              onChange={(e) =>
                dispatch(
                  updateField({ field: "owner_contact", value: e.target.value })
                )
              }
            />
            <div>
              <h3>
                Ad Location <span className="text-red-500 ">*</span>
              </h3>

              <div className="flex items-center justify-center gap-5">
                {adFormData.city.id && (
                  <p className="text-sm text-gray-500">
                    {adFormData.district.name} District, {adFormData.city.name}
                  </p>
                )}

                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={onOpen}
                >
                  Edit
                </Button>
              </div>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  <ModalBody>
                    <div className="flex flex-col w-full gap-4 mt-3">
                      <Autocomplete
                        label="District"
                        defaultItems={districts}
                        onSelectionChange={(e) =>
                          handleDistrictChange(e as string)
                        }
                        className="w-full text-black sm:max-w-96"
                        placeholder="e.g Colombo, Kandy, Galle"
                      >
                        {(district) => (
                          <AutocompleteItem
                            key={district.id}
                            value={district.id}
                          >
                            {district.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      <Autocomplete
                        label="City"
                        defaultItems={citiesByDistrict}
                        onSelectionChange={(e) => setSelectedCity(e as string)}
                        isDisabled={isCityDisabled || isLoading}
                        className="w-full text-black sm:max-w-96"
                        placeholder="e.g Nugegoda, Peradeniya,..."
                        description="This will display as Location"
                      >
                        {(city) => (
                          <AutocompleteItem key={city.id} value={city.id}>
                            {city.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleLocationUpdateButton}
                      isLoading={isLoading}
                    >
                      Update
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerDetails;
