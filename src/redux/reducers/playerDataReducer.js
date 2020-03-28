const initialState = {};

const playerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "playerTest": {
      return Object.assign({}, state);
    }
    default:
      return state;
  }
};

export default playerDataReducer;
