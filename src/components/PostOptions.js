import React from 'react';
import { ModalDown } from './modal';
import { useAdminAPI, useUserAPI } from '@/hooks/useUserAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { ModalList } from './modalList';
import { strings } from '@/localization';
import {
  faFlag,
  faImage,
  faMessage,
  faPen,
  faThumbTack,
  faThumbsUp,
  faTrash,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { HorizontalLine } from './horizontalLine';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { PopUp } from './popUp';
import { Button } from './Button';
import {
  getAllPost,
  pinPost,
  reportPost,
  reportPostSuccess,
  unPinPost,
} from '@/actions/PostActions';
import { ReportOnPostModal } from './ReportOnPostModal';
import { TopBackButton } from './topBackButton';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from './Icon';
import { Toast } from './toast';
import { successSelector } from '@/selectors/StatusSelectors';

import { TYPES } from '@/actions/PostActions';
import { globalReset } from '@/actions/GlobalActions';
import { POST_TYPE } from '@/constants/enums';
import { ReportUser } from '@/actions/UserActions';

export const UserPostOptions = ({
  open,
  setOpen,
  selectedPostData,
  selectetFeedConfigData,
  postType = POST_TYPE.REGULAR,
  callBack,
}) => {
  const { userId } = selectedPostData || {};
  const { sortBy, follwingSwitch, vipArea } = selectetFeedConfigData || {};
  const { isFollowing, isBlocked, onDeletePostAPI, followAPI, blockAPI } =
    useUserAPI({
      userId: userId,
      postType: postType,
    });

  const { isBanned, userBanAPI } = useAdminAPI({
    userId: userId,
  });

  const userType = useSelector(state => state.userType);

  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showBan, setShowBan] = useState(false);

  const [openReport, setOpenReport] = useState(false);
  const [reportListOpen, setReportListOpen] = useState(false);
  const [reportOptionValue, setReportOptionValue] = useState('');
  const [reportComment, setReportCommnet] = useState('');
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Harassment', value: 'Bullying or Harassment' },
    { label: 'Spam', value: 'Spam' },
    {
      label: 'Misleading Information or Fake News',
      value: 'Misleading Information or Fake News',
    },
  ]);
  const [reportImage, setreportImage] = useState(null);

  const isShowReportToast = useSelector(state =>
    successSelector([TYPES.REPORT_POST], state)
  );

  const user = useSelector(getUser);

  const isMine = user?.id === userId;

  const onPostDeleteCallBack = () => {
    setOpen(false);

    if (postType === POST_TYPE.REGULAR) {
      dispatch(getAllPost(user?.id, sortBy, follwingSwitch, vipArea, ''));
    } else {
      callBack && callBack();
    }
  };

  const handlePinPost = () => {
    if (selectedPostData?.isPinned) {
      unPinPost({
        postId: selectedPostData.id,
      });
    } else {
      pinPost({
        postId: selectedPostData.id,
      });
    }

    setTimeout(() => {
      if (postType === POST_TYPE.REGULAR) {
        dispatch(getAllPost(user?.id, sortBy, follwingSwitch, vipArea, ''));
      }
    }, 100);
  };

  const onReport = () => {
    if (selectedPostData.id) {
      dispatch(
        reportPost({
          objectId: selectedPostData?.id,
          reportedBy: user?.id,
          reportTitle: reportOptionValue,
          reportBody: reportComment,
          reportImg: reportImage,
        })
      );
      setOpenReport(false);
      setOpen(false);
    } else {
      ReportUser({
        loggedInUserId: user.id,
        reportedUserId: userId,
        reportBody: reportComment,
        reportTitle: reportOptionValue,
        reportImg: reportImage,
      }).then(() => dispatch(reportPostSuccess()));
    }
  };

  const onBanCallBack = () => {
    setOpen(false);

    if (postType === POST_TYPE.REGULAR) {
      dispatch(getAllPost(user?.id, sortBy, follwingSwitch, vipArea, ''));
    } else {
      dispatch(globalReset());
      navigationRef.goBack();
    }
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

  return (
    <>
      {/* <ModalDown></ModalDown> */}
      {isMine && (
        <ModalDown open={open} setOpen={setOpen}>
          {userType.user === `${strings.userType.admin}` && (
            <ModalList
              title={
                selectedPostData?.isPinned
                  ? strings.exclusive.unPinThisPost
                  : strings.exclusive.pinThisPost
              }
              icon={faThumbTack}
              iconBg={theme.light.colors.primaryBgLight}
              iconColor={theme.light.colors.primary}
              onPress={() => {
                handlePinPost();
                setOpen(false);
              }}
            />
          )}
          <ModalList
            title={strings.profile.editPost}
            icon={faPen}
            iconBg={theme.light.colors.infoBgLight}
            iconColor={theme.light.colors.info}
            onPress={() => {
              navigationRef.navigate(NAVIGATION.updatePost, {
                prevData: {
                  ...selectedPostData,
                  DATA: selectetFeedConfigData,
                },
              }),
                setOpen(false);
            }}
          />
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
            paddingBottom={8}
          />
          {selectedPostData?.id && (
            <ModalList
              title={strings.operations.delete}
              icon={faTrash}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.secondary}
              onPress={() => {
                setOpen(false);
                setShowDelete(true);
              }}
            />
          )}
        </ModalDown>
      )}

      {!isMine && (
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            onPress={() => {
              setOpen(false);
              followAPI();
            }}
            title={
              (!isFollowing
                ? strings.operations.follow
                : strings.operations.unFollow) +
              ' @' +
              selectedPostData?.user?.username
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
            disabled={true}
          />

          {userType.user === `${strings.userType.admin}` ? (
            <>
              <HorizontalLine
                color={theme.light.colors.infoBgLight}
                paddingTop={15}
                paddingBottom={8}
              />
              {selectedPostData?.id && (
                <ModalList
                  title={strings.home.deletePost}
                  icon={faTrash}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                  onPress={() => {
                    setOpen(false);
                    setShowDelete(true);
                  }}
                />
              )}
              <ModalList
                title={`${
                  isBlocked
                    ? strings.operations.unBlock
                    : strings.operations.block
                } @${selectedPostData?.user?.username}`}
                icon={faXmark}
                iconColor={theme.light.colors.secondary}
                iconBg={theme.light.colors.infoBgLight}
                onPress={() => {
                  setOpen(false);
                  blockAPI({
                    callBack: onBanCallBack,
                  });
                }}
              />
              <ModalList
                title={
                  isBanned
                    ? `${strings.operations.unBan} @${selectedPostData?.user?.username}`
                    : `${strings.operations.ban} @${selectedPostData?.user?.username}`
                }
                onPress={() => {
                  setOpen(false);
                  setShowBan(true);
                }}
                icon={faFlag}
                iconColor={theme.light.colors.secondary}
                iconBg={theme.light.colors.infoBgLight}
              />
            </>
          ) : (
            <>
              {!selectedPostData?.isAdminPost && (
                <>
                  <HorizontalLine
                    color={theme.light.colors.infoBgLight}
                    paddingTop={15}
                    paddingBottom={8}
                  />

                  <ModalList
                    title={
                      selectedPostData?.id
                        ? strings.home.report
                        : `${strings.operations.report} @${selectedPostData?.user?.username}`
                    }
                    icon={faFlag}
                    iconColor={theme.light.colors.secondary}
                    iconBg={theme.light.colors.infoBgLight}
                    onPress={() => {
                      setOpen(false);
                      setReportOptionValue('');
                      setOpenReport(true);
                      setreportImage(null);
                    }}
                  />

                  <ModalList
                    onPress={() => {
                      setOpen(false);
                      blockAPI({
                        callBack: onBanCallBack,
                      });
                    }}
                    title={
                      strings.operations.block +
                      ' @' +
                      selectedPostData?.user?.username
                    }
                    // title={(ALLPOST?.data[pos] ? strings.operations.block : strings.operations.unBlock) + " @" +   selectedPost?.user?.username}
                    icon={faXmark}
                    iconColor={theme.light.colors.secondary}
                    iconBg={theme.light.colors.infoBgLight}
                  />
                </>
              )}
            </>
          )}
        </ModalDown>
      )}

      {showDelete && (
        <PopUp open={showDelete} setOpen={setShowDelete}>
          <View style={styles.ConfirmationTextContainer}>
            <Text style={styles.ConfirmationText}>{strings.alert.delete}</Text>
          </View>
          <Button
            title={strings.operations.yes}
            style={styles.confirmButton}
            onPress={() => {
              onDeletePostAPI({
                postId: selectedPostData?.id,
                callBack: onPostDeleteCallBack,
              });
              setShowDelete(false);
            }}
          />
          <Button
            title={strings.operations.no}
            style={styles.cancelButton}
            onPress={() => setShowDelete(false)}
          />
        </PopUp>
      )}

      {showBan && (
        <PopUp open={showBan} setOpen={setShowBan}>
          <View>
            <Text style={[TextStyles.header, styles.headerColor]}>
              {isBanned
                ? strings.profile.areYouSureWantToUnBan
                : strings.profile.areYouSureWantToBan}
            </Text>
            <View style={styles.imageViewContainer}>
              <Image
                source={{
                  uri: selectedPostData?.user?.profilePic,
                }}
                style={styles.imageDesign}
              />
              <View>
                <Text style={[TextStyles.header, styles.headerFullname]}>
                  {selectedPostData?.user?.fullName}
                </Text>
                <Text>
                  {`@${selectedPostData?.user?.username}`.toLowerCase()}
                </Text>
                <Text style={styles.freeMemberText}>
                  {selectedPostData?.user?.isVIP
                    ? strings.profile.freeMember
                    : strings.profile.vipMember}
                </Text>
              </View>
            </View>
            <View>
              <Button
                onPress={() => {
                  setShowBan(false);
                  setOpen(false);
                  userBanAPI();
                }}
                title={
                  isBanned ? strings.profile.yeaUnBan : strings.profile.yesBan
                }
                style={styles.yesBanButton}
                textStyle={{
                  color: theme.light.colors.primary,
                }}
              />
              <Button
                onPress={() => setShowBan(false)}
                title={
                  isBanned
                    ? strings.profile.DoNotUnBan
                    : strings.profile.DoNotBan
                }
                style={styles.DoNotBanButton}
              />
            </View>
          </View>
        </PopUp>
      )}

      {isShowReportToast && (
        <Toast
          open={isShowReportToast}
          setOpen={() => console.log('presssed')}
          icon={faThumbsUp}
          message={strings.home.reportMessage}
          onPressOk={() => dispatch(globalReset())}
        />
      )}

      {openReport && (
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
                  onReport();
                  setOpenReport(false);
                  setOpen(false);
                }}
              />
            </View>
          </View>
        </ReportOnPostModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // delete popup
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

  //ban modal

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
  reportTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
    padding: 10,
  },
});
