import * as Actions from '../constants/actionTypes';

const filmsDataInit = {
  films: [],
  page: 1,
  count: 0,
  totalFilms: 0,
};

const reducer = (filmsData = filmsDataInit, action) => {
  switch (action.type) {
    case Actions.FETCH_ALL:
      return action.payload;
    case Actions.CREATE:
      return action.payload;
    case Actions.UPDATE:
      return action.payload;
    case Actions.DELETE:
      return action.payload;
    default:
      return filmsData;
  }
};

export default reducer;
