import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage as default
import adFormReducer from "./features/ad/adFormSlice";
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  adForm: adFormReducer,
});

// Persist configuration
const persistConfig = {
  key: "adData",
  storage, // LocalStorage
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Prevents issues with non-serializable data
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Persistor
export const persistor = persistStore(makeStore());
