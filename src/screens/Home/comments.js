import {
  Button,
  CommentCard,
  CommentInput,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  ReportOnPostModal,
  Toast,
  TopBackButton,
} from '@/components';
import { strings } from '@/localization';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  faClose,
  faFlag,
  faImage,
  faMessage,
  faPen,
  faThumbsUp,
  faTrash,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  deleteComment,
  followUser,
  getAllPostSuccess,
  getCommentsByPostId,
  reportPost,
  searchAllPostSuccess,
  TYPES,
  unFollowUser,
} from '@/actions/PostActions';
import {
  isLoadingSelector,
  successSelector,
} from '@/selectors/StatusSelectors';
import { Loader } from '@/components/Loader';
import {
  getAllPostData,
  getCommentsByPostIdData,
  getSearchData,
} from '@/selectors/PostSelectors';
import { getUser } from '@/selectors/UserSelectors';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useRef } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { globalReset } from '@/actions/GlobalActions';
import { POST_TYPE } from '@/constants/enums';
export default function Comments({ navigation, route }) {
  const keyboardScroll = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const childRef = useRef(null);
  const flatListRef = useRef(null);
  const { DATA, POST_INDEX, type } = route.params;
  const USER = useSelector(getUser);
  const COMMENTS = useSelector(getCommentsByPostIdData);
  const ALLPOST = useSelector(getAllPostData);
  const SEARCH_DATA = useSelector(getSearchData);
  const dispatch = useDispatch();
  const [openReplyTo, setOpenReplyTo] = useState(false);
  //Option and Report
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reportListOpen, setReportListOpen] = useState(false);
  const [reportImage, setreportImage] = useState(null);
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
  const [reportComment, setReportCommnet] = useState('');

  const [commentUserId, setCommentUserId] = useState('');
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [commentIndex, setCommentIndex] = useState('');
  const [commentUserName, setCommentUserName] = useState('');

  const [replyUserName, setReplyUserName] = useState('');
  const [replyUserId, setReplyUserId] = useState('');
  const [replyFormatedString, setReplyFormatedString] = useState('');

  const [isAdminComment, setIsAdminComment] = useState('');
  const focus = useIsFocused();
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_COMMENTS_BY_POST_ID], state)
  );
  const deleteLoading = useSelector(state =>
    isLoadingSelector([TYPES.DELETE_COMMENT], state)
  );

  const isShowReportToast = useSelector(state =>
    successSelector([TYPES.REPORT_POST], state)
  );

  useEffect(() => {
    dispatch(getCommentsByPostId(DATA?.id, USER?.id));
  }, [focus]);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const onDeleteComment = () => {
    dispatch(deleteComment(commentId, USER?.id));
    childRef.current.resetValue();
    updateParentState();
    var arr = type === POST_TYPE.SEARCH ? SEARCH_DATA : ALLPOST;
    var count = arr[POST_INDEX]?.comments_aggregate?.aggregate?.count;
    arr[POST_INDEX].comments_aggregate.aggregate.count = count - 1;
    const ob = {
      data: arr,
    };
    if (type === POST_TYPE.SEARCH) {
      dispatch(searchAllPostSuccess([...arr]));
    } else {
      dispatch(getAllPostSuccess(ob));
    }
  };
  const onEditComment = () => {
    setIsEdit(true);
    setOpen(false);
    childRef.current.childFunction();
  };
  const updateParentState = () => {
    setIsEdit(false);
    setCommentUserId('');
    setComment('');
    setCommentId('');
    setCommentIndex('');
    setOpenReplyTo(false);
    setReplyFormatedString('');
  };
  const SelectFromGallery = () => {
    ImagePicker.openPicker({
      width: ms(300),
      height: ms(400),
      cropping: true,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        setreportImage(image);
      })
      .catch(error => console.log('report image picker error', error));
  };
  const onFollow = () => {
    setOpen(false);
    if (COMMENTS?.postComments[commentIndex]?.is_following) {
      dispatch(unFollowUser(USER?.id, commentUserId, strings.home.comment));
    } else {
      dispatch(followUser(USER?.id, commentUserId, strings.home.comment));
    }
    setCommentUserId(''), setCommentIndex(0);
  };
  const handleTextInputFocus = event => {
    keyboardScroll.current.props.scrollToFocusedInput(event.target);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const { height } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.screenY - height;
        setKeyboardHeight(keyboardHeight);
        setIsKeyboardOpen(true);
        scrollToBottom();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const commentReplyFormat = (id, username) => {
    childRef.current.resetValue();
    setReplyUserId(id), setReplyUserName(username);
    var link = `{${'@'}}[${username}](${id})`;
    setReplyFormatedString(link);
    childRef.current.childReplyFunction(link);
    setOpenReplyTo(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TopBackButton
          onPress={() => navigation.goBack()}
          style={styles.TopBackButton}
        />
        <Text style={styles.headTxt}> {strings.home.comments} </Text>
      </View>
      <HorizontalLine color={theme.light.colors.infoBgLight} paddingTop={15} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <View style={styles.commentContainer}>
          {isLoading == true ? (
            <Loader visible={true} size={'large'} />
          ) : (
            <FlatList
              data={COMMENTS?.postComments}
              ref={flatListRef}
              keyExtractor={item => item.id}
              onContentSizeChange={scrollToBottom}
              renderItem={({ item, index }) => (
                <CommentCard
                  name={item?.user?.fullName}
                  userId={USER?.id}
                  commentData={item}
                  commentIndex={index}
                  commentUserId={item?.userId}
                  commentId={item?.id}
                  userName={item?.user?.username}
                  imageUrl={item?.user?.profilePic}
                  time={moment(item?.created_at).fromNow()}
                  commentTxt={item?.commentBody}
                  likeCount={item?.upVote}
                  disLikeCount={item?.downVote}
                  hasVotedUp={item?.has_upvoted}
                  hasVotedDown={item?.has_downvoted}
                  replyPress={() => {
                    commentReplyFormat(item?.user?.id, item?.user?.username);
                  }}
                  morePress={() => {
                    setOpen(true);
                    setCommentId(item?.id);
                    setCommentUserId(item?.userId);
                    setComment(item?.commentBody);
                    setCommentIndex(index);
                    setCommentUserName(item?.user?.username);
                    setIsAdminComment(item?.isAdminComment);
                  }}
                />
              )}
            />
          )}
        </View>
        {openReplyTo && (
          <View style={styles.replyToContainer}>
            <View style={styles.replay}>
              <Text style={styles.replyTxt}> {strings.home.replyTo} </Text>
              <Text style={styles.replayFontWeight}> {replyUserName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenReplyTo(false), setReplyUserName(''), setReplyUserId('');

                childRef.current.resetValue();
              }}
              style={styles.closeIconContainer}
            >
              <FontAwesomeIcon
                icon={faClose}
                size={ms(13)}
                color={theme.light.colors.white}
              />
            </TouchableOpacity>
          </View>
        )}
        {!isLoading && (
          <CommentInput
            ref={childRef}
            commentData={comment}
            commentId={commentId}
            postIndex={POST_INDEX}
            isReply={openReplyTo}
            replyTo={replyFormatedString}
            isEdit={isEdit}
            postId={DATA?.id}
            userId={USER?.id}
            updateParentState={updateParentState}
            commentIndex={commentIndex}
            commentOwnerId={DATA?.userId}
            type={type}
          // scrollRef={handleTextInputFocus}
          />
        )}
        {/*  Slide up for follow, edit , review  */}
        {open &&
          (commentUserId == USER?.id ? (
            <ModalDown open={open} setOpen={setOpen}>
              <ModalList
                title={strings.profile.editComment}
                icon={faPen}
                iconBg={theme.light.colors.infoBgLight}
                iconColor={theme.light.colors.info}
                onPress={() => {
                  setIsEdit(true);
                  onEditComment();
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
                  setOpen(false), onDeleteComment();
                }}
              />
            </ModalDown>
          ) : (
            <ModalDown open={open} setOpen={setOpen}>
              <ModalList
                onPress={() => {
                  onFollow();
                }}
                title={
                  (!COMMENTS?.postComments[commentIndex]?.is_following
                    ? strings.operations.follow
                    : strings.operations.unFollow) +
                  ' @' +
                  commentUserName
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
              />
              <HorizontalLine
                color={theme.light.colors.infoBgLight}
                paddingTop={15}
                paddingBottom={8}
              />
              {isAdminComment == false && (
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
              {isAdminComment == false && (
                <ModalList
                  title={strings.operations.block + ' @' + commentUserName}
                  icon={faXmark}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                />
              )}
            </ModalDown>
          ))}

        <ReportOnPostModal open={openReport} setOpen={setOpenReport}>
          <View style={styles.reportPostContainer}>
            <TopBackButton
              onPress={() => setOpenReport(false)}
              style={styles.reportPostBackButton}
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
                    objectId: DATA?.id,
                    reportedBy: USER?.id,
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
      </KeyboardAvoidingView>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    paddingTop: ms(10),
    paddingLeft: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      fontSize: ms(16),
    },
  ],
  commentContainer: {
    flex: 1,
  },
  TopBackButton: {
    padding: ms(5),
    // paddingBottom: ms(10),
  },
  replyToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(5),
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: theme.light.colors.secondary,
  },
  replay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replayFontWeight: { fontWeight: 'bold' },
  closeIconContainer: {
    backgroundColor: theme.light.colors.secondary,
    borderRadius: 100,
    padding: ms(5),
  },
  replyTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
  },

  // reportPostContainer

  reportPostContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.light.colors.primary,
  },
  reportPostBackButton: {
    padding: ms(10),
    paddingBottom: ms(10),
  },
  reportPostTopContainer: {
    paddingLeft: ms(9),
    paddingRight: ms(9),
  },
  dropDownPicker: {
    padding: ms(10),
    marginBottom: ms(10),
    backgroundColor: theme.light.colors.inputFiled,
    borderWidth: 0,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
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
});
