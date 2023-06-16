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
import { TextStyles, theme } from '@/theme';
import { CustomErrorView } from '@/components/CustomErrorView';
import { customShowMessage } from '@/utils';

export function SetupUserId({ route }) {
  const { ID, number } = route.params;
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.CHECK_USERNAME], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.CHECK_USERNAME], state),
    shallowEqual
  );

  const validation = () => {
    if (userId == '') {
      customShowMessage({
        message: strings.setupUserId.userNameValidation,
        type: 'danger',
      });
    } else if (errors.length <= 0) {
      navigationRef.navigate(NAVIGATION.signUp, {
        username: userId,
        ID: ID,
        number: number,
      });
    }
  };
  const handleSubmit = () => {
    validation();
  };
  const OnChangehandler = text => {
    setUserId(text);
    dispatch(checkUserName(text));
  };

  const UserNameErrorView = () => {
    return (
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={[TextStyles.error, { color: theme.light.colors.error }]}>
          {strings.setupUserId.chooseAnother}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AuthHeader title={strings.setupUserId.title} />
      <Text style={styles.subTitle}>{strings.setupUserId.subtitle}</Text>

      <TextField
        autoCapitalize="none"
        onChangeText={text => {
          OnChangehandler(text);
        }}
        placeholder={strings.setupUserId.placeholder}
        value={userId}
        style={
          errors.length > 0
            ? { borderWidth: 0.8, borderColor: theme.light.colors.error }
            : {}
        }
      />

      {errors.length > 0 && <UserNameErrorView />}
      {/* {errors.length > 0 &&
        <CustomErrorView
          errors={errors}
          ErrorScreen={NAVIGATION.setupUserId}
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
