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
} from '@/components';
import { ms } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { card, Data } from './ProfileData/manageReportOnPostData';
import { useEffect } from 'react';
import { getPostById } from '@/actions/PostActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { getPostByIdData } from '@/selectors/PostSelectors';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { faFlag, faMessage, faTrash, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { bannedUserById, unBannedUserById } from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '../../actions/PostActions'
export default function ManageReportOnMessage({ navigation, route }) {
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_POST_BY_ID], state)
  );

  const dispatch = useDispatch()
  const focus = useIsFocused();

  const { item } = route.params

  const [open, setOpen] = useState(false);
  const user = useSelector(getUser)
  const postData = useSelector(getPostByIdData)
  console.log("POST__DATAA In SELECTOR", postData);

  useEffect(() => {
    dispatch(getPostById(item.objectId, user?.id))

    // setLikeCount(item?.upVote)
    // setDownCount(item?.downVote)
    // setCommentCount(item?.comments_aggregate?.aggregate?.count)

  }, [focus])



  const bannedHandlePress = () => {
    dispatch(bannedUserById(postData?.userId))
    setOpen(false)
    // console.log('banned id', postData?.user?.id)
  }

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
      />
      <View style={styles.activity}>
        <View style={styles.textContainer}>
          <Text style={styles.statsTxt}>{strings.profile.reported}</Text>
          <Text style={styles.reactOnTxt}>{strings.profile.thisPost}</Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTxt}>{strings.profile.reason}{item.reportTitle}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Card>
          <View style={styles.reportBound}>
            <CardHeader
              fullName={postData?.user.fullName}
              userName={postData?.user.username}
              profilePic={postData?.user.profilePic}
              time={postData?.created_at}
              userId={postData?.userId}
            />
            <CardBody text={postData?.postBody} />
          </View>
          {/* <CommentContainer
            seeAllPress={() =>
              navigation.navigate(NAVIGATION.manageReportOnPostAllComments)
            }
          > */}
          {/* <CommentCard
              name={card.name}
              userName={card.userName}
              imageUrl={card.imageUrl}
              time={card.name}
              commentTxt={card.commentTxt}
              likeCount={card.likeCount}
              // likePress = {}
              disLikeCount={card.disLikeCount}
            // disLikePress = {}
            /> */}
          {/* </CommentContainer> */}
          <CardFooter morePress={() => { setOpen(true) }}
            postIndex={0}
            userID={user?.id}
            postID={postData?.id}
            likeCount={postData?.upVote}
            disLikeCount={postData?.downVote}
            commentCount={postData?.comments_aggregate.aggregate.count}
            commentPress={() => navigation.navigate(NAVIGATION.comments,
              { DATA: item.post, "POST_INDEX": 0 })} />
        </Card>


        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            // onPress={() => { onFollow() }}
            title={'Follow' + ' @' + postData?.user.username}
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

          <>
            <ModalList
              title={strings.home.deletePost}
              icon={faTrash}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
            // onPress={() => { setReplace(true), setOpen(false) }}
            />
            <ModalList
              title={strings.operations.block + ' @' + postData?.user.username}
              icon={faXmark}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
            />
            <ModalList onPress={bannedHandlePress}
              title={strings.operations.ban + ' @' + postData?.user.username}
              icon={faFlag}
              iconColor={theme.light.colors.secondary}
              iconBg={theme.light.colors.infoBgLight}
            />
          </>

        </ModalDown>
      </View>
    </SafeAreaView >
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
    padding: ms(8),
  },
  reportBound: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.primaryBgLightest,
  },
});

