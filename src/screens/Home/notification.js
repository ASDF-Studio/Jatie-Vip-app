import React, { useState } from 'react';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { faBell, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import {
  faCircleUp,
  faCircleDown,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {
  AppSwitch,
  HorizontalLine,
  Icon,
  CardHeader,
  CustomLoader,
} from '@/components';
import { ms, verticalScale } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization';
import { Data, profilePic } from '@/screens/CommonData/notoficationData';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import {
  TYPES,
  fetchAllNotifications,
  getAllNotificationsSuccess,
  markAllRead,
  markSingleNotifRead,
} from '@/actions/UserActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { getPostById } from '@/actions/PostActions';
import { navigate } from '@/navigation/RootNavigation';
import { CustomSwitch } from '@/components/switch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { isEmpty } from 'lodash';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { UserController } from '@/controllers';
import { useBackgroundFetch } from '@/hooks';

export default function Notification({ navigation }) {
  const [read, setRead] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loggedInUser = useSelector(getUser);
  const notificationData = loggedInUser.notificationKey;
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      customReq();
    }, [read])
  );

  const backgroundFetch = () => {
    // console.log('fetching notif background');
    UserController.AllNotificationsRequest(loggedInUser.id, read).then(res => {
      dispatch(getAllNotificationsSuccess(res));
    });
  };

  useBackgroundFetch({
    callback: backgroundFetch,
    isFocused,
  });

  const customReq = async () => {
    setLoading(true);
    await fetchAllNotifications(loggedInUser.id, read)(dispatch);
    setLoading(false);
  };
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_NOTIFICATIONS], state)
  );
  const singelPostHnadlePress = () => {
    dispatch(getPostById(item.objectId, loggedInUser?.id));
    // console.log(item.objectId, user?.id);
  };
  const markAllAsReadNotifications = () => {
    dispatch(markAllRead(loggedInUser?.id));
    setTimeout(() => {
      dispatch(fetchAllNotifications(loggedInUser.id, read));
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomLoader open={isLoading} /> */}
      <View style={styles.header}>
        <View style={styles.left}>
          <Image
            source={{
              uri: loggedInUser.profilePic,
            }}
            style={styles.profilePic}
          />
          <View>
            <Text
              style={[TextStyles.header, { color: theme.light.colors.black }]}
            >
              {strings.profile.notificatins}
            </Text>
            <View style={styles.switchContainer}>
              <Text style={styles.togglerTxt}>
                {strings.profile.unreadOnly}
              </Text>
              <CustomSwitch
                value={read}
                onChange={() => setRead(prev => !prev)}
              />
              {/* <AppSwitch
                value={read}
                onChange={() => setRead(prev => !prev)}
                style={styles.appSwitch}
              /> */}
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <Icon
            icon={faSearch}
            color={theme.light.colors.black}
            size={ms(22)}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <Icon
            icon={faBell}
            color={theme.light.colors.primary}
            size={ms(22)}
            style={styles.bellIcon}
          />
        </View>
      </View>
      <HorizontalLine paddingTop={10} />
      <TouchableOpacity
        onPress={markAllAsReadNotifications}
        style={{
          paddingVertical: ms(12),
          backgroundColor: theme.light.colors.primaryBgLight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <FontAwesomeIcon
          icon={faCheckDouble}
          size={18}
          color={theme.light.colors.info}
        />
        <Text style={styles.markAllAsReadTextStyle}>Mark all as read</Text>
      </TouchableOpacity>

      {loading ? (
        <View
          style={{
            backgroundColor: theme.light.colors.primaryBgLight,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            animating={loading}
            color={theme.light.colors.activeTabIcon}
            size={'large'}
            style={styles.loaderStyle}
          />
        </View>
      ) : (
        <View style={styles.notifyContainer}>
          {read && !loading && isEmpty(notificationData?.data) && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  size={45}
                  color={theme.light.colors.primaryBgDark}
                />
                <Text
                  style={{
                    fontSize: ms(18),
                    marginTop: 10,
                    fontFamily: FontFamily.BrandonGrotesque_regular,
                    color: theme.light.colors.black,
                  }}
                >
                  No Unread Notification
                </Text>
              </View>
            </View>
          )}
          {!isEmpty(notificationData?.data) && (
            <FlatList
              data={notificationData?.data}
              key={item => item.id}
              renderItem={({ item }) => (
                <View
                  //    style={styles.notificationCard}
                  style={[
                    styles.notificationCard,
                    item.seenByUser && {
                      backgroundColor: theme.light.colors.white,
                    },
                  ]}
                >
                  <CardHeader
                    fullName={item?.userByUserwhofiredevent?.fullName}
                    userName={`@${item?.userByUserwhofiredevent?.username}`}
                    profilePic={item?.userByUserwhofiredevent?.profilePic}
                    time={item?.created_at}
                    userId={item?.userByUserwhofiredevent?.id}
                  />
                  <View style={styles.activity}>
                    {item.type == `${strings.profile.upvote}` ? (
                      <Icon
                        icon={faCircleUp}
                        size={ms(15)}
                        color={theme.light.colors.success}
                        style={styles.circleUpIcon}
                      />
                    ) : null}
                    {item.type == `${strings.profile.downvote}` ? (
                      <Icon
                        icon={faCircleDown}
                        size={ms(15)}
                        color={theme.light.colors.error}
                        style={styles.circleDownIcon}
                      />
                    ) : null}
                    {item.type == strings.profile.comment ? (
                      <Icon
                        icon={faMessage}
                        size={ms(15)}
                        color={theme.light.colors.info}
                        style={styles.messageIcon}
                      />
                    ) : null}
                    <View style={styles.textContainer}>
                      {/* <Text style={styles.statsTxt}> {item.status} </Text> */}
                      <TouchableOpacity
                        onPress={() => {
                          markSingleNotifRead(loggedInUser.id, item.id);
                          navigate(NAVIGATION.singlePost, {
                            postId: item.objectId,
                          });
                        }}
                      >
                        <Text style={styles.reactOnTxt}>{item.text} post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: ms(60),
    height: ms(60),
    borderWidth: 1,
    borderRadius: 100,
    margin: ms(3),
    marginRight: ms(10),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginLeft: ms(20),
  },
  switchContainer: {
    position: 'absolute',
    top: ms(30),
    // paddingLeft: ms(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  appSwitch: {
    transform: [{ scaleX: ms(1, 0.01) }, { scaleY: ms(1, 0.01) }],
  },
  loaderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: ms(50),
  },
  notifyContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  notificationCard: {
    // backgroundColor: theme.light.colors.white,
    // marginTop: vs(2),
    padding: 10,
    borderBottomWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
  },
  togglerTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(12, 0.3),
    marginRight: ms(10),
  },
  activity: {
    flexDirection: 'row',
    // padding: ms(10),
    alignItems: 'center',
  },
  circleUpIcon: {
    marginLeft: ms(15),
  },
  circleDownIcon: {
    marginLeft: ms(15),
  },
  messageIcon: {
    marginLeft: ms(15),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: ms(3),
    paddingLeft: ms(16),
  },
  statsTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
    paddingLeft: ms(5),
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
    textTransform: 'capitalize',
  },
  markAllAsReadTextStyle: {
    fontSize: 16,
    textAlign: 'right',
    marginLeft: ms(8),
    marginRight: ms(15),
    // marginTop: verticalScale(10),
    color: theme.light.colors.info,
    fontFamily: FontFamily.Recoleta_semibold,
  },
});
