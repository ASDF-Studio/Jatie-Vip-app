import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { theme } from '@/theme';
import Moment from 'moment';
import {
  AppImageViewer,
  Card,
  CardBody,
  CustomLoader,
  MediaContainer,
  Timer,
} from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Data } from './giveawayData/activeData';
import { geAllActiveGiveAwayData } from '@/selectors/PostSelectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllActiveGiveaway,
  getAllActiveGiveawayPagination,
  TYPES,
} from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { SwiperViewer } from '@/components/SwiperComponent';
import { useCallback } from 'react';

export default function Active({ navigation, userType }) {
  const user = useSelector(getUser);
  const [open, setOpen] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [fetchActiveGiveaway, setFetchActiveGiveaway] = useState(true);
  const dispatch = useDispatch();
  let counter = 1;
  const getActiveGiveWayData = useSelector(geAllActiveGiveAwayData);
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ACTIVE_GIVEAWAY], state)
  );

  const [index, setIndex] = useState();
  const focus = useIsFocused();

  useEffect(() => {
    getSeconds();
    getactiveData();
  }, []);

  const getactiveData = () => {
    const data = {
      userId: user?.id,
    };
    dispatch(getAllActiveGiveaway(data));
  };

  const onViewImageVideo = (data, index) => {
    setIndex(index);
    setShowImageView(true);
    setFeedImages(data.postMediaContent);
  };

  const isLoadingMore = useSelector(state =>
    isLoadingSelector([TYPES.GET_ACTIVE_GIVEAWAY_PAGINATION], state)
  );
  const onLoadMorePost = () => {
    const post = getActiveGiveWayData.slice(-1);
    const page = post[0].created_at;
    const data = {
      userId: user?.id,
      page: page,
    };
    dispatch(getAllActiveGiveawayPagination(data));
  };
  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  function getSeconds(date) {
    const dateString = date;
    const dateObj = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = dateObj.getTime() - currentTime.getTime();
    const secondsLeft = Math.floor(timeDifference / 1000);
    //   console.log("Seconds left:=-=-=-", secondsLeft);
    return secondsLeft;
  }
  return (
    <>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === 'ios' ? -48 : 0,
          marginBottom: Platform.OS === 'ios' ? -65 : 0,
        }}
      >
        {/* <CustomLoader
            open={isLoading}
          /> */}

        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            size={'large'}
            color={theme.light.colors.primary}
            style={styles.loaderStyle}
          />
        )}
        <FlatList
          data={getActiveGiveWayData ?? []}
          key={props => props.id}
          ListFooterComponent={renderFooterPost}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (!fetchActiveGiveaway) {
              // console.log(onEndReachedCalledDuringMomentum)
              onLoadMorePost();
              setFetchActiveGiveaway(true);
              // onEndReachedCalledDuringMomentum = true;
            }
          }}
          onMomentumScrollBegin={() => {
            setFetchActiveGiveaway(false);
            // onEndReachedCalledDuringMomentum = false;
          }}
          renderItem={({ item, index }) => (
            <View style={styles.FlatListContainer}>
              <Card>
                {console.log(JSON.stringify(item))}
                <View>
                  <Text style={styles.title}>{item.postTitle}</Text>
                </View>
                <Timer item={item} />
                <CardBody text={item.postBody} />
                {/* VIP only */}
                {userType.user == `${strings.userType.free}` &&
                item.isVIPonly ? (
                  <TouchableOpacity
                    onPress={() =>
                      userType.user == `${strings.userType.free}` &&
                      navigation.navigate(NAVIGATION.upgradeMembership)
                    }
                    style={styles.thumbnailContainer}
                  >
                    <Image
                      blurRadius={15}
                      style={styles.thumbnailImage}
                      source={{
                        uri:
                          item?.postMediaContent[0]?.mimetype?.split('/')[0] ==
                          'image'
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
                  </TouchableOpacity>
                ) : (
                  <View style={styles.thumbnailContainer}>
                    {/* {item?.postImg?.map(url => (
                      <>
                        <Image
                          style={styles.thumbnailImage}
                          source={{
                            uri: url
                          }}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(NAVIGATION.giveawayPostDetails)
                          }
                          style={styles.btn}
                        >
                          <Text style={[styles.btnTxt, styles.btnTxtColor]}>
                            {strings.giveaway.learnMore}
                          </Text>
                        </TouchableOpacity>
                      </>
                    ))} */}
                    <>
                      {/* {item?.postImg?.length <= 2 ? (
                        <View style={styles.imageContainer}>
                          {item?.postImg?.map(data => (
                            counter = counter + 1,
                            <TouchableOpacity
                              // key={counter}
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
                      ) : null} */}
                      <MediaContainer
                        contents={item?.postMediaContent}
                        onPress={index => {
                          onViewImageVideo(item, index);
                        }}
                      />
                    </>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(NAVIGATION.giveawayPostDetails, {
                          key: item,
                          DATA: item,
                        })
                      }
                      style={[
                        item?.postMediaContent?.length <= 0
                          ? [
                              styles.btn,
                              {
                                marginVertical: '3%',
                                position: 'relative',
                              },
                            ]
                          : styles.btn,
                      ]}
                    >
                      <Text style={[styles.btnTxt, styles.btnTxtColor]}>
                        {strings.giveaway.learnMore}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Card>
            </View>
          )}
        />
        {/*  image view modal */}
        {showImageView && (
          <SwiperViewer
            visible={showImageView}
            setVisible={() => setShowImageView(false)}
            index={index}
            images={feedImages}
          />
        )}
      </SafeAreaView>
    </>
  );
}

export const styles = StyleSheet.create({
  title: {
    margin: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
  },
  officialTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    textAlign: 'justify',
    backgroundColor: theme.light.colors.primaryBg,
    borderColor: theme.light.colors.primaryBg,
    borderRadius: 20,
    overflow: 'hidden',
    padding: ms(8),
    fontSize: ms(11, 0.3),
    marginHorizontal: ms(15),
    marginBottom: ms(10),
    marginTop: ms(-5),
    paddingLeft: ms(15),
  },
  FlatListContainer: { margin: ms(10) },
  loaderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: ms(50),
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    //  marginBottom: 10
  },
  moreImage: {
    height: ms(200),
    backgroundColor: theme.light.colors.imageOpaicty,
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
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: ms(200),
    marginRight: ms(10),
  },
  playButton: {
    backgroundColor: theme.light.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EndTimeTxt: {
    color: theme.light.colors.black,
  },
  btn: {
    borderRadius: 10,
    padding: ms(8),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    position: 'absolute',
    bottom: '7%',
    left: '3%',
    backgroundColor: theme.light.colors.primary,
    width: ms(130),
  },
  btnTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(14, 0.3),
  },
  btnTxtColor: { color: theme.light.colors.white },
  //vip only

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
  playButtonBg: {
    height: ms(200),
    backgroundColor: theme.light.colors.hyperlink,
    // opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  Play: {
    position: 'absolute',
    color: theme.light.colors.background,
    marginLeft: ms(18),
    marginTop: ms(18),
  },
  vipOnlyText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.background,
    paddingLeft: ms(10),
  },
  lock: {
    color: theme.light.colors.background,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  image: {
    flex: 1,
    width: '85%',
    height: ms(200),
    marginRight: ms(10),
  },
  thumbnailContainer: {
    width: '100%',
    // minHeight: vs(180),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
});


