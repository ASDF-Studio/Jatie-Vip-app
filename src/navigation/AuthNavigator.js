import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import {
  AddProfilePicture,
  AdjustPicture,
  EnterOtp,
  Login,
  SetupUserId,
  SignUp,
  Welcome,
} from '@/screens';
import { theme } from '@/theme';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: theme.light.colors.white },
      }}
    >
      <Stack.Screen
        component={Welcome}
        name={NAVIGATION.welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Login}
        name={NAVIGATION.login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EnterOtp}
        name={NAVIGATION.enterOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SetupUserId}
        name={NAVIGATION.setupUserId}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SignUp}
        name={NAVIGATION.signUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AddProfilePicture}
        name={NAVIGATION.addProfilePicture}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AdjustPicture}
        name={NAVIGATION.adjustPicture}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
