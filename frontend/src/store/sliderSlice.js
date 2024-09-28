import { createSlice } from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliderValue: 50, // Default slider value
    rangeValue: 3, // Default range value corresponding to the middle range
  },
  reducers: {
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload;
      // Calculate rangeValue based on sliderValue
      const value = action.payload;
      if (value >= 0 && value <= 10) {
        state.rangeValue = 1;
      } else if (value >= 11 && value <= 34) {
        state.rangeValue = 2;
      } else if (value >= 35 && value <= 65) {
        state.rangeValue = 3;
      } else if (value >= 66 && value <= 89) {
        state.rangeValue = 4;
      } else if (value >= 90 && value <= 100) {
        state.rangeValue = 5;
      }
    },
  },
});

export const { setSliderValue } = sliderSlice.actions;
export default sliderSlice.reducer;
