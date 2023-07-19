import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES, verifyOtp } from '@/actions/UserActions';
import { Button, ErrorView, PopUpAlert } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/EnterOtp/EnterOtp.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useRef } from 'react';
import { AuthHeader } from '@/components/AuthHeader';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { showMessage } from 'react-native-flash-message';
import { TextStyles, theme } from '@/theme';
import { globalReset } from '@/actions/GlobalActions';
import { FontFamily } from '@/theme/Fonts';
import { CustomErrorView } from '@/components/CustomErrorView';
import { getUser } from '@/selectors/UserSelectors';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

export function EnterOtp({ route }) {
  const { number, isRegistered } = route.params;
  const smoothInputPinRef = useRef(null);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const user = useSelector(getUser);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.VERIFY_OTP], state)
  );
  const errors = useSelector(
    state => errorsSelector([TYPES.VERIFY_OTP], state),
    shallowEqual
  );

  useEffect(() => {
    if (
      !isEmpty(errors) &&
      errors[0].message === 'Something went wrong! Please try again later'
    ) {
      setShowPopUp(true);
    }
  }, [errors]);

  const validation = () => {
    if (code.length < 5) {
      setCodeError(true);
    } else {
      setCodeError(false);
      console.log(number, code);
      // dispatch(verifyOtp(number, code, isRegistered));
    }
  };

  const handleSubmit = () => {
    validation();
  };

  const OTPErrorView = () => {
    return (
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={[TextStyles.error, { color: theme.light.colors.error }]}>
          {errors[0].message === "Sorry, the code didn't match"
            ? strings.enterOtp.sorryCodeDidnotMatch
            : errors[0].message}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setCode('');
            dispatch(login(number));
          }}
        >
          <Text
            style={[
              TextStyles.error,
              {
                color: theme.light.colors.error,
                textDecorationLine: 'underline',
                fontFamily: FontFamily.BrandonGrotesque_medium,
              },
            ]}
          >
            {strings.enterOtp.resend}
          </Text>
        </TouchableOpacity>
        <PopUpAlert
          isOpen={showPopUp}
          onPress={() => {
            navigationRef.goBack();
          }}
          isSuccess={false}
          title="Error"
          body="Something went wrong! Please try again later."
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AuthHeader title={strings.enterOtp.title} />
      <Text style={styles.subTitle}>
        {strings.enterOtp.enterTheVerificationCode + ' ' + number}
        {'   '}
        <Text onPress={() => navigationRef.goBack()} style={styles.editBtn}>
          {strings.enterOtp.edit}
        </Text>
      </Text>

      <SmoothPinCodeInput
        ref={smoothInputPinRef}
        value={code}
        codeLength={5}
        autoFocus
        onTextChange={code => (setCode(code), setCodeError(false))}
        containerStyle={styles.otpContainer}
        cellStyle={[
          styles.otpCell,
          {
            borderColor:
              codeError || errors.length > 0 ? theme.light.colors.error : null,
          },
        ]}
        cellStyleFocused={[
          styles.otpCellFocused,
          {
            borderColor:
              codeError || errors.length > 0 ? theme.light.colors.error : null,
          },
        ]}
        textStyle={styles.otpText}
      />

      {errors.length > 0 && <OTPErrorView />}

      {/* {errors.length > 0 &&
        <CustomErrorView
          number={number}
          errors={errors}
          setCode={setCode}
          ErrorScreen={NAVIGATION.enterOtp}
        />
      } */}

      <Button
        onPress={handleSubmit}
        style={styles.submitButton}
        title={isLoading ? strings.common.loading : strings.login.continue}
      />
    </View>
  );
}
