import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { Giveaway } from '@/screens';
import PostDetails from '@/screens/Giveaway/postDetails';
import PastDetails from '@/screens/Giveaway/pastDetails';
import Participants from '@/screens/Giveaway/participants';
import AdminGiveawayPost from '@/screens/Giveaway/AdminGiveawayPost';
import AdminGiveawayOption from '@/screens/Giveaway/AdminGiveawayOption';
import UpdateGiveawayOption from '@/screens/Giveaway/UpdateGiveawayOption';
import UpdateGiveawayPost from '@/screens/Giveaway/UpdateGiveawayPost';
import Search from '@/screens/Profile/search';
import UpgradeMembership from '@/screens/Profile/upgradeMembership';
import Notification from '@/screens/Home/notification';

const Stack = createNativeStackNavigator();

export function GiveawayNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATION.exclusive}
    >
      <Stack.Screen
        name={NAVIGATION.giveaway}
        component={Giveaway}
        options={{ headerLargeTitle: false }}
      />
      <Stack.Screen
        name={NAVIGATION.giveawayPostDetails}
        component={PostDetails}
      />
      <Stack.Screen
        name={NAVIGATION.giveawayPastDetails}
        component={PastDetails}
      />
      <Stack.Screen
        name={NAVIGATION.seeAllParticipants}
        component={Participants}
      />
      <Stack.Screen
        name={NAVIGATION.adminGiveawayPost}
        component={AdminGiveawayPost}
      />
      <Stack.Screen
        name={NAVIGATION.adminGiveawayOption}
        component={AdminGiveawayOption}
      />
      <Stack.Screen
        name={NAVIGATION.updateGiveawayPost}
        component={UpdateGiveawayPost}
      />
      <Stack.Screen
        name={NAVIGATION.updateGiveawayOption}
        component={UpdateGiveawayOption}
      />
      <Stack.Screen name={NAVIGATION.notification} component={Notification} />
      <Stack.Screen name={NAVIGATION.search} component={Search} />
      <Stack.Screen
        name={NAVIGATION.upgradeMembership}
        component={UpgradeMembership}
      />
    </Stack.Navigator>
  );
}
