import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
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
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR",

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
    const user = await UserController.verifyOtp(number, Otp);
    if (isRegistered == true) {
      dispatch(verifyOtpSuccess(user))
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

export const updateProfile = (dob, fullname, gender, id, primaryEmail, location, username, number) => async dispatch => {
  dispatch(globalReset())
  dispatch(updateProfileRequest());
  try {
    const user = await UserController.updateProfile(dob, fullname, gender, id, primaryEmail, location, username);
    navigationRef.navigate(NAVIGATION.addProfilePicture, { number: number })
  } catch (error) {
    dispatch(updateProfileError(error));
  }
};
export const uploadProfile = (file, mimeType, number) => async dispatch => {
  dispatch(globalReset())
  dispatch(updateProfileRequest());
  try {
    const user = await UserController.upload_Profile_Pic(file, mimeType, number);
    dispatch(updateProfileSuccess(user));
    navigationRef.navigate(NAVIGATION.homeNavigator)
  } catch (error) {
    dispatch(updateProfileError(error));
  }
};
export const logout = () => async dispatch => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
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
