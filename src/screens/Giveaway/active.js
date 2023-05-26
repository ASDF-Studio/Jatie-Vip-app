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
} from 'react-native';
import { theme } from '@/theme';
import { AppImageViewer, Card, CardBody, CustomLoader } from '@/components';
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
import { getAllActiveGiveaway, TYPES } from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { SwiperViewer } from '@/components/SwiperComponent';

export default function Active({ navigation, userType }) {
  const user = useSelector(getUser);
  const [open, setOpen] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const dispatch = useDispatch()
  let counter = 1;
  const getActiveGiveWayData = useSelector(geAllActiveGiveAwayData)
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ACTIVE_GIVEAWAY,], state)
  );

  const focus = useIsFocused()

  useEffect(() => {
    getactiveData()

  }, [])

  const getactiveData = () => {
    const data = {
      userId: user?.id,
    }
    dispatch(getAllActiveGiveaway(data))
  }
  const onViewImageVideo = (data) => {

    setShowImageView(true),

      setFeedImages(data.postMediaContent)
  }
  return (
    <>
      {/*  image view modal */}
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
      <SafeAreaView
        style={{
          marginTop: Platform.OS === 'ios' ? -48 : 0,
          marginBottom: Platform.OS === 'ios' ? -70 : 0,
        }}
      >

        <CustomLoader
          open={isLoading}
        />
        <FlatList
          data={getActiveGiveWayData?.data ?? []}
          key={props => props.id}
          renderItem={({ item, index }) => (
            <View style={styles.FlatListContainer}>
              <Card>
                <View>
                  <Text style={styles.title}>{item.postTitle}</Text>
                </View>
                <View>
                  <Text style={styles.officialTxt}>
                    {strings.giveaway.EndsIn}
                    <Text style={styles.EndTimeTxt}> {item.postExpires}</Text>
                  </Text>
                </View>
                <CardBody text={item.postBody} />

                {/* VIP only */}

                {userType.user == `${strings.userType.free}` &&
                  item.status == `${strings.userType.free}` ? (
                  <View style={styles.thumbnailContainer}>
                    <Image
                      blurRadius={15}
                      style={styles.thumbnailImage}
                      source={{
                        uri: item.photo,
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
                                  uri: data.cover,
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
                                    uri: data.cover,
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
                                    uri: data?.mimetype?.split("/")[0] == "image" ? data.url : data.cover,
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
                            ) : null
                          )}
                        </View>
                      ) : null}
                    </>


                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(NAVIGATION.giveawayPostDetails, {
                          key: {
                            id: item.id,
                            postTitle: item.postTitle,
                            postBody: item.postBody,
                            postExpires: item.postExpires,
                            postImg: item.postImg,
                            has_Joined: item.has_Joined,
                            postMediaContent: item.postMediaContent
                          },
                          DATA: item

                        })
                      }
                      style={[item?.postImg?.length <= 0 ? [styles.btn, { top: '0%', position: 'relative', marginBottom: 20 }] : styles.btn]}
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
    marginLeft: ms(15),
    marginRight: ms(15),
    marginBottom: ms(10),
    marginTop: ms(-5),
    paddingLeft: ms(15),
  },
  FlatListContainer: { margin: ms(10) },
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
    // backgroundColor: theme.light.colors.hyperlink,
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
    textAlign: "center"
  },
  image: {
    flex: 1,
    width: '100%',
    height: ms(200),
    marginRight: ms(10),
  },
  playButton: {
    backgroundColor: theme.light.colors.primary, width: 50, height: 50, borderRadius: 100, justifyContent: "center", alignItems: "center"
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
    top: '70%',
    left: '5%',
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

});
