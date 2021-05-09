import { combineReducers } from 'redux';
import filmsData from './filmsData';
import searchData from './searchData';
import currentId from './currentId';

export default combineReducers({
  filmsData,
  searchData,
  currentId,
});
