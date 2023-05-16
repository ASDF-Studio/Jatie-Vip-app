import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ms } from 'react-native-size-matters';
import { TextStyles, theme } from '@/theme';
import { NAVIGATION } from '@/constants';
import MyStatus from './myStatus';
import MyActivity from './myActivity';
import {
  StatusNavigatorBar,
  ShareFeed,
  HeaderTab,
  Icon,
  HorizontalLine,
} from '@/components';
import { strings } from '@/localization';
import { useSelector, useDispatch } from 'react-redux';
import { FontFamily } from '@/theme/Fonts';
import { Data } from './ProfileData/profileData';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { getUser } from '@/selectors/UserSelectors';

export function Profile({ navigation }) {
  const user = useSelector(getUser)
  const userType = useSelector(state => state.userType);
  const [status, setStatus] = useState(strings.profile.myStatus);

  //  / console.log('user details ', user)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={{
              uri: user?.profilePic == null ? "" : user?.profilePic,
            }}
          />
          <View style={styles.headerText}>
            <Text
              numberOfLines={1}
              style={styles.nameTxt}>{user?.fullName}</Text>
            <Text
              numberOfLines={1}
              style={styles.userNameTxt}>{user?.username}</Text>
          </View>
        </View>
        <View style={styles.iconContiner}>
          <Icon
            icon={faSliders}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.profileSetting)}
            style={styles.settingsIcon}
          />
          <Icon
            icon={faSearch}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.search)}
            style={styles.searchIcon}
          />
          <Icon
            icon={faBell}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
            style={styles.bellIcon}
          />
          <View style={styles.bellAlert} />
        </View>
      </View>
      <HeaderTab
        title1={strings.profile.followers}
        count1={20}
        onPress1={() => navigation.navigate(NAVIGATION.followers)}
        title2={strings.profile.following}
        count2={100}
        onPress2={() => navigation.navigate(NAVIGATION.following)}
      />
      <StatusNavigatorBar
        title1={strings.profile.myStatus}
        key1={strings.profile.myStatus}
        title2={strings.profile.myActivity}
        key2={strings.profile.myActivity}
        status={status}
        setStatus={setStatus}
      />
      <HorizontalLine />
      <ShareFeed onPress={() => navigation.navigate(NAVIGATION.post)} />
      <View style={styles.feedContainer}>
        {status == `${strings.profile.myStatus}` ? (
          <MyStatus navigation={navigation} />
        ) : (
          <MyActivity navigation={navigation} />
        )}
      </View>
    </SafeAreaView >
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: ms(9),
  },
  headerImageContainer: {
    flexDirection: 'row',
  },
  headerImage: {
    width: ms(60),
    height: ms(60),
    borderWidth: 1,
    borderRadius: 100,
    margin: ms(3),
  },
  headerText: {
    margin: ms(7),
    marginLeft: ms(5),
  },
  nameTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      fontSize: ms(24, 0.3),
      paddingLeft: ms(3, 0.3),
      paddingTop: ms(4),
    },
  ],
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
    position: 'absolute',
    top: ms(25),
    paddingLeft: ms(3, 0.3),
    paddingTop: ms(10),
    width: ms(100)
  },
  iconContiner: {
    flexDirection: 'row',
    paddingTop: ms(18),
  },
  bellIcon: {
    marginRight: ms(6),
  },
  searchIcon: {
    marginRight: ms(12),
  },
  settingsIcon: {
    marginRight: ms(12),
  },
  bellAlert: {
    height: ms(10),
    width: ms(10),
    backgroundColor: theme.light.colors.error,
    position: 'absolute',
    borderRadius: 100,
    left: ms(74),
    top: ms(18),
  },
  feedContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
});
