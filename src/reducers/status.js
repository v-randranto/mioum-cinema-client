const statusReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return { ...state, isSuccessful: true, isLoading: false, infoMessage: action.message };
    case 'failure':
      return { ...state, isFailed: true, isLoading: false, errMessage: action.message };
    default:
      return state;
  }
};

export default statusReducer;
