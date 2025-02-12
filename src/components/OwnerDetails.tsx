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

const OwnerDetails = () => {
  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );
  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [citiesByDistrict, setCitiesByDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const allCities = await getAllCities();
        setAllCities(allCities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCities();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      startTransition(async () => {
        try {
          const fetchUserProfile = await getUserProfileData(user.id as string);

          dispatch(
            updateField({
              field: "owner_display_name",
              value: fetchUserProfile.name || "",
            })
          );
          dispatch(
            updateField({
              field: "owner_contact",
              value: fetchUserProfile.phone || "",
            })
          );
          dispatch(
            updateField({
              field: "city_id",
              value: fetchUserProfile?.cities?.id || "",
            })
          );
          dispatch(
            updateField({
              field: "district_id",
              value: fetchUserProfile?.cities?.districts?.id || "",
            })
          );
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      });
    }
  }, [user, dispatch]);

  const getDistrictName = (districtId: number) => {
    const district = districts.find(
      (d: { id: number; name: string }) => d.id === districtId
    ) as { id: number; name: string } | undefined;
    return district ? district.name : "";
  };

  const getCityName = (cityId: number) => {
    const city = allCities.find(
      (c: { id: number; name: string }) => c.id === cityId
    ) as { id: number; name: string } | undefined;
    return city ? city.name : "";
  };

  const cityDisabelManage = useCallback(() => {
    if (selectedDistrict === "" || selectedDistrict == null) {
      setIsCityDisabled(true);
    } else {
      setIsCityDisabled(false);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    cityDisabelManage();
  }, [cityDisabelManage]);

  // Fetch cities when district changes
  useEffect(() => {
    setIsLoading(true);
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const data = await getCitiesByDistrict(Number(selectedDistrict));
          setCitiesByDistrict(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict, setSelectedDistrict]);

  // Fetch districts on mount
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

  const handleDistrictChange = (e: string) => {
    setSelectedDistrict(e);
    // dispatch(updateField({ field: "city_id", value: null }));
  };

  const handleLocationUpdateButton = () => {
    if (selectedCity === "" || selectedCity == null) {
      toast.error("Please select a city");
    } else {
      dispatch(updateField({ field: "district_id", value: selectedDistrict }));
      dispatch(updateField({ field: "city_id", value: selectedCity }));
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
          <div className="flex flex-col items-start justify-start gap-8 mt-4">
            <Input
              name="owner_display_name"
              isRequired={true}
              type="string"
              label="Name"
              labelPlacement="outside"
              className="sm:max-w-96"
              value={adFormData?.owner_display_name || ""}
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "owner_display_name",
                    value: e.target.value,
                  })
                )
              }
              description="This will display as owner name of the AD"
            />

            <Input
              name="owner_contact"
              isRequired={true}
              type="string"
              label="Contact"
              value={adFormData?.owner_contact || ""}
              labelPlacement="outside"
              className="sm:max-w-96"
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "owner_contact",
                    value: e.target.value,
                  })
                )
              }
              description="This will display as contact number of the AD"
            />
            <div>
              <h3>Ad Location</h3>

              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center gap-4"></div>
                <p className="text-sm text-gray-500">
                  {` ${getDistrictName(Number(adFormData.district_id))}
                District,  `}

                  {adFormData && getCityName(Number(adFormData.city_id))}
                </p>

                <>
                  <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onPress={onOpen}
                  >
                    Edit
                  </Button>
                </>
              </div>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <div className="flex flex-col w-full gap-4 mt-3">
                          <Autocomplete
                            isRequired={true}
                            labelPlacement="outside"
                            label="District"
                            name="district"
                            defaultItems={districts}
                            onSelectionChange={(e) =>
                              handleDistrictChange(e as string)
                            }
                            className="w-full text-black sm:max-w-96"
                            placeholder="e.g Colombo, Kandy, Galle"
                          >
                            {(district: { id: string; name: string }) => (
                              <AutocompleteItem
                                key={district.id}
                                value={district.id}
                              >
                                {district.name}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>

                          <Autocomplete
                            isRequired={true}
                            labelPlacement="outside"
                            label="City"
                            name="city"
                            isLoading={isLoading}
                            isDisabled={isCityDisabled || isLoading}
                            defaultItems={citiesByDistrict}
                            onSelectionChange={(e) =>
                              setSelectedCity(e as string)
                            }
                            className="w-full text-black sm:max-w-96"
                            placeholder="e.g Nugegoda, Peradeniya, Hikkaduwa,..."
                            description="This will display as Location"
                          >
                            {(city: { id: string; name: string }) => (
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
                    </>
                  )}
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
