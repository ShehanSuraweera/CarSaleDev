import { Radio, RadioGroup } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateField } from "../redux/features/ad/adFormSlice";
import { getVehicleTypes } from "../lib/api";
import { Loader2 } from "lucide-react";

const VehicleTypes = () => {
  const [vehicleTypes, setVehicleTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const dispatch = useDispatch();
  const { adFormData } = useSelector((state: RootState) => state.adForm);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchVehicleTypes = async () => {
      try {
        const res = await getVehicleTypes();
        // Ensure all IDs are strings (Hero UI expects string values)
        setVehicleTypes(
          res.map((item: { id: number; name: string }) => ({
            id: String(item.id),
            name: item.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    if (adFormData?.vehicle_type?.id) {
      dispatch(updateField({ field: "make", value: "" }));
      dispatch(updateField({ field: "model", value: "" }));
    }
  }, [adFormData.vehicle_type?.id, dispatch]);

  return (
    <div className="sm:w-[90%] shadow-md w-full p-8">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <h1 className="mb-4 text-lg font-medium">
            Let's start finding your vehicle's type
          </h1>
          <div className="flex flex-col gap-3">
            <RadioGroup
              name="vehicle_type"
              isRequired
              value={
                adFormData.vehicle_type?.id
                  ? String(adFormData.vehicle_type.id)
                  : ""
              }
              onValueChange={(selectedId: string) => {
                const selectedType = vehicleTypes.find(
                  (m) => m.id === selectedId
                );
                if (selectedType) {
                  dispatch(
                    updateField({
                      field: "vehicle_type",
                      value: {
                        id: Number(selectedType.id), // Ensure it's a string
                        name: selectedType.name,
                      },
                    })
                  );
                }
              }}
            >
              {vehicleTypes.map((item) => (
                <Radio key={item.id} value={item.id}>
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
