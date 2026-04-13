import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

// Only one reducer + middleware no matter how many
// endpoints you inject into apiSlice
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
