import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
  },
  reducers: {
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
  },
});
