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
  Skeleton,
} from "@heroui/react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setError, updateField } from "../redux/features/ad/adFormSlice";
import {
  getAllCities,
  getAllDistricts,
  getCitiesByDistrict,
  getUserProfileData,
} from "../lib/api";

import toast from "react-hot-toast";
import { debounce } from "lodash";

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
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );

  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );

  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [districts, setDistricts] = useState<District[]>([]);
  const [allCities, setAllCities] = useState<City[]>([]);
  const [citiesByDistrict, setCitiesByDistrict] = useState<City[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const [contact, setContact] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");

  // Validate contact using regex
  const validateContact = (contact: string): boolean => {
    const regex = /^0\d{9}$/;
    return regex.test(contact);
  };

  // Debounced validation function
  const debouncedValidateContact = useCallback(
    debounce((contact: string) => {
      if (validateContact(contact)) {
        setContactError(""); // Clear error if valid
        dispatch(updateField({ field: "owner_contact", value: contact }));
      } else {
        dispatch(updateField({ field: "owner_contact", value: "" }));

        setContactError("Invalid contact number");
        dispatch(
          setError({
            field: "owner_contact",
            message: "Invalid contact number",
          })
        );
      }
    }), // Delay of 500ms before validation
    []
  );

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(value);
    debouncedValidateContact(value);
  };

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
              value: adFormData.owner_display_name
                ? adFormData.owner_display_name
                : userProfile.name || "",
            })
          );
          dispatch(
            updateField({
              field: "owner_contact",
              value: adFormData.owner_contact
                ? adFormData.owner_contact
                : userProfile.phone || "",
            })
          );
          dispatch(
            updateField({
              field: "city",
              value: {
                id: adFormData.city.id
                  ? adFormData.city.id
                  : Number(userProfile?.city?.id),
                name: adFormData.city.name
                  ? adFormData.city.name
                  : userProfile?.city?.name,
              },
            })
          );
          dispatch(
            updateField({
              field: "district",
              value: {
                id: adFormData.district.id
                  ? adFormData.district.id
                  : Number(userProfile?.disrict?.id),
                name: adFormData.district.name
                  ? adFormData.district.name
                  : userProfile?.district?.name,
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
  }, [user]);

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
      {isPending && (
        <div className="w-full sm:w-[90%] shadow-md p-8 rounded-lg">
          <Skeleton className="w-1/3 h-8 mb-2 rounded-lg" />
          <div className="flex flex-col items-start gap-8 mt-4 rounded-lg">
            <div className="flex flex-col w-full gap-10">
              {" "}
              <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-6 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-lg sm:max-w-96" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-6 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-lg sm:max-w-96" />
              </div>
            </div>

            {/* <div className="flex items-center gap-5">
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-20 h-8 rounded-lg" />
            </div> */}
            <div className="flex flex-col gap-4 ">
              <Skeleton className="w-full sm:max-w-96" />
            </div>
            <div className="flex w-full gap-8">
              <Skeleton className="w-full h-10 rounded-lg sm:max-w-40" />
              <Skeleton className="w-24 h-10 rounded-lg" />
            </div>
          </div>
        </div>
      )}
      {!isPending && (
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
              isInvalid={contactError ? true : false}
              description="This will display as contact number of the AD"
              value={adFormData?.owner_contact || contact}
              onChange={handleContactChange}
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
                          <AutocompleteItem key={district.id}>
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
                          <AutocompleteItem key={city.id}>
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
