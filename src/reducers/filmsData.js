import * as Actions from '../constants/actionTypes';

const filmsDataInit = {
  films: [],
  page: 0,
  count: 0,
  totalFilms: 0,
  totalFilteredFilms: 0,
  size: 20,
};

const reducer = (filmsData = filmsDataInit, action) => {
  const { films, totalFilms, totalFilteredFilms } = filmsData;
  const { payload } = action;

  let index = 0;
  switch (action.type) {
    case Actions.RESET:
      return filmsDataInit;
    case Actions.FETCH_ALL:
      return payload;
    case Actions.CREATE:
      films.push(payload);
      return {
        ...filmsData,
        films,
        totalFilms: totalFilms + 1,
        totalFilteredFilms: totalFilteredFilms + 1,
      };
    case Actions.UPDATE:
      index = films.findIndex((f) => f._id === payload.id);
      films[index] = payload.film;
      return { ...filmsData, films };
    case Actions.DELETE:
      index = films.findIndex((f) => f._id === payload);
      films.splice(index, 1);
      return {
        ...filmsData,
        films,
        totalFilms: totalFilms - 1,
        totalFilteredFilms: totalFilteredFilms - 1,
      };
    default:
      return filmsData;
  }
};

export default reducer;
