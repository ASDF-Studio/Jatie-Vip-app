import React, { useEffect } from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/Exclusive/Exclusive.styles';
import { TextStyles, theme } from '@/theme';
import {
  AppImageViewer,
  Card,
  CardHeader,
  CustomLoader,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
} from '@/components';
import {
  faCheck,
  faChevronDown,
  faCircle,
  faEllipsis,
  faLock,
  faPen,
  faPlay,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { NAVIGATION } from '@/constants';
import { Logo } from '@/assets';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Data } from './exclusiveData/exclusiveData';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import {
  deleteExclusivePost,
  getAllExclusivePagination,
  getAllExclusivePost,
  TYPES,
} from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAllExclusiveData } from '@/selectors/PostSelectors';
import { createThumbnail } from 'react-native-create-thumbnail';
import { SwiperViewer } from '@/components/SwiperComponent';
import { BlurView, VibrancyView } from '@react-native-community/blur';

export function Exclusive({ navigation }) {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const user = useSelector(getUser);
  const exclusiveData = useSelector(getAllExclusiveData);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_EXCLUSIVE_POST], state)
  );
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const userType = useSelector(state => state.userType);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [recentFilterOpen, setRecentFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(strings.sortBy.recent);
  const [postData, setPostData] = useState({});
  const [postIndex, setPostIndex] = useState(0);
  const [fetchExclusivePost, setExclusivePost] = useState(true);
  let counter = 1;
  const CheckIcon = (
    <FontAwesomeIcon icon={faCheck} color={theme.light.colors.primary} />
  );

  useEffect(() => {
    const data = {
      userId: user?.id,
      postFilter: sortBy.toLowerCase(),
    };
    dispatch(getAllExclusivePost(data));
  }, [sortBy, focus]);

  const onEditPost = () => {
    setOpen(false);
    // navigation.navigate(NAVIGATION.exclusiveThumbnail)
    navigation.navigate(NAVIGATION.updateExclusivepost, { DATA: postData });
  };
  const isLoadingMore = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_EXCLUSIVE_POST_PAGINATION], state)
  );
  const onRemovePost = () => {
    setOpen(false);
    const data = {
      userId: user?.id,
      postId: postData?.id,
    };

    dispatch(deleteExclusivePost(data));
  };
  const onViewImageVideo = data => {
    setShowImageView(true), setFeedImages(data.postMediaContent);
  };
  const onLoadMorePost = () => {
    const post = exclusiveData.slice(-1);
    const page = post[0].created_at;
    const data = {
      userId: user?.id,
      postFilter: sortBy.toLowerCase(),
      page: page,
    };
    dispatch(getAllExclusivePagination(data));
  };
  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  const onRefresh = () => {
    const data = {
      userId: user?.id,
      postFilter: sortBy.toLowerCase(),
    };
    dispatch(getAllExclusivePost(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Logo />
          <View style={styles.exclusive}>
            <Text style={[TextStyles.header, styles.headerColor]}>
              {' '}
              {strings.exclusive.header}
            </Text>

            <TouchableOpacity
              onPress={() => setRecentFilterOpen(true)}
              style={styles.recentContiner}
            >
              <Text style={styles.recent}>{sortBy}</Text>
              <FontAwesomeIcon
                icon={faChevronDown}
                size={ms(14)}
                color={theme.light.colors.secondary}
                style={styles.recentIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <CustomLoader open={isLoading} /> */}
        <View style={styles.iconContiner}>
          <Icon
            icon={faSearch}
            size={ms(20)}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <Icon
            icon={faBell}
            size={ms(20)}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
          />
        </View>
      </View>
      <HorizontalLine />

      {/* recent */}

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
                <TouchableOpacity
                  style={styles.recentList}
                  onPress={() =>
                    setSortBy(strings.sortBy.recent) &
                    setRecentFilterOpen(false)
                  }
                >
                  {sortBy == `${strings.sortBy.recent}` ? (
                    CheckIcon
                  ) : (
                    <Text> {'   '}</Text>
                  )}
                  <Text style={styles.recentListTxt}>
                    {' '}
                    {strings.exclusive.recent}{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.recentList}
                  onPress={() =>
                    setSortBy(strings.sortBy.today) & setRecentFilterOpen(false)
                  }
                >
                  {sortBy == `${strings.sortBy.today}` ? (
                    CheckIcon
                  ) : (
                    <Text> {'   '}</Text>
                  )}
                  <Text style={styles.recentListTxt}>
                    {' '}
                    {strings.exclusive.popularToday}{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.recentList}
                  onPress={() =>
                    setSortBy(strings.sortBy.week) & setRecentFilterOpen(false)
                  }
                >
                  {sortBy == `${strings.sortBy.week}` ? (
                    CheckIcon
                  ) : (
                    <Text> {'   '}</Text>
                  )}
                  <Text style={styles.recentListTxt}>
                    {' '}
                    {strings.exclusive.popularThisWeek}{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.recentList}
                  onPress={() =>
                    setSortBy(strings.sortBy.month) & setRecentFilterOpen(false)
                  }
                >
                  {sortBy == `${strings.sortBy.month}` ? (
                    CheckIcon
                  ) : (
                    <Text> {'   '}</Text>
                  )}
                  <Text style={styles.recentListTxt}>
                    {' '}
                    {strings.exclusive.popularThisMonth}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <View style={styles.feedContainer}>
        <FlatList
          data={exclusiveData || []}
          // data={Data}
          key={props => props.id}
          ListFooterComponent={renderFooterPost}
          // onRefresh={() => {
          //   setRefreshing(true);
          //   console.log('on refresh');
          // }}
          // refreshing={refreshing}
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NAVIGATION.exclusiveThumbnail, {
                  DATA: item,
                });
              }}
              style={styles.cardContainer}
            >
              {userType.user == `${strings.userType.free}` && item.isVIPonly ? (
                <TouchableOpacity
                  onPress={() =>
                    userType.user == `${strings.userType.free}` &&
                    navigation.navigate(NAVIGATION.upgradeMembership)
                  }
                >
                  <Card>
                    <CardHeader
                      fullName={item?.user?.fullName}
                      userName={item?.user?.username}
                      profilePic={item?.user?.profilePic}
                      time={item?.created_at}
                      userId={item?.userId}
                      showPin={item?.isPinned}
                      isOfficial={true}
                    />
                    <View style={styles.fullNameTxtContainer}>
                      <Text style={styles.fullNameTxt}>{item.postBody}</Text>
                    </View>

                    {item?.postMediaContent?.length > 0 ? (
                      <View style={styles.thumbnailContainer}>
                        <Image
                          blurRadius={5}
                          style={styles.thumbnailImage}
                          source={{
                            uri:
                              item?.postMediaContent[0]?.mimetype?.split(
                                '/'
                              )[0] == 'image'
                                ? item?.postMediaContent[0]?.url
                                : item?.postMediaContent[0]?.cover,
                          }}
                        />
                        <View style={styles.vipOnlyContainer}>
                          <FontAwesomeIcon
                            icon={faLock}
                            size={ms(10)}
                            style={styles.lock}
                          />
                          <Text style={styles.vipOnlyText}>
                            {strings.giveaway.vipOnly}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </Card>
                </TouchableOpacity>
              ) : (
                <Card>
                  <View style={styles.editContainer}>
                    <View style={styles.CardHeaderContainer}>
                      <CardHeader
                        fullName={item?.user?.fullName}
                        userName={item?.user?.username}
                        profilePic={item?.user?.profilePic}
                        time={item?.created_at}
                        userId={item?.userId}
                        showPin={item?.isPinned}
                        isOfficial={true}
                      />
                    </View>

                    {/* Admin */}

                    <View style={styles.cardRightContainer}>
                      <Text style={styles.timeTxt}>{item.time}</Text>
                      {userType.user == `${strings.userType.admin}` && (
                        <Icon
                          icon={faEllipsis}
                          size={ms(15)}
                          onPress={() => {
                            setOpen(true), setPostData(item);
                          }}
                          style={[styles.icon, styles.ellipsisIconColor]}
                        />
                      )}
                    </View>
                  </View>
                  {/* <CardBody text={item.text}/> */}
                  <View style={styles.fullNameTxtContainer}>
                    <Text style={styles.fullNameTxt}>{item.postBody}</Text>
                  </View>
                  {item?.postMediaContent?.length > 0 && (
                    <View style={styles.thumbnailContainer}>
                      {/* Vip only */}
                      {/* <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(NAVIGATION.exclusiveThumbnail)
                    }
                  >
                
                    {userType.user == `${strings.userType.free}` &&
                      item.status == `${strings.userType.free}` ? (
                      <View>
                        <Image
                          blurRadius={15}
                          style={styles.thumbnailImage}
                          source={{
                            uri: item.thumbnail,
                          }}
                        />
                        <View style={styles.vipOnlyContainer}>
                          <FontAwesomeIcon
                            icon={faLock}
                            size={ms(10)}
                            style={styles.lock}
                          />
                          <Text style={styles.vipOnlyText}>
                            {strings.exclusive.vipOnly}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Image
                          style={styles.thumbnailImage}
                          source={{
                            uri: item.thumbnail,
                          }}
                        />
                        <View style={styles.videoPlayContainer}>
                          <FontAwesomeIcon
                            icon={faCircle}
                            size={ms(50)}
                            style={styles.videoPlay}
                          />
                          <FontAwesomeIcon
                            icon={faPlay}
                            size={ms(15)}
                            style={styles.Play}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity> */}
                      <>
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
                                    {data?.mimetype?.split('/')[0] ==
                                    'image' ? (
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
                                        style={[
                                          styles.image,
                                          styles.playButtonBg,
                                        ]}
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
                                        {data?.mimetype?.split('/')[0] ==
                                        'image' ? (
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
                                            style={[
                                              styles.image,
                                              styles.playButtonBg,
                                            ]}
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
                                              data?.mimetype?.split('/')[0] ==
                                              'image'
                                                ? data.url
                                                : data?.cover,
                                          }}
                                          key={counter}
                                          style={[
                                            styles.image,
                                            styles.moreImage,
                                          ]}
                                        >
                                          <TouchableOpacity
                                            onPress={() => {
                                              onViewImageVideo(item);
                                            }}
                                          >
                                            <Text style={styles.extraImage}>
                                              {strings.message.plus}
                                              {item.postMediaContent?.length -
                                                1}
                                            </Text>
                                          </TouchableOpacity>
                                        </ImageBackground>
                                      </TouchableOpacity>
                                    ))
                                  : null
                              )}
                            </View>
                          ))
                        ) : null}
                      </>
                    </View>
                  )}
                </Card>
              )}
            </TouchableOpacity>
          )}
        />
        {/* Admin */}
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            onPress={() => {
              onEditPost();
            }}
            title={strings.operations.edit}
            icon={faPen}
            iconBg={theme.light.colors.infoBgLight}
            iconColor={theme.light.colors.info}
          />
          <ModalList
            onPress={() => {
              onRemovePost();
            }}
            title={strings.operations.remove}
            icon={faTrash}
            iconBg={theme.light.colors.infoBgLight}
            iconColor={theme.light.colors.secondary}
          />
        </ModalDown>
      </View>

      {/* Admin Button */}
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
      {userType.user == `${strings.userType.admin}` && (
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.adminExclusivePost)}
          style={[styles.btn, styles.adminButton]}
        >
          <Text style={[styles.btnTxt, styles.btnTxtColor]}>
            {strings.exclusive.exclusiveButton}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const a = {
  data: [
    {
      created_at: '2023-06-15T05:57:22.575588+00:00',
      downVote: 0,
      downVoteUserId: [Array],
      id: 'f3ae1a17-8d72-41d5-ab53-c3cc2b284f5f',
      isExclusive: true,
      isPinned: false,
      isReported: false,
      isScheduled: false,
      isUSAonly: false,
      isVIPonly: false,
      postBody: '123 official',
      postImg: [Array],
      postMediaContent: [Array],
      postTitle: 'Test',
      postVideo: '[]',
      scheduleDetails: '2023-06-15T05:57:18+00:00',
      shared: 0,
      sharedUserId: [Array],
      upVote: 0,
      upVoteUserId: [Array],
      updated_at: '2023-06-15T05:57:22.575588+00:00',
      user: [Object],
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
    },
    {
      created_at: '2023-06-05T07:56:26.035422+00:00',
      downVote: 0,
      downVoteUserId: [Array],
      id: '5065dc36-4d4f-4f20-90c3-f14c9b3a1055',
      isExclusive: true,
      isPinned: false,
      isReported: false,
      isScheduled: false,
      isUSAonly: false,
      isVIPonly: true,
      postBody:
        'The wait is over! Your offer is coming back this year with more excitement and fun. You gonna love the challenges. ',
      postImg: [Array],
      postMediaContent: [Array],
      postTitle: 'Exclusive Post ',
      postVideo: '[]',
      scheduleDetails: null,
      shared: 0,
      sharedUserId: [Array],
      upVote: 0,
      upVoteUserId: [Array],
      updated_at: '2023-06-05T07:56:26.035422+00:00',
      user: [Object],
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
    },
    {
      created_at: '2023-05-29T08:43:54.527327+00:00',
      downVote: 0,
      downVoteUserId: [Array],
      id: '07af43b6-bb5a-4d06-bcd7-230a5e63776a',
      isExclusive: true,
      isPinned: false,
      isReported: false,
      isScheduled: true,
      isUSAonly: false,
      isVIPonly: false,
      postBody:
        'The wait is over! Your offer is coming bakc this year with more excitement and fun. You gonna love the idopasdoasoidjasdasdasdasd. ',
      postImg: [Array],
      postMediaContent: [Array],
      postTitle: 'Exclusive anouncement',
      postVideo: '[]',
      scheduleDetails: '2023-05-30T10:21:00+00:00',
      shared: 0,
      sharedUserId: [Array],
      upVote: 0,
      upVoteUserId: [Array],
      updated_at: '2023-05-29T08:43:54.527327+00:00',
      user: [Object],
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
    },
    {
      created_at: '2023-05-25T12:04:19.894249+00:00',
      downVote: 0,
      downVoteUserId: [Array],
      id: 'd8bec672-14d1-43c1-bb7e-b2957526c26d',
      isExclusive: true,
      isPinned: false,
      isReported: false,
      isScheduled: true,
      isUSAonly: false,
      isVIPonly: true,
      postBody: 'Working ',
      postImg: [Array],
      postMediaContent: [Array],
      postTitle: 'Testing ',
      postVideo: '[]',
      scheduleDetails: '2023-05-30T10:21:30+00:00',
      shared: 0,
      sharedUserId: [Array],
      upVote: 0,
      upVoteUserId: [Array],
      updated_at: '2023-05-25T12:04:19.894249+00:00',
      user: [Object],
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
    },
    {
      created_at: '2023-05-25T11:18:20.598294+00:00',
      downVote: 0,
      downVoteUserId: [Array],
      id: '1275e94c-b31c-41bc-af59-165259a48e94',
      isExclusive: true,
      isPinned: false,
      isReported: false,
      isScheduled: true,
      isUSAonly: false,
      isVIPonly: true,
      postBody: 'The wait is over! Done',
      postImg: [Array],
      postMediaContent: [Array],
      postTitle: 'Exclusive Post ',
      postVideo: '[]',
      scheduleDetails: '2023-05-30T10:22:00+00:00',
      shared: 0,
      sharedUserId: [Array],
      upVote: 0,
      upVoteUserId: [Array],
      updated_at: '2023-05-25T11:18:20.598294+00:00',
      user: [Object],
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
    },
    {
      created_at: '2023-05-23T11:08:41.407883+00:00',
      downVote: 0,
      downVoteUserId: [Array],
      id: '3d37d2a2-e0e9-4818-b106-13e4d2e5280f',
      isExclusive: true,
      isPinned: false,
      isReported: false,
      isScheduled: true,
      isUSAonly: false,
      isVIPonly: false,
      postBody:
        'The wait is over! Your offer is coming bakc this year with more excitement and fun. You gonna love the challenges. ',
      postImg: [Array],
      postMediaContent: [Array],
      postTitle: 'Exclusive anouncement',
      postVideo:
        '[{"url":"https://d2wwqw32p0xkid.cloudfront.net/photo-1685349841954"}]',
      scheduleDetails: '2023-06-18T08:28:04.405+00:00',
      shared: 0,
      sharedUserId: [Array],
      upVote: 0,
      upVoteUserId: [Array],
      updated_at: '2023-05-23T11:08:41.407883+00:00',
      user: [Object],
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
    },
  ],
};
