import React from 'react';
import { hide } from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { RootNavigator } from '@/navigation';
import FlashMessage from "react-native-flash-message";

enableScreens();

export function App() {
  return (
    <Provider store={store}>

      <PersistGate onBeforeLift={hide} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
      <FlashMessage
        position="top"
        floating
        duration={700}
      />
    </Provider>
  );
}
