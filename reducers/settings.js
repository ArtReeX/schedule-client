const initialState = {};
const schedule = (state = initialState, action) => {
  const { type, settings } = action;
  switch (type) {
    case "UPDATE_SETTINGS":
      return { ...state, settings };
    default:
      return state;
  }
};

export default schedule;
