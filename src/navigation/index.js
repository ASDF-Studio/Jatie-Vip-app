import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { getUser } from '@/selectors/UserSelectors';
import { theme } from '@/theme';
import { navigationRef } from './RootNavigation';

export function RootNavigator() {
  const user = useSelector(getUser);
  const scheme = useColorScheme();
  console.log("USER+_+_+_", user)
  return (
    // Force use "light" color scheme for now
    <NavigationContainer ref={navigationRef} theme={theme['light']}>
      {user ? <AppNavigator /> :

        <AuthNavigator />
      }
    </NavigationContainer>
  );
}
