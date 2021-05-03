import * as Actions from '../constants/actionTypes';

const reducer = (films = [], action) => {
  console.log('reducer', action);
  switch (action.type) {
    case Actions.FETCH_ALL:
      return action.payload;
    case Actions.CREATE:
      return [...films, action.payload];
    case Actions.UPDATE:
      return films.map((film) =>
        film._id === action.payload._id ? action.payload : film
      );
    case Actions.DELETE:
      return films.filter((film) => film._id !== action.payload);
    default:
      return films;
  }
};

export default reducer;
