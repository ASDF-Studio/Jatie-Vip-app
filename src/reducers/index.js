import { combineReducers } from 'redux';
import { errorReducer } from '@/reducers/ErrorReducer';
import { statusReducer } from '@/reducers/StatusReducer';
import { userReducer } from '@/reducers/UserReducer';
import StatusReducer from '@/reducers/falseAuth';
import { postReducer } from './PostReducer';
import { storage } from '@/storage';
import { TYPES } from '@/actions/UserActions';

const appReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
  post: postReducer,
  userType: StatusReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === TYPES.LOG_OUT) {
    storage.removeItem('persist:root');

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
