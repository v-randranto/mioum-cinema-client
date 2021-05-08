import * as Actions from '../constants/actionTypes';

const searchDataInit = {
  term: '',
  minYear: '',
  maxYear: '',
  seen: '',
  sort: '',
  direction: '',
};

const reducer = (searchData = searchDataInit, action) => {
  const {payload} = action
  switch (action.type) {
    case Actions.SET:
      return payload;
      case Actions.RESET:
        return searchDataInit;
    default:
      return searchData;
  }
};

export default reducer