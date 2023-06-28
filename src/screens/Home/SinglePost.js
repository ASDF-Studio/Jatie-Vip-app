import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HorizontalLine,
  ModalDown,
  ModalList,
  TopBackButton,
  ReportOnPostModal,
  Toast,
  Button,
  Icon,
  PopUp,
  PopUpAlert,
  MediaContainer,
} from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NAVIGATION } from '@/constants';
import { FontFamily } from '@/theme/Fonts';
import { navigationRef } from '@/navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostById,
  TYPES,
  deletePost,
  reportPost,
} from '@/actions/PostActions';
import { getAllPostData, getPostByIdData } from '@/selectors/PostSelectors';
import { CustomLoader } from '@/components';
import {
  isLoadingSelector,
  successSelector,
} from '@/selectors/StatusSelectors';
import { getUser } from '@/selectors/UserSelectors';
import { strings } from '@/localization';
import {
  faFlag,
  faImage,
  faMessage,
  faPen,
  faPlay,
  faThumbsUp,
  faTrash,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { SwiperViewer } from '@/components/SwiperComponent';
import { POST_TYPE } from '@/constants/enums';
import { globalReset } from '@/actions/GlobalActions';
import { showMessage } from 'react-native-flash-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { isEmpty } from 'lodash';

export default function SinglePost({ navigation, route }) {
  const { postId } = route.params || {};
  const userType = useSelector(state => state.userType);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const postData = useSelector(getPostByIdData);
  const [showImageView, setShowImageView] = useState(false);
  const [postUserName, setPostUserName] = useState('');
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Harassment', value: 'Bullying or Harassment' },
    { label: 'Spam', value: 'Spam' },
    {
      label: 'Misleading Information or Fake News',
      value: 'Misleading Information or Fake News',
    },
  ]);
  const [reportOptionValue, setReportOptionValue] = useState('');
  const [reportListOpen, setReportListOpen] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [editData, setEditdata] = useState({});
  const [reportComment, setReportCommnet] = useState('');
  const [postUserId, setPostUserId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImg, setPostImg] = useState([]);
  const [isAdminPost, setIsAdminPost] = useState(false);
  const [openReplace, setReplace] = useState(false);
  const [reportImage, setreportImage] = useState(null);
  const [item, setItem] = useState(postData);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_POST_BY_ID], state)
  );
  const isShowReportToast = useSelector(state =>
    successSelector([TYPES.REPORT_POST], state)
  );

  const onDelete = () => {
    dispatch(
      deletePost(postId, postUserId, user?.id, userType.user, NAVIGATION.home)
    );
  };

  useEffect(() => {
    dispatch(getPostById(postId, user?.id));
  }, [postId]);

  useEffect(() => {
    if (postData) {
      setItem(postData);
    }
  }, [postData]);

  let counter = 1;

  const onViewImageVideo = data => {
    setShowImageView(true), setFeedImages(data.postMediaContent);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && (
        <View style={styles.header}>
          <View style={styles.left}>
            <TopBackButton
              onPress={() => navigationRef.goBack()}
              style={styles.TopBackButton}
            />
          </View>
        </View>
      )}

      {/* <HorizontalLine /> */}
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={theme.light.colors.activeTabIcon}
          style={{ alignSelf: 'center', marginTop: 50 }}
          animating={isLoading}
        />
      ) : (
        <View style={styles.cardContainer}>
          <Card>
            <CardHeader
              fullName={item?.user?.fullName}
              userName={item?.user?.username}
              profilePic={item?.user?.profilePic}
              time={item?.created_at}
              userId={item?.userId}
              // isOfficial={item.isOffical}
              showPin={item?.isPinned}
            />
            <CardBody text={item?.postBody || strings.message.postIsDeleted} />
            {item?.postMediaContent?.length <= 2 ? (
              <View style={styles.imageContainer}>
                {item?.postMediaContent?.map(
                  data => (
                    (counter = counter + 1),
                    (
                      <TouchableOpacity
                        key={counter}
                        style={styles.touchContainer}
                        onPress={() => {
                          onViewImageVideo(item);
                        }}
                      >
                        {data?.mimetype?.split('/')[0] == 'image' ? (
                          <Image
                            source={{
                              uri: data.url,
                            }}
                            style={styles.image}
                          />
                        ) : (
                          <ImageBackground
                            source={{
                              uri: data?.cover,
                            }}
                            key={counter}
                            style={[styles.image, styles.playButtonBg]}
                          >
                            <TouchableOpacity
                              // activeOpacity={1}
                              style={styles.playButton}
                              onPress={() => {
                                onViewImageVideo(item);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPlay}
                                size={ms(15)}
                                style={styles.Play}
                              />
                            </TouchableOpacity>
                          </ImageBackground>
                        )}
                      </TouchableOpacity>
                    )
                  )
                )}
              </View>
            ) : item?.postMediaContent?.length > 2 ? (
              ((counter = 1),
              (
                <View style={styles.imageContainer}>
                  {item?.postMediaContent?.map(data =>
                    counter == 1
                      ? ((counter = counter + 1),
                        (
                          <TouchableOpacity
                            key={counter}
                            style={styles.touchContainer}
                            onPress={() => {
                              onViewImageVideo(item);
                            }}
                          >
                            {data?.mimetype?.split('/')[0] == 'image' ? (
                              <Image
                                source={{
                                  uri: data.url,
                                }}
                                style={styles.image}
                              />
                            ) : (
                              <ImageBackground
                                source={{
                                  uri: data?.cover,
                                }}
                                key={counter}
                                style={[styles.image, styles.playButtonBg]}
                              >
                                <TouchableOpacity
                                  // activeOpacity={1}
                                  style={styles.playButton}
                                  onPress={() => {
                                    onViewImageVideo(item);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlay}
                                    size={ms(15)}
                                    style={styles.Play}
                                  />
                                </TouchableOpacity>
                              </ImageBackground>
                            )}
                          </TouchableOpacity>
                        ))
                      : counter == 2
                      ? ((counter = counter + 1),
                        (
                          <TouchableOpacity
                            key={counter}
                            style={styles.touchContainer}
                            onPress={() => {
                              onViewImageVideo(item);
                            }}
                          >
                            <ImageBackground
                              source={{
                                uri:
                                  data?.mimetype?.split('/')[0] == 'image'
                                    ? data.url
                                    : data?.cover,
                              }}
                              key={counter}
                              style={[styles.image, styles.moreImage]}
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  onViewImageVideo(item);
                                }}
                              >
                                <Text style={styles.extraImage}>
                                  {strings.message.plus}
                                  {item.postMediaContent?.length - 1}
                                </Text>
                              </TouchableOpacity>
                              {/* {data.mimetype.split("/")[0] == "video" &&
              <TouchableOpacity
                // activeOpacity={1}
                style={styles.playButton}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  size={ms(15)}
                  style={styles.Play}
                />

              </TouchableOpacity>
            } */}
                            </ImageBackground>
                          </TouchableOpacity>
                        ))
                      : null
                  )}
                </View>
              ))
            ) : null}

            <CardFooter
              postType={POST_TYPE.SINGLE_POST}
              index={0}
              postID={item?.id}
              disable={isEmpty(item)}
              postUserID={item?.userId}
              userID={user?.id}
              likeCount={item?.upVote}
              disLikeCount={item?.downVote}
              commentCount={item?.comments_aggregate?.aggregate?.count}
              isDownVoted={item?.has_downvoted}
              isUpvoted={item?.has_upvoted}
              postData={item}
              commentPress={() =>
                navigation.navigate(NAVIGATION.comments, {
                  DATA: item,
                  type: POST_TYPE.SINGLE_POST,
                })
              }
              morePress={() => {
                setIsAdminPost(item?.isAdminPost),
                  setPostUserName(item?.user?.username);
                setOpen(true);
                setPostUserId(item?.userId);
                setPostTitle(item?.postTitle);
                setPostBody(item?.postBody);
                setPostImg(item?.postImg);
                setEditdata(item);
              }}
            />
          </Card>
        </View>
      )}
      {showImageView && (
        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
        />
      )}
      {open &&
        (postUserId == user?.id ? (
          <ModalDown open={open} setOpen={setOpen}>
            <ModalList
              title={strings.profile.editPost}
              icon={faPen}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.info}
              onPress={() => {
                navigationRef.navigate(NAVIGATION.updatePost, {
                  prevData: editData,
                }),
                  setOpen(false);
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
              onPress={() => {
                setReplace(true), setOpen(false);
              }}
            />
          </ModalDown>
        ) : (
          <ModalDown open={open} setOpen={setOpen}>
            <ModalList
              //   onPress={() => { onFollow() }}
              title={
                (!item.is_following
                  ? strings.operations.follow
                  : strings.operations.unFollow) +
                ' @' +
                postUserName
              }
              icon={faUserPlus}
              iconColor={theme.light.colors.primary}
              iconBg={theme.light.colors.primaryBgLight}
            />
            <ModalList
              title={strings.operations.sendPrivateMessage}
              icon={faMessage}
              disabled
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
                {isAdminPost == false && (
                  <ModalList
                    title={strings.home.report}
                    icon={faFlag}
                    iconColor={theme.light.colors.secondary}
                    iconBg={theme.light.colors.infoBgLight}
                    onPress={() => {
                      setReportOptionValue('');
                      setOpenReport(true);
                      setOpen(false);
                      setreportImage(null);
                    }}
                  />
                )}

                {isAdminPost == false && (
                  <ModalList
                    onPress={() => {
                      onBlock();
                    }}
                    title={strings.operations.block + ' @' + postUserName}
                    // title={(ALLPOST?.data[pos] ? strings.operations.block : strings.operations.unBlock) + " @" + postUserName}
                    icon={faXmark}
                    iconColor={theme.light.colors.secondary}
                    iconBg={theme.light.colors.infoBgLight}
                  />
                )}
              </>
            ) : userType.user == `${strings.userType.admin}` ? (
              <>
                <ModalList
                  title={strings.home.deletePost}
                  icon={faTrash}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                  onPress={() => {
                    setReplace(true), setOpen(false);
                  }}
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
            ) : null}
          </ModalDown>
        ))}
      {/* Replace Popup */}
      {openReplace && (
        <PopUp open={openReplace} setOpen={setReplace}>
          <View style={styles.ConfirmationTextContainer}>
            <Text style={styles.ConfirmationText}>{strings.alert.delete}</Text>
          </View>
          <Button
            title={strings.operations.yes}
            style={styles.confirmButton}
            onPress={() => {
              onDelete(), setReplace(false);
            }}
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
              {reportImage ? (
                <Image
                  style={{
                    height: ms(35),
                    width: ms(35),
                    borderRadius: ms(5),
                  }}
                  source={{ uri: reportImage.path }}
                />
              ) : (
                <View pointerEvents="none">
                  <Icon
                    icon={faImage}
                    size={ms(22)}
                    color={theme.light.colors.secondary}
                  />
                </View>
              )}
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
                  reportImg: reportImage,
                };
                dispatch(reportPost(reportData));
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
    backgroundColor: theme.light.colors.primaryBgLight,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
    // margin: ms(5),
    flex: 0.1,
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
  searchIcon: { marginRight: ms(5) },
  bellIcon: { marginRight: ms(10) },
  cardContainer: {
    margin: ms(8),
    borderRadius: 10,
    flex: 0.9,
  },
  nameTxt: [
    {
      fontSize: ms(24, 0.3),
      fontFamily: FontFamily.Recoleta_bold,
    },
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
    backgroundColor: theme.light.colors.hyperlink,
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
  Play: {
    position: 'absolute',
    color: theme.light.colors.background,
    marginLeft: ms(8),
    marginTop: ms(8),
  },
  playButton: {
    backgroundColor: theme.light.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
});
