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
  MediaContainer,
  PopUpAlert,
  NotificationIcon,
  CardBody,
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
  getAllExclusivePostSuccess,
  TYPES,
} from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAllExclusiveData } from '@/selectors/PostSelectors';
import { createThumbnail } from 'react-native-create-thumbnail';
import { SwiperViewer } from '@/components/SwiperComponent';
import { BlurView, VibrancyView } from '@react-native-community/blur';
import { isEmpty } from 'lodash';
import { ExclusivePostController } from '@/controllers/ExclusivePostController';
import { useBackgroundFetch } from '@/hooks';

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
  const [index, setIndex] = useState();
  const isFocused = useIsFocused();
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

  const customReq = () => {
    // console.log('exclusive background fetch');
    const data = {
      userId: user?.id,
      postFilter: sortBy.toLowerCase(),
    };
    ExclusivePostController.getAllExclusivePost(data).then(res => {
      dispatch(getAllExclusivePostSuccess(res));
    });
  };

  useBackgroundFetch({
    callback: customReq,
    isFocused,
  });

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
  const onViewImageVideo = (data, index) => {
    setIndex(index);
    setShowImageView(true);
    setFeedImages(data.postMediaContent);
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
          <View
            style={{
              width: ms(61),
              height: ms(66),
              borderRadius: 100,
              marginLeft: ms(10),
              marginRight: ms(10),
              marginTop: ms(10),
            }}
          >
            <Logo />
          </View>

          <View>
            <Text style={styles.nameTxt}> {strings.exclusive.header}</Text>
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
            size={ms(22)}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <NotificationIcon />
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
            <View style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(NAVIGATION.exclusiveThumbnail, {
                    DATA: item,
                  });
                }}
              >
                {userType.user == `${strings.userType.free}` &&
                item.isVIPonly ? (
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

                      <View>
                        <BlurView
                          style={styles.absolute}
                          blurType="light"
                          overlayColor="transparent"
                          blurAmount={2}
                          reducedTransparencyFallbackColor="white"
                        />
                        <View style={styles.fullNameTxtContainer}>
                          <Text style={styles.fullNameTxt}>
                            {item.postBody}
                          </Text>
                        </View>
                        {item?.postMediaContent?.length > 0 ? (
                          <View style={styles.thumbnailContainer}>
                            <Image
                              // blurRadius={5}
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
                      </View>
                    </Card>
                  </TouchableOpacity>
                ) : (
                  <Card>
                    {/* <View style={styles.editContainer}> */}
                    <View style={styles.CardHeaderContainer}>
                      <CardHeader
                        fullName={item?.user?.fullName}
                        userName={item?.user?.username}
                        profilePic={item?.user?.profilePic}
                        time={item?.created_at}
                        userId={item?.userId}
                        showPin={item?.isPinned}
                        isOfficial={true}
                        showMore={userType.user == `${strings.userType.admin}`}
                        onMorePress={() => {
                          setOpen(true), setPostData(item);
                        }}
                      />
                    </View>

                    {/* Admin */}

                    {/* <View style={styles.cardRightContainer}>
                        <Text style={styles.timeTxt}>{item.time}</Text>
                        {userType.user == `${strings.userType.admin}` && (
                          <Icon
                            icon={faEllipsis}
                            size={ms(15)}
                            style={[styles.icon, styles.ellipsisIconColor]}
                          />
                        )}
                      </View> */}
                    {/* </View> */}
                    {/* <CardBody text={item.text}/> */}
                    <View style={styles.fullNameTxtContainer}>
                      <CardBody text={item?.postBody} isBold={true} />
                      {/* <Text style={styles.fullNameTxt}>{item.postBody}</Text> */}
                    </View>
                    <MediaContainer
                      contents={item?.postMediaContent}
                      onPress={index => {
                        onViewImageVideo(item, index);
                      }}
                    />
                  </Card>
                )}
              </TouchableOpacity>
            </View>
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
          index={index}
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
      {/* {isShowSuccessAlert && ( */}
      {!isEmpty(exclusiveData) && (
        <PopUpAlert
          isOpen={true}
          isSuccess={false}
          title="Sharing Content is Forbidden "
          body="This club is exclusive to members ONLY. If you share content outside of the club, you may be banned."
        />
      )}
      {/* )} */}
    </SafeAreaView>
  );
}
