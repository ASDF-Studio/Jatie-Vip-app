import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  HorizontalLine,
  ModalDown,
  ModalList,
  HeaderTab,
  Icon,
  TopBackButton,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  PopUp,
  Button,
  CustomLoader,
  AppImageViewer,
  MediaContainer,
  UserPostOptions,
} from '@/components';
import { moderateScale, ms, vs } from 'react-native-size-matters';
import {
  faCrown,
  faMessage,
  faUserPlus,
  faEllipsis,
  faFlag,
  faXmark,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { strings } from '@/localization';
import { Data, demo, User } from './ProfileData/manageReportOnProfileData';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  bannedUserById,
  getAllPostsByUserid,
  getUserProfileByUserId,
  TYPES,
  unBannedUserById,
} from '@/actions/UserActions';
import { getUser } from '@/selectors/UserSelectors';
import { UserController } from '@/controllers';
import { UserData } from './ProfileData/manageReportOnMessageData';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { SwiperViewer } from '@/components/SwiperComponent';
import { POST_TYPE } from '@/constants/enums';
import { NAVIGATION } from '@/constants';
import { useIsFocused } from '@react-navigation/native';
import { followUser } from '@/actions/PostActions';
import { unFollowUser } from '@/actions/PostActions';
import PostOptions from './PostOptions';

export default function ManageReportOnMessage({ navigation, route }) {
  let counter = 1;

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_USER_PROFILE_BY_USER_ID], state)
  );
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [openMore, setOpenMore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openBan, setOpenBan] = useState(false);
  const [user, setUser] = useState(null);
  const [userPosts, setuserPosts] = useState([]);
  const [postIndex, setPostIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState();
  const { item } = route.params;
  const [loading, setLoading] = useState(false);

  const { reportedByUserDetails } = route.params;
  const dispatch = useDispatch();

  const getUserProfile = useSelector(getUser);

  //console.log('userDataaaaaaaaa', user)

  const focus = useIsFocused();
  const userr = useSelector(getUser);

  useEffect(() => {
    dispatch(getUserProfileByUserId(item, userr.id));
    setTimeout(() => {
      getUserPostById(item);
    }, 100);
  }, [focus]);

  useEffect(() => {
    setUser(getUserProfile?.getUserByUserId);
  }, [getUserProfile, focus]);

  const getUserPostById = async id => {
    setLoading(true);
    await getAllPostsByUserid(id, userr.id)(dispatch);
    setLoading(false);
  };

  const onFollow = () => {
    if (user?.is_following == true) {
      dispatch(unFollowUser(userr?.id, item));

      //setOpen(false)
      setTimeout(() => {
        dispatch(getUserProfileByUserId(item, userr.id));
      }, 100);
    } else {
      dispatch(followUser(userr?.id, item));
      // setOpen(false)
      console.log('follower log', userr?.id, item);

      setTimeout(() => {
        dispatch(getUserProfileByUserId(item, userr.id));
      }, 100);
    }
  };

  const onViewImageVideo = data => {
    setShowImageView(true);
    setFeedImages(data.postMediaContent);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomLoader open={isLoading} /> */}
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}{' '}
      </Text>
      <HorizontalLine color={theme.light.colors.infoBgLight} paddingTop={10} />
      <CardHeader
        fullName={reportedByUserDetails.userByReportedby.fullName}
        userName={reportedByUserDetails.userByReportedby.username}
        profilePic={reportedByUserDetails.userByReportedby.profilePic}
        time={reportedByUserDetails.created_at}
        userId={reportedByUserDetails.userByReportedby.id}
      />
      <View style={styles.activity}>
        <View style={styles.textContainer}>
          <Text style={styles.statsTxt}> {strings.profile.reported} </Text>
          <Text style={styles.reactOnTxt}>{`this Profile`}</Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTxt}>
            {strings.profile.reason}
            {reportedByUserDetails.reportTitle}{' '}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.reportContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerImageContainer}>
              <Image
                style={styles.headerImage}
                source={{
                  uri: user?.profilePic || null,
                }}
              />
              <View style={styles.profileLogoContainer}>
                <FontAwesomeIcon
                  icon={faCrown}
                  color={theme.light.colors.primary}
                  size={ms(20)}
                />
              </View>
              <View>
                <Text style={styles.fullNameTxt}>{user?.fullName}</Text>
                <Text style={styles.userNameTxt}>{user?.username} </Text>
              </View>
            </View>
            <View style={styles.iconContiner}>
              <Icon icon={faSearch} size={ms(20)} style={styles.searchIcon} />
              <Icon icon={faBell} size={ms(20)} style={styles.bellIcon} />
            </View>
          </View>
          <HeaderTab
            onPress1={() =>
              navigation.navigate(NAVIGATION.followers, {
                id: item,
                screenName: 'userProfile',
              })
            }
            title1={strings.profile.followers}
            count1={user?.followerListsByFollowinguserid?.length}
            title2={strings.profile.following}
            count2={user?.follower_lists?.length}
            onPress2={() =>
              navigation.navigate(NAVIGATION.following, {
                id: item,
                screenName: 'userProfile',
              })
            }
          />
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={10}
            paddingBottom={5}
          />

          <View style={styles.messageHeader}>
            <View style={styles.messageLeft}>
              <TouchableOpacity style={[styles.IconBox, styles.IconBoxColor]}>
                <FontAwesomeIcon
                  icon={faMessage}
                  size={ms(13)}
                  color={theme.light.colors.success}
                />
                <Text style={styles.messageBtnTxt}>
                  {strings.profile.message}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onFollow}
                style={[styles.IconBox, styles.IconBoxDesign]}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  size={ms(13)}
                  color={theme.light.colors.primary}
                />
                <Text style={styles.followersBtnTxt}>
                  {user?.is_following == true
                    ? strings.operations.unFollow
                    : strings.operations.follow}
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
              <FontAwesomeIcon icon={faEllipsis} />
            </TouchableOpacity>
          </View>
          <HorizontalLine />
        </View>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            color={theme.light.colors.primary}
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <FlatList
            data={userr?.getAllPostsByUserId || []}
            key={props => props.id}
            renderItem={({ item, index }) => (
              <View style={styles.cardContainer}>
                <Card>
                  <CardHeader
                    fullName={user?.fullName}
                    userName={user?.username}
                    profilePic={user?.profilePic}
                    time={item.created_at}
                  />
                  <CardBody text={item?.postBody} />
                  <MediaContainer
                    contents={item?.postMediaContent}
                    onPress={() => {
                      onViewImageVideo(item);
                    }}
                    borderBottom={false}
                  />

                  <CardFooter
                    likeCount={item?.upVote}
                    disLikeCount={item?.downVote}
                    postID={item.id}
                    userID={user?.id}
                    postData={item}
                    isDownVoted={item?.has_downvoted}
                    isUpvoted={item?.has_upvoted}
                    postIndex={index}
                    commentCount={
                      item?.comments_aggregate?.aggregate?.count ?? 0
                    }
                    commentPress={() =>
                      navigation.navigate(NAVIGATION.comments, {
                        DATA: item,
                        POST_INDEX: index,
                      })
                    }
                    postType={POST_TYPE.USER_PROFILE}
                    morePress={() => {
                      setPostIndex(index);
                      setSelectedPost({
                        ...item,
                        index: index,
                        user: user,
                      });
                      setOpenMore(true);
                    }}
                  />
                </Card>
              </View>
            )}
          />
        )}
      </View>

      <UserPostOptions
        selectedPostData={selectedPost}
        open={openMore}
        setOpen={setOpenMore}
        callBack={() => {
          getUserPostById(user.id);
        }}
        postType={POST_TYPE.USER_PROFILE}
      />

      {/*  image view modal */}
      {showImageView && (
        <AppImageViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerText: {
    color: theme.light.colors.black,
    paddingLeft: ms(9),
  },
  TopBackButton: { padding: ms(10) },
  activity: {
    flexDirection: 'row',
    padding: ms(9),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: { margin: 10 },
  statsTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    color: theme.light.colors.black,
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    marginLeft: ms(5),
  },
  reasonContainer: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 4,
    padding: ms(5),
    paddingHorizontal: 10,
    marginLeft: ms(10),
  },
  reasonTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(11, 0.3),
    color: theme.light.colors.black,
  },
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    // padding : ms(8)
  },
  reportContainer: {
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
  freeMemberText: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 4,
    padding: 3,
    paddingHorizontal: 10,
    marginTop: 3,
    color: theme.light.colors.black,
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
  fullNameTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.text,
      fontSize: ms(24),
      marginLeft: moderateScale(10),
    },
  ],
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
    // position: 'absolute',
    bottom: ms(5),
    marginLeft: moderateScale(10),
  },
  iconContiner: {
    flexDirection: 'row',
    marginTop: ms(8),
  },
  searchIcon: {
    marginRight: ms(12),
  },
  bellIcon: {
    // marginRight : ms(20),
  },
  profileLogoContainer: {
    height: ms(30),
    width: ms(30),
    backgroundColor: theme.light.colors.primaryBg,
    opacity: 1,
    position: 'absolute',
    bottom: vs(-10),
    left: ms(10),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerColor: { color: theme.light.colors.black },
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
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  messageLeft: {
    flexDirection: 'row',
  },
  messageRight: {},
  messageBtnTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(13),
    color: theme.light.colors.success,
    paddingLeft: ms(5),
  },
  followersBtnTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(13),
    color: theme.light.colors.primary,
    paddingLeft: ms(5),
  },
  IconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(5),
    width: ms(100),
    borderRadius: 10,
  },
  IconBoxColor: { backgroundColor: theme.light.colors.successBgLight },
  IconBoxDesign: { marginLeft: ms(10) },
  moreIconContainer: {
    backgroundColor: theme.light.colors.infoBg,
    padding: ms(10),
    borderRadius: 100,
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
    marginRight: ms(-5),
  },
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: ms(-5),
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
