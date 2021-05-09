import * as Actions from '../constants/actionTypes';

export const setCurrentId = (currentId) => async (dispatch) => {
  try {
    dispatch({ type: Actions.SET, payload: currentId });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetCurrentId = () => async (dispatch) => {
    try {
      dispatch({ type: Actions.RESET });
    } catch (error) {
      console.log(error.message);
    }  
  };
