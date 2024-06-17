import { configureStore } from "@reduxjs/toolkit";
import instructionsReducer from "./instructionsSlice";
import testResultsReducer from "./testResultSlice";
import sliderReducer from "./sliderSlice";

const store = configureStore({
  reducer: {
    instructions: instructionsReducer, // Added instructions reducer
    testResults: testResultsReducer, // Existing test results reducer
    slider: sliderReducer,
    // Add other reducers here as needed
  },
});

export default store;
