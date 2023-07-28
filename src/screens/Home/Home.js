import React, { useEffect, useState, useRef } from 'react';
import { strings } from '@/localization';
import { theme, TextStyles } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  HorizontalLine,
  Icon,
  NotificationIcon,
  SeeSchedulePost,
  ShareFeed,
  StatusNavigatorBar,
  UserPostOptions,
  VerticalLine,
} from '@/components';
import { Logo } from '@/assets';
import { faBell, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { getUser } from '@/selectors/UserSelectors';
import { navigationRef } from '@/navigation/RootNavigation';
import {
  getAllPost,
  TYPES,
  getAllPostPagination,
  getSchedulePost,
  getAllPostSuccess,
  getSchedulePostSuccess,
} from '@/actions/PostActions';
import {
  getAllPostData,
  getSchedulePostData,
  getSearchData,
} from '@/selectors/PostSelectors';
import {
  isLoadingSelector,
  successSelector,
} from '@/selectors/StatusSelectors';

import SearchPost from './SearchPost';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import queryString from 'query-string';
import { SwiperViewer } from '@/components/SwiperComponent';

import { isEmpty, last } from 'lodash';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { MemoPostcard } from '@/components/PostCard';
import { CustomSwitch } from '@/components/switch';
import PostOptions from './PostOptions';
import { POST_TYPE } from '@/constants/enums';
import {
  followers,
  getUserType,
  updateFCMToken,
  updateUserType,
} from '@/actions/UserActions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostController } from '@/controllers/PostController';
import { useBackgroundFetch } from '@/hooks';
import { ExclusivePostController } from '@/controllers/ExclusivePostController';
import {
  endConnection,
  getAvailablePurchases,
  getReceiptIOS,
  initConnection,
} from 'react-native-iap';
import { validateReceipt } from '@/actions/SubscriptionAction';
import * as RNIap from 'react-native-iap';

export function Home({ navigation }) {
  const ALLPOST = useSelector(getAllPostData);
  const SEARCH_DATA = useSelector(getSearchData);
  const flatListRef = useRef();
  const userType = useSelector(state => state.userType);
  const user = useSelector(getUser);
  const scheduledPostData = useSelector(getSchedulePostData);
  const dispatch = useDispatch();
  const [vipArea, setVipArea] = useState(strings.home.newFeed);
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [recentFilterOpen, setRecentFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(strings.sortBy.recent);
  const [follwingSwitch, setFollowingSwtich] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [editData, setEditdata] = useState({});
  const [reportListOpen, setReportListOpen] = useState(false);
  const [openBan, setOpenBan] = useState(false);
  const [vipLoader, setVipLoader] = useState(false);
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Harassment', value: 'Bullying or Harassment' },
    { label: 'Spam', value: 'Spam' },
    {
      label: 'Misleading Information or Fake News',
      value: 'Misleading Information or Fake News',
    },
  ]);

  const [isFollowing, setIsFollowing] = useState(false);
  const userFollower = user.followersDatainReducer?.data;
  const [index, setIndex] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const FILTER_DATA = [
    { title: strings.home.recent, value: strings.sortBy.recent },
    { title: strings.home.popularToday, value: strings.sortBy.today },
    { title: strings.home.popularThisWeek, value: strings.sortBy.week },
    { title: strings.home.popularThisMonth, value: strings.sortBy.month },
  ];
  // click on more
  const [postUserName, setPostUserName] = useState('');
  const [postUserFollowed, setPostUserFollowed] = useState(false);
  const [postIndex, setPostIndex] = useState(0);
  const [reportImage, setreportImage] = useState(null);

  //Search Post
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchText, setsearchText] = useState('');

  // for delete
  const [isBanned, setIsBanned] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(getUserType(user?.id))
  //   //   return () => {
  //   //  };
  //   }, [])
  // );
  useEffect(() => {
    initIAP().then(() => {
      checkForSubscriptionUpdates();
    });

    return () => {
      clearIAPListeners();
    };
  }, []);
  const initIAP = async () => {
    try {
      await initConnection();
    } catch (error) {}
  };

  const checkForSubscriptionUpdates = async () => {
    try {
      setVipLoader(true)
      const availablePurchases = await getAvailablePurchases();
      if (availablePurchases?.length > 0) {
        availablePurchases.sort(
          (a, b) => parseInt(b.transactionDate) - parseInt(a.transactionDate)
        );
        const latestPurchase = availablePurchases[0];
        // console.log("LATESTSTSTS",latestPurchase);

        if (latestPurchase?.transactionReceipt) {
           await verifyReceipt(latestPurchase.transactionReceipt);
        }
      } else {
         var receipt = '';
         await verifyReceipt(receipt);
      }
      setVipLoader(false)
    } catch (error) {
      setVipLoader(false)
      console.log('Error during subscription update check:', error);
    }
  };

  const clearIAPListeners = async () => {
    await endConnection();
  };
  async function verifyReceipt(receipt) {
    const data = {
      receipt: receipt,
      loggedInUserId: user?.id,
    };
    dispatch(validateReceipt(data, navigation, NAVIGATION.home));
  }
 
  useEffect(() => {

    dispatch(getSchedulePost());
    dispatch(
      getAllPost(
        user?.id,
        sortBy,
        follwingSwitch,
        vipArea == `${strings.home.newFeed}` ? false : true,
        ''
      )
    );
  }, [sortBy, follwingSwitch, vipArea, userType]);

  const customReq = () => {
    ExclusivePostController.getAllSchedulePost().then(res => {
      dispatch(getSchedulePostSuccess(res));
    });
    PostController.getAllPost(
      user?.id,
      sortBy,
      follwingSwitch,
      vipArea == `${strings.home.newFeed}` ? false : true,
      ''
    ).then(res => {
      dispatch(getAllPostSuccess(res));
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    saveFCMToken();
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);

    return () => {
      linkingListener();
    };
  }, []);

  const saveFCMToken = async () => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('FCM__TOsssEN', fcmtoken);
    const DATA = {
      loggedInUserId: user?.id,
      fcm_token: fcmtoken,
      topic: 'general',
      userId: user?.id,
    };
    dispatch(updateFCMToken(DATA));
  };

  const handleDynamicLink = link => {
    if (!!link?.url) {
      const params = queryString.parse(link.url.split('?')[1]);
      const postId = params.postId;
      const postIndex = params.postIndex;
      setTimeout(() => {
        if (postId && postIndex !== undefined) {
          navigationRef.navigate(NAVIGATION.singlePost, {
            postId: postId,
            postIndex: postIndex,
          });
        }
      }, 500);
    }
  };

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_POST, TYPES.SEARCH_ALL_POST], state)
  );
  const isLoadingMore = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_POST_PAGINATION], state)
  );

  const onViewImageVideo = (data, index) => {
    setIndex(index);
    setShowImageView(true);
    setFeedImages(data.postMediaContent);
  };

  const onLoadMorePost = () => {
    if (isLoadingMore || !isScrolling) return;

    const page = last(ALLPOST).created_at;

    dispatch(
      getAllPostPagination(
        user?.id,
        sortBy,
        follwingSwitch,
        vipArea == `${strings.home.newFeed}` ? false : true,
        page
      )
    );
  };

  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    customReq();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.userPic}>
            <Logo />
          </View>
          <View>
            <Text style={styles.nameTxt}> {strings.home.newFeed}</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.recent}
                onPress={() => setRecentFilterOpen(true)}
              >
                <Text style={styles.recentTxt}> {sortBy} </Text>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={ms(14)}
                  color={theme.light.colors.secondary}
                />
              </TouchableOpacity>
              <VerticalLine />
              <View style={styles.recent}>
                <Text style={styles.recentTxt}>
                  {' '}
                  {strings.home.followingOnly}{' '}
                </Text>
                {/* <AppSwitch
                  value={follwingSwitch}
                  onChange={() => setFollowingSwtich(!follwingSwitch)}
                /> */}
                <CustomSwitch
                  value={follwingSwitch}
                  onChange={() => setFollowingSwtich(!follwingSwitch)}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.right]}>
          <Icon
            icon={faSearch}
            size={ms(22)}
            onPress={() => navigation.navigate(NAVIGATION.search)}
            style={styles.searchIcon}
          />
          <NotificationIcon />
        </View>
      </View>
      <StatusNavigatorBar
        title1={strings.home.newFeed}
        title2={strings.home.vipArea}
        key1={strings.home.newFeed}
        key2={strings.home.vipArea}
        status={vipArea}
        setStatus={status => {
          if (
            status === strings.home.vipArea &&
            userType?.user == `${strings.userType.free}`
          ) {
            navigation.navigate(NAVIGATION.upgradeMembership);
            return;
          }

          setVipArea(status);
        }}
        showLock={userType?.user == `${strings.userType.free}` ? true : false}
      />
      <HorizontalLine />
      <View style={styles.feedContainer}>
        {isLoading ? (
          <ActivityIndicator
            animating={isLoading}
            color={theme.light.colors.activeTabIcon}
            size={'large'}
            style={styles.loaderStyle}
          />
        ) : (
          <FlatList
            ref={flatListRef}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            ListHeaderComponent={
              <View>
                <ShareFeed
                  onPress={() =>
                    navigation.navigate(NAVIGATION.post, {
                      callBack: customReq,
                    })
                  }
                />
                {userType.user == `${strings.userType.admin}` && (
                  <SeeSchedulePost
                    title={strings.home.seeSchedulePost}
                    navigation={navigation}
                    count={scheduledPostData ? scheduledPostData.length : 0}
                    // path={SeeSchedulePost}
                  />
                )}
              </View>
            }
            initialNumToRender={5}
            ListFooterComponent={renderFooterPost}
            onEndReached={onLoadMorePost}
            // onEndReachedThreshold={0.5}

            extraData={searchEnabled ? SEARCH_DATA : ALLPOST}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              setIsScrolling(true);
            }}
            onMomentumScrollEnd={() => {
              setIsScrolling(false);
            }}
            data={ALLPOST}
            keyExtractor={(item, index) => `${item.id}${index}`}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item, index }) => (
              <MemoPostcard
                item={item}
                userType={userType}
                index={index}
                onViewImageVideo={onViewImageVideo}
                onMorePress={() => {
                  setSelectedPost({ ...item, index: index });
                  setOpen(true);
                  setIsFollowing(
                    !isEmpty(
                      userFollower?.following_List?.filter(
                        el => el.followingUserId === item?.userId
                      )
                    )
                  );
                  setIsBanned(
                    !isEmpty(
                      user?.getAllBannedUsersKey?.data.filter(
                        x => x?.userId === item?.userId
                      )
                    )
                  );
                }}
                vipArea={vipArea}
              />
            )}
          />
        )}
      </View>

      {/* post filter modal */}
      {recentFilterOpen && (
        <Modal
          visible={recentFilterOpen}
          transparent={true}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setRecentFilterOpen(false)}>
            <View style={styles.sortModalContainer}>
              <View style={styles.sortByContainer}>
                <View>
                  <Text style={styles.sortByTxt}>
                    {' '}
                    {strings.home.sortByFeed}{' '}
                  </Text>
                </View>
                {FILTER_DATA.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentList}
                    onPress={() => {
                      setSortBy(item.value);
                      setRecentFilterOpen(false);
                    }}
                  >
                    {sortBy == item.value ? CheckIcon : <Text> {'   '}</Text>}
                    <Text style={styles.recentListTxt}> {item.title} </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/*  image view modal */}
      {showImageView && (
        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
          index={index}
        />
      )}
      {/*  Slide up for follow, edit , review  */}

      <UserPostOptions
        selectedPostData={selectedPost}
        open={open}
        setOpen={setOpen}
        selectetFeedConfigData={{
          sortBy,
          follwingSwitch,
          vipArea: vipArea == `${strings.home.newFeed}` ? false : true,
        }}
      />

      {searchEnabled && (
        <SearchPost
          {...{
            setSearchEnabled,
            dispatch,
            navigation,
            setsearchText,
            searchText,
            user,
            styles,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const CheckIcon = (
  <FontAwesomeIcon icon={faCheck} color={theme.light.colors.primary} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  Play: {
    position: 'absolute',
    color: theme.light.colors.background,
    marginLeft: ms(8),
    marginTop: ms(8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(8),
  },
  searchheaderText: { color: theme.light.colors.black },
  searchContainer: {
    position: 'absolute',
    height: ms(140),
    paddingTop: ms(10),
    top: Platform.OS === 'android' ? ms(10) : ms(50),
    backgroundColor: theme.light.colors.white,
    width: '100%',
  },
  TopBackButton: {
    paddingRight: ms(5),
    paddingLeft: ms(10),
  },
  searchBox: {
    marginTop: vs(-10),
    margin: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBoxTextFirld: {
    paddingRight: ms(45),
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
  },
  searchButton: {
    marginLeft: ms(-30),
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: ms(10),
  },
  searchIcon: { marginRight: ms(20), color: theme.light.colors.black },
  // bellIcon: { marginRight: ms(10) },
  cardContainer: {
    margin: ms(8),
    borderRadius: 10,
  },
  nameTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
    },
  ],

  recentTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(12, 0.3),
    color: theme.light.colors.secondary,
  },
  reportTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
    padding: 10,
  },
  userPic: {
    width: ms(61),
    height: ms(66),
    borderRadius: 100,
    marginLeft: ms(10),
    marginRight: ms(10),
    marginTop: ms(10),
  },
  filterContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: ms(25),
    paddingLeft: ms(3),
  },
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  sortModalContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight, //
  },
  sortByContainer: {
    backgroundColor: theme.light.colors.white,
    padding: ms(20),
    marginTop: vs(65),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    borderRadius: 12, //
  },
  sortByTxt: {
    fontFamily: FontFamily.Recoleta_semibold,
    fontSize: ms(16, 0.3),
    color: theme.light.colors.secondary,
  },
  recentList: {
    padding: ms(8), //5
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentListTxt: {
    marginLeft: ms(10),
    fontFamily: FontFamily.Recoleta_semibold,
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
  },
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
  dropListTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(16, 0.3),
  },

  // single image viwer
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  extraImage: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(24, 0.3),
    width: '100%',
    padding: 35,
  },
  image: {
    flex: 1,
    width: '85%',
    height: ms(200),
    marginRight: ms(10),
  },
  moreImage: {
    height: ms(200),
    // backgroundColor: theme.light.colors.hyperlink,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  playButtonBg: {
    height: ms(200),
    backgroundColor: theme.light.colors.hyperlink,
    // opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },

  // sponsored post

  sponsordContainer: {
    marginTop: ms(10),
  },
  bgImage: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  floaterContainer: {
    position: 'absolute',
    backgroundColor: theme.light.colors.black,
    padding: ms(5),
    borderRadius: 10,
    margin: ms(10),
    bottom: ms(0),
  },
  floaterContainerSponsord: {
    right: ms(8),

    position: 'absolute',
    backgroundColor: theme.light.colors.black,
    padding: ms(5),
    borderRadius: 10,
    margin: ms(10),
  },
  floaterTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.white,
  },

  // reportPostContainer

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

  // delet confirm

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
  loaderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: ms(50),
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    //  marginBottom: 10
  },
  vipOnlyContainer: {
    backgroundColor: theme.light.colors.primary,
    width: ms(100),
    height: vs(25),
    borderRadius: 6,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(10),
    top: '42%',
    left: '38%',

    // marginLeft: '43%',
    // marginTop: '22%',
  },
  vipOnlyText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.background,
    paddingLeft: ms(10),
  },
  lock: {
    color: theme.light.colors.background,
  },
  thumbnailContainer: {
    width: '100%',
    height: vs(180),
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
});
