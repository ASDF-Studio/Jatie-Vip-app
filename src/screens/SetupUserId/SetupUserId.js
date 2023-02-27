import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkUserName, TYPES } from '@/actions/UserActions';
import { Button, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/EnterOtp/EnterOtp.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { AuthHeader } from '@/components/AuthHeader';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { showMessage } from 'react-native-flash-message';

export function SetupUserId({ route }) {
  const { ID } = route.params;
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );
  const validation = () => {
    if (userId == "") {
      showMessage({
        message: "Please enter username",
        type: "danger"
      })
    } else {
      // dispatch(checkUserName(userId))
      navigationRef.navigate(NAVIGATION.signUp, { "username": userId, "ID": ID });

    }
  }
  const handleSubmit = () => {
    validation()
    // navigationRef.navigate(NAVIGATION.signUp, { "username": "mukul" });
  };
  const OnChangehandler = (text) => {
    if (text !== "") {
      console.log("ETS", text)
      setUserId(text)
      dispatch(checkUserName(text))

    }
  }

  return (
    <View style={styles.container}>
      <AuthHeader title={strings.setupUserId.title} />
      <Text style={styles.subTitle}>{strings.setupUserId.subtitle}</Text>

      <TextField
        autoCapitalize="none"
        onChangeText={OnChangehandler}
        placeholder={strings.setupUserId.placeholder}
        value={userId}
      />

      <Button
        onPress={handleSubmit}
        style={styles.submitButton}
        title={isLoading ? strings.common.loading : strings.login.continue}
      />
    </View>
  );
}
