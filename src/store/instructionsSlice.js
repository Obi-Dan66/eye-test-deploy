import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seenInstructions: false,
  hasVisited: false,
};

const instructionsSlice = createSlice({
  name: "instructions",
  initialState,
  reducers: {
    setSeenInstructions(state, action) {
      console.log(
        "Reducer - Before Setting Seen Instructions:",
        state.seenInstructions
      );
      state.seenInstructions = action.payload;
      console.log(
        "Reducer - After Setting Seen Instructions:",
        state.seenInstructions
      );
    },
    setHasVisited(state) {
      state.hasVisited = true;
    },
  },
});

export const { setSeenInstructions, setHasVisited } = instructionsSlice.actions;
export default instructionsSlice.reducer;
