import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  faEllipsis,
  faMessage,
  faFlag,
  faXmark,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import {
  TopBackButton,
  Icon,
  Badge,
  HorizontalLine,
  CustomLoader,
} from '@/components';
import { ModalDown, ModalList } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { Data } from './ProfileData/followingData';
import { followers } from '@/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { blockUser, unFollowUser } from '@/actions/PostActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/actions/UserActions';

export default function Following({ navigation, route }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const user = useSelector(getUser);
  const followerDataa = user.followersDatainReducer;
  const { id } = route.params;
  const { screenName } = route.params;
  const [UnfollowId, setUnfollowId] = useState('');
  const [username, setUserName] = useState('');
  const focus = useIsFocused();
  useEffect(() => {
    dispatch(followers(user?.id, id));
  }, [focus]);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.FOLLOWERS], state)
  );

  const unFollowHandlePress = () => {
    dispatch(unFollowUser(user?.id, UnfollowId));
    setOpen(false);
    setTimeout(() => {
      dispatch(followers(user?.id, id));
    }, 1000);
  };

  const blockUserById = () => {
    dispatch(blockUser(user?.id, UnfollowId));
    setOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomLoader open={isLoading} /> */}
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <View style={styles.listHeader}>
        <Text style={styles.headerTxt}>{strings.profile.myFollowing}</Text>
        <Badge count={followerDataa?.data?.numOfFollowing} size={ms(16)} />
      </View>
      <HorizontalLine
        color={theme.light.colors.primaryBg}
        paddingTop={8}
        paddingBottom={20}
      />
      <View>
        <FlatList
          data={followerDataa?.data?.following_List}
          key={props => props.id}
          initialNumToRender={10}
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.bellowContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.listContainer}>
                <TouchableOpacity
                  style={styles.list}
                  onPress={() =>
                    navigation.navigate(NAVIGATION.userProfile, {
                      userId: item.userByFollowinguserid?.id,
                    })
                  }
                >
                  <Image
                    source={{
                      uri:
                        item.userByFollowinguserid?.profilePic == ''
                          ? null
                          : item.userByFollowinguserid?.profilePic,
                    }}
                    style={styles.profileImage}
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>
                      {' '}
                      {item.userByFollowinguserid?.fullName}
                    </Text>
                    <Text style={styles.userNameTxt}>
                      {`  @${item.userByFollowinguserid?.username}`}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>

                {screenName == 'userProfile' ? null : (
                  <Icon
                    icon={faEllipsis}
                    size={ms(15)}
                    color={theme.light.colors.secondary}
                    onPress={() => {
                      setUnfollowId(item.userByFollowinguserid.id),
                        setUserName(item.userByFollowinguserid.username),
                        setOpen(true);
                    }}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
      <ModalDown open={open} setOpen={setOpen}>
        <ModalList
          title={strings.profile.unfollow + ' ' + `@${username}`}
          icon={faUserMinus}
          iconColor={theme.light.colors.primary}
          iconBg={theme.light.colors.primaryBgLight}
          onPress={unFollowHandlePress}
        />
        <ModalList
          title={strings.profile.sendPrivateMessage}
          icon={faMessage}
          iconColor={theme.light.colors.success}
          iconBg={theme.light.colors.successBgLight}
        // onPress = {()=> Alert.alert("message")}
        />
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={15}
          paddingBottom={8}
        />
        <ModalList
          title={strings.profile.reportUser}
          icon={faFlag}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
        // onPress = {()=> Alert.alert("report")}
        />
        <ModalList
          title={strings.profile.block + '  ' + username}
          icon={faXmark}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={blockUserById}
        />
      </ModalDown>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  TopBackButton: { padding: ms(10) },
  listHeader: {
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(9),
      paddingRight: ms(10),
    },
  ],
  bellowContainer: {
    paddingTop: ms(10),
  },

  listContainer: {
    padding: ms(2),
    paddingLeft: ms(8),
    paddingRight: ms(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: ms(2),
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerStyle: { paddingBottom: ms(100) },
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: ms(5),
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(15, 0.3),
    color: theme.light.colors.black,
  },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
  },
});
