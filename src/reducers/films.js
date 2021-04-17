import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/actionTypes';

const reducer = (films = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...films, action.payload];
    case UPDATE:
      return films.map((film) =>
        film._id === action.payload._id ? action.payload : film
      );
    case DELETE:
      return films.filter((film) => film._id !== action.payload);
    default:
      return films;
  }
};

export default reducer;
