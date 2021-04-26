import {
  SORT_TITLE,
  SORT_DIRECTOR,
  SORT_YEAR
} from '../constants/actionTypes';


export const sortByTitle = (titleToggle) => async (dispatch) => {
  const payload = titleToggle? "TITLE_DESC": "TITLE_ASC"
  try {
    dispatch({ type: SORT_TITLE, payload });
  } catch (error) {
    console.log(error.message);
  }
};

export const sortByDirector = (directorToggle) => async (dispatch) => {
  const payload = directorToggle? "DIRECTOR_DESC": "DIRECTOR_ASC"
  try {
    dispatch({ type: SORT_DIRECTOR, payload });
  } catch (error) {
    console.log(error.message);
  }
};

export const sortByYear = (yearToggle) => async (dispatch) => {
  const payload = yearToggle? "YEAR_DESC": "YEAR_ASC"
  try {
    dispatch({ type: SORT_YEAR, payload });
  } catch (error) {
    console.log(error.message);
  }
};
