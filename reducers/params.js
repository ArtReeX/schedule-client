const initialState = { day: "00-00-00", groupID: 0 };
const params = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "UPDATE_DAY":
      return { ...state, day: action.day };
    case "UPDATE_GROUP":
      return { ...state, groupID: action.param };
    default:
      return state;
  }
};

export default params;
