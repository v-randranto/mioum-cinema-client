import {
  TOGGLE_TITLE,
  TOGGLE_DIRECTOR,
  TOGGLE_YEAR,
} from '../constants/actionTypes';

const sortTogglesInit = {
  titleToggle: false,
  directorToggle: false,
  yearToggle: false,
};

const reducer = (sortToggles = sortTogglesInit, action) => {
  switch (action.type) {
    case TOGGLE_TITLE:
      return action.payload;
    case TOGGLE_DIRECTOR:
      return action.payload;
    case TOGGLE_YEAR:
      return action.payload;
    default:
      return sortToggles;
  }
};

export default reducer;
