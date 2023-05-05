import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { getUser } from '@/selectors/UserSelectors';
import { theme } from '@/theme';
import { navigationRef } from './RootNavigation';
import { HomeNavigator } from './HomeNavigator';
import { NAVIGATION } from '@/constants';
import queryString from 'query-string';
import dynamicLinks from '@react-native-firebase/dynamic-links';
export function RootNavigator() {
  const user = useSelector(getUser);
  const scheme = useColorScheme();
  // useEffect(() => {
  //   dynamicLinks().getInitialLink().then((link) => {
  //     handleDynamicLink(link)

  //   })
  //   const linkingListener = dynamicLinks().onLink(handleDynamicLink);
  //   return () => {
  //     linkingListener();
  //   }
  // }, [])
  // const handleDynamicLink = (link) => {

  //   if (!!link?.url) {
  //     const params = queryString.parse(link.url.split('?')[1]);
  //     const postId = params.postId;
  //     const postIndex = params.postIndex;
  //     setTimeout(() => {
  //       if (user) {
  //         navigationRef.navigate(NAVIGATION.singlePost, { postId: postId, postIndex: postIndex })
  //       }
  //       else {
  //         navigationRef.navigate(NAVIGATION.login, { postId: postId, postIndex: postIndex })
  //       }
  //     }, 50);
  //   }
  // }
  return (
    // Force use "light" color scheme for now
    <NavigationContainer ref={navigationRef} theme={theme['light']}>
      {user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
