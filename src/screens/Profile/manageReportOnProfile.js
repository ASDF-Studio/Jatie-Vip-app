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
  const { item } = route.params;
  //console.log("item", item)
  const { reportedByUserDetails } = route.params;
  // console.log('data of card ', JSON.stringify(reportedByUserDetails))
  const dispatch = useDispatch();

  const getUserProfile = useSelector(getUser);

  //console.log('userDataaaaaaaaa', user)

  const focus = useIsFocused();
  //console.log('userPosts', user)
  const userr = useSelector(getUser);
  useEffect(() => {
    dispatch(getUserProfileByUserId(item, userr.id));
    console.log('use eff');
    setTimeout(() => {
      getUserPostById(item);
    }, 100);
  }, [focus]);
  useEffect(() => {
    setUser(getUserProfile?.getUserByUserId);
  }, [getUserProfile, focus]);

  const getUserPostById = async id => {
    const data = await UserController.postByUserId(id);
    if (data) {
      //setLoader(false);
      setuserPosts(data.data);
    }
  };

  const banUnBanHandlePress = () => {
    if (user?.isBanned == true) {
      dispatch(unBannedUserById(item));
      setOpenBan(false);
      setTimeout(() => {
        dispatch(getUserProfileByUserId(item));
      }, 100);
    } else {
      dispatch(bannedUserById(item));
      setOpenBan(false);
      setTimeout(() => {
        dispatch(getUserProfileByUserId(item));
      }, 100);
    }
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
            // onPress1 = {()=>Alert.alert('press 1')}
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
                  {' '}
                  {strings.profile.message}{' '}
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
              onPress={() => setOpenMore(true)}
              style={styles.moreIconContainer}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </TouchableOpacity>
          </View>
          <HorizontalLine />
        </View>
        <FlatList
          data={userPosts || []}
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

                {item?.postImg?.length <= 2 ? (
                  <View style={styles.imageContainer}>
                    {item?.postImg?.map(
                      data => (
                        (counter = counter + 1),
                        (
                          <TouchableOpacity
                            key={counter}
                            style={styles.touchContainer}
                            onPress={() => {
                              setShowImageView(true),
                                setFeedImages(item?.postImg);
                            }}
                          >
                            <Image
                              source={{
                                uri: data,
                              }}
                              style={styles.image}
                            />
                          </TouchableOpacity>
                        )
                      )
                    )}
                  </View>
                ) : item?.postImg?.length > 2 ? (
                  ((counter = 1),
                  (
                    <View style={styles.imageContainer}>
                      {item?.postImg?.map(data =>
                        counter == 1
                          ? ((counter = counter + 1),
                            (
                              <TouchableOpacity
                                key={counter}
                                style={styles.touchContainer}
                                onPress={() => {
                                  setShowImageView(true),
                                    setFeedImages(item?.postImg);
                                  // console.log(feedImages)
                                }}
                              >
                                <Image
                                  source={{
                                    uri: data,
                                  }}
                                  key={counter}
                                  style={styles.image}
                                />
                              </TouchableOpacity>
                            ))
                          : counter == 2
                          ? ((counter = counter + 1),
                            (
                              <TouchableOpacity
                                key={counter}
                                style={styles.touchContainer}
                                onPress={() => {
                                  setShowImageView(true),
                                    setFeedImages(item?.postImg);
                                }}
                              >
                                <ImageBackground
                                  source={{
                                    uri: data,
                                  }}
                                  key={counter}
                                  style={[styles.image, styles.moreImage]}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      setShowImageView(true),
                                        setFeedImages(item?.postImg);
                                    }}
                                  >
                                    <Text style={styles.extraImage}>
                                      {strings.message.plus}
                                      {item?.postImg?.length - 1}
                                    </Text>
                                  </TouchableOpacity>
                                </ImageBackground>
                              </TouchableOpacity>
                            ))
                          : null
                      )}
                    </View>
                  ))
                ) : null}
                <CardFooter
                  likeCount={item?.upVote}
                  disLikeCount={item?.downVote}
                  postID={user.id}
                  userID={userr?.id}
                  postType={POST_TYPE.REGULAR}
                  postData={item}
                  postIndex={index}
                  commentCount={item?.comments_aggregate?.aggregate?.count ?? 0}
                  commentPress={() =>
                    navigation.navigate(NAVIGATION.comments, {
                      DATA: item,
                      POST_INDEX: index,
                    })
                  }
                  // sharePress = {()=> Alert.alert("share")}
                  morePress={() => {
                    setPostIndex(index);
                    // setIsAdminPost(item?.isAdminPost),
                    //setPostUserName(item?.user?.username)
                    //   setOpen(true);
                    // setPostUserId(item?.userId);
                    // setpostId(item?.id);
                    //setPostTitle(item?.postTitle)
                    //   setPostBody(item?.postBody);
                    //  setPostImg(item?.postImg);
                  }}
                />
              </Card>
            </View>
          )}
        />
        {openMore && (
          <ModalDown open={openMore} setOpen={setOpenMore}>
            <ModalList
              onPress={onFollow}
              title={
                user?.is_following == true
                  ? strings.operations.unFollow + ' @' + user?.username
                  : strings.operations.follow + ' @' + user?.username
              }
              icon={faUserPlus}
              iconColor={theme.light.colors.primary}
              iconBg={theme.light.colors.primaryBgLight}
            />
            <ModalList
              title={strings.profile.sendPrivateMessage}
              icon={faMessage}
              iconColor={theme.light.colors.success}
              iconBg={theme.light.colors.successBgLight}
              // onPress = {()=> Alert.alert("working")}
            />
            <HorizontalLine
              color={theme.light.colors.infoBgLight}
              paddingTop={10}
            />
            <ModalList
              title={strings.operations.remove}
              icon={faTrash}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
            />
            {/* <ModalList
              title={strings.operations.block + ' @' + user?.username}
              icon={faXmark}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
            /> */}
            <ModalList
              title={
                user?.isBanned == true
                  ? strings.operations.unBan + ' @' + user?.username
                  : strings.operations.ban + ' @' + user?.username
              }
              icon={faFlag}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
              onPress={() => {
                setOpenBan(true), setOpenMore(false);
              }}
            />
          </ModalDown>
        )}
        {openEdit && (
          <ModalDown open={openEdit} setOpen={setOpenEdit}>
            <ModalList
              title={strings.operations.edit}
              icon={faPen}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.info}
            />
            <ModalList
              title={strings.operations.remove}
              icon={faTrash}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.secondary}
            />
          </ModalDown>
        )}

        <PopUp open={openBan} setOpen={setOpenBan}>
          <View>
            <Text style={[TextStyles.header, styles.headerColor]}>
              {user?.isBanned
                ? strings.profile.areYouSureWantToUnBan
                : strings.profile.areYouSureWantToBan}
            </Text>
            <View style={styles.imageViewContainer}>
              <Image
                source={{
                  uri: user?.profilePic,
                }}
                style={styles.imageDesign}
              />
              <View>
                <Text style={[TextStyles.header, styles.headerFullname]}>
                  {user?.fullName}
                </Text>
                <Text> {`@${user?.username}`.toLowerCase()}</Text>
                <Text style={styles.freeMemberText}>
                  {strings.profile.freeMember}
                </Text>
              </View>
            </View>
            <View>
              <Button
                onPress={banUnBanHandlePress}
                title={
                  user?.isBanned
                    ? strings.profile.yeaUnBan
                    : strings.profile.yesBan
                }
                style={styles.yesBanButton}
                textStyle={{
                  color: theme.light.colors.primary,
                }}
              />
              <Button
                onPress={() => setOpenBan(false)}
                title={
                  user?.isBanned
                    ? strings.profile.DoNotUnBan
                    : strings.profile.DoNotBan
                }
                style={styles.DoNotBanButton}
              />
            </View>
          </View>
        </PopUp>
      </View>

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
});
