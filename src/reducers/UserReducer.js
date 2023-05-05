import { TYPES } from '@/actions/UserActions';

export const userReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return { ...state, ...payload.user };
    case TYPES.VERIFY_OTP_SUCCESS:
      return { ...state, ...payload.user };
    case TYPES.UPDATE_PROFILE_SUCCESS:
      return { ...state, ...payload.user };
    case TYPES.UPLOAD_PROFILE_SUCCESS:
      return { ...state, ...payload.user };
    case TYPES.GET_USER_PROFILE_BY_USER_ID_SUCCESS:
      return { ...state, getUserByUserId: payload.user };
    case TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_SUCCESS:
      return { ...state, getAllPostsByLoggedInUser: payload.post };
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
