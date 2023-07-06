import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  AppVideoPlayer,
  Button,
  Card,
  CardBody,
  CustomLoader,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  PopUpAlert,
  Timer,
  TopBackButton,
} from '@/components';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { item } from './giveawayData/postDetailsData';
import {
  deleteGiveaway,
  endGiveaway,
  getAllActiveGiveaway,
  joinGiveAway,
  TYPES,
  WithDrawAway,
  withDrawGiveAwaySuccess,
} from '@/actions/PostActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import {
  isLoadingSelector,
  successSelector,
} from '@/selectors/StatusSelectors';
import {
  faEllipsis,
  faFlag,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NAVIGATION } from '@/constants';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
// import { useBlinker } from '@/hooks';

export default function PostDetails({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params.key;
  const giveAwayId = data.id;
  const user = useSelector(getUser);
  const userType = useSelector(state => state.userType);
  const [showAlert, setShowAlert] = useState(true);
  // const { blink } = useBlinker();

  const [active, setActive] = useState(false);
  const [disabledJoin, setDisabledJoin] = useState(data?.has_Joined);
  const [open, setOpen] = useState(false);

  const joinGiveAwayLoading = useSelector(state =>
    isLoadingSelector([TYPES.JOIN_GIVEAWAY], state)
  );
  const withdrawGiveAwayLoading = useSelector(state =>
    isLoadingSelector([TYPES.WITHDRAW_GIVEAWAY], state)
  );

  const isShowSuccessAlert = useSelector(state =>
    successSelector([TYPES.JOIN_GIVEAWAY], state)
  );

  const joinGiveAwayhandlePress = () => {
    const data = {
      giveawayId: giveAwayId,
      participantId: user?.id,
      userId: user?.id,
    };
    dispatch(joinGiveAway(data));
  };

  const WithdrawGiveAwayhandlePress = () => {
    const data = {
      giveawayId: giveAwayId,
      participantId: user?.id,
      userId: user?.id,
    };
    dispatch(WithDrawAway(data));
  };
  const onEndGiveaway = () => {
    const DATA = {
      giveawayId: data?.id,
    };
    // console.log('participant id', DATA);
    dispatch(endGiveaway(DATA));
  };
  const onDeleteGiveaway = () => {
    const DATA = {
      id: data?.id,
      userId: user?.id,
    };
    dispatch(deleteGiveaway(DATA));
  };
  function getSeconds(date) {
    const dateString = date;
    const dateObj = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = dateObj.getTime() - currentTime.getTime();
    const secondsLeft = Math.floor(timeDifference / 1000);
    return secondsLeft;
  }

  return (
    <SafeAreaView style={styles.contianer}>
      <CustomLoader
        open={active ? withdrawGiveAwayLoading : joinGiveAwayLoading}
      />
      {/* <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.headerText, TextStyles.header]}>
          {data.postTitle}
        </Text>
        {userType.user == `${strings.userType.admin}` && (
          <Icon
            icon={faEllipsis}
            size={ms(15)}
            onPress={() => setOpen(true)}
            style={[styles.icon, styles.iconDasign]}
          />
        )}
      </View> */}
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <View style={styles.adminoOption}>
          <Text style={[styles.headerText, TextStyles.header]}>
            {data?.postTitle}
          </Text>
          {/* Admin */}

          {userType.user == `${strings.userType.admin}` && (
            <Icon
              icon={faEllipsis}
              size={ms(15)}
              onPress={() => setOpen(true)}
              style={[styles.icon, styles.iconDasign]}
            />
          )}
        </View>
      </View>
      <View style={styles.postContainer}>
        <ScrollView>
          <View style={styles.feedContainer}>
            <Card>
              <View>
                <Text style={styles.title}> {data.postTitle} </Text>
              </View>
              <Timer item={data} />
              <CardBody text={data.postBody} />
              {link(item.link)}
              <CardBody text={item.MoreDesc} />
              <Text style={styles.EndTimeTxt}>
                {/* {item.postExpires} */}
              </Text>
              <View style={styles.thumbnailContainer}>
                {/* map function for images */}
                {data.postMediaContent.map(item => {
                  return (
                    <View>
                      {item?.mimetype?.split('/')[0] == 'image' ? (
                        <Image
                          style={[styles.thumbnailImage, { marginVertical: 5 }]}
                          source={{
                            uri: item.url,
                          }}
                        />
                      ) : (
                        <AppVideoPlayer url={item.url} poster={item.cover} />
                      )}
                    </View>
                  );
                })}
                <View>
                  <View>
                    {/* <View style={styles.PostButtonContainer}>
                    <TouchableOpacity>
                      <Button onPress={() => { joinGiveAwayhandlePress(), setActive(false) }}
                        title={strings.giveaway.joinThisGiveaway}
                        style={styles.joinBtn} />

                    </TouchableOpacity>
                  </View> */}
                  {!disabledJoin && (
                    <View style={styles.termsAndConsition}>
                      {termsAndCondition(
                        strings.giveaway.byJoining,
                        strings.giveaway.termsAndConsition
                      )}
                    </View>
                  )}
                </View>

                {disabledJoin && (
                  <View style={styles.PostButtonContainer}>
                    <TouchableOpacity>
                      <Button
                        onPress={() => {
                          WithdrawGiveAwayhandlePress(),
                            setActive(true),
                            setDisabledJoin(false);
                        }}
                        title={strings.giveaway.withdrawFromThisGiveaway}
                        style={styles.withdrawBtn}
                        textStyle={{
                          color: theme.light.colors.primary,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <View>
                  {!disabledJoin && (
                    <View style={styles.PostButtonContainer}>
                      <TouchableOpacity disabled={disabledJoin}>
                        <Button
                          // disabled={data?.has_Joined}
                          disabled={disabledJoin}
                          onPress={() => {
                            joinGiveAwayhandlePress(),
                              setActive(false),
                              setDisabledJoin(true);
                          }}
                          title={strings.giveaway.joinThisGiveaway}
                          style={disabledJoin ? styles.outOfUS : styles.joinBtn}
                          textStyle={{
                            color: theme.light.colors.background,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.termsAndConsition}>
                    {/* for US users only */}
                    {/* {termsAndCondition(strings.giveaway.onlyUS)} */}
                  </View>
                </View>
              </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
      <ModalDown open={open} setOpen={setOpen}>
        <ModalList
          onPress={() => {
            navigation.navigate(NAVIGATION.updateGiveawayPost, { DATA: data }),
              setOpen(false);
          }}
          title={strings.giveaway.editGiveaway}
          icon={faPen}
          iconBg={theme.light.colors.infoBgLight}
          iconColor={theme.light.colors.info}
        />
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={15}
          paddingBottom={8}
        />
        <ModalList
          onPress={() => {
            onEndGiveaway(), setOpen(false);
          }}
          title={strings.giveaway.endNow}
          icon={faFlag}
          iconBg={theme.light.colors.infoBgLight}
          iconColor={theme.light.colors.secondary}
        />
        <ModalList
          onPress={() => {
            onDeleteGiveaway(), setOpen(false);
          }}
          title={strings.giveaway.removeThisGiveaway}
          icon={faTrash}
          iconBg={theme.light.colors.infoBgLight}
          iconColor={theme.light.colors.secondary}
        />
      </ModalDown>
    </SafeAreaView>
  );
}

const termsAndCondition = (text, link) => {
  return (
    <View>
      <Text style={[TextStyles.text, styles.termsAndConsitionText]}>
        {text}
        <Text
          style={styles.termsTextDesign}
          onPress={() => {
            Linking.openURL(link);
          }}
        >
          {link}
        </Text>
      </Text>
    </View>
  );
};

const link = link => {
  return (
    <Text
      style={styles.linkTextDesign}
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      {link}
    </Text>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  header: {
    padding: ms(15),
    backgroundColor: theme.light.colors.white,
  },
  headerIcon: {
    color: theme.light.colors.info,
  },
  headerText: {
    marginTop: vs(10),
    color: theme.light.colors.black,
  },
  postContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  feedContainer: {
    margin: ms(10),
  },
  PostButtonContainer: {
    margin: ms(10),
    marginBottom: ms(0),
    marginHorizontal: ms(10),
    marginTop: ms(10)
  },
  termsAndConsition: {
    paddingLeft: ms(20),
    paddingRight: ms(20),
    paddingBottom: ms(20),
  },

  //Card some common thing from active.js
  title: {
    margin: ms(10),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
  },
  timeLable: {
    fontFamily: FontFamily.Recoleta_medium,
    textAlign: 'justify',
    backgroundColor: theme.light.colors.primaryBg,
    borderRadius: 20,
    padding: ms(8),
    fontSize: ms(11, 0.3),
    margin: ms(10),
    paddingLeft: ms(10),
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
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
  //Common thing end

  joinBtn: {
    width: '100%',
    backgroundColor: theme.light.colors.primary,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  withdrawBtn: {
    width: '100%',
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  outOfUS: {
    width: '100%',
    backgroundColor: theme.light.colors.primaryBg,
    borderWidth: 2,
    borderColor: theme.light.colors.primaryBg,
  },
  termsTextDesign: {
    color: theme.light.colors.hyperlink,
    textDecorationLine: 'underline',
  },
  termsAndConsitionText: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    color: theme.light.colors.black,
  },
  linkTextDesign: {
    color: theme.light.colors.hyperlink,
    paddingLeft: ms(15),
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    fontSize: ms(16),
  },
  adminoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginTop: ms(20),
  },
  iconDasign: {
    color: theme.light.colors.black,
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
});
