import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import { updateField } from "../redux/features/ad/adFormSlice";
import {
  bodyTypes,
  carMakes,
  toyotaModels,
  transmissionTypes,
} from "../data/search";
import { getYear } from "date-fns";
import { getMakeByVehicleType, getModelsByMake } from "../lib/api";

const VehicleAbout = () => {
  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );
  const [isLoading, setIsLoading] = useState(false);

  const [makes, setMakes] = useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, k) => ({
    key: (currentYear - k).toString(),
    label: (currentYear - k).toString(),
  }));

  useEffect(() => {
    setIsLoading(true);
    const fetchMakes = async () => {
      try {
        const res = await getMakeByVehicleType(Number(adFormData.vehicle_type));
        setMakes(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMakes();
  }, [adFormData.vehicle_type]);

  useEffect(() => {
    setIsLoading(true);
    const fetchModels = async () => {
      try {
        const res = await getModelsByMake(
          Number(adFormData.make),
          Number(adFormData.vehicle_type)
        );
        setModels(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, [adFormData.make]);

  return (
    <>
      {adFormData?.vehicle_type !== "" && (
        <div className="sm:w-[90%] shadow-md p-8">
          <h1 className="text-lg font-medium">
            {`Let's start finding by your vehicle's make`}
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mt-5">
            {/* Make */}
            <Autocomplete
              isLoading={isLoading}
              isRequired={true}
              labelPlacement="outside"
              label="Make"
              name="make"
              defaultItems={makes}
              selectedKey={adFormData.make}
              onSelectionChange={(e) =>
                dispatch(updateField({ field: "make", value: e as string }))
              }
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Toyota, Honda, Mazda"
            >
              {(item: { id: string; name: string }) => (
                <AutocompleteItem key={item.id} value={item.id}>
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* Model */}
            <Autocomplete
              isDisabled={adFormData.make ? false : true}
              isLoading={isLoading}
              isRequired={true}
              type="string"
              label="Model"
              defaultItems={models}
              selectedKey={adFormData.model}
              onSelectionChange={(e) =>
                dispatch(updateField({ field: "model", value: e }))
              }
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Allion, Vezel, Maruti"
              name="model"
            >
              {(model) => (
                <AutocompleteItem key={model.id} value={model.id}>
                  {model.name}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* Frame Code */}
            <Input
              type="string"
              label="Frame Code"
              labelPlacement="outside"
              value={adFormData?.frame_code || ""}
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "frame_code",
                    value: e.target.value,
                  })
                )
              }
              className="w-full text-black sm:max-w-96"
              placeholder="e.g 260, RU1"
              name="frame_code"
            />

            {/* Build Year */}
            <Autocomplete
              isRequired={true}
              labelPlacement="outside"
              label="Build year"
              defaultItems={years}
              inputValue={adFormData?.build_year || ""}
              onInputChange={(e) =>
                dispatch(updateField({ field: "build_year", value: e }))
              }
              className="w-full text-black sm:max-w-96"
              placeholder="e.g 2010, 2011, 2012,..."
              name="build_year"
            >
              {(item) => (
                <AutocompleteItem key={item.key} value={item.key}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* Transmission */}
            <Autocomplete
              isRequired={true}
              labelPlacement="outside"
              label="Transmission"
              defaultItems={transmissionTypes}
              inputValue={adFormData?.transmission || ""}
              onInputChange={(e) =>
                dispatch(updateField({ field: "transmission", value: e }))
              }
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Automatic, Manual,..."
              name="transmission"
            >
              {(item) => (
                <AutocompleteItem key={item.key} value={item.key}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* Body Type */}
            <Autocomplete
              isRequired={true}
              labelPlacement="outside"
              label="Body type"
              inputValue={adFormData?.body_type || ""}
              defaultItems={bodyTypes}
              onInputChange={(e) =>
                dispatch(updateField({ field: "body_type", value: e }))
              }
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Sedan, SUV, Hatchback, ..."
              name="body_type"
            >
              {(item) => (
                <AutocompleteItem key={item.key} value={item.key}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleAbout;
