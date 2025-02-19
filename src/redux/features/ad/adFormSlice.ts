import { AdData } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the ad form state
interface AdFormState {
  adFormData: AdData;
  errors: Partial<Record<keyof AdData, string>>;
}

// Default initial state for the form
const initialState: AdFormState = {
  adFormData: {
    user_id: "",
    frame_code: "",
    build_year: "",
    transmission_type: {
      id: 0,
      name: "",
    },
    body_type: {
      id: 0,
      name: "",
    },
    vehicle_condition: "",
    reg_year: "",
    mileage: "",
    engine: "",
    colour: "",
    fuel_type: "",
    owner_comments: "",
    owner_contact: "",
    owner_display_name: "",
    is_negotiable: false,
    vehicle_type: {
      id: 0,
      name: "",
    },
    images: [],
    ad_id: "",
    city: {
      id: 0,
      name: "",
    },
    created_at: "",
    district: {
      id: 0,
      name: "",
    },
    make: {
      id: 0,
      name: "",
    },
    model: {
      id: 0,
      name: "",
    },
    price: 0,
    title: "",
    views: 0,
  },
  errors: {},
};

const adFormSlice = createSlice({
  name: "adForm",
  initialState,
  reducers: {
    // Update a specific field in the ad form with correct type inference
    updateField: <K extends keyof AdData>(
      state: AdFormState,
      action: PayloadAction<{ field: K; value: AdData[K] }>
    ) => {
      state.adFormData[action.payload.field] = action.payload.value;
      // Clear error when the user starts typing
      delete state.errors[action.payload.field];
    },

    // Set an error message for a specific field
    setError: (
      state,
      action: PayloadAction<{ field: keyof AdData; message: string }>
    ) => {
      state.errors[action.payload.field] = action.payload.message;
    },

    // Set the entire ad form data
    setAdData: (state, action: PayloadAction<AdData>) => {
      state.adFormData = action.payload;
    },

    // Reset the form data while preserving the structure
    resetForm: (state) => {
      state.adFormData = { ...initialState.adFormData };
      state.errors = {};
    },

    // Update the images array
    updateImageUrls: (state, action: PayloadAction<string[]>) => {
      state.adFormData.images = action.payload;
    },
  },
});

// Export actions and reducer
export const { updateField, setError, resetForm, updateImageUrls, setAdData } =
  adFormSlice.actions;
export default adFormSlice.reducer;
