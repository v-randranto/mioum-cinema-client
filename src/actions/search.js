import * as Actions from '../constants/actionTypes';

export const setSearchData = (searchData = null) => async (dispatch) => {
  try {
    dispatch({ type: Actions.SET, payload: searchData });
  } catch (error) {
    console.log(error.message);
  }

};

export const resetSearchData = () => async (dispatch) => {
    try {
      dispatch({ type: Actions.RESET });
    } catch (error) {
      console.log(error.message);
    }
  
  };
