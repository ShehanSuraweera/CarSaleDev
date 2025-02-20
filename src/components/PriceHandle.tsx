import { Checkbox, Input, Radio, RadioGroup } from "@heroui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateField } from "../redux/features/ad/adFormSlice";

const PriceHandle = () => {
  const [formattedPrice, setFormattedPrice] = useState("");
  const [displayPrice, setDisplayPrice] = useState("yes");

  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );

  // Function to format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const handlePriceChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    dispatch(updateField({ field: "price", value: value }));

    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setFormattedPrice("Rs. " + formatNumber(numericValue));
    } else {
      setFormattedPrice("");
    }
  };
  const handleDisplayPriceChange = (value: string) => {
    setDisplayPrice(value);
    if (value === "no") {
      dispatch(updateField({ field: "price", value: "" }));
    }
  };

  return (
    <div className=" sm:w-[90%] shadow-md  w-full  p-8">
      <RadioGroup
        label="Do you like to display price ?"
        orientation="horizontal"
        value={displayPrice ?? ""}
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
              value={adFormData?.price?.toString() ?? ""}
              onChange={handlePriceChange}
              endContent={
                <Checkbox
                  name="is_negotiable"
                  defaultSelected={false}
                  onValueChange={(e) =>
                    !adFormData.is_negotiable
                      ? dispatch(
                          updateField({
                            field: "is_negotiable",
                            value: e,
                          })
                        )
                      : dispatch(
                          updateField({
                            field: "is_negotiable",
                            value: e,
                          })
                        )
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
  );
};

export default PriceHandle;
