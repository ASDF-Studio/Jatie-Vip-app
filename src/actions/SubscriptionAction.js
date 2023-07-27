import { NAVIGATION } from '@/constants';
import { RECEIPT_STATUS } from '@/constants/subscriptionConstant';
import { UserController } from '@/controllers';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import { customShowMessage } from '@/utils';
import { StackActions } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { globalReset } from './GlobalActions';
import { getAllPost } from './PostActions';
import { updateUserType } from './UserActions';

export const TYPES = {
    CLEAR_STORE: 'CLEAR_STORE',

    VALIDATE_RECEIPT: 'VALIDATE_RECEIPT',
    VALIDATE_RECEIPT_REQUEST: 'VALIDATE_RECEIPT_REQUEST',
    VALIDATE_RECEIPT_ERROR: 'VALIDATE_RECEIPT_ERROR',
    VALIDATE_RECEIPT_SUCCESS: 'VALIDATE_RECEIPT_SUCCESS',


};

const validateReceiptRequest = () => ({
    type: TYPES.VALIDATE_RECEIPT_REQUEST,
    payload: null,
});

const validateReceiptError = error => ({
    type: TYPES.VALIDATE_RECEIPT_ERROR,
    payload: { error },
});

const validateReceiptSuccess = data => ({
    type: TYPES.VALIDATE_RECEIPT_SUCCESS,
    payload: { data },
});


//Update FCM Token 

export const validateReceipt = (data,navigation,ScreenName) => async dispatch => {
    dispatch(validateReceiptRequest());
    try {
        const user = await UserController.validateReceiptRequestData(data);
        dispatch(validateReceiptSuccess(user));
        
        if (user?.message == RECEIPT_STATUS.VALID_RECEIPT) {
            const Data = {
                "isVIP": true,
                "userId": data.loggedInUserId
            }
            dispatch(updateUserType(Data,navigation,ScreenName))
        }
        else if(user?.message==RECEIPT_STATUS.INVALID_RECEIPT){
            const Data = {
                "isVIP": false,
                "userId": data.loggedInUserId
            }
         dispatch(updateUserType(Data,navigation,ScreenName))
        }
      return user
    } catch (error) {
        if(error?.message==RECEIPT_STATUS.INVALID_RECEIPT){
            const Data = {
                "isVIP": false,
                "userId": data.loggedInUserId
            }
           dispatch(updateUserType(Data,navigation,ScreenName))

        }
        dispatch(validateReceiptError(error));
       return error
        
    }
};
