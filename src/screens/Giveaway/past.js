import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image, ImageBackground, ActivityIndicator
} from 'react-native';
import { theme } from '@/theme';
import { faEllipsis, faLock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CustomLoader, Icon } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { geAllPastGiveAwayData } from '@/selectors/PostSelectors';
import { useEffect } from 'react';
import { getAllPastGiveaway, getAllPastGiveawayPagination, TYPES } from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { useIsFocused } from '@react-navigation/native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Past({ navigation, userType }) {

  const getdataOfPast = useSelector(geAllPastGiveAwayData)
  // console.log('selector data', getdataOfPast)
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [fetchPastGiveaway, setFetchPastGiveaway] = useState(true);
  const user = useSelector(getUser);
  const focus = useIsFocused()

  const dispatch = useDispatch()
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PAST_GIVEAWAY,], state)
  );
  useEffect(() => {
    getPastData()

  }, [])


  const getPastData = () => {
    const data = {
      userId: user?.id,
    }
    dispatch(getAllPastGiveaway(data))
  }
  const onViewImageVideo = (data) => {

    // setShowImageView(true),

    //   setFeedImages(data.postMediaContent)
  }
  const isLoadingMore = useSelector(state =>
    isLoadingSelector([TYPES.GET_PAST_GIVEAWAY_PAGINATION], state)
  );
  const onLoadMorePost = () => {
    const post = getdataOfPast.slice(-1)
    const page = post[0].created_at
    const data = {
      userId: user?.id,
      page: page
    }
    dispatch(getAllPastGiveawayPagination(data))

  }
  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore &&
          <ActivityIndicator size={"large"} color="orange" />

        }

      </View>
    );
  };
  let counter = 1;
  return (
    <SafeAreaView>
      <CustomLoader
        open={isLoading}
      />
      <FlatList
        data={getdataOfPast ?? []}
        key={props => props?.id}
        ListFooterComponent={renderFooterPost}

        // onEndReached={onLoadMorePost}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!fetchPastGiveaway) {
            // console.log(onEndReachedCalledDuringMomentum)
            onLoadMorePost();
            setFetchPastGiveaway(true);
            // onEndReachedCalledDuringMomentum = true;
          }
        }}
        onMomentumScrollBegin={() => {
          setFetchPastGiveaway(false);
          // onEndReachedCalledDuringMomentum = false;
        }}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card>
              <View>
                <Text style={styles.title}>{item?.postTitle} </Text>
              </View>
              <CardBody text={item?.postBody} />


              {/* {item.winner.map(item => {
                if (item == null) {
                  return;
                } else {
                  return (
                    <View style={styles.listContainer} key={item.id}>
                      <View style={styles.leftContainer}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.profileImage}
                        />
                        <View style={styles.nameContainer}>
                          <Text style={styles.nameTxt}> {item.name} </Text>
                          <Text> {item.userName} </Text>
                        </View>
                      </View>
                      <View>
                        <Icon
                          icon={faEllipsis}
                          size={ms(15)}
                          color={theme.light.colors.info}
                          onPress={() => setOpen(true)}
                        />
                      </View>
                    </View>
                  );
                }
              })} */}
              {/* endWinners */}
              {(userType.user == `${strings.userType.free}` &&
                item.isVIPonly) ? (
                <TouchableOpacity
                  onPress={() => userType.user == `${strings.userType.free}` && navigation.navigate(NAVIGATION.upgradeMembership)}

                  style={styles.thumbnailContainer}>
                  <Image
                    blurRadius={15}
                    style={styles.thumbnailImage}
                    source={{
                      uri: item?.postMediaContent[0]?.mimetype?.split("/")[0] == "image" ? item?.postMediaContent[0]?.url : item?.postMediaContent[0]?.cover,
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
                    {item?.postMediaContent?.length <= 2 ? (
                      <View style={styles.imageContainer}>
                        {item?.postMediaContent?.map(data => (
                          counter = counter + 1,
                          <TouchableOpacity
                            activeOpacity={1}
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
                              activeOpacity={1}

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
                                  activeOpacity={1}

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
                              activeOpacity={1}

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
                                  activeOpacity={1}

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

  );
}

const styles = StyleSheet.create({
  //Card some common thing from active.js
  title: {
    margin: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(14, 0.3),
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  EndTimeTxt: {
    color: theme.light.colors.black,
  },
  cardContainer: { margin: ms(10) },
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
  //Common thing end

  //winners
  winners: {
    padding: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.primary,
    fontSize: ms(14, 0.3),
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
  },
  listContainer: {
    padding: ms(2),
    paddingLeft: ms(12),
    paddingRight: ms(20),
    paddingBottom: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: ms(2),
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.light.colors.info,
  },
  nameContainer: {
    paddingLeft: ms(10),
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(15, 0.3),
    color: theme.light.colors.black,
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
    width: '100%',
    height: ms(200),
    marginRight: ms(10),
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
});
