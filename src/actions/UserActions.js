import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import { showMessage } from 'react-native-flash-message';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  VERIFY_OTP_REQUEST: "VERIFY_OTP_REQUEST",
  VERIFY_OTP_SUCCESS: "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_ERROR: "VERIFY_OTP_ERROR",
  CHECK_USERNAME_REQUEST: "VERIFY_OTP_REQUEST",
  CHECK_USERNAME_SUCCESS: "VERIFY_OTP_SUCCESS",
  CHECK_USERNAME_ERROR: "VERIFY_OTP_ERROR",
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR"
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

const updateProfileSuccess = user => ({
  type: TYPES.UPDATE_PROFILE_SUCCESS,
  payload: { user },
});
const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const login = (number) => async dispatch => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(number);
    dispatch(loginSuccess(user));
    navigationRef.navigate(NAVIGATION.enterOtp, { number })
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const verifyOtp = (number, Otp) => async dispatch => {
  dispatch(verifyOtpRequest());
  try {
    const user = await UserController.verifyOtp(number, Otp);
    console.log("WOWOWOWOW", user)
    // dispatch(verifyOtpSuccess(user));
    // navigationRef.navigate(NAVIGATION.setupUserId);
    // navigationRef.navigate(NAVIGATION.enterOtp, { number })
    dispatch(verifyOtpSuccess(user));
    navigationRef.navigate(NAVIGATION.setupUserId, { "ID": user.id });

  } catch (error) {
    showMessage({
      message: strings.enterOtp.sorryCodeDidnotMatch,
      type: "danger"
    })
    dispatch(verifyOtpError(error));
  }
};

export const checkUserName = (username) => async dispatch => {
  dispatch(checkUserNameRequest());
  try {
    const user = await UserController.checkUserName(username);
    dispatch(checkUserNameSuccess(user)); 1
    if (user.status == true) {

    }
    else {
      showMessage({
        message: strings.setupUserId.chooseAnother,
        type: "danger"
      })
    }

  } catch (error) {
    dispatch(checkUserNameRequest(error));
  }
};

export const updateProfile = (dob, fullname, gender, id, primaryEmail, location, username) => async dispatch => {
  dispatch(updateProfileRequest());
  try {
    const user = await UserController.updateProfile(dob, fullname, gender, id, primaryEmail, location, username);
    dispatch(updateProfileSuccess(user));
    navigationRef.navigate(NAVIGATION.addProfilePicture, {})
  } catch (error) {
    dispatch(updateProfileError(error));
  }
};
export const uploadProfile = (file) => async dispatch => {
  // dispatch(updateProfileRequest());
  try {
    const number = "19184003493"
    const user = await UserController.upload_Profile_Pic(file, number);
    // dispatch(updateProfileSuccess(user));
    navigationRef.navigate(NAVIGATION.homeNavigator)
  } catch (error) {
    // dispatch(updateProfileError(error));
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
