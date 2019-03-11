const initialState = { loaderVisible: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case "ENABLE_LOADER":
      return { ...state, loaderVisible: true };
    case "DISABLE_LOADER":
      return { ...state, loaderVisible: false };
    default:
      return state;
  }
};
