const initialState = { loaderVisible: false };
const settings = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "ENABLE_LOADER":
      return { ...state, loaderVisible: true };
    case "DISABLE_LOADER":
      return { ...state, loaderVisible: false };
    default:
      return state;
  }
};

export default settings;
