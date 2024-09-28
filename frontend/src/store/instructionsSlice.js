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
      state.seenInstructions = action.payload;
    },
    setHasVisited(state) {
      state.hasVisited = true;
    },
  },
});

export const { setSeenInstructions, setHasVisited } = instructionsSlice.actions;
export default instructionsSlice.reducer;
