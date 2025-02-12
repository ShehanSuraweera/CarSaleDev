import { AdFormData } from "@/src/types";
import { useUser } from "@/src/UserContext";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdFormState {
  adFormData: AdFormData;
  errors: Partial<Record<keyof AdFormData, string>>;
}

let savedData;
if (typeof window !== "undefined" && window.localStorage) {
  savedData = JSON.parse(localStorage.getItem("AdData") || "{}");
}

// const { user } = useUser();

const initialState: AdFormState = {
  adFormData: {
    user_id: "",
    make: savedData?.make || "",
    model: savedData?.model || "",
    frame_code: savedData?.frame_code || "",
    build_year: savedData?.build_year || "",
    transmission: savedData?.transmission || "",
    body_type: savedData?.body_type || "",
    vehicle_condition: savedData?.vehicle_condition || "",
    reg_year: savedData?.reg_year || "",
    mileage: savedData?.mileage || "",
    engine: savedData?.engine || "",
    colour: savedData?.colour || "",
    fuel_type: savedData?.fuel_type || "",
    price: savedData?.price || "",
    owner_comments: savedData?.owner_comments || "",
    owner_contact: savedData?.owner_contact || "",
    owner_display_name: savedData?.owner_display_name || "",
    is_negotiable: false,
    vehicle_type: savedData?.vehicle_type || "",
    district_id: savedData?.district_id || "",
    city_id: savedData?.city_id || "",
    imageUrls: savedData?.imageUrls || [],
  },
  errors: {},
};

const adFormSlice = createSlice({
  name: "adForm",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof AdFormData; value: any }>
    ) => {
      (state.adFormData[action.payload.field] as any) = action.payload.value;
      // Clear error when the user starts typing
      delete state.errors[action.payload.field];
    },
    setError: (
      state,
      action: PayloadAction<{ field: keyof AdFormData; message: string }>
    ) => {
      state.errors[action.payload.field] = action.payload.message;
    },
    resetForm: () => initialState,

    updateImageUrls: (state, action: PayloadAction<string[]>) => {
      state.adFormData.imageUrls = action.payload;
    },
  },
});

export const { updateField, setError, resetForm, updateImageUrls } =
  adFormSlice.actions;
export default adFormSlice.reducer;
