import React, { useEffect } from 'react';
import { hide } from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { RootNavigator } from '@/navigation';
import FlashMessage from "react-native-flash-message";
import * as Sentry from '@sentry/react-native';

import messaging from '@react-native-firebase/messaging';
import { getFCMToken, requestUserPermission } from './helper/utils/pushNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { requestUserPermission } from 'utils/PushNotifications';
enableScreens();
Sentry.init({
  dsn: 'https://7b8d6347944f41148a983605c2e88d17@o4504937868492800.ingest.sentry.io/4504937962864640',
});



export function App() {
  useEffect(() => {
    requestUserPermission()
    getFCMToken1()
  }, [])
  async function getFCMToken1() {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");

    if (!fcmtoken) {
      try {
        const fcmtoken = await messaging().getToken();
        if (fcmtoken) {
          console.log("newtokennnnnnnn", fcmtoken);
          await AsyncStorage.setItem("fcmtoken", fcmtoken);
        }
      } catch (error) {
        console.log("error in fcmtoken", error);
      }
    }
  }

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // }
  return (
    <Sentry.ErrorBoundary>
      <Provider store={store}>

        <PersistGate onBeforeLift={hide} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
        <FlashMessage
          hideOnPress
          position="top"
          floating
          duration={700}
        />
      </Provider>
    </Sentry.ErrorBoundary>
  );
}
