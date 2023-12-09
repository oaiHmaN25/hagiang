import { configureStore } from "@reduxjs/toolkit";
import { chartSlice } from "./slice/chartSlice";

export const store = configureStore({
  reducer: {
    chart: chartSlice.reducer,
  },
});
