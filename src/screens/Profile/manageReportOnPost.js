import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import {
  HorizontalLine,
  TopBackButton,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  CommentCard,
  CommentContainer,
  ModalDown,
  ModalList,
  CustomLoader,
  PopUp,
  Button,
} from '@/components';
import { ms } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { card, Data } from './ProfileData/manageReportOnPostData';
import { useEffect } from 'react';
import {
  deletePost,
  followUser,
  getPostById,
  unFollowUser,
} from '@/actions/PostActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { getPostByIdData } from '@/selectors/PostSelectors';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import {
  faFlag,
  faMessage,
  faTrash,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  ArchiveReport,
  bannedUserById,
  unBannedUserById,
} from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '../../actions/PostActions';
import { manageAllReports } from '@/actions/UserActions';
import { isEmpty } from 'lodash';
export default function ManageReportOnMessage({ navigation, route }) {
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_POST_BY_ID], state)
  );

  const dispatch = useDispatch();
  const focus = useIsFocused();
  const [banValue, setBanvalue] = useState(item?.post?.user?.isBanned);
  const { item } = route.params;
  const [open, setOpen] = useState(false);
  const user = useSelector(getUser);
  const postData = useSelector(getPostByIdData);
  const [openReplace, setReplace] = useState(false);
  const userType = useSelector(state => state.userType);

  useEffect(() => {
    dispatch(getPostById(item.objectId, user?.id));

    // setLikeCount(item?.upVote)
    // setDownCount(item?.downVote)
    // setCommentCount(item?.comments_aggregate?.aggregate?.count)
  }, [focus]);

  const onDelete = () => {
    dispatch(
      deletePost(
        postData?.id,
        postData?.userId,
        user?.id,
        userType.user,
        NAVIGATION.manageReports
      )
    );
  };

  const bannedHandlePress = () => {
    dispatch(bannedUserById(postData?.userId));
    setBanvalue(true);
    setOpen(false);
    setTimeout(() => {
      dispatch(manageAllReports());
    }, 500);

    // console.log('banned id', postData?.user?.id)
  };
  const unbannedHandlePress = () => {
    setOpen(false);
    dispatch(unBannedUserById(postData?.userId));

    setBanvalue(false);
    setTimeout(() => {
      dispatch(manageAllReports());
    }, 500);
  }
  const onbanPress = () => {
    banValue == true ? unbannedHandlePress() : bannedHandlePress()
  }

  const onFollow = () => {
    if (postData?.is_following == true) {
      dispatch(unFollowUser(user?.id, postData?.userId))
      setOpen(false)
      setTimeout(() => {
        dispatch(getPostById(item.objectId, user?.id));
      }, 100);
    } else {
      dispatch(followUser(user?.id, postData?.userId));
      setOpen(false);

      setTimeout(() => {
        dispatch(getPostById(item.objectId, user?.id));
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomLoader open={isLoading} />
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}
      </Text>
      <HorizontalLine color={theme.light.colors.infoBgLight} paddingTop={10} />
      <CardHeader
        fullName={item.user.fullName}
        userName={item.user.username}
        profilePic={item.user.profilePic}
        time={item.created_at}
        userId={item?.user.id}
        showArchive={!item?.isArchived}
        onArchivePress={() => ArchiveReport({ reportID: item.id })}
      />
      <View style={styles.activity}>
        <View style={styles.textContainer}>
          <Text style={styles.statsTxt}>{strings.profile.reported}</Text>
          <Text style={styles.reactOnTxt}>{strings.profile.thisPost}</Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTxt}>
            {strings.profile.reason}
            {item.reportTitle}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.shadow} />
        <View style={styles.reportBound}>
          <Card>
            <CardHeader
              fullName={postData?.user.fullName}
              userName={postData?.user.username}
              profilePic={postData?.user.profilePic}
              time={postData?.created_at}
              userId={postData?.userId}
            />
            <CardBody
              text={postData?.postBody || strings.message.postIsDeleted}
            />

            <CardFooter
              morePress={() => {
                setOpen(true);
              }}
              disable={isEmpty(postData)}
              postIndex={0}
              userID={user?.id}
              postID={postData?.id}
              likeCount={postData?.upVote}
              isDownVoted={postData?.has_downvoted}
              isUpvoted={postData?.has_upvoted}
              disLikeCount={postData?.downVote}
              commentCount={postData?.comments_aggregate.aggregate.count}
              commentPress={() =>
                navigation.navigate(NAVIGATION.comments, {
                  DATA: item.post,
                  POST_INDEX: 0,
                })
              }
            />
          </Card>
        </View>
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            onPress={() => {
              onFollow();
            }}
            title={
              postData?.is_following == true
                ? 'UnFollow' + ' @' + postData?.user.username
                : 'Follow' + ' @' + postData?.user.username
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

          <>
            <ModalList
              title={strings.home.deletePost}
              icon={faTrash}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
              // onPress={() => console.log('1234')}
              onPress={() => {
                setReplace(true), setOpen(false);
              }}
            />

            <ModalList
              onPress={() => onbanPress()}
              title={
                banValue == true
                  ? strings.operations.unBan + ' @' + postData?.user.username
                  : strings.operations.ban + ' @' + postData?.user.username
              }
              icon={faFlag}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
            />
          </>
        </ModalDown>
        {openReplace && (
          <PopUp open={openReplace} setOpen={setReplace}>
            <View style={styles.ConfirmationTextContainer}>
              <Text style={styles.ConfirmationText}>
                {strings.alert.delete}
              </Text>
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
      </View>
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
    padding: ms(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: ms(18),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  shadow: {
    width: '100%',
    height: 1,
    left: 0,
    position: 'absolute',
    top: 0,
    // IOS
    zIndex: 10,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 10,
    // android
    elevation: 5,
  },
  body: {
    position: 'relative',
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  reportBound: {
    borderWidth: 1,
    borderRadius: 10,
    padding: ms(10),
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.primaryBgLightest,
    overflow: 'hidden',
    margin: ms(8),
  },

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
  loaderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: ms(50),
  },
});
