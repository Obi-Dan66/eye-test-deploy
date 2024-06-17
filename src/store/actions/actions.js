import { SET_SEEN_INSTRUCTIONS } from "./actionTypes";

export const setSeenInstructions = (seen) => {
  console.log("Action - Set Seen Instructions:", seen);
  return {
    type: SET_SEEN_INSTRUCTIONS,
    payload: seen,
  };
};
