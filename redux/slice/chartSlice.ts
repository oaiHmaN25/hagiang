import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
    currentFile: 0,
    flowFunc: null,
  },
  reducers: {
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setFlowFunc: (state, action) => {
      state.flowFunc = action.payload;
    },
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
  },
});
