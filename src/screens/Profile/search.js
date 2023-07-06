import React, { useState } from 'react';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faFlag,
  faImage,
  faMessage,
  faPen,
  faTrash,
  faUserPlus,
  faX,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  HorizontalLine,
  Icon,
  TextField,
  TopBackButton,
  PostCard,
  UserCard,
  Button,
  ReportOnPostModal,
  PopUp,
  Toast,
  ModalDown,
  ModalList,
  MemoPostCard,
  UserPostOptions,
} from '@/components';
import { moderateScale, ms, vs } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSadSweat, faSearch } from '@fortawesome/pro-regular-svg-icons';
import {
  TYPES,
  bannedUserById,
  bannedUsers,
  followers,
  searchUser,
  searchUserSuccess,
  unBannedUserById,
} from '@/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import {
  isLoadingSelector,
  successSelector,
} from '@/selectors/StatusSelectors';
import { debounce, isEmpty, size } from 'lodash';
import { useEffect, useMemo } from 'react';
import { getSearchData } from '@/selectors/PostSelectors';
import {
  blockUser,
  followUser,
  reportPost,
  searchAllPost,
  searchAllPostSuccess,
  unFollowUser,
} from '@/actions/PostActions';
import { SwiperViewer } from '@/components/SwiperComponent';
import { navigationRef } from '@/navigation/RootNavigation';
import DropDownPicker from 'react-native-dropdown-picker';
import { TYPES as postTypes } from '@/actions/PostActions';
import { createRef } from 'react';
import { useRef } from 'react';
import { globalReset } from '@/actions/GlobalActions';
import { POST_TYPE } from '@/constants/enums';

export default function Search({ navigation }) {
  //Use State hooks
  const [searchListOpen, setSearchListOpen] = useState(false);
  const [searchuservalue, setsearchuservalue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageFeed, setImageFeed] = useState([]);
  const [seeMoreUser, setShowSeeMoreUser] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);

  const [isBanned, setIsBanned] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const inputRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userType = useSelector(state => state.userType);
  const SEARCH_DATA = useSelector(getSearchData);
  const searchUserData = user.searchUserKey;
  const isShowReportToast = useSelector(state =>
    successSelector([TYPES.REPORT_POST], state)
  );
  const userFollower = user.followersDatainReducer?.data;
  const [index, setIndex] = useState();

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_USER], state)
  );
  const isPostLoading = useSelector(state =>
    isLoadingSelector([postTypes.SEARCH_ALL_POST], state)
  );

  const debouncedSearch = useMemo(() => {
    return debounce(value => {
      setsearchuservalue(value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      dispatch(searchAllPostSuccess([]));
      dispatch(searchUserSuccess([]));
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(searchuservalue)) {
      dispatch(searchUser(searchuservalue, user?.id));
      dispatch(searchAllPost(searchuservalue, user?.id));
      setShowSeeMoreUser(false);
    } else {
      dispatch(searchAllPostSuccess([]));
      dispatch(searchUserSuccess([]));
    }
  }, [searchuservalue, user?.id]);

  const SearchHandlePress = () => {
    // setLoading(true)
    // {
    //   searchuservalue.length >= 1
    //     ? dispatch(searchUser(searchuservalue))
    //     : null;
    // }
    // setLoading(false)
  };

  // const filteredUser = searchUserData?.data?.filter(user => !user.isVIP) || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomLoader open={loading} /> */}
      <View style={styles.header}>
        <View style={styles.left}>
          <TopBackButton
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.TopBackButton}
          />
          <Text style={[TextStyles.header, styles.headerText]}>
            {' '}
            {strings.exclusive.search}{' '}
          </Text>
        </View>
        <View style={styles.right}>
          <Icon
            onPress={SearchHandlePress}
            icon={faSearch}
            color={theme.light.colors.primary}
            size={ms(20)}
            style={styles.searchButton}
          />
          <Icon
            icon={faBell}
            color={theme.light.colors.black}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
            style={styles.bellIcon}
          />
        </View>
      </View>
      <View style={styles.searchBox}>
        <TextField
          ref={inputRef}
          onChangeText={debouncedSearch}
          style={styles.searchBoxTextFirld}
          placeholder={strings.exclusive.searchPlaceHolder}
          onFocus={() => setSearchListOpen(true)}
        />
        <View style={styles.moreIcon}>
          <Icon
            icon={faXmark}
            onPress={() => {
              setsearchuservalue('');
              inputRef.current.clear();
            }}
          />
        </View>
      </View>
      <HorizontalLine />
      {!searchListOpen && (
        <View style={styles.loadingContainer}>
          <FontAwesomeIcon
            icon={faSearch}
            size={30}
            color={theme.light.colors.primary}
          />
          <Text style={styles.searchTxt}>
            {strings.exclusive.searchForUsersAndPosts}
          </Text>
        </View>
      )}
      {searchListOpen &&
        isEmpty(SEARCH_DATA) &&
        isEmpty(searchUserData.data) && (
          <View style={styles.loadingContainer}>
            {isPostLoading ? (
              <ActivityIndicator
                animating={isPostLoading}
                color={theme.light.colors.activeTabIcon}
                size={'large'}
              />
            ) : (
              <View style={styles.searchBody}>
                <FontAwesomeIcon
                  icon={faFaceSadSweat}
                  size={44}
                  color={theme.light.colors.primary}
                />
                <Text style={styles.searchTxt}>
                  {strings.exclusive.sorryNoResultFound}
                </Text>
              </View>
            )}
          </View>
        )}
      {searchListOpen &&
        (!isEmpty(SEARCH_DATA) || !isEmpty(searchUserData.data)) && (
          <View style={styles.contentContainerStyle}>
            <FlatList
              data={SEARCH_DATA}
              ListHeaderComponent={() =>
                // isLoading ? (
                //   <ActivityIndicator
                //     animating={isLoading}
                //     color={theme.light.colors.activeTabIcon}
                //     size={'large'}
                //     style={styles.loaderStyle}
                //   />
                // ) :
                !isEmpty(searchUserData?.data) ? (
                  <View
                    style={{
                      display: 'flex',
                    }}
                  >
                    {searchUserData?.data
                      .slice(0, seeMoreUser ? size(searchUserData.data) : 3)
                      .map((item, index) => {
                        return <UserCard item={item} key={index} />;
                      })}
                    {!seeMoreUser && size(searchUserData.data) > 3 && (
                      <Button
                        style={styles.moreButton}
                        textStyle={styles.moreButtonText}
                        title={strings.exclusive.seeMoreusers}
                        onPress={() => setShowSeeMoreUser(true)}
                      />
                    )}
                    <HorizontalLine
                      color={theme.light.colors.primaryBgDark}
                      paddingTop={15}
                      opacity={0.2}
                    />
                  </View>
                ) : null
              }
              key={props => props.id}
              initialNumToRender={10}
              ListFooterComponent={() => (
                <View
                  style={{
                    height: ms(100),
                  }}
                />
              )}
              renderItem={({ item, index }) => (
                <MemoPostCard
                  onImagePress={index => {
                    setImageFeed(item.postMediaContent);
                    setShowImageView(true);
                    setIndex(index);
                  }}
                  onMorePress={() => {
                    setSelectedPost({ ...item, index: index });
                    setShowPostOptions(true);
                    setIsBanned(
                      !isEmpty(
                        user?.getAllBannedUsersKey?.data.filter(
                          x => x?.userId === item?.userId
                        )
                      )
                    );
                    // setisBlocked()
                    setIsFollowing(
                      !isEmpty(
                        userFollower?.following_List?.filter(
                          el => el.followingUserId === item?.userId
                        )
                      )
                    );
                  }}
                  key={index}
                  index={index}
                  item={item}
                />
              )}
            />
          </View>
        )}
      {showImageView && (
        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={imageFeed}
          index={index}
        />
      )}
      <UserPostOptions
        open={showPostOptions}
        setOpen={setShowPostOptions}
        selectedPostData={selectedPost}
        postType={POST_TYPE.SEARCH}
        callBack={() => {
          dispatch(searchAllPost(searchuservalue, user?.id));
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  searchBoxTextFirld: {
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  headerText: {
    marginLeft: ms(10),
    color: theme.light.colors.black,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginLeft: ms(10),
  },
  moreButton: {
    backgroundColor: theme.light.colors.infoBgLight,
    marginTop: ms(15),
    marginBottom: ms(5),
    width: ms(120),
    paddingVertical: ms(5),
    borderRadius: 8,
    alignSelf: 'center',
  },
  moreButtonText: {
    color: theme.light.colors.info,
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontWeight: '700',
    fontSize: ms(11, 0.3),
  },
  searchButton: {
    marginRight: ms(15),
  },
  switchContainer: {
    position: 'absolute',
    top: ms(45),
    left: ms(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    marginTop: vs(-20),
    marginBottom: vs(-10),
    margin: ms(10),
  },
  moreIcon: {
    position: 'absolute',
    right: ms(10),
    top: ms(30),
  },
  searchBody: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  searchTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(18, 0.3),
  },
  searchList: {
    padding: ms(10),
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  listHeader: {
    paddingTop: ms(5),
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
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
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
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
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
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
