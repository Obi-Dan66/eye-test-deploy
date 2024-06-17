const initialState = {
  seenInstructions: false,
};

const instructionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEEN_INSTRUCTIONS":
      return {
        ...state,
        seenInstructions: action.payload,
      };
    default:
      return state;
  }
};

export default instructionsReducer;
