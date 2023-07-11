import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  faCrown,
  faMessage,
  faUserPlus,
  faEllipsis,
  faFlag,
  faXmark,
  faPen,
  faTrash,
  faLock,
  faThumbsUp,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HeaderTab,
  Icon,
  ModalDown,
  ModalList,
  AppImageViewer,
  TopBackButton,
  CustomLoader,
  Toast,
  ReportOnPostModal,
  Button,
  PopUp,
  MediaContainer,
  UserPostOptions,
} from '@/components';
import { strings } from '@/localization';
import { HorizontalLine } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import {
  bannedUserById,
  bannedUsers,
  getAllPostsByUserid,
  getAllPostsByUseridPagination,
  getUserProfileByUserId,
  getUserProfileByUserIdSuccess,
  unBannedUserById,
} from '@/actions/UserActions';
import { useEffect } from 'react';
import { getUser } from '@/selectors/UserSelectors';
import {
  isLoadingSelector,
  successSelector,
} from '@/selectors/StatusSelectors';
import { Loader } from '@/components/Loader';
import { navigationRef } from '@/navigation/RootNavigation';
import {
  TYPES,
  blockUser,
  deletePost,
  followUser,
  getAllPost,
  reportPost,
  unFollowUser,
} from '@/actions/PostActions';
import { TYPES as UserActionTypes } from '@/actions/UserActions';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { POST_TYPE } from '@/constants/enums';
import { getAllPostByUserIdSuccess } from '@/actions/UserActions';
import { SwiperViewer } from '@/components/SwiperComponent';
import { globalReset } from '@/actions/GlobalActions';
import ImagePicker from 'react-native-image-crop-picker';
import { useCallback } from 'react';
import { customShowMessage } from '@/utils';
import { isEmpty, last } from 'lodash';
import PostOptions from '../Home/PostOptions';
import { DefaultProfile } from '@/assets';
import { UserController } from '@/controllers';
import { useBackgroundFetch } from '@/hooks';

export default function UserProfile({ navigation, route }) {
  const [postIndex, setPostIndex] = useState(0);
  const dispatch = useDispatch();
  const { userId } = route?.params;
  const userr = useSelector(getUser);
  const getUserProfile = useSelector(getUser);
  const [active, setActive] = useState(false);
  const userType = useSelector(state => state.userType);
  const [openMore, setOpenMore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [userPosts, setuserPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);

  const [postId, setpostId] = useState(null);
  const [postUserId, setPostUserId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImg, setPostImg] = useState([]);
  const [isAdminPost, setIsAdminPost] = useState(false);
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Harassment', value: 'Bullying or Harassment' },
    { label: 'Spam', value: 'Spam' },
    {
      label: 'Misleading Information or Fake News',
      value: 'Misleading Information or Fake News',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReachedDuringMomentum, setEndReachedDuringMomentum] =
    useState(true);

  const [selectedPost, setSelectedPost] = useState(null);
  const [index, setIndex] = useState();

  const isFocused = useIsFocused();

  const isFollowSuccess = useSelector(state =>
    isLoadingSelector([TYPES.FOLLOW_USER], state)
  );
  const isunFollowSuccess = useSelector(state =>
    isLoadingSelector([TYPES.UN_FOLLOW_USER], state)
  );

  let counter = 1;
  const customReq = async () => {
    setLoading(true);
    await getAllPostsByUserid(userId, userr.id)(dispatch);
    setLoading(false);
  };

  const backgroundFetch = () => {
    console.log('background fetching user posts');
    UserController.postByUserId(userId, '', userr.id).then(res => {
      dispatch(getAllPostByUserIdSuccess(res?.data));
    });
  };

  useBackgroundFetch({
    callback: backgroundFetch,
    isFocused,
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserProfileByUserId(userId, userr.id));
      customReq();

      return () => {
        dispatch(getUserProfileByUserIdSuccess(null));
        dispatch(getAllPostByUserIdSuccess(null));
      };
    }, [userId])
  );

  useEffect(() => {
    if (!userr.getUserByUserId) return;
    setUser(userr?.getUserByUserId);
  }, [userr]);

  const onFollow = () => {
    if (user?.is_following) {
      dispatch(unFollowUser(userr.id, user.id));
    } else {
      dispatch(followUser(userr.id, user.id));
    }
    setOpenMore(false);
    setTimeout(() => {
      dispatch(getUserProfileByUserId(userId, userr.id));
    }, 100);
  };

  const onMessageClick = () => {
    customShowMessage({
      message: 'Coming Soon',
      type: 'info',
    });
  };

  const renderFollowTitle = () => {
    const loggedInUserID = getUserProfile?.id;
    if (user) {
      const isLoggedInUserAFollower = user?.followers?.includes(loggedInUserID);
      return isLoggedInUserAFollower
        ? strings.profile.unfollow
        : strings.profile.follow;
    }
  };

  const loadingMoreReq = async () => {
    setLoadingMore(true);
    const lastPost = last(userr?.getAllPostsByUserId);
    await getAllPostsByUseridPagination(
      userId,
      lastPost.created_at,
      userr.id
    )(dispatch);
    setLoadingMore(false);
  };

  const getPostPagination = () => {
    if (!loadingMore && !endReachedDuringMomentum) {
      loadingMoreReq();
    }
  };

  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {loadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  // useEffect(() => {
  //   if (!openMore) {
  //     setpostId(null);
  //   }
  // }, [openMore]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <TopBackButton
            onPress={() => navigationRef.goBack()}
            style={styles.TopBackButton}
          />
        </View>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={
              user?.profilePic
                ? {
                    uri: user?.profilePic || null,
                  }
                : DefaultProfile
            }
          />
          {user?.isVIP && user?.isAdmin && (
            <View style={styles.profileLogoContainer}>
              <FontAwesomeIcon
                icon={faCrown}
                color={theme.light.colors.primaryBgDark}
                size={20}
              />
            </View>
          )}

          <View style={styles.profileTitleContainer}>
            <Text style={[TextStyles.header, styles.headerDesign]}>
              {user?.fullName}
            </Text>
            <Text style={styles.userNameDesign}> {user?.username}</Text>
          </View>
        </View>
        <View style={styles.iconContiner}>
          <Icon
            icon={faSearch}
            size={22}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <Icon
            icon={faBell}
            size={22}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
          />
        </View>
      </View>
      <HeaderTab
        title1={strings.profile.followers}
        count1={user?.followerListsByFollowinguserid?.length}
        onPress1={() =>
          navigation.navigate(NAVIGATION.followers, {
            id: userId,
            screenName: 'userProfile',
          })
        }
        title2={strings.profile.following}
        count2={user?.follower_lists?.length}
        onPress2={() =>
          navigation.navigate(NAVIGATION.following, {
            id: userId,
            screenName: 'userProfile',
          })
        }
      />
      <HorizontalLine
        color={theme.light.colors.infoBgLight}
        paddingTop={8}
        paddingBottom={4}
      />

      <View style={styles.messageHeader}>
        <View style={styles.messageLeft}>
          <TouchableOpacity
            onPress={() => {
              onMessageClick();
            }}
            style={[styles.IconBox, styles.IconBoxDesign]}
          >
            <FontAwesomeIcon
              icon={faMessage}
              color={theme.light.colors.success}
            />
            <Text style={[styles.IconBoxColor]}>{strings.profile.message}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFollow}
            style={styles.IconBox}
            disabled={isFollowSuccess || isunFollowSuccess}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              color={theme.light.colors.primary}
            />
            {/* <Text style={[styles.labelColor]}> {renderFollowTitle()} </Text> */}
            <Text style={[styles.labelColor]}>
              {user?.is_following == true ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedPost({
              isAdminPost: user?.isAdmin,
              user: {
                id: user.id,
                profilePic: user?.profilePic,
                username: user?.username,
              },
              userId: user.id,
            });
            setOpenMore(true);
          }}
          style={styles.moreIconContainer}
        >
          <FontAwesomeIcon
            icon={faEllipsis}
            color={theme.light.colors.secondary}
          />
        </TouchableOpacity>
      </View>
      <HorizontalLine />
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={theme.light.colors.activeTabIcon}
          style={{ alignSelf: 'center', marginTop: 50 }}
          animating={loading}
        />
      ) : (
        <FlatList
          data={userr?.getAllPostsByUserId || []}
          onEndReached={getPostPagination}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterPost}
          onMomentumScrollBegin={() => setEndReachedDuringMomentum(false)}
          key={props => props.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                userType?.user == `${strings.userType.free}` &&
                item?.isVIPonly &&
                navigation.navigate(NAVIGATION.upgradeMembership)
              }
              disabled={
                !(
                  userType?.user == `${strings.userType.free}` &&
                  item?.isVIPonly
                )
              }
              key={item?.id}
              style={styles.cardContainer}
            >
              <Card>
                <CardHeader
                  fullName={user?.fullName}
                  userName={user?.username}
                  profilePic={user?.profilePic}
                  time={item.created_at}
                  isProfile
                />

                <CardBody
                  VIPKEY={!userr?.isVIP && item?.isVIPonly}
                  text={item?.postBody}
                />
                {userType?.user == `${strings.userType.free}` &&
                item?.isVIPonly &&
                !isEmpty(item?.postMediaContent) ? (
                  <View
                    style={{
                      flex: 1,
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: index == 1 ? ms(3) : 0,
                    }}
                  >
                    <Image
                      blurRadius={20}
                      style={styles.thumbnailImage}
                      source={{
                        uri:
                          item?.postMediaContent[0]?.mimetype?.split('/')[0] ==
                          'image'
                            ? item?.postMediaContent[0]?.url
                            : item?.postMediaContent[0]?.cover,
                      }}
                    />
                    <View style={styles.vipOnlyContainer}>
                      <FontAwesomeIcon
                        icon={faLock}
                        size={ms(10)}
                        style={styles.lock}
                      />
                      <Text style={styles.vipOnlyText}>
                        {strings.giveaway.vipOnly}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <MediaContainer
                    contents={item?.postMediaContent}
                    onPress={index => {
                      setIndex(index);
                      setShowImageView(true);
                      setFeedImages(item.postMediaContent);
                    }}
                    borderBottom={false}
                  />
                )}

                <CardFooter
                  postType={POST_TYPE.USER_PROFILE}
                  postIndex={index}
                  postID={item?.id}
                  postUserID={item?.userId}
                  userID={userr?.id}
                  likeCount={item?.upVote}
                  disLikeCount={item?.downVote}
                  isDownVoted={item?.has_downvoted}
                  isUpvoted={item?.has_upvoted}
                  commentCount={item.comments_aggregate?.aggregate.count || 0}
                  commentPress={() =>
                    navigation.navigate(NAVIGATION.comments, {
                      DATA: item,
                      POST_INDEX: index,
                      type: POST_TYPE.USER_PROFILE,
                    })
                  }
                  sharePress={() => console.log('share')}
                  morePress={() => {
                    setOpenMore(true);
                    setpostId(item?.id);
                    setPostUserId(item?.userId);
                    setPostTitle(item?.postTitle);
                    setPostBody(item?.postBody);
                    setPostImg(item?.postImg);
                    setIsAdminPost(item?.isAdminPost);
                    setSelectedPost({ ...item, index: index, user: user });
                  }}
                />
              </Card>
            </TouchableOpacity>
          )}
        />
      )}

      {showImageView && (
        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages || []}
          index={index}
        />
      )}
      <UserPostOptions
        open={openMore}
        postType={POST_TYPE.USER_PROFILE}
        setOpen={setOpenMore}
        selectedPostData={selectedPost}
        callBack={customReq}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txtInput: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    lineHeight: ms(22),
    textAlignVertical: 'top',
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.light.colors.infoBg,
    paddingLeft: ms(15),
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  headerImageContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  headerImage: {
    width: ms(50),
    height: ms(50),
    borderWidth: 2,
    borderRadius: 75,
  },
  cardContainer: { margin: ms(10) },
  iconContiner: {
    flexDirection: 'row',
  },
  icon: {
    margin: ms(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
    margin: ms(5),
  },
  headerText: { color: theme.light.colors.black },
  TopBackButton: {
    paddingRight: ms(5),
    paddingLeft: ms(10),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLogoContainer: {
    height: ms(30),
    width: ms(30),
    backgroundColor: theme.light.colors.primaryBgSolid,
    position: 'absolute',
    bottom: vs(-18),
    left: ms(10),
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTitleContainer: {
    marginLeft: 10,
  },
  headerDesign: {
    color: theme.light.colors.text,
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(24, 0.3),
  },
  userNameDesign: {
    paddingTop: ms(3),
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  messageLeft: {
    flexDirection: 'row',
  },
  IconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.light.colors.primaryBgLight,
    paddingHorizontal: ms(15),
    borderRadius: 10,
  },
  IconBoxDesign: {
    backgroundColor: theme.light.colors.successBgLight,
    marginRight: ms(10),
  },
  IconBoxColor: {
    color: theme.light.colors.success,
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(13, 0.3),
    paddingLeft: ms(10),
  },

  labelColor: {
    color: theme.light.colors.primary,
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(13, 0.3),
    paddingLeft: ms(10),
  },
  moreIconContainer: {
    height: ms(30),
    width: ms(30),
    backgroundColor: theme.light.colors.infoBg,
    padding: ms(10),
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    margin: ms(12),
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
  },
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    width: '85%',
    height: ms(200),
    marginRight: ms(10),
  },
  moreImage: {
    height: ms(200),
    backgroundColor: theme.light.colors.hyperlink,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  thumbnailImage: {
    maxWidth: '100%',
    width: '100%',
    height: vs(180),
    padding: ms(80),
  },
  vipOnlyContainer: {
    backgroundColor: theme.light.colors.primary,
    width: ms(80),
    height: vs(25),
    borderRadius: 4,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock: {
    color: theme.light.colors.background,
  },
  vipOnlyText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.background,
    paddingLeft: ms(10),
  },
  reportPostContainer: {
    // backgroundColor: theme.light.colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.light.colors.primary,
  },
  reportPostBackButton: {
    padding: ms(10),
    paddingBottom: ms(-10),
  },
  reportPostTopContainer: {
    paddingLeft: ms(9),
    paddingRight: ms(9),
  },
  dropDownPicker: {
    padding: ms(10),
    marginBottom: ms(10),
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderWidth: 0.5,
    borderColor: theme.light.colors.infoBg,
    paddingLeft: ms(15),
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: theme.light.colors.infoBgLight,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    padding: ms(10),
    marginTop: ms(5),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  reportPostBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(10),
  },
  reportPostButton: {
    width: ms(100),
  },
  arrowIconStyle: {
    color: theme.light.colors.infoBgLight,
  },
  playButton: {
    backgroundColor: theme.light.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
    padding: 10,
  },

  //ban container

  imageViewContainer: {
    flexDirection: 'row',
    marginTop: ms(15),
    marginBottom: ms(20),
  },
  imageDesign: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    marginRight: ms(10),
  },
  headerFullname: {
    color: theme.light.colors.black,
    fontSize: ms(18, 0.3),
  },
  yesBanButton: {
    marginTop: 10,
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
  },
  DoNotBanButton: {
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  headerImageContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  headerImage: {
    width: ms(50),
    height: ms(50),
    borderWidth: 2,
    borderRadius: 75,
  },
  freeMemberText: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 4,
    padding: 3,
    paddingHorizontal: 10,
    marginTop: 3,
    color: theme.light.colors.black,
  },
  headerColor: { color: theme.light.colors.black },

  //delete
  confirmButton: {
    margin: ms(5),
  },
  cancelButton: {
    margin: ms(5),
  },
  ConfirmationTextContainer: {
    paddingLeft: ms(15),
    paddingRight: ms(15),
    paddingBottom: ms(15),
  },
  ConfirmationText: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(16, 0.3),
    lineHeight: ms(22),
    color: theme.light.colors.text,
  },
});
