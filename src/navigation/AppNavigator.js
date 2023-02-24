import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NAVIGATION } from '@/constants';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { CustomBottomTabBar } from '@/components/CustomBottomTabBar';
import { MessageNavigator } from './MessageNavigator';
import { ExclusiveNavigator } from './ExclusiveNavigator';
import { GiveawayNavigator } from './GiveawayNavigator';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomBottomTabBar {...props} />}>
      <Tab.Screen name={NAVIGATION.homeNavigator}
        component={HomeNavigator} />
      <Tab.Screen
        name={NAVIGATION.messageNavigator}
        component={MessageNavigator}
      />
      <Tab.Screen
        name={NAVIGATION.exclusiveNavigator}
        component={ExclusiveNavigator}
      />
      <Tab.Screen
        name={NAVIGATION.giveawayNavigator}
        component={GiveawayNavigator}
      />
      <Tab.Screen
        name={NAVIGATION.profileNavigator}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
}
