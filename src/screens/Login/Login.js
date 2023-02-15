import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TYPES, ChooseUser } from '@/actions/UserActions';
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

export function Login() {
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState('');

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );

  const handleSubmit = () => {
    // dispatch(login(username, password));
    navigationRef.navigate(NAVIGATION.enterOtp);
    dispatch(ChooseUser(selectedValue));
  };

  // testing purpose code
  const [userListOpen, setUserListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [user, setUser] = useState([
    { label: 'Free', value: 'Free' },
    { label: 'Admin', value: 'Admin' },
    { label: 'VIP', value: 'VIP' },
  ]);

  // console.log(selectedValue)

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
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
      <ErrorView errors={errors} />

      {/* only for testing purpose code */}
      <DropDownPicker
        placeholder="User Type"
        open={userListOpen}
        value={selectedValue}
        items={user}
        setOpen={setUserListOpen}
        setValue={setSelectedValue}
        setItems={setUser}
        style={styles.textFiled}
        textStyle={styles.dropListTxt}
      />

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
    </View>
  );
}
