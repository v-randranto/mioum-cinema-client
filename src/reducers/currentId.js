import * as Actions from '../constants/actionTypes';

const reducer = (currentId = 0, action) => {
  const {payload} = action
  switch (action.type) {
    case Actions.SET:
      return payload;
      case Actions.RESET:
        return 0;
    default:
      return currentId;
  }
};

export default reducer