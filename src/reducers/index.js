import { combineReducers } from 'redux';
import filmsData from './filmsData';
import searchData from './searchData';

export default combineReducers({
  filmsData,
  searchData
});
