import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { Card, CardBody, CardHeader, CustomLoader, TopBackButton } from '@/components';
import { strings } from '@/localization';
import { TextStyles, theme } from '@/theme';
import { faClock, faLock, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Moment from 'moment';
import { FontFamily } from '@/theme/Fonts';
import { Data } from './Data/scheduledPostData';
import { useDispatch, useSelector } from 'react-redux';
import { getSchedulePost, TYPES } from '@/actions/PostActions';
import { getSchedulePostData } from '@/selectors/PostSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useRef } from 'react';
import { getUser } from '@/selectors/UserSelectors';
import { useState } from 'react';
import { SwiperViewer } from '@/components/SwiperComponent';


export default function SchedulePost({ navigation }) {
  const flatListRef = useRef()
  const userType = useSelector(state => state.userType);
  const user = useSelector(getUser);
  const dispatch = useDispatch()
  const postData = useSelector(getSchedulePostData)
  console.log("POSOPOPOPO", postData);
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_SCHEDULE_POST], state)
  );

  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  // useEffect(() => {
  //   dispatch(getSchedulePost())
  // }, [])
  const onLoadMorePost = () => {
    const post = ALLPOST.slice(-1)
    console.log("LAST_POST===", post[0].created_at);
    const page = post[0].created_at
    dispatch(getAllPostPagination(user?.id, sortBy, follwingSwitch, vipArea == `${strings.home.newFeed}` ? false : true, page))
  }
  // const renderFooterPost = () => {
  //   return (
  //     <View style={{}}>
  //       {isLoadingMore &&
  //         <ActivityIndicator size={"large"} color="orange" />

  //       }

  //     </View>
  //   );
  // };
  const onViewImageVideo = (data) => {

    setShowImageView(true),

      setFeedImages(data.postMediaContent)
  }
  let counter = 1;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>

        <TopBackButton
          onPress={() => navigation.goBack()}
          style={styles.TopBackButton}
        />
        <Text style={styles.headerTxt}>{strings.home.scheduledPost} </Text>
      </View>
      {/* <CustomLoader
        open={isLoading}
      /> */}
      {/* <View style={styles.postContainer}>
        <View style={styles.cardContainer}>
          <Card>
            <CardHeader
              fullName={Data.name}
              userName={Data.userName}
              profilePic={Data.profilePic}
              isOfficial={true}
            />
            <CardBody text={Data.txt} />
            <View style={styles.cardFooter}>
              <View style={styles.timeBox}>
                <FontAwesomeIcon
                  icon={faClock}
                  size={ms(13)}
                  color={theme.light.colors.white}
                />
                <Text style={styles.timeTxt}>
                  {' '}
                  {Moment.utc().format('hh:mm A  MMM D, YYYY')}{' '}
                </Text>
              </View>
              <TouchableOpacity style={styles.penIcon}>
                <FontAwesomeIcon
                  icon={faPen}
                  size={ms(13)}
                  color={theme.light.colors.black}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        <View style={styles.sponsordContainer}>
          <Card>
            <ImageBackground
              source={{
                uri: Data.sponsoredPic,
              }}
              style={styles.bgImage}
            />
            <TouchableOpacity style={styles.floaterContainerSponored}>
              <Text style={styles.floaterTxt}>
                {' '}
                {strings.home.sponsordPost}{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.floaterContainer}>
              <Text style={styles.floaterTxt}>{strings.home.learMore} </Text>
            </TouchableOpacity>

            <View style={styles.cardFooter}>
              <View style={styles.timeBox}>
                <FontAwesomeIcon
                  icon={faClock}
                  size={ms(13)}
                  color={theme.light.colors.white}
                />
                <Text style={styles.timeTxt}>
                  {' '}
                  {Moment.utc().format('hh:mm A  MMM D, YYYY')}{' '}
                </Text>
              </View>
              <TouchableOpacity style={styles.penIcon}>
                <FontAwesomeIcon
                  icon={faPen}
                  size={ms(13)}
                  color={theme.light.colors.black}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </View> */}
      <View style={styles.feedContainer}>
        {isLoading ?

          <ActivityIndicator
            animating={isLoading}
            color={theme.light.colors.activeTabIcon}
            size={"large"}
            style={styles.loaderStyle}
          /> :
          <FlatList
            ref={flatListRef}

            // ListFooterComponent={renderFooterPost}
            // onEndReached={() => {

            //   onLoadMorePost();
            //   setFetchFeedPost(true);

            // }}
            // onMomentumScrollBegin={() => {
            //   setFetchFeedPost(false);

            // }}
            extraData={postData ?? []}
            onEndReachedThreshold={0.5}
            data={postData ? postData : []}
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item, index }) => (
              <View style={styles.cardContainer}>

                {(userType.user == `${strings.userType.free}` && vipArea == `${strings.home.vipArea}`) ?


                  <TouchableOpacity

                    onPress={() => userType.user == `${strings.userType.free}` && navigation.navigate(NAVIGATION.upgradeMembership)}
                  >

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
                      <CardBody text={item.postBody} />


                    </Card>
                  </TouchableOpacity>
                  :
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
                    <CardBody text={item.postBody} />
                    {item?.postMediaContent?.length <= 2 ? (
                      <View style={styles.imageContainer}>
                        {item?.postMediaContent?.map(data => (
                          counter = counter + 1,
                          <TouchableOpacity
                            key={counter}
                            style={styles.touchContainer}
                            onPress={() => {
                              onViewImageVideo(item)
                            }}
                          >
                            {data?.mimetype?.split("/")[0] == "image" ? <Image
                              source={{
                                uri: data.url,
                              }}
                              style={styles.image}
                            /> : <ImageBackground
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
                                  onViewImageVideo(item)
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  size={ms(15)}
                                  style={styles.Play}
                                />

                              </TouchableOpacity>
                            </ImageBackground>}


                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : item?.postMediaContent?.length > 2 ? (
                      counter = 1,
                      <View style={styles.imageContainer}>
                        {item?.postMediaContent?.map(data =>
                          counter == 1 ? (
                            counter = counter + 1,
                            <TouchableOpacity
                              key={counter}
                              style={styles.touchContainer}
                              onPress={() => {
                                onViewImageVideo(item)
                              }}
                            >
                              {data?.mimetype?.split("/")[0] == "image" ? <Image
                                source={{
                                  uri: data.url,
                                }}
                                style={styles.image}
                              /> : <ImageBackground
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
                                    onViewImageVideo(item)
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlay}
                                    size={ms(15)}
                                    style={styles.Play}
                                  />

                                </TouchableOpacity>
                              </ImageBackground>}
                            </TouchableOpacity>
                          ) : counter == 2 ? (
                            counter = counter + 1,
                            <TouchableOpacity
                              key={counter}
                              style={styles.touchContainer}
                              onPress={() => {
                                onViewImageVideo(item)
                              }}
                            >
                              <ImageBackground
                                source={{
                                  uri: data?.mimetype?.split("/")[0] == "image" ? data.url : data?.cover,
                                }}
                                key={counter}
                                style={[styles.image, styles.moreImage]}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    onViewImageVideo(item)
                                  }}
                                >
                                  <Text style={styles.extraImage}>
                                    {strings.message.plus}
                                    {item.postMediaContent?.length - 1}
                                  </Text>

                                </TouchableOpacity>


                              </ImageBackground>
                            </TouchableOpacity>
                          ) : null
                        )}
                      </View>
                    ) : null}

                    <View style={styles.cardFooter}>
                      <View style={styles.timeBox}>
                        <FontAwesomeIcon
                          icon={faClock}
                          size={ms(13)}
                          color={theme.light.colors.white}
                        />
                        <Text style={styles.timeTxt}>
                          {' '}
                          {Moment.utc(item.created_at).format('hh:mm A  MMM D, YYYY')}{' '}
                        </Text>
                      </View>
                      {/* <TouchableOpacity style={styles.penIcon}>
                        <FontAwesomeIcon
                          icon={faPen}
                          size={ms(13)}
                          color={theme.light.colors.black}
                        />
                      </TouchableOpacity> */}
                    </View>

                  </Card>
                }
              </View>
            )}
          />
        }
      </View>
      {showImageView && (
        <SwiperViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    padding: ms(10),
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(5),
    },
  ],
  postContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight, //
    padding: ms(9),
  },
  cardContainer: {
    marginTop: ms(10),
  },
  TopBackButton: {
    padding: ms(5),
    paddingBottom: ms(10),
  },
  sponsordContainer: {
    marginTop: ms(10),
  },
  cardFooter: {
    backgroundColor: theme.light.colors.infoBgLight,
    padding: ms(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.light.colors.info,
    borderRadius: 10,
    padding: ms(3),
    paddingLeft: ms(8),
    paddingRight: ms(8),
  },
  penIcon: {
    marginRight: ms(9),
  },
  timeTxt: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.Recoleta_semibold,
    paddingLeft: ms(2),
    fontSize: ms(13, 0.3),
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
    bottom: ms(30),
  },
  floaterContainerSponored: {
    position: 'absolute',
    backgroundColor: theme.light.colors.black,
    padding: ms(5),
    borderRadius: 10,
    margin: ms(10),
    right: ms(8),
  },
  floaterTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.white,
  },
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
    // backgroundColor: theme.light.colors.hyperlink,
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
  playButton: {
    backgroundColor: theme.light.colors.primary, width: 50, height: 50, borderRadius: 100, justifyContent: "center", alignItems: "center"
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
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    //  marginBottom: 10
  },
  vipOnlyContainer: {
    backgroundColor: theme.light.colors.primary,
    width: ms(100),
    height: vs(25),
    borderRadius: 6,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(10),
    top: '42%',
    left: '38%',

    // marginLeft: '43%',
    // marginTop: '22%',
  },
  vipOnlyText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.background,
    paddingLeft: ms(10),
  },
  lock: {
    color: theme.light.colors.background,
  },
  thumbnailContainer: {
    width: '100%',
    height: vs(180),
  },
});
