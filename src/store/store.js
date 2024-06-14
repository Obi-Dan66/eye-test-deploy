import { configureStore } from "@reduxjs/toolkit";
import instructionsReducer from "./instructionsReducer";
import testResultsReducer from "./testResultSlice";

const store = configureStore({
  reducer: {
    instructions: instructionsReducer, // Added instructions reducer
    testResults: testResultsReducer, // Existing test results reducer
    // Add other reducers here as needed
  },
});

export default store;
