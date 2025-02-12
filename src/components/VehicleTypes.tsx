import { Radio, RadioGroup } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { resetForm, updateField } from "../redux/features/ad/adFormSlice";
import { getVehicleTypes } from "../lib/api";
import { Loader2 } from "lucide-react";

const VehicleTypes = () => {
  const [vehicleTypes, setVehicleTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const dispatch = useDispatch();
  const { adFormData, errors } = useSelector(
    (state: RootState) => state.adForm
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getAllVehicleTypes = async () => {
      try {
        const res = await getVehicleTypes(); // Assuming fetchVehicleTypes is the correct function
        setVehicleTypes(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllVehicleTypes();
  }, []);

  useEffect(() => {
    dispatch(updateField({ field: "make", value: "" }));
    dispatch(updateField({ field: "model", value: "" }));
  }, [adFormData.vehicle_type, dispatch]);

  return (
    <div className=" sm:w-[90%] shadow-md w-full p-8   ">
      {isLoading ? (
        <Loader2 />
      ) : (
        <>
          <h1 className="mb-4 text-lg font-medium">
            Let's start finding your vehicle's type
          </h1>
          <div className="flex flex-col gap-3 ">
            <RadioGroup
              name="vehicle_type"
              isRequired={true}
              value={adFormData.vehicle_type}
              onValueChange={(e) =>
                dispatch(updateField({ field: "vehicle_type", value: e }))
              }
            >
              {vehicleTypes.map((item, index) => (
                <Radio key={index} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleTypes;
