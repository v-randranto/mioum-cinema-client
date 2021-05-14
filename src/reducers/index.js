import { combineReducers } from 'redux';
import filmsData from './filmsData';
import currentId from './currentId';

export default combineReducers({
  filmsData,
  currentId,
});
