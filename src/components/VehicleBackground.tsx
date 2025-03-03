import {
  Autocomplete,
  AutocompleteItem,
  Input,
  SelectItem,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setError, updateField } from "../redux/features/ad/adFormSlice";
import { getYear } from "date-fns";
import { getFuelTypes, getVehicleConditions } from "../lib/api";
import { colours } from "../data/search";

function VehicleBackground() {
  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );

  const [yearOfRegistration, setYearOfRegistration] = useState<
    { key: string; label: string }[]
  >([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBrandNew, setIsBrandNew] = useState(false);
  const [fuelTypes, setFuelTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const [vehicle_conditions, setVehicleConditions] = useState<
    { id: string; name: string }[]
  >([]);

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, k) => ({
    key: (currentYear - k).toString(),
    label: (currentYear - k).toString(),
  }));

  const handleConditionChange = (id: string) => {
    dispatch(
      updateField({
        field: "vehicle_condition",
        value: {
          id: id,
          name: vehicle_conditions.find((m) => m.id == id)?.name || "",
        },
      })
    );
    // if (adFormData.vehicle_condition === "Brand new") {
    //   updateField({ field: "mileage", value: adFormData.mileage });
    // }

    setIsRegistered(id == "1");
    setIsBrandNew(id === "3");
  };

  useEffect(() => {
    if (adFormData.vehicle_condition.id == "1") {
      setIsRegistered(true);
    }
  }, []);

  useEffect(() => {
    if (adFormData.build_year) {
      const years = Array.from(
        { length: currentYear - Number(adFormData.build_year) + 1 },
        (_, k) => ({
          key: (Number(adFormData.build_year) + k).toString(),
          label: (Number(adFormData.build_year) + k).toString(),
        })
      );
      setYearOfRegistration(years);
    }
  }, [adFormData.build_year, currentYear]);

  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const res = await getFuelTypes();
        setFuelTypes(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFuelTypes();
  }, []);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const res = await getVehicleConditions();
        setVehicleConditions(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConditions();
  }, []);

  return (
    <div className=" sm:w-[90%] shadow-md  p-8">
      <h1 className="text-lg font-medium">
        Let's start finding your car's background
      </h1>
      <div className="flex flex-wrap justify-center gap-8 mt-5">
        <Autocomplete
          isRequired={true}
          labelPlacement="outside"
          label="Condition"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g  Registered, Unregistered, "
          name="vehicle_condition"
          selectedKey={adFormData.vehicle_condition.id?.toString() ?? ""}
          defaultItems={vehicle_conditions}
          onSelectionChange={(e) => {
            if (e) {
              handleConditionChange(e as string);
            } else {
              dispatch(
                setError({
                  field: "vehicle_condition",
                  message: "Condition is required.",
                })
              );
            }
          }}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          labelPlacement="outside"
          label="Year of Registration"
          defaultItems={yearOfRegistration}
          selectedKey={adFormData.reg_year ?? ""}
          onSelectionChange={(key) => {
            if (key) {
              dispatch(updateField({ field: "reg_year", value: key }));
            } else {
              dispatch(updateField({ field: "reg_year", value: "" }));
            }
          }}
          className={`w-full text-black sm:max-w-96 `}
          placeholder="e.g  2024, 2023, 2022"
          isDisabled={!isRegistered || !adFormData.build_year}
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <Input
          type="string"
          label="Milage (km)"
          defaultValue={adFormData.mileage ?? ""}
          value={adFormData.mileage ?? ""}
          onChange={(e) =>
            dispatch(updateField({ field: "mileage", value: e.target.value }))
          }
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 60000, 150000 "
          name="mileage"
          isDisabled={isBrandNew}
        />

        <Input
          type="string"
          label="Engine (cc)"
          value={adFormData.engine ?? ""}
          defaultValue={adFormData.engine ?? ""}
          onChange={(e) =>
            dispatch(updateField({ field: "engine", value: e.target.value }))
          }
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 1500cc, 2000cc"
          name="engine"
        />

        <Autocomplete
          type="string"
          allowsCustomValue={true}
          label="Colour"
          inputValue={adFormData.colour ?? ""}
          onInputChange={(e) =>
            dispatch(updateField({ field: "colour", value: e }))
          }
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Silver, White"
          name="colour"
        >
          {colours?.map((item) => (
            <SelectItem key={item}>{item}</SelectItem>
          ))}
        </Autocomplete>
        <Autocomplete
          isRequired={true}
          selectedKey={adFormData.fuel_type.id?.toString() ?? ""}
          onSelectionChange={(key) => {
            if (key) {
              dispatch(
                updateField({
                  field: "fuel_type",
                  value: {
                    id: Number(key),
                    name: fuelTypes.find((m) => m.id == key)?.name || "",
                  },
                })
              );
            } else {
              dispatch(
                updateField({
                  field: "fuel_type",
                  value: {
                    id: 0,
                    name: "",
                  },
                })
              );
              dispatch(
                setError({
                  field: "fuel_type",
                  message: "Fuel type is required.",
                })
              );
            }
          }}
          labelPlacement="outside"
          label="Fuel Type"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Petrol, Diesel, Hybrid "
          name="fuel_type"
        >
          {fuelTypes?.map((item) => (
            <SelectItem key={item.id}>{item.name}</SelectItem>
          ))}
        </Autocomplete>
      </div>
    </div>
  );
}

export default VehicleBackground;
