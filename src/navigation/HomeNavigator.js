import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { Home } from '@/screens';
import Comments from '@/screens/Home/comments';
import Post from '@/screens/Home/Post';
import PostOptions from '@/screens/Home/PostOptions';
import SchedulePost from '@/screens/Home/scheduledPost';
import Notification from '@/screens/Home/notification';
import Search from '@/screens/Profile/search';
import UpdatePost from '@/screens/Home/updatePost';
import UserProfile from '@/screens/Profile/userProfile';
import SinglePost from '@/screens/Home/SinglePost';
import Followers from '@/screens/Profile/followers';
import Following from '@/screens/Profile/following';
import UpgradeMembership from '@/screens/Profile/upgradeMembership';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATION.home}
    >
      <Stack.Screen name={NAVIGATION.home} component={Home} />
      <Stack.Screen name={NAVIGATION.comments} component={Comments} />

      <Stack.Screen name={NAVIGATION.singlePost} component={SinglePost} />
      <Stack.Screen name={NAVIGATION.followers} component={Followers} />
      <Stack.Screen name={NAVIGATION.following} component={Following} />
      <Stack.Screen name={NAVIGATION.post} component={Post} />
      <Stack.Screen name={NAVIGATION.postOptions} component={PostOptions} />
      <Stack.Screen name={NAVIGATION.scheduledPost} component={SchedulePost} />
      <Stack.Screen name={NAVIGATION.notification} component={Notification} />
      <Stack.Screen name={NAVIGATION.search} component={Search} />
      <Stack.Screen name={NAVIGATION.updatePost} component={UpdatePost} />
      <Stack.Screen name={NAVIGATION.userProfile} component={UserProfile} />
      <Stack.Screen
        name={NAVIGATION.upgradeMembership}
        component={UpgradeMembership}
      />
    </Stack.Navigator>
  );
}
