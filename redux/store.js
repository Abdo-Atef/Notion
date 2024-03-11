import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import noteSlice from "./noteSlice";

export const store = configureStore({
  reducer: {
    user:userSlice,
    notes:noteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false, // Disable the immutableCheck middleware
    }),
})