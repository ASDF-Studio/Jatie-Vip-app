import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { Exclusive } from '@/screens';
import Thubmnail from '@/screens/Exclusive/thumbnail';
import AdminExclusivePost from '@/screens/Exclusive/AdminExclusivePost';
import AdminPostOption from '@/screens/Exclusive/AdminPostOption';
import Notification from '@/screens/Exclusive/notification';
import UpdateExclusivePost from '@/screens/Exclusive/UpdateExclusivePost';
import UpdateExclusiveOption from '@/screens/Exclusive/UpdateExclusiveOption';
import { updateExclusivePost } from '@/actions/PostActions';
import Search from '@/screens/Profile/search';

const Stack = createNativeStackNavigator();

export function ExclusiveNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATION.exclusive}
    >
      <Stack.Screen
        name={NAVIGATION.exclusive}
        component={Exclusive}
        options={{ headerLargeTitle: false }}
      />
      <Stack.Screen
        name={NAVIGATION.exclusiveThumbnail}
        component={Thubmnail}
      />
      <Stack.Screen
        name={NAVIGATION.adminExclusivePost}
        component={AdminExclusivePost}
      />
      <Stack.Screen
        name={NAVIGATION.adminPostOption}
        component={AdminPostOption}
      />
      <Stack.Screen
        name={NAVIGATION.updateExclusivepost}
        component={UpdateExclusivePost}
      />
      <Stack.Screen
        name={NAVIGATION.updateExclusiveOption}
        component={UpdateExclusiveOption}
      />
      <Stack.Screen name={NAVIGATION.notification} component={Notification} />
      <Stack.Screen name={NAVIGATION.search} component={Search} />
    </Stack.Navigator>
  );
}
