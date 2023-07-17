import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { globalReset } from './GlobalActions';
import { getAllPost } from './PostActions';
import { customShowMessage } from '@/utils';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',

  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  VERIFY_OTP: 'VERIFY_OTP',
  VERIFY_OTP_REQUEST: 'VERIFY_OTP_REQUEST',
  VERIFY_OTP_SUCCESS: 'VERIFY_OTP_SUCCESS',
  VERIFY_OTP_ERROR: 'VERIFY_OTP_ERROR',

  CHECK_USERNAME: 'CHECK_USERNAME',
  CHECK_USERNAME_REQUEST: 'CHECK_USERNAME_REQUEST',
  CHECK_USERNAME_SUCCESS: 'CHECK_USERNAME_SUCCESS',
  CHECK_USERNAME_ERROR: 'CHECK_USERNAME_ERROR',

  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',

  UPLOAD_PROFILE: 'UPLOAD_PROFILE',
  UPLOAD_PROFILE_REQUEST: 'UPLOAD_PROFILE_REQUEST',
  UPLOAD_PROFILE_SUCCESS: 'UPLOAD_PROFILE_SUCCESS',
  UPLOAD_PROFILE_ERROR: 'UPLOAD_PROFILE_ERROR',

  //FOLLOW USER

  FOLLOW_USER: 'FOLLOW_USER',
  FOLLOW_USER_REQUEST: 'FOLLOW_USER_REQUEST',
  FOLLOW_USER_SUCCESS: 'FOLLOW_USER_SUCCESS',
  FOLLOW_USER_ERROR: 'FOLLOW_USER_ERROR',

  //UNFOLLOW USER

  UN_FOLLOW_USER: 'UN_FOLLOW_USER',
  UN_FOLLOW_USER_REQUEST: 'UN_FOLLOW_USER_REQUEST',
  UN_FOLLOW_USER_SUCCESS: 'UN_FOLLOW_USER_SUCCESS',
  UN_FOLLOW_USER_ERROR: 'UN_FOLLOW_USER_ERROR',

  //user create post
  CREATE_POST: 'CREATE_POST',
  CREATE_POST_REQUEST: 'CREATE_POST_REQUEST',
  CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'CREATE_POST_ERROR',

  //user update post
  UPDATE_POST: 'UPDATE_POST',
  UPDATE_POST_REQUEST: 'UPDATE_POST_REQUEST',
  UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
  UPDATE_POST_ERROR: 'UPDATE_POST_ERROR',

  //user delete post
  DELETE_POST: 'DELETE_POST',
  DELETE_POST_REQUEST: 'DELETE_POST_REQUEST',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
  DELETE_POST_ERROR: 'DELETE_POST_ERROR',

  //Get user profile by userID
  GET_USER_PROFILE_BY_USER_ID: 'GET_USER_PROFILE_BY_USER_ID',
  GET_USER_PROFILE_BY_USER_ID_REQUEST: 'GET_USER_PROFILE_BY_USER_ID_REQUEST',
  GET_USER_PROFILE_BY_USER_ID_SUCCESS: 'GET_USER_PROFILE_BY_USER_ID_SUCCESS',
  GET_USER_PROFILE_BY_USER_ID_ERROR: 'GET_USER_PROFILE_BY_USER_ID_ERROR',

  //get all post by logged in user
  GET_ALL_POST_BY_LOGGED_IN_USER: 'GET_ALL_POST_BY_LOGGED_IN_USER',
  GET_ALL_POST_BY_LOGGED_IN_USER_REQUEST:
    'GET_ALL_POST_BY_LOGGED_IN_USER_REQUEST',
  GET_ALL_POST_BY_LOGGED_IN_USER_SUCCESS:
    'GET_ALL_POST_BY_LOGGED_IN_USER_SUCCESS',
  GET_ALL_POST_BY_LOGGED_IN_USER_ERROR: 'GET_ALL_POST_BY_LOGGED_IN_USER_ERROR',

  //get all post by UserID
  GET_ALL_POST_BY_USERID: 'GET_ALL_POST_BY_USERID',
  GET_ALL_POST_BY_USERID_REQUEST: 'GET_ALL_POST_BY_USERID_REQUEST',
  GET_ALL_POST_BY_USERID_SUCCESS: 'GET_ALL_POST_BY_USERID_SUCCESS',
  GET_ALL_POST_BY_USERID_ERROR: 'GET_ALL_POST_BY_USERID_ERROR',

  GET_ALL_POST_BY_USER_ID_PAGINATION: 'GET_ALL_POST_BY_USER_ID_PAGINATION',
  GET_ALL_POST_BY_USER_ID_PAGINATION_REQUEST:
    'GET_ALL_POST_BY_USER_ID_PAGINATION_REQUEST',
  GET_ALL_POST_BY_USER_ID_PAGINATION_SUCCESS:
    'GET_ALL_POST_BY_USER_ID_PAGINATION_SUCCESS',
  GET_ALL_POST_BY_USER_ID_PAGINATION_ERROR:
    'GET_ALL_POST_BY_USER_ID_PAGINATION_ERROR',

  GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION:
    'GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION',
  GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_REQUEST:
    'GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_REQUEST',
  GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_SUCCESS:
    'GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_SUCCESS',
  GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_ERROR:
    'GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_ERROR',

  GET_ALL_ACTIVITY_BY_LOGGED_IN_USER: 'GET_ALL_ACTIVITY_BY_LOGGED_IN_USER',
  GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_REQUEST:
    'GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_REQUEST',
  GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_SUCCESS:
    'GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_SUCCESS',
  GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_ERROR:
    'GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_ERROR',

  //Followers
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWERS_REQUEST: 'FOLLOWERS_REQUEST',
  FOLLOWERS_SUCCESS: 'FOLLOWERS_SUCCESS',
  FOLLOWERS_ERROR: 'FOLLOWERS_ERROR',

  //BLOCK_USERS
  BLOCK_LIST: 'BLOCK_LIST',
  BLOCK_LIST_REQUEST: 'BLOCK_LIST_REQUEST',
  BLOCK_LIST_SUCCESSS: 'BLOCK_LIST_SUCCESSS',
  BLOCK_LIST_ERROR: 'BLOCK_LIST_ERROR',

  //SEARCH_USER
  SEARCH_USER: 'SEARCH_USER',
  SEARCH_USER_SUCCESS: 'SEARCH_USER_SUCCESS',
  SEARCH_USER_REQUEST: 'SEARCH_USER_REQUEST',
  SEARCH_USER_ERROR: 'SEARCH_USER_ERROR',

  //UNBLOCK_USER_BY_ID
  UNBLOCK_USER_BY_ID: 'UNBLOCK_USER_BY_ID',
  UNBLOCK_USER_BY_ID_REQUEST: 'UNBLOCK_USER_BY_ID_REQUEST',
  UNBLOCK_USER_BY_ID_SUCCESS: 'UNBLOCK_USER_BY_ID_SUCCESS',
  UNBLOCK_USER_BY_ID_ERROR: 'UNBLOCK_USER_BY_ID_ERROR',

  //GET_ALL_ACTIVITY
  GET_ALL_ACTIVITY: 'GET_ALL_ACTIVITY',
  GET_ALL_ACTIVITY_REQUEST: 'GET_ALL_ACTIVITY_REQUEST',
  GET_ALL_ACTIVITY_SUCCESS: 'GET_ALL_ACTIVITY_SUCCESS',
  GET_ALL_ACTIVITY_ERROR: 'GET_ALL_ACTIVITY_ERROR',

  //MANAGE_ALL_REPORTS
  MANAGE_ALL_REPORTS: 'MANAGE_ALL_REPORTS',
  MANAGE_ALL_REPORTS_REQUEST: 'MANAGE_ALL_REPORTS_REQUEST',
  MANAGE_ALL_REPORTS_SUCCESS: 'MANAGE_ALL_REPORTS_SUCCESS',
  MANAGE_ALL_REPORTS_ERROR: 'MANAGE_ALL_REPORTS_ERROR',

  //GET_ALL_BANNED_USERS
  GET_ALL_BANNED_USERS: 'GET_ALL_BANNED_USERS',
  GET_ALL_BANNED_USERS_REQUEST: 'GET_ALL_BANNED_USERS_REQUEST',
  GET_ALL_BANNED_USERS_SUCCESS: 'GET_ALL_BANNED_USERS_SUCCESS',
  GET_ALL_BANNED_USERS_ERROR: 'GET_ALL_BANNED_USERS_ERROR',

  //UNBANNED_USER
  UNBANNED_USER_BY_ID: 'UNBANNED_USER_BY_ID',
  UNBANNED_USER_BY_ID_REQUEST: 'UNBANNED_USER_BY_ID_REQUEST',
  UNBANNED_USER_BY_ID_SUCCESS: 'UNBANNED_USER_BY_ID_SUCCESS',
  UNBANNED_USER_BY_ID_ERROR: 'UNBANNED_USER_BY_ID_ERROR',

  //BANNED_USER
  BANNED_USER_BY_ID: 'BANNED_USER_BY_ID',
  BANNED_USER_BY_ID_REQUEST: 'BANNED_USER_BY_ID_REQUEST',
  BANNED_USER_BY_ID_SUCCESS: 'BANNED_USER_BY_ID_SUCCESS',
  BANNED_USER_BY_ID_ERROR: 'BANNED_USER_BY_ID_ERROR',

  //GET_ALL_NOTIFICATIONS
  GET_ALL_NOTIFICATIONS: 'GET_ALL_NOTIFICATIONS',
  GET_ALL_NOTIFICATIONS_REQUEST: 'GET_ALL_NOTIFICATIONS_REQUEST',
  GET_ALL_NOTIFICATIONS_SUCCESS: 'GET_ALL_NOTIFICATIONS_SUCCESS',
  GET_ALL_NOTIFICATIONS_ERROR: 'GET_ALL_NOTIFICATIONS_ERROR',

  //MARK_ALL_READ_NOTIFICATIONS
  MARK_ALL_READ_NOTIFICATIONS: 'MARK_ALL_READ_NOTIFICATIONS',
  MARK_ALL_READ_NOTIFICATIONS_REQUEST: 'MARK_ALL_READ_NOTIFICATIONS_REQUEST',
  MARK_ALL_READ_NOTIFICATIONS_SUCCESS: 'MARK_ALL_READ_NOTIFICATIONS_SUCCESS',
  MARK_ALL_READ_NOTIFICATIONS_ERROR: 'MARK_ALL_READ_NOTIFICATIONS_ERROR',

  // Update user notif data
  UPDATE_USER_NOTIF_SETTINGS: 'UPDATE_USER_NOTIF_SETTINGS',

  //Update FCM token
  UPDATE_FCM_TOKEN: 'UPDATE_FCM_TOKEN',
  UPDATE_FCM_TOKEN_REQUEST: 'UPDATE_FCM_TOKEN_REQUEST',
  UPDATE_FCM_TOKEN_SUCCESS: 'UPDATE_FCM_TOKEN_SUCCESS',
  UPDATE_FCM_TOKEN_ERROR: 'UPDATE_FCM_TOKEN_ERROR',

  //Update user type subscription
  UPDATE_USER_TYPE: 'UPDATE_USER_TYPE',
  UPDATE_USER_TYPE_REQUEST: 'UPDATE_USER_TYPE_REQUEST',
  UPDATE_USER_TYPE_SUCCESS: 'UPDATE_USER_TYPE_SUCCESS',
  UPDATE_USER_TYPE_ERROR: 'UPDATE_USER_TYPE_ERROR',
};
const updateUserTypeRequest = () => ({
  type: TYPES.UPDATE_USER_TYPE_REQUEST,
  payload: null,
});

const updateUserTypeError = error => ({
  type: TYPES.UPDATE_USER_TYPE_ERROR,
  payload: { error },
});

const updateUserTypeSuccess = user => ({
  type: TYPES.UPDATE_USER_TYPE_SUCCESS,
  payload: { user },
});

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginError = error => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const loginSuccess = user => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const verifyOtpRequest = () => ({
  type: TYPES.VERIFY_OTP_REQUEST,
  payload: null,
});

const verifyOtpError = error => ({
  type: TYPES.VERIFY_OTP_ERROR,
  payload: { error },
});

const verifyOtpSuccess = user => ({
  type: TYPES.VERIFY_OTP_SUCCESS,
  payload: { user },
});

///
const checkUserNameRequest = () => ({
  type: TYPES.CHECK_USERNAME_REQUEST,
  payload: null,
});

const checkUserNameError = error => ({
  type: TYPES.CHECK_USERNAME_ERROR,
  payload: { error },
});

const checkUserNameSuccess = user => ({
  type: TYPES.CHECK_USERNAME_SUCCESS,
  payload: { user },
});
///

const updateProfileRequest = () => ({
  type: TYPES.UPDATE_PROFILE_REQUEST,
  payload: null,
});

const updateProfileError = error => ({
  type: TYPES.UPDATE_PROFILE_ERROR,
  payload: { error },
});

export const updateProfileSuccess = user => ({
  type: TYPES.UPDATE_PROFILE_SUCCESS,
  payload: { user },
});

const uploadProfileRequest = () => ({
  type: TYPES.UPLOAD_PROFILE_REQUEST,
  payload: null,
});

const uploadProfileError = error => ({
  type: TYPES.UPLOAD_PROFILE_ERROR,
  payload: { error },
});

const uploadProfileSuccess = user => ({
  type: TYPES.UPLOAD_PROFILE_SUCCESS,
  payload: { user },
});

export const followUserSuccess = user => ({
  type: TYPES.FOLLOW_USER_SUCCESS,
  payload: { user },
});

const followUserRequest = () => ({
  type: TYPES.FOLLOW_USER_REQUEST,
  payload: null,
});

const followUserError = error => ({
  type: TYPES.FOLLOW_USER_ERROR,
  payload: { error },
});

export const unFollowUserSuccess = comment => ({
  type: TYPES.UN_FOLLOW_USER_SUCCESS,
  payload: { comment },
});

const unFollowUserRequest = () => ({
  type: TYPES.UN_FOLLOW_USER_REQUEST,
  payload: null,
});

const unFollowUserError = error => ({
  type: TYPES.UN_FOLLOW_USER_ERROR,
  payload: { error },
});

//Search User

export const searchUserSuccess = user => ({
  type: TYPES.SEARCH_USER_SUCCESS,
  payload: { user },
});

const searchUserRequest = () => ({
  type: TYPES.SEARCH_USER_REQUEST,
  payload: null,
});

const searchUserError = error => ({
  type: TYPES.SEARCH_USER_ERROR,
  payload: { error },
});

//GET ALL POST BY LOGGED IN USER

export const getAllPostByLoggedInUserSuccess = post => ({
  type: TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_SUCCESS,
  payload: { post },
});

const getAllPostByLoggedInUserRequest = () => ({
  type: TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_REQUEST,
  payload: null,
});

const getAllPostByLoggedInUserError = error => ({
  type: TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_ERROR,
  payload: { error },
});

export const getAllPostByLoggedInUserPaginationSuccess = post => ({
  type: TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_SUCCESS,
  payload: { post },
});

const getAllPostByLoggedInUserPaginationRequest = () => ({
  type: TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_REQUEST,
  payload: null,
});

const getAllPostByLoggedInUserPaginationError = error => ({
  type: TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION_ERROR,
  payload: { error },
});

//Get all post by userid
export const getAllPostByUserIdSuccess = post => ({
  type: TYPES.GET_ALL_POST_BY_USERID_SUCCESS,
  payload: { post },
});

const getAllPostByUserIDRequest = () => ({
  type: TYPES.GET_ALL_POST_BY_USERID_REQUEST,
  payload: null,
});

const getAllPostByUserIDError = error => ({
  type: TYPES.GET_ALL_POST_BY_USERID_ERROR,
  payload: { error },
});

export const getAllPostByUserIdPaginationSuccess = post => ({
  type: TYPES.GET_ALL_POST_BY_USER_ID_PAGINATION_SUCCESS,
  payload: { post },
});

const getAllPostByUserIdPaginationRequest = () => ({
  type: TYPES.GET_ALL_POST_BY_USER_ID_PAGINATION_REQUEST,
  payload: null,
});

const getAllPostByUserIdPaginationError = error => ({
  type: TYPES.GET_ALL_POST_BY_USER_ID_PAGINATION_ERROR,
  payload: { error },
});

export const getAllActivityByLoggedInUserSuccess = post => ({
  type: TYPES.GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_SUCCESS,
  payload: { post },
});

const getAllActivityByLoggedInUserRequest = () => ({
  type: TYPES.GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_REQUEST,
  payload: null,
});

const getAllActivityByLoggedInUserError = error => ({
  type: TYPES.GET_ALL_ACTIVITY_BY_LOGGED_IN_USER_ERROR,
  payload: { error },
});

//create post
export const createPostSuccess = user => ({
  type: TYPES.CREATE_POST_SUCCESS,
  payload: { user },
});

const createPostRequest = () => ({
  type: TYPES.CREATE_POST_REQUEST,
  payload: null,
});

const createPostError = error => ({
  type: TYPES.CREATE_POST_ERROR,
  payload: { error },
});

//update Post
export const updatePostSuccess = user => ({
  type: TYPES.UPDATE_POST_SUCCESS,
  payload: { user },
});

const updatePostRequest = () => ({
  type: TYPES.UPDATE_POST_REQUEST,
  payload: null,
});

const updatePostError = error => ({
  type: TYPES.UPDATE_POST_ERROR,
  payload: { error },
});

//delete Post
export const deletePostSuccess = user => ({
  type: TYPES.DELETE_POST_SUCCESS,
  payload: { user },
});

const deletePostRequest = () => ({
  type: TYPES.DELETE_POST_REQUEST,
  payload: null,
});

const deletePostError = error => ({
  type: TYPES.DELETE_POST_ERROR,
  payload: { error },
});

export const getUserProfileByUserIdSuccess = user => ({
  type: TYPES.GET_USER_PROFILE_BY_USER_ID_SUCCESS,
  payload: { user },
});

const getUserProfileByUserIdRequest = () => ({
  type: TYPES.GET_USER_PROFILE_BY_USER_ID_REQUEST,
  payload: null,
});

const getUserProfileByUserIdError = error => ({
  type: TYPES.GET_USER_PROFILE_BY_USER_ID_ERROR,
  payload: { error },
});

//FollowersListDAta
export const followersSuccess = user => ({
  type: TYPES.FOLLOWERS_SUCCESS,
  payload: { user },
});

const followersRequest = () => ({
  type: TYPES.FOLLOWERS_REQUEST,
  payload: null,
});

const followersError = error => ({
  type: TYPES.FOLLOWERS_ERROR,
  payload: { error },
});

//Clear store
const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

//BloclListData
export const blocklistSuccess = user => ({
  type: TYPES.BLOCK_LIST_SUCCESSS,
  payload: { user },
});

const blockListRequest = () => ({
  type: TYPES.BLOCK_LIST_REQUEST,
  payload: null,
});

const blockListError = error => ({
  type: TYPES.BLOCK_LIST_ERROR,
  payload: { error },
});

export const unblockUserByIdSuccess = user => ({
  type: TYPES.UNBLOCK_USER_BY_ID_SUCCESS,
  payload: { user },
});

const unblockUserByIdRequest = () => ({
  type: TYPES.UNBLOCK_USER_BY_ID_REQUEST,
  payload: null,
});

const unblockUserByIdError = error => ({
  type: TYPES.UNBLOCK_USER_BY_ID_ERROR,
  payload: { error },
});

//Get All activity by user Id
export const getAllActivitySuccess = user => ({
  type: TYPES.GET_ALL_ACTIVITY_SUCCESS,
  payload: { user },
});

const getAllActivityRequest = () => ({
  type: TYPES.GET_ALL_ACTIVITY_REQUEST,
  payload: null,
});

const getAllActivityError = error => ({
  type: TYPES.GET_ALL_ACTIVITY_ERROR,
  payload: { error },
});

// manage All reports
export const manageAllReportsSuccess = user => ({
  type: TYPES.MANAGE_ALL_REPORTS_SUCCESS,
  payload: { user },
});

const manageAllReportsRequest = () => ({
  type: TYPES.MANAGE_ALL_REPORTS_REQUEST,
  payload: null,
});

const manageAllReportsError = error => ({
  type: TYPES.MANAGE_ALL_REPORTS_ERROR,
  payload: { error },
});

export const getBannedUsersSuccess = user => ({
  type: TYPES.GET_ALL_BANNED_USERS_SUCCESS,
  payload: { user },
});

const getBannedUsersRequest = () => ({
  type: TYPES.GET_ALL_BANNED_USERS_REQUEST,
  payload: null,
});

const getAllBannedUsersError = error => ({
  type: TYPES.GET_ALL_BANNED_USERS_ERROR,
  payload: { error },
});

//Unbanned User By ID
export const unBannedUserByIdSuccess = user => ({
  type: TYPES.UNBANNED_USER_BY_ID_SUCCESS,
  payload: { user },
});

const unBannedUserByIdRequest = () => ({
  type: TYPES.UNBANNED_USER_BY_ID_REQUEST,
  payload: null,
});

const unBannedUserByIdError = error => ({
  type: TYPES.UNBANNED_USER_BY_ID_ERROR,
  payload: { error },
});

//banned User By ID
export const bannedUserByIdSuccess = user => ({
  type: TYPES.BANNED_USER_BY_ID_SUCCESS,
  payload: { user },
});

const bannedUserByIdRequest = () => ({
  type: TYPES.BANNED_USER_BY_ID_REQUEST,
  payload: null,
});

const bannedUserByIdError = error => ({
  type: TYPES.BANNED_USER_BY_ID_ERROR,
  payload: { error },
});

//Get all Notifications
export const getAllNotificationsSuccess = user => ({
  type: TYPES.GET_ALL_NOTIFICATIONS_SUCCESS,
  payload: { user },
});

const getAllNotificationsRequest = () => ({
  type: TYPES.GET_ALL_NOTIFICATIONS_REQUEST,
  payload: null,
});

const getAllNotificationsError = error => ({
  type: TYPES.GET_ALL_NOTIFICATIONS_ERROR,
  payload: { error },
});

//mark All read Notifications
export const markAllReadNotificationsSuccess = user => ({
  type: TYPES.MARK_ALL_READ_NOTIFICATIONS_SUCCESS,
  payload: { user },
});

const markAllReadNotificationsRequest = () => ({
  type: TYPES.MARK_ALL_READ_NOTIFICATIONS_REQUEST,
  payload: null,
});

const markAllReadNotificationsError = error => ({
  type: TYPES.MARK_ALL_READ_NOTIFICATIONS_ERROR,
  payload: { error },
});

export const updateFcmTokenSuccess = user => ({
  type: TYPES.UPDATE_FCM_TOKEN_SUCCESS,
  payload: user,
});

const updateFcmTokenRequest = () => ({
  type: TYPES.UPDATE_FCM_TOKEN_REQUEST,
  payload: null,
});

const updateFcmTokenError = error => ({
  type: TYPES.UPDATE_FCM_TOKEN_ERROR,
  payload: { error },
});

export const login = number => async dispatch => {
  dispatch(globalReset());
  dispatch(loginRequest());
  try {
    const user = await UserController.login(number);
    dispatch(loginSuccess());

    navigationRef.navigate(NAVIGATION.enterOtp, {
      number,
      isRegistered: user?.isregistered,
    });
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const verifyOtp = (number, Otp, isRegistered) => async dispatch => {
  dispatch(globalReset());
  dispatch(verifyOtpRequest());
  try {
    // let selectedValue = "";
    const user = await UserController.verifyOtp(number, Otp);
    // console.log("USER=-=-=-", JSON.stringify(user));
    // // let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    // // console.log("FCM__TOsssEN", fcmtoken);
    // // const DATA = {
    // //   "loggedInUserId": user.id,
    // //   "fcm_token": fcmtoken,
    // //   "topic": "general",
    // //   "userId": user.id
    // // }

    // dispatch(updateFCMToken(DATA))
    if (isRegistered == true) {
      dispatch(verifyOtpSuccess(user));
      if (user?.isAdmin == true) {
        let selectedValue = 'Admin';
        dispatch(ChooseUser(selectedValue));
      } else if (user?.isVIP == true) {
        let selectedValue = 'VIP';
        dispatch(ChooseUser(selectedValue));
      } else {
        let selectedValue = 'Free';
        dispatch(ChooseUser(selectedValue));
      }
    } else {
      navigationRef.navigate(NAVIGATION.setupUserId, {
        ID: user?.id,
        number: number,
      });
    }
  } catch (error) {
    dispatch(verifyOtpError(error));
  }
};

export const checkUserName = username => async dispatch => {
  dispatch(globalReset());
  dispatch(checkUserNameRequest());
  try {
    const user = await UserController.checkUserName(username);
    dispatch(checkUserNameSuccess());
    if (user.status == true) {
    } else {
      dispatch(checkUserNameError(user));
    }
  } catch (error) {
    dispatch(checkUserNameError(error));
  }
};

export const updateProfile =
  (
    dob,
    fullname,
    gender,
    id,
    primaryEmail,
    location,
    username,
    number,
    file,
    mimeType,
    screen
  ) =>
  async dispatch => {
    dispatch(globalReset());
    dispatch(updateProfileRequest());
    try {
      const user = await UserController.updateProfile(
        dob,
        fullname,
        gender,
        id,
        primaryEmail,
        location,
        username,
        file,
        mimeType
      );
      dispatch(updateProfileSuccess(user));
      if (screen == NAVIGATION.editProfile) {
        customShowMessage({
          message: strings.editProfile.updatedSuccess,
          type: 'success',
        });
        navigationRef.navigate(NAVIGATION.profileSetting);
      }
    } catch (error) {
      customShowMessage({
        message: error?.message,
        type: 'danger',
      });
      dispatch(updateProfileError(error));
    }
  };
export const uploadProfile = (file, mimeType, USER) => async dispatch => {
  dispatch(globalReset());
  dispatch(uploadProfileRequest());
  try {
    const user = await UserController.upload_Profile_Pic(
      file,
      mimeType,
      USER?.contact
    );
    // dispatch(uploadProfileSuccess(USER))
  } catch (error) {
    customShowMessage({
      message: error?.message,
      type: 'danger',
    });
    dispatch(uploadProfileError(error));
  }
};

export const followUser =
  (followerId, followId, postIndex) => async dispatch => {
    dispatch(followUserRequest());
    try {
      const user = await UserController.followUser(followerId, followId);
      dispatch(followUserSuccess(postIndex));
    } catch (error) {
      dispatch(followUserError(error));
    }
  };

export const unFollowUser = (unFollowerId, followId) => async dispatch => {
  dispatch(unFollowUserRequest());
  try {
    const user = await UserController.unFollowUser(unFollowerId, followId);
    dispatch(unFollowUserSuccess(user));
  } catch (error) {
    dispatch(unFollowUserError(error));
  }
};

export const getUserProfileByUserId =
  (userId, loggedInID) => async dispatch => {
    dispatch(globalReset());
    dispatch(getUserProfileByUserIdRequest());
    try {
      const user = await UserController.getUserProfileByUseridAPI(
        userId,
        loggedInID
      );
      dispatch(getUserProfileByUserIdSuccess(user?.data));
    } catch (error) {
      dispatch(getUserProfileByUserIdError(error));
    }
  };

export const logout = () => async dispatch => {
  dispatch(clearStore());
  // try {
  //   // await UserController.logout();
  // } finally {
  //   dispatch(clearStore());
  // }
};

// create_post action

export const createPost =
  (
    id,
    postTitle,
    postBody,
    file,
    mimeType,
    imageArray,
    screen,
    isVipOnly,
    callBack
  ) =>
  async dispatch => {
    dispatch(globalReset());
    dispatch(createPostRequest());
    try {
      const user = await UserController.createPost(
        id,
        postTitle,
        postBody,
        file,
        mimeType,
        imageArray,
        isVipOnly
      );

      callBack && callBack();
      dispatch(createPostSuccess(user));
      if (screen == NAVIGATION.home) {
        customShowMessage({
          message: strings.createPost.updatedSuccess,
          type: 'success',
        });
        navigationRef.dispatch(StackActions.popToTop());
        navigationRef.navigate(NAVIGATION.home);
      }
      if (screen == NAVIGATION.profile) {
        customShowMessage({
          message: strings.createPost.updatedSuccess,
          type: 'success',
        });
        navigationRef.dispatch(StackActions.popToTop());
        navigationRef.navigate(NAVIGATION.profile);
      }
    } catch (error) {
      customShowMessage({
        message: error?.message,
        type: 'danger',
      });
      dispatch(createPostError(error));
    }
  };

// create_post_by_admin action

export const createPostByAdmin =
  (
    id,
    postTitle,
    postBody,
    postImg,
    mimeType,
    imageArray,
    screen,
    vipOnly,
    schedulePost,
    scheduleDetails,
    goingLIve,
    ad,
    publishDate,
    expireDate,
    pinPost,
    callBack
  ) =>
  async dispatch => {
    dispatch(globalReset());
    dispatch(createPostRequest());

    try {
      const user = await UserController.createPostByAdmin({
        id,
        postTitle,
        postBody,
        postImg,
        mimeType,
        imageArray,
        screen,
        vipOnly,
        schedulePost,
        scheduleDetails,
        goingLIve,
        ad,
        publishDate,
        expireDate,
        isPinned: pinPost,
      });
      callBack && callBack();
      dispatch(createPostSuccess(user));
      if (screen == NAVIGATION.home) {
        customShowMessage({
          message: strings.createPost.updatedSuccess,
          type: 'success',
        });
        navigationRef.dispatch(StackActions.popToTop());
        navigationRef.navigate(NAVIGATION.home);
      }
      if (screen == NAVIGATION.profile) {
        customShowMessage({
          message: strings.createPost.updatedSuccess,
          type: 'success',
        });
        navigationRef.dispatch(StackActions.popToTop());
        navigationRef.navigate(NAVIGATION.profile);
      }
    } catch (error) {
      customShowMessage({
        message: error?.message,
        type: 'danger',
      });
      dispatch(createPostError(error));
    }
  };

// update_post action

export const updatePost =
  (
    id,
    userId,
    postTitle,
    postBody,
    file,
    preImageArray,
    mimeType,
    preMimeType,
    imageArray,
    userType,
    screen,
    isPinned,
    vipOnly,
    schedulePost,
    scheduleDetails,
    goingLIve,
    ad,
    publishDate,
    expireDate,
    callBack
  ) =>
  async dispatch => {
    dispatch(globalReset());
    dispatch(updatePostRequest());

    try {
      const user = await UserController.updatePost({
        id,
        userId,
        postTitle,
        postBody,
        file,
        preImageArray,
        mimeType,
        preMimeType,
        imageArray,
        userType,
        isPinned,
        vipOnly,
        schedulePost,
        scheduleDetails,
        goingLIve,
        ad,
        publishDate,
        expireDate,
      });
      dispatch(updatePostSuccess(user));
      callBack && callBack();
      if (screen == NAVIGATION.home) {
        customShowMessage({
          message: strings.updatePost.updatedSuccess,
          type: 'success',
        });

        console.log(' i am here ============== ');
        // dispatch(getAllPost(userId, strings.sortBy.recent, false));
        navigationRef.dispatch(StackActions.popToTop());
        navigationRef.navigate(NAVIGATION.home);
      }
      if (screen == NAVIGATION.profile) {
        customShowMessage({
          message: strings.updatePost.updatedSuccess,
          type: 'success',
        });

        navigationRef.dispatch(StackActions.popToTop());
        navigationRef.navigate(NAVIGATION.profile);
      }
    } catch (error) {
      customShowMessage({
        message: error?.message,
        type: 'danger',
      });
      dispatch(updatePostError(error));
    }
  };

// update_post action

export const deletePost =
  (id, postUserId, userId, userType, screen) => async dispatch => {
    dispatch(globalReset());
    dispatch(deletePostRequest());
    try {
      const user = await UserController.deletePost(
        id,
        postUserId,
        userId,
        userType
      );
      dispatch(deletePostSuccess(user));
      if (screen == NAVIGATION.home) {
        customShowMessage({
          message: strings.deletePost.deletedSuccess,
          type: 'success',
        });
        navigationRef.navigate(NAVIGATION.home);
      }
      if (screen == NAVIGATION.profile) {
        customShowMessage({
          message: strings.deletePost.deletedSuccess,
          type: 'success',
        });

        // Reload the posts on profile screen after deleting the posts
        dispatch(getAllPostsByLoggedInUser(userId));

        navigationRef.navigate(NAVIGATION.profile);
      }
    } catch (error) {
      customShowMessage({
        message: error?.message,
        type: 'danger',
      });
      dispatch(deletePostError(error));
    }
  };

// Get all posts by User
export const getAllPostsByLoggedInUser =
  (id, loggedInUserId) => async (dispatch, getState) => {
    dispatch(globalReset());
    dispatch(getAllPostByLoggedInUserRequest());

    const userType = getState().userType;
    let allPosts;
    try {
      if (
        userType.user === strings.userType.free ||
        userType.user === strings.userType.vip
      ) {
        allPosts = await UserController.postByUserId(id, null, loggedInUserId);
      }
      if (userType.user === strings.userType.admin) {
        allPosts = await UserController.getAllPostByAdmin(loggedInUserId);
      }

      dispatch(getAllPostByLoggedInUserSuccess(allPosts?.data));
    } catch (error) {
      dispatch(getAllPostByLoggedInUserError(error));
    }
  };

//Get all post by userid
export const getAllPostsByUserid = (id, loggedInUserId) => async dispatch => {
  dispatch(globalReset());
  dispatch(getAllPostByUserIDRequest());

  let allPosts;
  try {
    // if (
    //   userType.user === strings.userType.free ||
    //   userType.user === strings.userType.vip
    // ) {
    allPosts = await UserController.postByUserId(id, '', loggedInUserId);
    // }
    // if (userType.user === strings.userType.admin) {
    //   allPosts = await UserController.getAllPostByAdmin();
    // }
    dispatch(getAllPostByUserIdSuccess(allPosts?.data));
  } catch (error) {
    dispatch(getAllPostByUserIDError(error));
  }
};

export const getAllPostsByUseridPagination =
  (id, page, loggedInUserId) => async dispatch => {
    dispatch(globalReset());
    dispatch(getAllPostByUserIdPaginationRequest());

    let allPosts;
    try {
      // if (
      //   userType.user === strings.userType.free ||
      //   userType.user === strings.userType.vip
      // ) {
      allPosts = await UserController.postByUserId(id, page, loggedInUserId);
      // }
      // if (userType.user === strings.userType.admin) {
      //   allPosts = await UserController.getAllPostByAdmin();
      // }
      dispatch(getAllPostByUserIdPaginationSuccess(allPosts?.data));
    } catch (error) {
      dispatch(getAllPostByUserIdPaginationError(error));
    }
  };

export const getAllPostsByLogInUserPagination =
  (id, page) => async (dispatch, getState) => {
    dispatch(globalReset());
    dispatch(getAllPostByLoggedInUserPaginationRequest());

    const userType = getState().userType;
    let allPosts;
    try {
      if (userType.user === strings.userType.free) {
        allPosts = await UserController.postByUserId(id, page);
      }
      if (userType.user === strings.userType.admin) {
        allPosts = await UserController.getAllPostByAdmin(page);
      }
      dispatch(getAllPostByLoggedInUserPaginationSuccess(allPosts?.data));
    } catch (error) {
      dispatch(getAllPostByLoggedInUserPaginationError(error));
    }
  };

export const getAllActivityByLoggedInUser =
  id => async (dispatch, getState) => {
    dispatch(globalReset());
    dispatch(getAllActivityByLoggedInUserRequest());

    const userType = getState().userType;
    let allPosts;
    try {
      if (userType.user === strings.userType.free) {
        allPosts = await UserController.postByUserId(id);
      }
      if (userType.user === strings.userType.admin) {
        allPosts = await UserController.getAllPostByAdmin();
      }
      dispatch(getAllActivityByLoggedInUserSuccess(allPosts?.data));
    } catch (error) {
      dispatch(getAllActivityByLoggedInUserError(error));
    }
  };

// just for development
const adminUserRequest = data => {
  return {
    type: 'Admin',
    payload: data,
  };
};
const FreeUserRequest = data => {
  return {
    type: 'Free',
    payload: data,
  };
};
const VipUesrRequest = data => {
  return {
    type: 'VIP',
    payload: data,
  };
};

export const ChooseUser = data => {
  return dispatch => {
    if (data == 'Admin') {
      dispatch(adminUserRequest(data));
    }
    if (data == 'Free') {
      dispatch(FreeUserRequest(data));
    }
    if (data == 'VIP') {
      dispatch(VipUesrRequest(data));
    }
  };
};

//followers
export const followers = (userId, id) => async dispatch => {
  dispatch(followersRequest());
  try {
    const user = await UserController.followersList(userId, id);
    dispatch(followersSuccess(user));
  } catch (error) {
    dispatch(followersError(error));
  }
};

//Blocked Users

export const blockUsersList = userId => async dispatch => {
  dispatch(blockListRequest());
  try {
    const user = await UserController.BlockListRequest(userId);
    dispatch(blocklistSuccess(user));
  } catch (error) {
    dispatch(blockListError(error));
  }
};

//Search User Action
export const searchUser =
  (searchuservalue, loggedInUserId) => async dispatch => {
    dispatch(searchUserRequest());
    try {
      const user = await UserController.searchUserRequest(
        searchuservalue,
        loggedInUserId
      );
      dispatch(searchUserSuccess(user));
    } catch (error) {
      dispatch(searchUserError(error));
    }
  };

export const updateFCMToken = data => async dispatch => {
  dispatch(updateFcmTokenRequest());

  try {
    const user = await UserController.updateFCMTokenRequest(data);
    dispatch(updateFcmTokenSuccess(user));
    // navigation.reset({ index: 0, routes: [{ name: NAVIGATION.role }] })
  } catch (error) {
    dispatch(updateFcmTokenError(error));
  }
};
//Unblock User By id
// export const unblockUserById = (data) => async dispatch => {
//   dispatch(unblockUserByIdRequest());
//   try {
//     const user = await UserController.searchUserRequest(data);
//     dispatch(unblockUserByIdSuccess(user))

//   } catch (error) {
//     dispatch(unblockUserByIdError(error))
//   }

// };
export const getAllActivityByUserId = id => async dispatch => {
  dispatch(getAllActivityRequest());
  try {
    const user = await UserController.getAllActivityRequestApi(id);
    dispatch(getAllActivitySuccess(user));
  } catch (error) {
    dispatch(getAllActivityError(error));
  }
};

export const manageAllReports =
  ({ filter }) =>
  async dispatch => {
    dispatch(manageAllReportsRequest());
    try {
      const user = await UserController.manageAllreportsRequestApi(filter);
      dispatch(manageAllReportsSuccess(user));
    } catch (error) {
      dispatch(manageAllReportsError(error));
    }
  };

export const bannedUsers = () => async dispatch => {
  dispatch(getBannedUsersRequest());
  try {
    const user = await UserController.getAllBannedUsersRequest();
    dispatch(getBannedUsersSuccess(user));
  } catch (error) {
    dispatch(getAllBannedUsersError(error));
  }
};

export const unBannedUserById = id => async dispatch => {
  dispatch(unBannedUserByIdRequest());

  try {
    const user = await UserController.unBannedUserRequest(id);
    dispatch(unBannedUserByIdSuccess(user));
  } catch (error) {
    dispatch(unBannedUserByIdError(error));
  }
};
export const bannedUserById = id => async dispatch => {
  dispatch(bannedUserByIdRequest());

  try {
    const user = await UserController.bannedUserRequest(id);
    dispatch(bannedUserByIdSuccess(user));
  } catch (error) {
    dispatch(bannedUserByIdError(error));
  }
};

export const fetchAllNotifications = (id, read) => async dispatch => {
  dispatch(getAllNotificationsRequest());

  try {
    const user = await UserController.AllNotificationsRequest(id, read);
    dispatch(getAllNotificationsSuccess(user));
  } catch (error) {
    dispatch(getAllNotificationsError(error));
  }
};

//Mark All read Response
export const markAllRead = id => async dispatch => {
  dispatch(markAllReadNotificationsRequest());

  try {
    const user = await UserController.markAllNotificationsRequest(id);
    dispatch(markAllReadNotificationsSuccess(user));
  } catch (error) {
    dispatch(markAllReadNotificationsError(error));
  }
};

export const markSingleNotifRead = async (userId, notifId) => {
  try {
    await UserController.markSingleNotificationsRequest(userId, notifId);
    console.log('notification read successfully ===================');
  } catch (error) {
    console.log(error);
  }
};

export const ArchiveReport = async ({ reportID }) => {
  try {
    await UserController.archiveReport({ reportID });
    console.log('report archived successfully');
  } catch (err) {
    console.log(err);
  }
};

export const ReportUser = async ({
  loggedInUserId,
  reportedUserId,
  reportTitle,
  reportBody,
  reportImg,
}) => {
  try {
    await UserController.ReportUser({
      loggedInUserId,
      reportedUserId,
      reportBody,
      reportTitle,
      reportImg,
    });
  } catch (err) {
    console.log(err);
  }
};

export const MarkSingleReportRead = async ({ reportId }) => {
  try {
    console.log('marking single report read =====', reportId);
    await UserController.MarkSingleReportRead({
      reportId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateNotifactionSettings = async (params, dispatch) => {
  try {
    await UserController.UpdateNotificationSettings(params);
    customShowMessage({
      message: 'Notification Updated Successfully',
      type: 'success',
    });

    dispatch({
      type: TYPES.UPDATE_USER_NOTIF_SETTINGS,
      payload: {
        notify_for_someone_react_on_my_post: params.notifyForSomeOneReactPost,
        notify_for_someone_comments_on_my_post:
          params.notifyForSomeoneCommentsOnMyPost,
        notify_for_following_user_post: params.notifyForFollowingUserPost,
        notify_for_jatie_post: params.notifyForJatiePost,
        notify_for_jatie_live: params.notifyForJatieLive,
        notify_for_one_hour_beofre_jatie_live:
          params.notifyOneHourBeforeJatieLive,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateUserType = data => async dispatch => {
  dispatch(updateUserTypeRequest());
  try {
    const user = await UserController.updateUserTypeRequest(data);
    if (data.isVIP) {
      let selectedValue = 'VIP';
      dispatch(ChooseUser(selectedValue));
    } else {
      let selectedValue = 'FREE';
      dispatch(ChooseUser(selectedValue));
    }
    navigationRef.navigate(NAVIGATION.home, { reset: true });
    // dispatch(updateUserTypeSuccess(user));
  } catch (error) {
    dispatch(updateUserTypeError(error));
  }
};
