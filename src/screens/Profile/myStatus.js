import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { theme } from '@/theme';
import { faTrash, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  ModalDown,
  ModalList,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  HorizontalLine,
  PopUp,
  Button,
  MediaContainer,
} from '@/components';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { FontFamily } from '@/theme/Fonts';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import { navigationRef } from '@/navigation/RootNavigation';
import {
  TYPES,
  deletePost,
  getAllPostsByLoggedInUser,
  getAllPostsByLogInUserPagination,
} from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { POST_TYPE } from '@/constants/enums';
import { SwiperViewer } from '@/components/SwiperComponent';
import { useCallback } from 'react';

export default function MyStatus({ navigation }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [showImageView, setShowImageView] = useState(false);
  const [postId, setpostId] = useState(null);
  const [postUserId, setPostUserId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImg, setPostImg] = useState([]);
  const [feedImages, setFeedImages] = useState([]);
  const [editData, setEditdata] = useState({});
  const [postIndex, setPostIndex] = useState(0);
  const [fetchExclusivePost, setExclusivePost] = useState(true);
  const userType = useSelector(state => state.userType);
  const [index, setIndex] = useState(null);
  const [openReplace, setReplace] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllPostsByLoggedInUser(user?.id, user?.id));
      return () => {};
    }, [])
  );

  const isLoading = useSelector(state =>
    isLoadingSelector(
      [TYPES.DELETE_POST, TYPES.GET_ALL_POST_BY_LOGGED_IN_USER],
      state
    )
  );
  const isLoadingMore = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_POST_BY_LOGGED_IN_USER_PAGINATION], state)
  );

  const onDelete = () => {
    dispatch(
      deletePost(
        postId,
        postUserId,
        user?.id,
        userType.user,
        NAVIGATION.profile
      )
    );
  };

  let DATA = {
    postId,
    postTitle,
    postBody,
    postImg,
  };
  const onViewImageVideo = (data, index) => {
    setIndex(index);
    setShowImageView(true);
    setFeedImages(data.postMediaContent);
  };
  const onLoadMorePost = useCallback(() => {
    const post = user.getAllPostsByLoggedInUser.slice(-1);
    const page = post[0].created_at;

    dispatch(getAllPostsByLogInUserPagination(user?.id, page));
  });

  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={theme.light.colors.activeTabIcon}
          style={{ alignSelf: 'center', marginTop: 50 }}
          animating={isLoading}
        />
      ) : (
        <FlatList
          data={user.getAllPostsByLoggedInUser || []}
          extraData={user.getAllPostsByLoggedInUser}
          key={props => {
            return props.id;
          }}
          ListFooterComponent={renderFooterPost}
          // onEndReached={onLoadMorePost}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (!fetchExclusivePost) {
              // console.log(onEndReachedCalledDuringMomentum)
              onLoadMorePost();
              setExclusivePost(true);
              // onEndReachedCalledDuringMomentum = true;
            }
          }}
          onMomentumScrollBegin={() => {
            setExclusivePost(false);
            // onEndReachedCalledDuringMomentum = false;
          }}
          renderItem={({ item, index }) => (
            <View style={styles.cardContainer}>
              <Card>
                <CardHeader
                  isProfile={true}
                  fullName={user?.fullName}
                  userName={user?.username}
                  profilePic={user?.profilePic}
                  time={item.created_at}
                  userId={user.id}
                />
                <CardBody text={item?.postBody} />
                <MediaContainer
                  contents={item?.postMediaContent}
                  onPress={index => {
                    onViewImageVideo(item, index);
                  }}
                  borderBottom={false}
                />

                <CardFooter
                  postType={POST_TYPE.PROFILE}
                  postID={item?.id}
                  postUserID={item?.userId}
                  userID={user?.id}
                  likeCount={item?.upVote}
                  disLikeCount={item?.downVote}
                  postData={item}
                  postIndex={index}
                  commentPress={() =>
                    navigation.navigate(NAVIGATION.comments, {
                      DATA: item,
                      POST_INDEX: index,
                      type: POST_TYPE.PROFILE,
                    })
                  }
                  isDownVoted={item?.has_downvoted}
                  isUpvoted={item?.has_upvoted}
                  commentCount={item?.comments_aggregate?.aggregate?.count ?? 0}
                  sharePress={() => console.log('share')}
                  morePress={() => {
                    setOpen(true);
                    setpostId(item?.id);
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
        />
      )}

      {showImageView && (
        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
          index={index}
        />
      )}

      {open && (
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
            // onPress={console.log(postId, user?.id)}
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
            // onPress={console.log(postId, user?.id)}
            onPress={() => {
              setReplace(true), setOpen(false);
            }}
          />
        </ModalDown>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: { margin: ms(10) },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  Play: {
    position: 'absolute',
    color: theme.light.colors.background,
    marginLeft: ms(8),
    marginTop: ms(8),
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

  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  playButton: {
    backgroundColor: theme.light.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
  extraImage: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(24, 0.3),
    width: '100%',
    padding: 35,
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
});
