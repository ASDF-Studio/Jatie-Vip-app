import React, { useEffect, useState } from 'react';
import { strings } from '@/localization';
import { theme, TextStyles } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import {
  faCheck,
  faChevronDown,
  faFlag,
  faImage,
  faMessage,
  faThumbsUp,
  faTrash,
  faUserPlus,
  faXmark,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  AppImageViewer,
  AppSwitch,
  AppVideoPlayer,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  PopUp,
  ReportOnPostModal,
  SeeSchedulePost,
  ShareFeed,
  StatusNavigatorBar,
  Toast,
  TopBackButton,
  VerticalLine,
} from '@/components';
import { Logo } from '@/assets';
import { Data } from './Data/HomeData';
import { faBell, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { UserController } from '@/controllers';
import { useIsFocused } from "@react-navigation/native";
import { getUser } from '@/selectors/UserSelectors';
import { navigationRef } from '@/navigation/RootNavigation';
import { getAllPost, TYPES, getAllPinPost, deletePost } from '@/actions/PostActions';
import { CustomLoader } from '@/components';
import { getAllPostData } from '@/selectors/PostSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function Home({ navigation }) {
  const ALLPOST = useSelector(getAllPostData)
  const userType = useSelector(state => state.userType);
  const user = useSelector(getUser);
  const dispatch = useDispatch()
  const [vipArea, setVipArea] = useState(strings.home.vipArea);
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [recentFilterOpen, setRecentFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(strings.sortBy.recent);
  const [follwingSwitch, setFollowingSwtich] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [reportListOpen, setReportListOpen] = useState(false);
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Hurrasment', value: 'Bullying' },
    { label: 'Sparm', value: 'Sparm' },
    { label: 'Misleading information or Fake News', value: 'Misleading' },
  ]);

  const [reportOptionValue, setReportOptionValue] = useState('');
  const [reportComment, setReportCommnet] = useState('');
  const [allPinnedPost, setAllPinnedPost] = useState([]);
  const [allPost, setAllPost] = useState(ALLPOST?.data ? ALLPOST.data : []);
  const [postUserId, setPostUserId] = useState(null);
  const [postId, setpostId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImg, setPostImg] = useState([]);

  // for delete
  const [openReplace, setReplace] = useState(false);

  const focus = useIsFocused();

  useEffect(() => {
    if (focus == true) {
      // dispatch(getAllPinPost())
      dispatch(getAllPost())
    }
  }, [focus]);
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_POST], state)
  );

  const onDelete = () => {
    dispatch(deletePost(postId, postUserId, user?.id, userType.user, NAVIGATION.home));
  }
  // const onUpVote = async (id, postUserID, likeUserID) => {
  //   //  const data = await UserController.upVote(id, postUserID, likeUserID);
  //   // getAllPost();
  //   // getAllPinnedPost();
  // }

  // const onDownVote = async (id, postUserID, likeUserID) => {
  //   const data = await UserController.downVote(id, postUserID, likeUserID);
  //   getAllPost();
  //   // getAllPinnedPost();
  // }
  let counter = 1;
  let DATA = {
    postId, postTitle, postBody, postImg
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.userPic}>
            <Logo />
          </View>
          <View>
            <Text style={styles.nameTxt}> {strings.home.newFeed}</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.recent}
                onPress={() => setRecentFilterOpen(true)}
              >
                <Text style={styles.recentTxt}> {sortBy} </Text>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={ms(14)}
                  color={theme.light.colors.secondary}
                />
              </TouchableOpacity>
              <VerticalLine />
              <View style={styles.recent}>
                <Text style={styles.recentTxt}>
                  {' '}
                  {strings.home.followingOnly}{' '}
                </Text>
                <AppSwitch
                  value={follwingSwitch}
                  onChange={setFollowingSwtich}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Icon
            icon={faSearch}
            size={ms(22)}
            onPress={() => navigation.navigate(NAVIGATION.search)}
            style={styles.searchIcon}
          />
          <Icon
            icon={faBell}
            size={ms(22)}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
            style={styles.bellIcon}
          />
        </View>
      </View>
      <StatusNavigatorBar
        title1={strings.home.newFeed}
        title2={strings.home.vipArea}
        key1={strings.home.vipArea}
        key2={strings.home.newFeed}
        status={vipArea}
        setStatus={setVipArea}
        showLock={userType.user == `${strings.userType.free}` ? true : false}
      />
      <HorizontalLine />
      {/* {console.log(allPost.Admin_Post)} */}
      {/* feed list */}
      <View style={styles.feedContainer}>
        {isLoading ?

          <ActivityIndicator
            animating={isLoading}
            color={theme.light.colors.activeTabIcon}
            size={"large"}
            style={styles.loaderStyle}
          /> :
          <FlatList
            ListHeaderComponent={
              <View>
                <ShareFeed onPress={() => navigation.navigate(NAVIGATION.post)} />
                {userType.user == `${strings.userType.admin}` && (
                  <SeeSchedulePost
                    title={strings.home.seeSchedulePost}
                    navigation={navigation}
                  // path={SeeSchedulePost}
                  />
                )}
                {/* {allPinnedPost ? (
                <FlatList
                  data={allPinnedPost.data}
                  key={props => props.id}
                  listKey={counter}
                  renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                      <Card>
                        <CardHeader
                          fullName={item.Admin_Post.user.fullName}
                          userName={item.Admin_Post.user.username}
                          profilePic={item.Admin_Post.user.profilePic}
                          time={item.Admin_Post.created_at}
                          isOfficial={false}
                          showPin={true}
                        />
                        <CardBody text={item.Admin_Post.postBody} />
                        {item.postImg.length <= 2 ? (
                          <View style={styles.imageContainer}>
                            {item?.Admin_Post.postImg?.map(data => (
                              counter = counter + 1,
                              <TouchableOpacity
                                key={counter}
                                style={styles.touchContainer}
                                onPress={() => {
                                  setShowImageView(true),
                                    setFeedImages(item.Admin_Post.postImg)
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
                        ) : item.Admin_Post.postImg.length > 2 ? (
                          counter = 1,
                          <View style={styles.imageContainer}>
                            {item?.Admin_Post.postImg?.map(data =>
                              counter == 1 ? (
                                counter = counter + 1,
                                <TouchableOpacity
                                  key={counter}
                                  style={styles.touchContainer}
                                  onPress={() => {
                                    setShowImageView(true),
                                      setFeedImages(item.Admin_Post.postImg);
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
                                      setFeedImages(item.Admin_Post.postImg);
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
                                          setFeedImages(item.Admin_Post.postImg);
                                      }}
                                    >
                                      <Text style={styles.extraImage}>
                                        {strings.message.plus}
                                        {item.Admin_Post.postImg.length - 1}
                                      </Text>
                                    </TouchableOpacity>
                                  </ImageBackground>
                                </TouchableOpacity>
                              ) : null
                            )}
                          </View>
                        ) : null}
                        <CardFooter
                          likePress={() => onUpVote(item.id, item.userId, user?.id)}
                likeCount={item.upVote}
                disLikePress={() => onDownVote(item.id, item.userId, user?.id)}
                disLikeCount={item.downVote}
                          commentCount={5}
                          morePress={() => {
                            setOpen(true);
                            setPostUserId(item.userId);
                            setpostId(item.id);
                            setPostTitle(item.postTitle)
                            setPostBody(item.postBody);
                            setPostImg(item.postImg);
                          }}
                        />
                      </Card>
                    </View>
                  )}
                />
              ) : null} */}

                {allPost.Admin_Post ? (
                  <FlatList
                    data={allPost.Admin_Post}
                    key={counter}
                    renderItem={({ item, index }) => (
                      <View style={styles.cardContainer}>
                        <Card>
                          <CardHeader
                            fullName={item?.user?.fullName}
                            userName={item?.user?.username}
                            profilePic={item?.user?.profilePic}
                            time={item?.created_at}
                            isOfficial={true}
                            showPin={false}
                          />
                          <CardBody text={item?.postBody} />
                          {item?.postImg?.length <= 2 ? (
                            <View style={styles.imageContainer}>
                              {item?.postImg?.map(data => (
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
                                        setFeedImages(item.postImg);
                                      console.log(item.postImg)
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
                                        setFeedImages(item.postImg);
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
                                            setFeedImages(item.postImg);
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
                          ) : null}
                          <CardFooter

                            likePress={() => onUpVote(item?.id, item?.userId, user?.id,)}
                            disLikePress={() => onDownVote(item?.id, item?.userId, user?.id)}
                            postID={item.id}
                            postUserID={item.userId}
                            userID={user?.id}
                            likeCount={item?.upVote}
                            disLikeCount={item?.downVote}
                            commentPress={() => navigationRef.navigate(NAVIGATION.comments)}
                            commentCount={5}
                            morePress={() => {
                              setOpen(true);
                              setPostUserId(item?.userId);
                              setpostId(item?.id);
                              setPostTitle(item?.postTitle)
                              setPostBody(item?.postBody);
                              setPostImg(item?.postImg);
                            }}
                          />
                        </Card>
                      </View>
                    )}
                  />
                ) : null}
              </View>
            }
            data={allPost.Regular_Post}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Card>
                  <CardHeader
                    fullName={item?.user?.fullName}
                    userName={item?.user?.username}
                    profilePic={item?.user?.profilePic}
                    time={item?.created_at}
                  // isOfficial={item.isOffical}
                  // showPin={true}
                  />
                  <CardBody text={item.postBody} />

                  {/* video */}
                  {/* {item.video ? (
                  <AppVideoPlayer url={item.video} poster={item.poster} />
                ) : null} */}
                  {/* images */}
                  {item?.postImg?.length <= 2 ? (
                    <View style={styles.imageContainer}>
                      {item?.postImg?.map(data => (
                        counter = counter + 1,
                        <TouchableOpacity
                          key={counter}
                          style={styles.touchContainer}
                          onPress={() => {
                            setShowImageView(true),
                              setFeedImages(item.postImg)
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
                                setFeedImages(item.postImg);
                              // console.log(feedImages)
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
                                setFeedImages(item.postImg);
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
                                    setFeedImages(item.postImg);
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
                  ) : null}
                  <CardFooter
                    likePress={() => onUpVote(item.id, item.userId, user?.id)}
                    disLikePress={() => onDownVote(item.id, item.userId, user?.id)}
                    postID={item.id}
                    postUserID={item?.userId}
                    userID={user?.id}
                    likeCount={item?.upVote}
                    disLikeCount={item?.downVote}
                    commentCount={5}
                    commentPress={() => navigation.navigate(NAVIGATION.comments)}
                    morePress={() => {
                      setOpen(true);
                      setPostUserId(item?.userId);
                      setpostId(item?.id);
                      setPostTitle(item?.postTitle)
                      setPostBody(item?.postBody);
                      setPostImg(item?.postImg);
                    }}
                  />
                </Card>
                {/* sponsored post
              {item.sponsored ? (
                <View style={styles.sponsordContainer}>
                  <Card>
                    <Image
                      source={{
                        uri: item.sponsored,
                      }}
                      style={styles.bgImage}
                    />
                    <TouchableOpacity style={styles.floaterContainerSponsord}>
                      <Text style={styles.floaterTxt}>
                        {' '}
                        {strings.home.sponsordPost}{' '}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.floaterContainer}>
                      <Text style={styles.floaterTxt}>
                        {strings.home.learMore}{' '}
                      </Text>
                    </TouchableOpacity>
                  </Card>
                </View>
              ) : null} */}
              </View>
            )}
          />
        }
      </View>

      {/* post filter modal */}
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
                    {strings.home.recent}{' '}
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
                    {strings.home.popularToday}{' '}
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
                    {strings.home.popularThisWeek}{' '}
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
                    {strings.home.popularThisMonth}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/*  image view modal */}
      {showImageView && (
        <AppImageViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
        />
      )}
      {/*  Slide up for follow, edit , review  */}
      {open && (
        (postUserId == user?.id ? (
          <ModalDown open={open} setOpen={setOpen}>
            <ModalList
              title={strings.profile.editPost}
              icon={faPen}
              iconBg={theme.light.colors.infoBgLight}
              iconColor={theme.light.colors.info}
              onPress={() => {
                navigationRef.navigate(NAVIGATION.updatePost, {
                  prevData: { DATA },
                }), setOpen(false);
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
              onPress={() => { setReplace(true), setOpen(false) }}
            />
          </ModalDown>
        ) :
          <ModalDown open={open} setOpen={setOpen}>
            <ModalList
              title={strings.operations.follow + strings.home.DummyUser}
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
                <ModalList
                  title={strings.home.report}
                  icon={faFlag}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                  onPress={() => {
                    setOpenReport(true);
                    setOpen(false);
                  }}
                />
                <ModalList
                  title={strings.operations.block + strings.home.DummyUser}
                  icon={faXmark}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                />
              </>
            ) : userType.user == `${strings.userType.admin}` ? (
              <>
                <ModalList
                  title={strings.home.deletePost}
                  icon={faTrash}
                  iconColor={theme.light.colors.secondary}
                  iconBg={theme.light.colors.infoBgLight}
                  onPress={() => { setReplace(true), setOpen(false) }}
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
            <Icon
              icon={faImage}
              size={ms(22)}
              color={theme.light.colors.secondary}
            />
            <Button
              title={strings.operations.submit}
              disabled={reportComment.length ? false : true}
              opacity={reportComment.length ? 1 : 0.4}
              style={styles.reportPostButton}
              onPress={() => {
                setOpenToast(true), setOpenReport(false);
              }}
            />
          </View>
        </View>
      </ReportOnPostModal>
      {openToast && (
        <Toast
          open={openToast}
          setOpen={setOpenToast}
          icon={faThumbsUp}
          message={strings.home.reportMessage}
          onPressOk={setOpenToast}
        />
      )}
    </SafeAreaView>
  );
}

const CheckIcon = (
  <FontAwesomeIcon icon={faCheck} color={theme.light.colors.primary} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(8),
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
  bellIcon: { marginLeft: ms(10) },
  cardContainer: {
    margin: ms(8),
    borderRadius: 10,
  },
  nameTxt: [
    TextStyles.header,
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
    flex: 1,
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
    alignSelf: "center", justifyContent: "center", marginTop: ms(50)
  }
});
