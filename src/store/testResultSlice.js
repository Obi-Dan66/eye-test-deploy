import { createSlice } from "@reduxjs/toolkit";

export const testResultsSlice = createSlice({
  name: "testResults",
  initialState: {
    testNameSharpTest: "",
    resultTextSharpTest: "",
    imageUrlSharpTest1: "",
    imageUrlSharpTest2: "",
    testNameContrastTest: "",
    resultTextContrast: "",
    imageUrlContrastTest1: "",
    imageUrlContrastTest2: "",
    testNameColorTest: "",
    resultTextColorTest: "",
    imageUrlColorTest1: "",
    imageUrlColorTest2: "",
    testNameAstigmatismTest: "",
    resultTextAstigmatismTest: "",
    imageUrlAstigmatismTest1: "",
    imageUrlAstigmatismTest2: "",
    testNameEyeFieldTest: "",
    resultTextEyeFieldTest: "",
    imageUrlEyeFieldTest1: "",
    imageUrlEyeFieldTest2: "",
  },
  reducers: {
    setTestResult: (state, action) => {
      // Update only the fields provided in the payload
      if (action.payload.testNameSharpTest !== undefined) {
        state.testNameSharpTest = action.payload.testNameSharpTest;
        state.resultTextSharpTest = action.payload.resultTextSharpTest;
        state.imageUrlSharpTest1 = action.payload.imageUrlSharpTest1;
        state.imageUrlSharpTest2 = action.payload.imageUrlSharpTest2;
      }
      if (action.payload.testNameContrastTest !== undefined) {
        state.testNameContrastTest = action.payload.testNameContrastTest;
        state.resultTextContrastTest = action.payload.resultTextContrastTest;
        state.imageUrlContrastTest1 = action.payload.imageUrlContrastTest1;
        state.imageUrlContrastTest2 = action.payload.imageUrlContrastTest2;
      }
      if (action.payload.testNameColorTest !== undefined) {
        state.testNameColorTest = action.payload.testNameColorTest;
        state.resultTextColorTest = action.payload.resultTextColorTest;
        state.imageUrlColorTest1 = action.payload.imageUrlColorTest1;
        state.imageUrlColorTest2 = action.payload.imageUrlColorTest2;
      }
      if (action.payload.testNameAstigmatismTest !== undefined) {
        state.testNameAstigmatismTest = action.payload.testNameAstigmatismTest;
        state.resultTextAstigmatismTest =
          action.payload.resultTextAstigmatismTest;
        state.imageUrlAstigmatismTest1 =
          action.payload.imageUrlAstigmatismTest1;
        state.imageUrlAstigmatismTest2 =
          action.payload.imageUrlAstigmatismTest2;
      }
      if (action.payload.testNameEyeFieldTest !== undefined) {
        state.testNameEyeFieldTest = action.payload.testNameEyeFieldTest;
        state.resultTextEyeFieldTest = action.payload.resultTextEyeFieldTest;
        state.imageUrlEyeFieldTest1 = action.payload.imageUrlEyeFieldTest1;
        state.imageUrlEyeFieldTest2 = action.payload.imageUrlEyeFieldTest2;
      }
    },
  },
});

export const { setTestResult } = testResultsSlice.actions;

export default testResultsSlice.reducer;
