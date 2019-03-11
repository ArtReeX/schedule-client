const initialState = { day: "00-00-00", groupID: 0 };
export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DAY":
      return { ...state, day: action.day };
    case "UPDATE_GROUP":
      return { ...state, groupID: action.param };
    default:
      return state;
  }
};
