import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { conditions, fuelTypes } from "../data/search";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/features/ad/adFormSlice";
import { getYear } from "date-fns";

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

  const currentYear = getYear(new Date());
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, k) => ({
    key: (currentYear - k).toString(),
    label: (currentYear - k).toString(),
  }));

  const handleConditionChange = (value: string) => {
    dispatch(updateField({ field: "vehicle_condition", value: value }));
    // if (adFormData.vehicle_condition === "Brand new") {
    //   updateField({ field: "mileage", value: adFormData.mileage });
    // }

    setIsRegistered(value == "Registered (Used)");
    setIsBrandNew(value === "Brand new");
  };

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
          inputValue={adFormData.vehicle_condition}
          defaultItems={conditions}
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
          labelPlacement="outside"
          label="Year of Registration"
          defaultItems={yearOfRegistration}
          inputValue={adFormData.reg_year}
          onInputChange={(e) =>
            dispatch(updateField({ field: "reg_year", value: e }))
          }
          className={`w-full text-black sm:max-w-96 `}
          placeholder="e.g  2024, 2023, 2022"
          name="reg_year"
          isDisabled={!isRegistered || !adFormData.build_year}
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>

        <Input
          type="string"
          label="Milage (km)"
          value={adFormData.mileage}
          onChange={(e) =>
            dispatch(updateField({ field: "mileage", value: e.target.value }))
          }
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g 60000, 150000 "
          name="mileage"
          isDisabled={isBrandNew}
        />

        <Autocomplete
          type="string"
          label="Engine"
          value={adFormData.engine}
          allowsCustomValue={true}
          onInputChange={(e) =>
            dispatch(updateField({ field: "engine", value: e }))
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
          inputValue={adFormData.colour}
          onInputChange={(e) =>
            dispatch(updateField({ field: "colour", value: e }))
          }
          labelPlacement="outside"
          className="w-full text-black sm:max-w-96"
          placeholder="e.g Silver, White"
          name="colour"
        >
          <AutocompleteItem key="Silver">Silver</AutocompleteItem>
        </Autocomplete>
        <Select
          isRequired={true}
          value={adFormData.fuel_type}
          onChange={(e) =>
            dispatch(updateField({ field: "fuel_type", value: e.target.value }))
          }
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
  );
}

export default VehicleBackground;
