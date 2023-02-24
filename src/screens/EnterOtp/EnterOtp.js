import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES, verifyOtp } from '@/actions/UserActions';
import { Button, ErrorView } from '@/components';
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

export function EnterOtp({ route }) {
  const { number } = route.params;
  const smoothInputPinRef = useRef(null);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );
  const errors = useSelector(
    state => errorsSelector([TYPES.VERIFY_OTP_ERROR], state),
    shallowEqual
  );
  // console.log("fewfewfewf", JSON.stringify(errors))

  const validation = () => {
    if (code.length < 5) {
      setCodeError(true)
      // showMessage({ message: "Please enter all fields", type: "danger", });

    }
    else {
      setCodeError(false)
      dispatch(verifyOtp(number, code))
    }
  }

  const handleSubmit = () => {
    validation()
    // navigationRef.navigate(NAVIGATION.setupUserId);
  };

  return (
    <View style={styles.container}>
      <AuthHeader title={strings.enterOtp.title} />
      <Text style={styles.subTitle}>
        {strings.enterOtp.enterTheVerificationCode + " " + number}
        {'   '}
        <Text
          onPress={() => navigationRef.goBack()}
          style={styles.editBtn}>{strings.enterOtp.edit}</Text>
      </Text>

      <SmoothPinCodeInput
        ref={smoothInputPinRef}
        value={code}
        codeLength={5}
        autoFocus
        onTextChange={code => (setCode(code), setCodeError(false))}
        containerStyle={styles.otpContainer}
        cellStyle={[styles.otpCell, { borderColor: codeError ? theme.light.colors.error : null }]}
        cellStyleFocused={[styles.otpCellFocused, { borderColor: codeError ? theme.light.colors.error : null }]}
        textStyle={styles.otpText}
      />

      {/* uncomment the following code to show error message */}

      {/* <View style={{ marginBottom: 10 }}>
        <Text style={[TextStyles.error, { color: theme.light.colors.error }]}>
          {strings.enterOtp.sorryCodeDidnotMatch}
        </Text>
      </View> */}

      <Button
        onPress={handleSubmit}
        style={styles.submitButton}
        title={isLoading ? strings.common.loading : strings.login.continue}
      />
    </View>
  );
}
