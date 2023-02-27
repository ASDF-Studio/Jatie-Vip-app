import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TYPES, ChooseUser, login } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { ms } from 'react-native-size-matters';
import { Logo } from '@/assets';
import { TextStyles, theme } from '@/theme';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import { showMessage } from "react-native-flash-message";
import { SITE_KEY, CAPTCHA_BASE_URL } from '@/constants';
import Recaptcha from 'react-native-recaptcha-that-works';

export function Login() {
  const recaptcha = useRef();

  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState('');
  const [captchaToken, setCaptchaToken] = useState("");

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );
  const validation = () => {
    if (mobileNumber == 0) {
      showMessage({
        message: strings.login.numberHint,
        type: "danger",
      });
    } else if (mobileNumber.length < 10) {
      showMessage({ message: strings.login.numberValid, type: "danger", });

    }
    else {
      // navigationRef.navigate(NAVIGATION.enterOtp, { "number": mobileNumber });
      recaptcha.current.open();

    }
  };


  const handleSubmit = () => {
    validation()
    // navigationRef.navigate(NAVIGATION.addProfilePicture);
    // dispatch(logi)
  };
  const send = () => {
    console.log('send!');
    recaptcha.current.open();
  }

  const onVerify = token => {
    setCaptchaToken(token)

    dispatch(login(mobileNumber))
    console.log('success!', token);
  }

  const onExpire = () => {
    setCaptchaToken("")
    console.warn('expired!');
  }

  // testing purpose code
  const [userListOpen, setUserListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [user, setUser] = useState([
    { label: 'Free', value: 'Free' },
    { label: 'Admin', value: 'Admin' },
    { label: 'VIP', value: 'VIP' },
  ]);


  return (
    <View style={styles.container}>

      <View style={{ marginBottom: ms(10) }}>
        <Logo height={ms(142)} width={ms(142)} />
      </View>
      <Text style={TextStyles.title}>{strings.login.loginOrSignup}</Text>
      <Text style={styles.subTitle}>{strings.login.enterPhoneNumber}</Text>

      <TextField
        autoCapitalize="none"
        onChangeText={setMobileNumber}
        placeholder={strings.login.phoneNumber}
        value={mobileNumber}
        keyboardType="phone-pad"
      />
      <Recaptcha
        ref={recaptcha}
        siteKey={SITE_KEY}
        baseUrl={CAPTCHA_BASE_URL}
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
        explicit
      />

      <ErrorView errors={errors} />

      <Button
        onPress={handleSubmit}
        style={styles.submitButton}
        title={isLoading ? strings.common.loading : strings.login.continue}
      />

      <Text style={styles.termsAndConditionsStyle}>
        {strings.login.byContinue}
        <Text style={styles.linkColor}>{strings.login.termsAndConditions}</Text>
        {strings.login.and}
        <Text style={styles.linkColor}>{strings.login.privacyPolicy}</Text>
      </Text>
    </View >
  );
}
