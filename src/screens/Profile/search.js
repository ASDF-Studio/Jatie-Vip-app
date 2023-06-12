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
  ScrollView,
} from 'react-native';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis, faFlag, faImage, faMessage, faPen, faTrash, faUserPlus, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  CustomLoader,
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
} from '@/components';
import { moderateScale, ms, vs } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Data } from '@/screens/CommonData/searchData';
import { faFaceSadSweat, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { TYPES, searchUser, searchUserSuccess } from '@/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { isLoadingSelector, successSelector } from '@/selectors/StatusSelectors';
import { debounce, isEmpty, size } from 'lodash';
import { useEffect, useMemo } from 'react';
import { getSearchData } from '@/selectors/PostSelectors';
import { searchAllPost, searchAllPostSuccess } from '@/actions/PostActions';
import { SwiperViewer } from '@/components/SwiperComponent';
import { navigationRef } from '@/navigation/RootNavigation';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';

export default function Search({ navigation }) {
  //Use State hooks
  const [searchListOpen, setSearchListOpen] = useState(false);
  const [searchuservalue, setsearchuservalue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageFeed, setImageFeed] = useState([]);
  const [seeMoreUser, setShowSeeMoreUser] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false)
  const [openReplace, setReplace] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reportListOpen, setReportListOpen] = useState(false);
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Harassment', value: 'Bullying or Harassment' },
    { label: 'Spam', value: 'Spam' },
    { label: 'Misleading Information or Fake News', value: 'Misleading Information or Fake News' },
  ]);
  const [reportOptionValue, setReportOptionValue] = useState('');
  const [reportImage, setreportImage] = useState(null)

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userType = useSelector(state => state.userType);
  const SEARCH_DATA = useSelector(getSearchData);
  const searchUserData = user.searchUserKey;
  const isShowReportToast = useSelector(state =>
    successSelector([TYPES.REPORT_POST], state)
  )

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_USER], state)
  );
  const isPostLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_USER_SUCCESS,], state))


  const debouncedSearch = useMemo(() => {
    return debounce(value => {
      setsearchuservalue(value);
    }, 200);
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
      dispatch(searchAllPost(searchuservalue, user?.id));
      dispatch(searchUser(searchuservalue));
      setShowSeeMoreUser(false)
    } else {
      dispatch(searchAllPostSuccess([]));
      dispatch(searchUserSuccess([]));
    }

  }, [searchuservalue, user?.id]);

  const SearchHandlePress = () => {
    // setLoading(true)
    {
      searchuservalue.length >= 1
        ? dispatch(searchUser(searchuservalue))
        : null;
    }

    // setLoading(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomLoader open={loading} />
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
          onChangeText={debouncedSearch}
          style={styles.searchBoxTextFirld}
          placeholder={strings.exclusive.searchPlaceHolder}
          onFocus={() => setSearchListOpen(true)}
        />
        <View style={styles.moreIcon}>
          <Icon icon={faXmark} />
        </View>
      </View>
      <HorizontalLine />
      {!searchListOpen && (
        <View style={styles.searchBody}>
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

      {searchListOpen &&
        (!isEmpty(SEARCH_DATA) || !isEmpty(searchUserData.data)) && (
          <View style={styles.contentContainerStyle}>
            <FlatList
              data={SEARCH_DATA}
              ListHeaderComponent={() =>
                !isEmpty(searchUserData?.data) ? (
                  <View
                    style={{
                      display: 'flex',
                    }}
                  >
                    {searchUserData.data
                      .slice(0, seeMoreUser ? size(searchUserData.data) : 3)
                      .map((item, index) => (
                        <UserCard item={item} key={index} />
                      ))}
                    {!seeMoreUser && (size(searchUserData.data) > 3) && (
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
              ListFooterComponent={() => <View style={{
                height: ms(100)
              }} />}
              renderItem={({ item, index }) => (
                <PostCard
                  onImagePress={() => {
                    setImageFeed(item.postMediaContent);
                    setShowImageView(true);
                  }}
                  onMorePress={() => {
                    setSelectedPost({ ...item, index: index });
                    setShowPostOptions(true)
                  }}
                  key={index}
                  index={index}
                  item={item}
                />
              )}
            />
          </View>
        )}


      {showImageView && <SwiperViewer
        visible={showImageView}
        setVisible={() => setShowImageView(false)}
        images={imageFeed}
      />}

      {showPostOptions && (
        (selectedPost?.userId === user?.id ? (
          <ModalDown open={showPostOptions} setOpen={setShowPostOptions}>
            <ModalList
              title={strings.profile.editPost}
              icon={faPen}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.info}
              onPress={() => {
                navigationRef.navigate(NAVIGATION.updatePost, {
                  prevData: selectedPost,
                }), setShowPostOptions(false);
              }}
            />
            <HorizontalLine
              color={theme.light.colors.infoBgLight}
              paddingTop={15}
              paddingBottom={8}
            />
            <ModalList
              title={strings.operations.delete}
              icon={faTrash}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.secondary}
              onPress={() => { setReplace(true), setShowPostOptions(false) }}
            />
          </ModalDown>
        ) :
          <ModalDown open={showPostOptions} setOpen={setShowPostOptions}>
            <ModalList
              onPress={() => { onFollow() }}
              title={(!SEARCH_DATA[selectedPost.index]?.is_following ? strings.operations.follow : strings.operations.unFollow) + " @" + selectedPost.user.username}
              icon={faUserPlus}
              iconColor={theme.light.colors.primary}
              iconBg={theme.light.colors.primaryBgLight}
            />
            <ModalList
              title={strings.operations.sendPrivateMessage}
              icon={faMessage}
              iconColor={theme.light.colors.success}
              iconBg={theme.light.colors.successBgLight}
            />
            <HorizontalLine
              color={theme.light.colors.infoBgLight}
              paddingTop={15}
              paddingBottom={8}
            />
            {(userType.user == `${strings.userType.free}`) |
              (userType.user == `${strings.userType.vip}`) ? (
              <>
                {
                  selectedPost.isAdminPost == false &&
                  <ModalList
                    title={strings.home.report}
                    icon={faFlag}
                    iconColor={theme.light.colors.secondary}
                    iconBg={theme.light.colors.infoBgLight}
                    onPress={() => {
                      setReportOptionValue('')
                      setOpenReport(true);
                      setShowPostOptions(false)
                      setreportImage(null)
                    }}
                  />
                }

                {selectedPost.isAdminPost == false &&
                  <ModalList
                    onPress={() => { onBlock() }}
                    title={strings.operations.block + " @" + selectedPost.username}
                    // title={(ALLPOST?.data[pos] ? strings.operations.block : strings.operations.unBlock) + " @" + postUserName}
                    icon={faXmark}
                    iconColor={theme.light.colors.secondary}
                    iconBg={theme.light.colors.infoBgLight}
                  />
                }



              </>
            ) : userType.user == `${strings.userType.admin}` ? (
              <>
                <ModalList
                  title={strings.home.deletePost}
                  icon={faTrash}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                  onPress={() => { setReplace(true), setShowPostOptions(false) }}
                />
                <ModalList
                  title={strings.operations.block + strings.home.DummyUser}
                  icon={faXmark}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                />
                <ModalList
                  title={strings.operations.ban + strings.home.DummyUser}
                  icon={faFlag}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                />
              </>
            ) :
              null
            }
          </ModalDown>
        )
      )}
      {/* Replace Popup */}
      {openReplace && (
        <PopUp open={openReplace} setOpen={setReplace}>
          <View style={styles.ConfirmationTextContainer}>
            <Text style={styles.ConfirmationText}>{strings.alert.delete}</Text>
          </View>
          <Button
            title={strings.operations.yes}
            style={styles.confirmButton}
            onPress={() => { onDelete(), setReplace(false) }}
          />
          <Button
            title={strings.operations.no}
            style={styles.cancelButton}
            onPress={() => setReplace(false)}
          />
        </PopUp>
      )}
      <ReportOnPostModal open={openReport} setOpen={setOpenReport}>
        <View style={styles.reportPostContainer}>
          <TopBackButton
            onPress={() => setOpenReport(false)}
            style={styles.reportPostBackButton}
          />
          <Text style={styles.reportTxt}> {strings.home.reportPost} </Text>
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingBottom={12}
          />
          <View style={styles.reportPostTopContainer}>
            <DropDownPicker
              placeholder={strings.home.selectReason}
              open={reportListOpen}
              value={reportOptionValue}
              items={reportOption}
              setOpen={setReportListOpen}
              setValue={setReportOptionValue}
              setItems={setReportOption}
              style={styles.dropDownPicker}
              textStyle={styles.dropListTxt}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              arrowIconStyle={styles.arrowIconStyle}
            />
            <TextInput
              multiline
              editable
              onChangeText={val => setReportCommnet(val)}
              placeholder={strings.operations.addComments}
              numberOfLines={4}
              style={styles.txtInput}
            />
          </View>
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
          />
          <View style={styles.reportPostBottomContainer}>

            <TouchableOpacity onPress={() => SelectFromGallery()}>
              {reportImage ?
                <Image style={{ height: ms(35), width: ms(35), borderRadius: ms(5) }} source={{ uri: reportImage.path }} />
                :
                <View pointerEvents='none'>
                  <Icon
                    icon={faImage}
                    size={ms(22)}
                    color={theme.light.colors.secondary}
                  />
                </View>
              }
            </TouchableOpacity>

            <Button
              title={strings.operations.submit}
              disabled={!reportOptionValue}
              opacity={reportOptionValue ? 1 : 0.4}
              style={styles.reportPostButton}
              onPress={() => {
                const reportData = {
                  objectId: postId,
                  reportedBy: user?.id,
                  reportTitle: reportOptionValue,
                  reportBody: reportComment,
                  reportImg: reportImage
                }
                dispatch(reportPost(reportData))
                setOpenReport(false);
              }}
            />
          </View>
        </View>
      </ReportOnPostModal>
      {isShowReportToast && (
        <Toast
          open={isShowReportToast}
          icon={faThumbsUp}
          message={strings.home.reportMessage}
          onPressOk={() => dispatch(globalReset())}
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
  searchBoxTextFirld: {
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
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
    alignSelf: "center", justifyContent: "center", marginTop: ms(50)
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
});
