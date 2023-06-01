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
    case TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_SUCCESS:
      return {
        ...state,
        getAllPostsByLoggedInUser: [...state.getAllPostsByLoggedInUser, ...payload.post]
      };
    case TYPES.FOLLOWERS_SUCCESS:
      return { ...state, followersDatainReducer: payload.user };
    case TYPES.BLOCK_LIST_SUCCESSS:
      return { ...state, blockListKey: payload.user };
    case TYPES.SEARCH_USER_SUCCESS:
      return { ...state, searchUserKey: payload.user };
    case TYPES.GET_ALL_ACTIVITY_SUCCESS:
      return { ...state, MyActivityKey: payload.user };
    case TYPES.GET_ALL_BANNED_USERS_SUCCESS:
      return { ...state, getAllBannedUsersKey: payload.user };
    case TYPES.MANAGE_ALL_REPORTS_SUCCESS:
      return { ...state, allReportsKeyKey: payload.user };
    case TYPES.GET_ALL_NOTIFICATIONS_SUCCESS:
      return { ...state, notificationKey: payload.user };
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
