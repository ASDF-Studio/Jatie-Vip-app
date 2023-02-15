import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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
import { TYPES } from '@/actions/UserActions';

export function EnterOtp() {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const smoothInputPinRef = useRef(null);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );

  const handleSubmit = () => {
    navigationRef.navigate(NAVIGATION.setupUserId);
  };

  return (
    <View style={styles.container}>
      <AuthHeader title={strings.enterOtp.title} />
      <Text style={styles.subTitle}>
        {strings.enterOtp.enterTheVerificationCode + ' +1 9876543210'}
        {'   '}
        <Text style={styles.editBtn}>{strings.enterOtp.edit}</Text>
      </Text>

      <SmoothPinCodeInput
        ref={smoothInputPinRef}
        value={code}
        codeLength={5}
        autoFocus
        onTextChange={code => setCode(code)}
        containerStyle={styles.otpContainer}
        cellStyle={styles.otpCell}
        cellStyleFocused={styles.otpCellFocused}
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
