import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
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
  AppImageViewer,
  PopUp,
  Button,
} from '@/components';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { FontFamily } from '@/theme/Fonts';
import { useIsFocused } from '@react-navigation/native';
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SwiperViewer } from '@/components/SwiperComponent';
import { useMemo } from 'react';

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
  // console.log("PROFILE__DATA", user.getAllPostsByLoggedInUser);
  const userType = useSelector(state => state.userType);
  const [openReplace, setReplace] = useState(false);

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      dispatch(getAllPostsByLoggedInUser(user?.id, user?.id));
      console.log('useeffect call', user.id);
    }
  }, [focus]);

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

  let counter = 1;
  let DATA = {
    postId,
    postTitle,
    postBody,
    postImg,
  };
  const onViewImageVideo = data => {
    //   let arr=[]
    // for (i=0;i<data.postImg.length;i++){

    // }
    setShowImageView(true),
      // setFeedImages(item.postImg)
      setFeedImages(data.postMediaContent);
  };
  const onLoadMorePost = () => {
    const post = user.getAllPostsByLoggedInUser.slice(-1);
    const page = post[0].created_at;

    dispatch(getAllPostsByLogInUserPagination(user?.id, page));
  };
  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  // console.log("=======> ", userType.user, user.getAllPostsByLoggedInUser[0])

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
            console.log(props);
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
            <View style={styles.cardContainer} key={index}>
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
                {/* images */}
                {/* <View style={styles.imageContainer}>
            {item?.postImg?.map(data => (
              counter = counter + 1,
              <TouchableOpacity
                key={counter}
                style={styles.touchContainer}
                onPress={() => {
                  setShowImageView(true),
                    setFeedImages(item.postImg);
                }}
              >
                <Image
                  source={{
                    uri: data,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </View> */}
                {/* {item?.postImg?.length <= 2 ? (
                  <View style={styles.imageContainer}>
                    {item.postImg?.map(data => (
                      counter = counter + 1,
                      <TouchableOpacity
                        key={counter}
                        style={styles.touchContainer}
                        onPress={() => {
                          setShowImageView(true),
                            setFeedImages(item?.postImg)
                        }}
                      >
                        <Image
                          source={{
                            uri: data,
                          }}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : item?.postImg?.length > 2 ? (
                  counter = 1,
                  <View style={styles.imageContainer}>
                    {item?.postImg?.map(data =>
                      counter == 1 ? (
                        counter = counter + 1,
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
                            key={counter}
                            style={styles.image}
                          />
                        </TouchableOpacity>
                      ) : counter == 2 ? (
                        counter = counter + 1,
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
                      ) : null
                    )}
                  </View>
                ) : null} */}

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
                                  {data?.mimetype.split('/')[0] == 'image' ? (
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
                                          data?.mimetype.split('/')[0] == 'image'
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
        // <AppImageViewer
        //   visible={showImageView}
        //   setVisible={() => setShowImageView(false)}
        //   images={feedImages}
        // />

        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
        />
      )}
      {/* {userPost.map((item, index) => {
        console.log(item.data.id)
      })} */}
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
