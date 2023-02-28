import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '@/constants';
import { Home } from '@/screens';
import Comments from '@/screens/Home/comments';
import Post from '@/screens/Home/Post';
import PostOptions from '@/screens/Home/PostOptions';
import SchedulePost from '@/screens/Home/scheduledPost';
import Notification from '@/screens/Home/notification';
import Search from '@/screens/Home/search';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATION.home}
    >
      <Stack.Screen name={NAVIGATION.home} component={Home} />
      <Stack.Screen name={NAVIGATION.comments} component={Comments} />
      <Stack.Screen name={NAVIGATION.post} component={Post} />
      <Stack.Screen name={NAVIGATION.postOptions} component={PostOptions} />
      <Stack.Screen name={NAVIGATION.scheduledPost} component={SchedulePost} />
      <Stack.Screen name={NAVIGATION.notification} component={Notification} />
      <Stack.Screen name={NAVIGATION.search} component={Search} />
    </Stack.Navigator>
  );
}
