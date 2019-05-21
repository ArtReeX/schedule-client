const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SCHEDULE":
      return action.lessons;
    default:
      return state;
  }
};
