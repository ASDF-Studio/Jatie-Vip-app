import React, { useEffect } from 'react';
import { hide } from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { RootNavigator } from '@/navigation';
import FlashMessage from "react-native-flash-message";
import * as Sentry from '@sentry/react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { navigationRef } from './navigation/RootNavigation';
import { NAVIGATION } from './constants';
import { Linking } from 'react-native';
enableScreens();
Sentry.init({
  dsn: 'https://7b8d6347944f41148a983605c2e88d17@o4504937868492800.ingest.sentry.io/4504937962864640',
});
export function App() {
  useEffect(() => {
    dynamicLinks().getInitialLink().then((link) => {
      handleDynamicLink(link)

    })
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    }
  }, [])
  const handleDynamicLink = (link) => {
    Linking.addEventListener('url', event => {
      const url = new URL(event.url);
      const postId = url.searchParams.get('postId');
      console.log("post___IDIIDIDIDIDI", postId); // Output: postId value from the URL
    });
    console.log("LINKKK", link);
  }
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
