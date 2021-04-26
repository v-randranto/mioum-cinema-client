import { combineReducers } from 'redux';
import films from './films';
import sortToggles from './sortToggles';
import sortCriteria from './sortCriteria';

export default combineReducers({
  films,
  sortToggles,
  sortCriteria
});
