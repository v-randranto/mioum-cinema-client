import {
  SORT_TITLE,
  SORT_DIRECTOR,
  SORT_YEAR,
} from '../constants/actionTypes';

const reducer = (sortCriteria = "", action) => {
  switch (action.type) {
    case SORT_TITLE:
      return action.payload;
    case SORT_DIRECTOR:
      return action.payload;
    case SORT_YEAR:
      return action.payload;
    default:
      return sortCriteria;
  }
};

export default reducer;
