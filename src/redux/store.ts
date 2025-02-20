import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/userSlice";
import adFormReducer from "./features/ad/adFormSlice";

const adFormPersistConfig = {
  key: "adForm",
  storage,
  whitelist: ["adFormData"], // Persist adFormData only
  serialize: true,
};

// ✅ Persist only user slice (avoiding global persist)
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "profile"], // Persist user & profile only
};

// ✅ Combine reducers
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer), // Persist user slice
  adForm: persistReducer(adFormPersistConfig, adFormReducer), // Not persisted
});

// ✅ Create store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in dev
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore persist actions
        ignoredPaths: ["user.session"], // Ignore session since it's non-serializable
      },
    }),
});

// ✅ Persistor
export const persistor = persistStore(store);

// ✅ Export Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
