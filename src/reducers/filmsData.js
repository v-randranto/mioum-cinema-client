import * as Actions from '../constants/actionTypes';

const filmsDataInit = {
  films: [],
  page: 1,
  count: 0,
  totalFilms: 0,
};

const reducer = (filmsData = filmsDataInit, action) => {
  const { films} = filmsData;
  const {payload} = action
  console.log('filmsData', filmsData)
  console.log('payload', payload)
  let index = 0
  switch (action.type) {
    case Actions.FETCH_ALL:
      return payload;
      case Actions.CREATE:
        films.push(payload)
        return {...filmsData, films};
    case Actions.UPDATE:
      index = films.findIndex((f) => f._id === payload.id);
      films[index] = payload.film;
      return {...filmsData, films};
      case Actions.DELETE:
        films.filter((film) => film._id !== payload);
        return {...filmsData, films};
    default:
      return filmsData;
  }
};

export default reducer;
