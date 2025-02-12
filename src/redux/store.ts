import { configureStore } from "@reduxjs/toolkit";
import adFormReducer from "./features/ad/adFormSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      adForm: adFormReducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
