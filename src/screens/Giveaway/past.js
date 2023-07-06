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
import { faEllipsis, faFlag, faLock, faMessage, faPlay, faTrash, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CustomLoader, HorizontalLine, Icon, ModalDown, ModalList } from '@/components';
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
export default function Past({ navigation, userType }) {
  const getdataOfPast = useSelector(geAllPastGiveAwayData);
  // console.log('selector data', getdataOfPast)
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [fetchPastGiveaway, setFetchPastGiveaway] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false)
  const user = useSelector(getUser);
  const focus = useIsFocused();

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
    // setShowImageView(true),
    //   setFeedImages(data.postMediaContent)
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
        renderItem={({ item }) => (
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
                <MediaContainer contents={item?.postMediaContent} />
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

const a = {
  data: [
    {
      id: '609cb5b1-33f0-4278-a52a-62a14ab23be6',
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
      postTitle: '',
      postBody: 'Desk setup for 2023 Testing',
      postImg: [],
      postVideo: '[]',
      postMediaContent: [
        {
          id: 10,
          url: 'https://d2wwqw32p0xkid.cloudfront.net/photo-1685347379632',
          mimetype: 'image/jpeg',
          cover: '',
        },
      ],
      isExclusive: false,
      isGiveaway: true,
      isGiveawayActive: false,
      isPinned: false,
      isReported: false,
      isUSAonly: false,
      isVIPonly: false,
      upVote: 0,
      upVoteUserId: [],
      downVote: 1,
      downVoteUserId: ['043b316e-1f48-4353-a451-4b8942237708'],
      shared: 0,
      sharedUserId: [],
      postExpires: '2023-06-26T11:57:19+00:00',
      created_at: '2023-05-25T08:31:42.300487+00:00',
      updated_at: '2023-05-25T08:31:42.300487+00:00',
      giveaway_participants: [
        {
          participantId: 'b9902993-ca3f-4a2f-9de8-397bf6f4767e',
          participantRank: 0,
          user: {
            id: 'b9902993-ca3f-4a2f-9de8-397bf6f4767e',
            username: 'vipUser001',
            fullName: 'Chris Holland1',
            profilePic:
              'https://d2wwqw32p0xkid.cloudfront.net/photo-1685424207848.jpg',
          },
        },
      ],
      winner_lists: [
        {
          id: '44bb9b27-35a0-41e4-81dd-966feb308aac',
          winnerList: [],
          giveawayId: '609cb5b1-33f0-4278-a52a-62a14ab23be6',
        },
      ],
      has_Joined: true,
    },
    {
      id: '5a5afe32-ccb2-45bc-9d2b-9ad6bc9f9041',
      userId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
      postTitle: 'Giveaway for this month!',
      postBody:
        'The wait is over! Your giveaway is coming bakc this year with more excitement and fun. You gonna love the challenges. ',
      postImg: ['https://d2wwqw32p0xkid.cloudfront.net/photo-1684838431855'],
      postVideo:
        '[{"url":"https://d2wwqw32p0xkid.cloudfront.net/photo-1685104437346","cover":"https://d2wwqw32p0xkid.cloudfront.net/photo-1685104437609"}]',
      postMediaContent: [
        {
          url: 'https://d2wwqw32p0xkid.cloudfront.net/photo-1685349841954',
          mimetype: 'video/mp4',
          cover: 'https://d2wwqw32p0xkid.cloudfront.net/photo-1685349852423',
        },
      ],
      isExclusive: false,
      isGiveaway: true,
      isGiveawayActive: false,
      isPinned: false,
      isReported: false,
      isUSAonly: true,
      isVIPonly: true,
      upVote: 0,
      upVoteUserId: [],
      downVote: 0,
      downVoteUserId: [],
      shared: 0,
      sharedUserId: [],
      postExpires: '2023-05-17T08:28:04.405+00:00',
      created_at: '2023-05-23T10:40:31.941029+00:00',
      updated_at: '2023-05-23T10:40:31.941029+00:00',
      giveaway_participants: [
        {
          participantId: '043b316e-1f48-4353-a451-4b8942237708',
          participantRank: 0,
          user: {
            id: '043b316e-1f48-4353-a451-4b8942237708',
            username: 'mantu.kumar',
            fullName: 'Mantu',
            profilePic:
              'https://d2wwqw32p0xkid.cloudfront.net/photo-1680687126672.jpg',
          },
        },
        {
          participantId: 'b9902993-ca3f-4a2f-9de8-397bf6f4767e',
          participantRank: 0,
          user: {
            id: 'b9902993-ca3f-4a2f-9de8-397bf6f4767e',
            username: 'vipUser001',
            fullName: 'Chris Holland1',
            profilePic:
              'https://d2wwqw32p0xkid.cloudfront.net/photo-1685424207848.jpg',
          },
        },
        {
          participantId: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
          participantRank: 0,
          user: {
            id: '6aae7065-5341-45b1-b717-0c3e3256dc2f',
            username: 'jatieVIP',
            fullName: 'JatieVIP',
            profilePic:
              'https://d2wwqw32p0xkid.cloudfront.net/photo-1679288548479.jpg',
          },
        },
      ],
      winner_lists: [
        {
          id: '8638f9e9-4585-45b7-b893-01744822f7ac',
          winnerList: ['043b316e-1f48-4353-a451-4b8942237708'],
          giveawayId: '5a5afe32-ccb2-45bc-9d2b-9ad6bc9f9041',
        },
      ],
      has_Joined: true,
    },
  ],
};
