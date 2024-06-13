import { configureStore } from "@reduxjs/toolkit";

// Import your slices here
import testResultsReducer from "./testResultSlice"; // Adjust the import path as needed

const store = configureStore({
  reducer: {
    testResults: testResultsReducer, // Add other reducers here as needed
  },
});

export default store;
