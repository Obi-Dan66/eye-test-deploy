import { configureStore } from "@reduxjs/toolkit";
import testResultsReducer from "./testResultSlice.js";

const store = configureStore({
  reducer: {
    testResults: testResultsReducer,
  },
});

export default store;
