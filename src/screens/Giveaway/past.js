import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { theme } from '@/theme';
import {
  faEllipsis,
  faFlag,
  faLock,
  faMessage,
  faPlay,
  faTrash,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  CardBody,
  CustomLoader,
  HorizontalLine,
  Icon,
  MediaContainer,
  ModalDown,
  ModalList,
} from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { geAllPastGiveAwayData } from '@/selectors/PostSelectors';
import { useEffect } from 'react';
import {
  getAllPastGiveaway,
  getAllPastGiveawayPagination,
  TYPES,
} from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { useIsFocused } from '@react-navigation/native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ActivityIndicator } from 'react-native';
import { getUserProfileByUserId } from '@/actions/UserActions';
import { SwiperViewer } from '@/components/SwiperComponent';
export default function Past({ navigation, userType }) {
  const getdataOfPast = useSelector(geAllPastGiveAwayData);
  // console.log('selector data', getdataOfPast)
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [fetchPastGiveaway, setFetchPastGiveaway] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const user = useSelector(getUser);
  const focus = useIsFocused();
  const [index, setIndex] = useState();

  const dispatch = useDispatch();
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PAST_GIVEAWAY], state)
  );
  useEffect(() => {
    getPastData();
  }, []);

  const getPastData = () => {
    const data = {
      userId: user?.id,
    };
    dispatch(getAllPastGiveaway(data));
  };
  const onViewImageVideo = data => {
    setIndex(index);
    setShowImageView(true);
    setFeedImages(data.postMediaContent);
  };
  const isLoadingMore = useSelector(state =>
    isLoadingSelector([TYPES.GET_PAST_GIVEAWAY_PAGINATION], state)
  );
  const onLoadMorePost = () => {
    const post = getdataOfPast.slice(-1);
    const page = post[0].created_at;
    const data = {
      userId: user?.id,
      page: page,
    };
    dispatch(getAllPastGiveawayPagination(data));
  };
  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && <ActivityIndicator size={'large'} color="orange" />}
      </View>
    );
  };

  let counter = 1;
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === 'ios' ? -48 : 0,
        marginBottom: Platform.OS === 'ios' ? -65 : 0,
      }}
    >
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          size={'large'}
          color={theme.light.colors.primary}
          style={styles.loaderStyle}
        />
      )}
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
        renderItem={({ item,index }) => (
          <View style={styles.cardContainer}>
            <Card>
              <View>
                <Text style={styles.title}>{item?.postTitle} </Text>
              </View>
              <CardBody text={item?.postBody} />
              {/* {item?.winner_lists?.length > 0 && (
                <View>
                  <Text style={styles.winners}>
                    {strings.giveaway.winners}{' '}
                  </Text>
                </View>
              )}
              {item?.winner_lists?.map(winnerID => {

                if (winnerID == null) {
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
                          onPress={() => setShowUserModal(true)}
                        />
                      </View>
                    </View>
                  );
                }
              })} */}
              {/* endWinners */}
              {userType.user == `${strings.userType.free}` && item.isVIPonly ? (
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
                <MediaContainer contents={item?.postMediaContent}
                onPress={index => {
                  onViewImageVideo(item, index);
                }}
                />
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(NAVIGATION.giveawayPastDetails, {
                    key: {
                      id: item.id,
                      postTitle: item.postTitle,
                      postBody: item.postBody,
                      postExpires: item.postExpires,
                      postImg: item.postImg,
                      has_Joined: item.has_Joined,
                      postMediaContent: item.postMediaContent,
                      isActive: item.isGiveawayActive,
                    },
                    DATA: item,
                  })
                }
                style={[
                  item?.postMediaContent?.length <= 0
                    ? [
                        styles.btn,
                        {
                          top: '0%',
                          position: 'relative',
                          marginBottom: 20,
                        },
                      ]
                    : styles.btn,
                ]}
              >
                <Text style={[styles.btnTxt, styles.btnTxtColor]}>
                  {strings.giveaway.learnMore}
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        )}
      />
      <ModalDown open={showUserModal} setOpen={setShowUserModal}>
        <ModalList
          title={
            user.is_following == true
              ? strings.operations.unFollow + ' @' + user?.username
              : strings.operations.follow + ' @' + user?.username
          }
          icon={faUserPlus}
          iconColor={theme.light.colors.primary}
          iconBg={theme.light.colors.primaryBgLight}
          onPress={() => Alert.alert(strings.giveaway.follow)}
        />
        <ModalList
          title={strings.profile.sendPrivateMessage}
          icon={faMessage}
          iconColor={theme.light.colors.success}
          iconBg={theme.light.colors.successBgLight}
          onPress={() => Alert.alert(strings.giveaway.message)}
        />
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={15}
          paddingBottom={8}
        />
        {/* show only for admin */}
        {userType.user == strings.userType.admin && (
          <ModalList
            title={strings.giveaway.deletePost}
            icon={faTrash}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
            onPress={() => Alert.alert(strings.giveaway.report)}
          />
        )}

        <ModalList
          title={strings.profile.block}
          icon={faXmark}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.blocked)}
        />
        {userType.user == strings.userType.admin && (
          <ModalList
            title={strings.giveaway.ban}
            icon={faFlag}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
            onPress={() => Alert.alert(strings.giveaway.report)}
          />
        )}
      </ModalDown>
      {showImageView && (
          <SwiperViewer
            visible={showImageView}
            setVisible={() => setShowImageView(false)}
            index={index}
            images={feedImages}
          />
        )}
      {/* Admin */}
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
  thumbnailContainer: {
    width: '100%',
    // minHeight: vs(180),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  winners: {
    padding: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.primary,
    fontSize: ms(14, 0.3),
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
  },
});
