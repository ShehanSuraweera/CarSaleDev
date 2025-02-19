import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import { updateField } from "../redux/features/ad/adFormSlice";
import { getYear } from "date-fns";
import {
  getBodyTypes,
  getMakeByVehicleType,
  getModelsByMake,
  getTransmissionTypes,
} from "../lib/api";

const VehicleAbout = () => {
  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );
  const [isLoading, setIsLoading] = useState(false);

  const [makes, setMakes] = useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [bodyTypes, setBodyTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const [transmissionTypes, setTransmissionTypes] = useState<
    { id: string; name: string }[]
  >([]);

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, k) => ({
    key: (currentYear - k).toString(),
    label: (currentYear - k).toString(),
  }));

  useEffect(() => {
    setIsLoading(true);
    const fetchTransmissionTypes = async () => {
      try {
        const data = await getTransmissionTypes();
        setTransmissionTypes(data);
      } catch (error) {
        console.error("Error fetching transmission types:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransmissionTypes();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchBodyTypes = async () => {
      try {
        const data = await getBodyTypes({
          vehicle_type_id: adFormData.vehicle_type.id.toString(),
        });
        setBodyTypes(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBodyTypes();
  }, [adFormData.vehicle_type.id]);

  // Fetch makes based on vehicle type
  useEffect(() => {
    if (!adFormData.vehicle_type.id) return;
    setIsLoading(true);
    const fetchMakes = async () => {
      try {
        const res = await getMakeByVehicleType(
          Number(adFormData.vehicle_type.id)
        );
        setMakes(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMakes();
  }, [adFormData.vehicle_type.id]);

  // Fetch models based on make
  useEffect(() => {
    if (!adFormData.make?.id) {
      setModels([]); // Clear models if no make selected
      return;
    }
    setIsLoading(true);
    const fetchModels = async () => {
      try {
        const res = await getModelsByMake(
          Number(adFormData.make.id),
          Number(adFormData.vehicle_type.id)
        );
        setModels(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, [adFormData.make?.id]);

  return (
    <>
      {adFormData.vehicle_type.id && (
        <div className="sm:w-[90%] shadow-md p-8">
          <h1 className="text-lg font-medium">
            {`Let's start finding by your vehicle's make`}
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mt-5">
            {/* Make */}
            <Autocomplete
              isLoading={isLoading}
              isRequired
              labelPlacement="outside"
              label="Make"
              defaultItems={makes}
              selectedKey={adFormData.make?.id?.toString() || ""}
              onSelectionChange={(key) => {
                if (key) {
                  dispatch(
                    updateField({
                      field: "make",
                      value: {
                        id: Number(key),
                        name: makes.find((m) => m.id == key)?.name || "",
                      },
                    })
                  );
                } else {
                  dispatch(
                    updateField({ field: "make", value: { id: 0, name: "" } })
                  ); // Provide a default value
                }
                dispatch(
                  updateField({ field: "model", value: { id: 0, name: "" } })
                ); // Reset model when make changes
              }}
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Toyota, Honda, Mazda"
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>

            {/* Model */}
            <Autocomplete
              isDisabled={!adFormData.make?.id}
              isLoading={isLoading}
              isRequired
              label="Model"
              defaultItems={models}
              selectedKey={adFormData.model?.id?.toString() || undefined}
              onSelectionChange={(key) => {
                if (key) {
                  dispatch(
                    updateField({
                      field: "model",
                      value: {
                        id: Number(key),
                        name: models.find((m) => m.id == key)?.name || "",
                      },
                    })
                  );
                } else {
                  dispatch(
                    updateField({ field: "model", value: { id: 0, name: "" } })
                  ); // Provide a default value
                }
              }}
              labelPlacement="outside"
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Allion, Vezel, Maruti"
            >
              {(model) => (
                <AutocompleteItem key={model.id}>{model.name}</AutocompleteItem>
              )}
            </Autocomplete>

            {/* Frame Code */}
            <Input
              type="text"
              label="Frame Code"
              labelPlacement="outside"
              value={adFormData.frame_code ?? ""}
              onChange={(e) =>
                dispatch(
                  updateField({ field: "frame_code", value: e.target.value })
                )
              }
              className="w-full text-black sm:max-w-96"
              placeholder="e.g 260, RU1"
            />

            {/* Build Year */}
            <Autocomplete
              isRequired
              labelPlacement="outside"
              label="Build Year"
              defaultItems={years}
              selectedKey={adFormData.build_year ?? undefined}
              onSelectionChange={(key) => {
                if (key) {
                  dispatch(updateField({ field: "build_year", value: key }));
                } else {
                  dispatch(updateField({ field: "build_year", value: "" }));
                }
              }}
              className="w-full text-black sm:max-w-96"
              placeholder="e.g 2010, 2011, 2012,..."
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>

            {/* Transmission */}
            <Autocomplete
              isRequired
              labelPlacement="outside"
              label="Transmission"
              defaultItems={transmissionTypes}
              selectedKey={
                adFormData?.transmission_type?.id?.toString() ?? undefined
              }
              onSelectionChange={(key) => {
                if (key) {
                  dispatch(
                    updateField({
                      field: "transmission_type",
                      value: {
                        id: Number(key),
                        name: bodyTypes.find((m) => m.id == key)?.name || "",
                      },
                    })
                  );
                }
              }}
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Automatic, Manual,..."
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>

            {/* Body Type */}
            <Autocomplete
              isRequired
              labelPlacement="outside"
              label="Body Type"
              defaultItems={bodyTypes}
              selectedKey={adFormData?.body_type?.id?.toString() ?? undefined}
              onSelectionChange={(key) => {
                if (key) {
                  dispatch(
                    updateField({
                      field: "body_type",
                      value: {
                        id: Number(key),
                        name: bodyTypes.find((m) => m.id == key)?.name || "",
                      },
                    })
                  );
                } else {
                  dispatch(updateField({ field: "body_type", value: "" }));
                }
              }}
              className="w-full text-black sm:max-w-96"
              placeholder="e.g Sedan, SUV, Hatchback, ..."
              isLoading={isLoading}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleAbout;
