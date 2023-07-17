import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { ms } from 'react-native-size-matters';
import { theme } from '@/theme';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import { fetchAllNotifications } from '@/actions/UserActions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useBackgroundFetch } from '@/hooks';

export const NotificationIcon = ({ style }) => {
  const loggedInUser = useSelector(getUser);
  const dispatch = useDispatch();

  const notificationData = loggedInUser?.notificationKey;

  const isNotificationAvailable = notificationData?.data?.filter(
    x => !x?.seenByUser
  );

  const isFocused = useIsFocused();

  const backgroundFetch = () => {
    console.log('fetching notif');
    fetchAllNotifications(loggedInUser.id, true);
  };

  useBackgroundFetch({
    callback: backgroundFetch,
    isFocused: true,
    delay: 5,
  });

  return (
    <TouchableOpacity
      onPress={() => navigationRef.navigate(NAVIGATION.notification)}
    >
      <View style={[{ position: 'relative' }, style]}>
        <FontAwesomeIcon icon={faBell} size={ms(22)} style={styles.bellIcon} />
        {!isEmpty(isNotificationAvailable) && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellIcon: {
    backgroundColor: 'white',
    color: theme.light.colors.black,
  },
  dot: {
    position: 'absolute',
    width: ms(10),
    borderRadius: 100,
    height: ms(10),
    backgroundColor: theme.light.colors.notificationBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: theme.light.colors.red,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    right: 2,
    top: 0,
  },
});
