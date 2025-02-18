// src/redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/userSlice";
import adFormReducer from "./features/ad/adFormSlice";

// Define persist config for user
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "profile"], // Persist only necessary data
};

// Combine reducers
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  adForm: adFormReducer,
});

// Persist entire store
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["adForm"], // Prevent persisting unnecessary state
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Use a single store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Use a single persistor instance
export const persistor = persistStore(store);

// Type exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
