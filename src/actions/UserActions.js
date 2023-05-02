import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import { StackActions } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { globalReset } from './GlobalActions';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',

  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  VERIFY_OTP: "VERIFY_OTP",
  VERIFY_OTP_REQUEST: "VERIFY_OTP_REQUEST",
  VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_ERROR: "VERIFY_OTP_ERROR",

  CHECK_USERNAME: "CHECK_USERNAME",
  CHECK_USERNAME_REQUEST: "CHECK_USERNAME_REQUEST",
  CHECK_USERNAME_SUCCESS: "CHECK_USERNAME_SUCCESS",
  CHECK_USERNAME_ERROR: "CHECK_USERNAME_ERROR",

  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR",

  UPLOAD_PROFILE: 'UPLOAD_PROFILE',
  UPLOAD_PROFILE_REQUEST: "UPLOAD_PROFILE_REQUEST",
  UPLOAD_PROFILE_SUCCESS: "UPLOAD_PROFILE_SUCCESS",
  UPLOAD_PROFILE_ERROR: "UPLOAD_PROFILE_ERROR",

  //FOLLOW USER

  FOLLOW_USER: "FOLLOW_USER",
  FOLLOW_USER_REQUEST: "FOLLOW_USER_REQUEST",
  FOLLOW_USER_SUCCESS: "FOLLOW_USER_SUCCESS",
  FOLLOW_USER_ERROR: "FOLLOW_USER_ERROR",


  //UNFOLLOW USER

  UN_FOLLOW_USER: "UN_FOLLOW_USER",
  UN_FOLLOW_USER_REQUEST: "UN_FOLLOW_USER_REQUEST",
  UN_FOLLOW_USER_SUCCESS: "UN_FOLLOW_USER_SUCCESS",
  UN_FOLLOW_USER_ERROR: "UN_FOLLOW_USER_ERROR",


  //user create post
  CREATE_POST: 'CREATE_POST',
  CREATE_POST_REQUEST: "CREATE_POST_REQUEST",
  CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
  CREATE_POST_ERROR: "CREATE_POST_ERROR",

  //user update post
  UPDATE_POST: 'UPDATE_POST',
  UPDATE_POST_REQUEST: "UPDATE_POST_REQUEST",
  UPDATE_POST_SUCCESS: "UPDATE_POST_SUCCESS",
  UPDATE_POST_ERROR: "UPDATE_POST_ERROR",

  //user delete post
  DELETE_POST: 'DELETE_POST',
  DELETE_POST_REQUEST: "DELETE_POST_REQUEST",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  DELETE_POST_ERROR: "DELETE_POST_ERROR",


  //Get user profile by userID
  GET_USER_PROFILE_BY_USER_ID: 'GET_USER_PROFILE_BY_USER_ID',
  GET_USER_PROFILE_BY_USER_ID_REQUEST: "GET_USER_PROFILE_BY_USER_ID_REQUEST",
  GET_USER_PROFILE_BY_USER_ID_SUCCESS: "GET_USER_PROFILE_BY_USER_ID_SUCCESS",
  GET_USER_PROFILE_BY_USER_ID_ERROR: "GET_USER_PROFILE_BY_USER_ID_ERROR",

  //get all post by logged in user
  GET_ALL_POST_BY_LOGGED_IN_USER: "GET_ALL_POST_BY_LOGGED_IN_USER",
  GET_ALL_POST_BY_LOGGED_IN_USER_REQUEST: "GET_ALL_POST_BY_LOGGED_IN_USER_REQUEST",
  GET_ALL_POST_BY_LOGGED_IN_USER_SUCCESS: "GET_ALL_POST_BY_LOGGED_IN_USER_SUCCESS",
  GET_ALL_POST_BY_LOGGED_IN_USER_ERROR: "GET_ALL_POST_BY_LOGGED_IN_USER_ERROR",

};

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

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const login = (number) => async dispatch => {
  dispatch(globalReset())
  dispatch(loginRequest());
  try {
    const user = await UserController.login(number);
    dispatch(loginSuccess());
    navigationRef.navigate(NAVIGATION.enterOtp, { number, "isRegistered": user?.isregistered })
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const verifyOtp = (number, Otp, isRegistered) => async dispatch => {
  dispatch(globalReset())
  dispatch(verifyOtpRequest());
  try {
    // let selectedValue = "";
    const user = await UserController.verifyOtp(number, Otp);
    if (isRegistered == true) {
      dispatch(verifyOtpSuccess(user))
      if (user?.isAdmin == true) {
        let selectedValue = "Admin";
        dispatch(ChooseUser(selectedValue))
      } else if (user?.isVIP == true) {
        let selectedValue = "VIP";
        dispatch(ChooseUser(selectedValue))
      } else {
        let selectedValue = "Free";
        dispatch(ChooseUser(selectedValue))
      }
    } else {
      navigationRef.navigate(NAVIGATION.setupUserId, { "ID": user?.id, number: number });
    }
  } catch (error) {
    dispatch(verifyOtpError(error));
  }
};

export const checkUserName = (username) => async dispatch => {
  dispatch(globalReset())
  dispatch(checkUserNameRequest());
  try {
    const user = await UserController.checkUserName(username);
    dispatch(checkUserNameSuccess());
    if (user.status == true) {
    }
    else {
      dispatch(checkUserNameError(user))
    }
  } catch (error) {
    dispatch(checkUserNameError(error));
  }
};

export const updateProfile = (dob, fullname, gender, id, primaryEmail, location, username, number, file, mimeType, screen) => async dispatch => {
  dispatch(globalReset())
  dispatch(updateProfileRequest());
  try {
    const user = await UserController.updateProfile(dob, fullname, gender, id, primaryEmail, location, username, file, mimeType);
    dispatch(updateProfileSuccess(user))
    if (screen == NAVIGATION.editProfile) {
      showMessage({
        message: strings.editProfile.updatedSuccess,
        type: "success"
      })
      navigationRef.navigate(NAVIGATION.profileSetting)
    }
  } catch (error) {
    showMessage({
      message: error?.message,
      type: "danger"
    })
    dispatch(updateProfileError(error));
  }
};
export const uploadProfile = (file, mimeType, USER) => async dispatch => {
  dispatch(globalReset())
  dispatch(uploadProfileRequest());
  try {
    const user = await UserController.upload_Profile_Pic(file, mimeType, USER?.contact);
    // dispatch(uploadProfileSuccess(USER))
  } catch (error) {
    showMessage({
      message: error?.message,
      type: "danger"
    })
    dispatch(uploadProfileError(error));
  }
};


export const followUser = (followerId, followId, postIndex) => async dispatch => {
  dispatch(followUserRequest());
  try {
    const user = await UserController.followUser(followerId, followId);
    dispatch(followUserSuccess(postIndex));
  } catch (error) {
    dispatch(followUserError(error))
  }
};


export const unFollowUser = (unFollowerId, followId) => async dispatch => {
  dispatch(unFollowUserRequest());
  try {
    const user = await UserController.unFollowUser(unFollowerId, followId);
    dispatch(unFollowUserSuccess(user));
  } catch (error) {

    dispatch(unFollowUserError(error))
  }
};


export const getUserProfileByUserId = (userId) => async dispatch => {
  dispatch(globalReset())
  dispatch(getUserProfileByUserIdRequest());
  try {
    const user = await UserController.getUserProfileByUseridAPI(userId);
    dispatch(getUserProfileByUserIdSuccess(user?.data));
  } catch (error) {

    dispatch(getUserProfileByUserIdError(error))
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

export const createPost = (id, postTitle, postBody, file, mimeType, imageArray, screen) => async dispatch => {
  dispatch(globalReset())
  dispatch(createPostRequest());
  try {
    const user = await UserController.createPost(id, postTitle, postBody, file, mimeType, imageArray);
    dispatch(createPostSuccess(user))
    if (screen == NAVIGATION.home) {
      showMessage({
        message: strings.createPost.updatedSuccess,
        type: "success"
      })
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.navigate(NAVIGATION.home)
    }
    if (screen == NAVIGATION.profile) {
      showMessage({
        message: strings.createPost.updatedSuccess,
        type: "success"
      })
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.navigate(NAVIGATION.profile)
    }
  } catch (error) {
    showMessage({
      message: error?.message,
      type: "danger"
    })
    dispatch(createPostError(error));
  }
};

// create_post_by_admin action

export const createPostByAdmin = (id, postTitle, postBody, file, mimeType, imageArray, screen) => async dispatch => {
  dispatch(globalReset())
  dispatch(createPostRequest());
  try {
    const user = await UserController.createPostByAdmin(id, postTitle, postBody, file, mimeType, imageArray);
    dispatch(createPostSuccess(user))
    if (screen == NAVIGATION.home) {
      showMessage({
        message: strings.createPost.updatedSuccess,
        type: "success"
      })
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.navigate(NAVIGATION.home)
    }
    if (screen == NAVIGATION.profile) {
      showMessage({
        message: strings.createPost.updatedSuccess,
        type: "success"
      })
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.navigate(NAVIGATION.profile)
    }
  } catch (error) {
    showMessage({
      message: error?.message,
      type: "danger"
    })
    dispatch(createPostError(error));
  }
};

// update_post action

export const updatePost = (id, userId, postTitle, postBody, file, preImageArray, mimeType, preMimeType, imageArray, userType, screen) => async dispatch => {
  dispatch(globalReset())
  dispatch(updatePostRequest());
  try {
    const user = await UserController.updatePost(id, userId, postTitle, postBody, file, preImageArray, mimeType, preMimeType, imageArray, userType);
    dispatch(updatePostSuccess(user))
    if (screen == NAVIGATION.home) {
      showMessage({
        message: strings.updatePost.updatedSuccess,
        type: "success"
      })
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.navigate(NAVIGATION.home)
    }
    if (screen == NAVIGATION.profile) {
      showMessage({
        message: strings.updatePost.updatedSuccess,
        type: "success"
      })
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.navigate(NAVIGATION.profile)
    }
  } catch (error) {
    showMessage({
      message: error?.message,
      type: "danger"
    })
    dispatch(updatePostError(error));
  }
};

// update_post action

export const deletePost = (id, postUserId, userId, userType, screen) => async dispatch => {
  dispatch(globalReset())
  dispatch(deletePostRequest());
  try {
    const user = await UserController.deletePost(id, postUserId, userId, userType);
    dispatch(deletePostSuccess(user))
    if (screen == NAVIGATION.home) {
      showMessage({
        message: strings.deletePost.deletedSuccess,
        type: "success"
      })
      navigationRef.navigate(NAVIGATION.home)
    }
    if (screen == NAVIGATION.profile) {
      showMessage({
        message: strings.deletePost.deletedSuccess,
        type: "success"
      })

      // Reload the posts on profile screen after deleting the posts
      dispatch(getAllPostsByLoggedInUser(userId))

      navigationRef.navigate(NAVIGATION.profile)
    }
  } catch (error) {
    showMessage({
      message: error?.message,
      type: "danger"
    })
    dispatch(deletePostError(error));
  }
};


// Get all posts by User
export const getAllPostsByLoggedInUser = (id) => async (dispatch, getState) => {
  dispatch(globalReset())
  dispatch(getAllPostByLoggedInUserRequest());

  const userType = getState().userType
  let allPosts
  try {
    if (userType.user === strings.userType.free) {
      allPosts = await UserController.postByUserId(id);
    }
    if (userType.user === strings.userType.admin) {
      allPosts = await UserController.getAllPostByAdmin();
    }
    dispatch(getAllPostByLoggedInUserSuccess(allPosts?.data))
  } catch (error) {
    dispatch(getAllPostByLoggedInUserError(error))
  }
};

// just for development 
const adminUserRequest = (data) => {
  return {
    type: 'Admin',
    payload: data
  }
}
const FreeUserRequest = (data) => {
  return {
    type: 'Free',
    payload: data
  }
}
const VipUesrRequest = (data) => {
  return {
    type: 'VIP',
    payload: data
  }
}

export const ChooseUser = (data) => {
  return (dispatch) => {
    if (data == 'Admin') {
      dispatch(adminUserRequest(data))
    }
    if (data == 'Free') {
      dispatch(FreeUserRequest(data))
    }
    if (data == 'VIP') {
      dispatch(VipUesrRequest(data))
    }
  }
}
