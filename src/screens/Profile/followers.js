import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  faEllipsis,
  faMessage,
  faFlag,
  faXmark,
  faUserPlus,
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
import { Data } from './ProfileData/followersData';
import { blockUser, getAllPost, unFollowUser } from '@/actions/PostActions';
import { useDispatch, useSelector } from 'react-redux';
import { followers_FollowingData, getUser } from '@/selectors/UserSelectors';
import { TYPES, followers } from '@/actions/UserActions';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { followUser } from '@/actions/PostActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAllPostData } from '@/selectors/PostSelectors';
import { navigate } from '@/navigation/RootNavigation';
export default function Followers({ navigation, route }) {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const { id } = route.params;
  const { screenName } = route.params;
  //console.log("id in followers", id)
  console.log(screenName);
  const { active } = route.params;

  const [open, setOpen] = useState(false);
  const [followId, setfollowId] = useState('');
  const [followUnfollowId, SetfollowUnfollowId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  //Selector Usage
  const user = useSelector(getUser);

  const post = useSelector(getAllPostData);
  const followerDataa = user.followersDatainReducer;

  useEffect(() => {
    dispatch(followers(user?.id, id));
    // console.log('followers list', user?.id, id)
  }, [focus]);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.FOLLOWERS], state)
  );

  //follow handle press
  const followHandlePress = () => {
    dispatch(followUser(user?.id, followId));
    setOpen(false);

    setTimeout(() => {
      dispatch(followers(user?.id, id));
    }, 1000);
  };

  const UnfollowHandlePress = () => {
    dispatch(unFollowUser(user?.id, followId));
    setOpen(false);

    setTimeout(() => {
      dispatch(followers(user?.id, id));
    }, 1000);
  };

  const onBlock = () => {
    dispatch(blockUser(user?.id, followId));
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
        <Text style={styles.headerTxt}>{strings.profile.myFollowers}</Text>
        <Badge count={followerDataa?.data?.numOfFollowers} size={ms(16)} />
      </View>
      <HorizontalLine color={theme.light.colors.primaryBg} paddingTop={8} />
      <View>
        <FlatList
          data={followerDataa?.data?.follower_List}
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
                    navigate(
                      NAVIGATION.userProfile,
                      { userId: item?.user?.id },
                      console.log('check issue', item?.user?.id)
                    )
                  }
                >
                  <Image
                    source={{
                      uri:
                        item.userByFollowinguserid?.profilePic == ''
                          ? null
                          : item.user?.profilePic,
                    }}
                    style={styles.profileImage}
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}> {item.user.fullName} </Text>
                    <Text> {` @${item.user.username}`} </Text>
                  </View>
                </TouchableOpacity>
                {screenName == 'userProfile' ? null : (
                  <Icon
                    icon={faEllipsis}
                    size={ms(15)}
                    color={theme.light.colors.secondary}
                    onPress={() => {
                      setfollowId(item.user.id),
                        SetfollowUnfollowId(item.is_following),
                        setSelectedUser(item.user);
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
          onPress={
            followUnfollowId == false ? followHandlePress : UnfollowHandlePress
          }
          title={
            followUnfollowId == false
              ? strings.operations.follow + ` @${selectedUser?.username}`
              : strings.operations.unFollow + ` @${selectedUser?.username}`
          }
          icon={faUserPlus}
          iconColor={theme.light.colors.primary}
          iconBg={theme.light.colors.primaryBgLight}
        />
        <ModalList
          title={strings.operations.sendPrivateMessage}
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
          title={strings.operations.block + strings.home.DummyUser}
          icon={faXmark}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={onBlock}
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
  listHeader: {
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopBackButton: { padding: ms(10) },
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

  contentContainerStyle: { paddingBottom: ms(100) },
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
});
