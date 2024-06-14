import { SET_SEEN_INSTRUCTIONS } from "./actionTypes";

export const setSeenInstructions = (seen) => ({
  type: SET_SEEN_INSTRUCTIONS,
  payload: seen,
});
