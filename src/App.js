import { RootNavigator } from '@/navigation';
import { persistor, store } from '@/store';
import * as Sentry from '@sentry/react-native';
import React, { useEffect } from 'react';
import { hide } from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { navigationRef } from './navigation/RootNavigation';
import { NAVIGATION } from './constants';

//import { requestUserPermission } from 'utils/PushNotifications';
enableScreens();
Sentry.init({
  dsn: 'https://7b8d6347944f41148a983605c2e88d17@o4504937868492800.ingest.sentry.io/4504937962864640',
});
export function App() {
  useEffect(() => {
    requestUserPermission();
    getFCMToken1();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  async function getFCMToken1() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('FCM__TOsssEN', fcmtoken);
    if (!fcmtoken) {
      try {
        const token = await messaging().getToken();
        // console.log("FCM__TOEN", token);
        if (token) {
          await AsyncStorage.setItem('fcmtoken', token);
        }
      } catch (error) {}
    }
  }
  const onMessageReceived = React.useCallback(async message => {
    console.log(
      'Notificatiohn=-=-=-terterterterter ------------',
      JSON.stringify(message)
    );

    await notifee.displayNotification({
      title: message?.notification?.title,
      body: message?.notification?.body,
      sound: 'default',
      ios: {
        badgeCount: 0,
        sound: 'default',
        interruptionLevel: 'timeSensitive',
        criticalAlert: true,
        foregroundPresentationOptions: {
          alert: true,
          badge: false,
          sound: true,
        },
        backgroundPresentationOptions: {
          alert: true,
          badge: false,
          sound: true,
        },
      },
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);

    messaging()
      .getInitialNotification()
      .then(val => {
        console.log('initialNotif called ============  ', val);
      });

    messaging().setBackgroundMessageHandler(onMessageReceived);

    messaging().onNotificationOpenedApp(remoteMessage => {
      const { data } = remoteMessage;
      const { postId } = data || {};

      if (postId) {
        navigationRef.navigate(NAVIGATION.singlePost, {
          postId,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Sentry.ErrorBoundary>
      <Provider store={store}>
        <PersistGate onBeforeLift={hide} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
        <FlashMessage hideOnPress position="bottom" floating duration={700} />
      </Provider>
    </Sentry.ErrorBoundary>
  );
}
