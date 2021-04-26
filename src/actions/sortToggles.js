import {
  TOGGLE_TITLE,
  TOGGLE_DIRECTOR,
  TOGGLE_YEAR,
} from '../constants/actionTypes';

export const sortByTitle = (titleToggle) => async (dispatch) => {
  try {
    const payload = {
      
      titleToggle: !titleToggle,
      directorToggle: false,
      yearToggle: false,
    };
    dispatch({ type: TOGGLE_TITLE, payload });
  } catch (error) {
    console.log(error.message);
  }
};
export const sortByDirector = (directorToggle) => async (dispatch) => {
  try {
    const payload = {
      titleToggle: false,
      directorToggle: !directorToggle,
      yearToggle: false,
    };
    dispatch({ type: TOGGLE_DIRECTOR, payload });
  } catch (error) {
    console.log(error.message);
  }
};

export const sortByYear = (yearToggle) => async (dispatch) => {
  try {
    const payload = {
      titleToggle: false,
      directorToggle: false,
      yearToggle: !yearToggle,
    };
    dispatch({ type: TOGGLE_YEAR, payload });
  } catch (error) {
    console.log(error.message);
  }
};
