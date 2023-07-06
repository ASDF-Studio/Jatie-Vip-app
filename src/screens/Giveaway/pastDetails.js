import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  Button,
  Card,
  CardBody,
  CustomLoader,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  TopBackButton,
} from '@/components';
import {
  faEllipsis,
  faFlag,
  faMessage,
  faPen,
  faTrash,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NAVIGATION } from '@/constants';
import { item } from './giveawayData/pastDetailsData';
import {
  deleteGiveaway,
  endGiveaway,
  followUser,
  getSingleGiveAwayById,
  unFollowUser,
} from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { getSingleGiveAwayData } from '@/selectors/PostSelectors';
import { followers } from '@/actions/UserActions';
import { navigationRef } from '@/navigation/RootNavigation';
import { showMessage } from 'react-native-flash-message';
import { useMemo } from 'react';
import { DefaultProfile } from '@/assets';

export default function PastDetails({ navigation, route }) {
  const dispatch = useDispatch();
  const { DATA } = route.params;
  const userType = useSelector(state => state.userType);
  const user = useSelector(getUser);
  const { followersDatainReducer } = user;

  const giveawayData = useSelector(getSingleGiveAwayData);
  const [open, setOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const userFollower = useMemo(() => followersDatainReducer?.data, [user]);

  useEffect(() => {
    const data = {
      userId: user?.id,
      giveawayId: DATA?.id,
    };
    dispatch(getSingleGiveAwayById(data));
  }, []);
  const onEndGiveaway = () => {
    const data = {
      giveawayId: DATA?.id,
    };
    dispatch(endGiveaway(data));
  };
  const onDeleteGiveaway = () => {
    const data = {
      id: DATA?.id,
      userId: user?.id,
    };
    dispatch(deleteGiveaway(data));
  };

  const onFollow = () => {
    if (isFollowing) {
      dispatch(unFollowUser(user.id, selectedUser.id));
      setShowUserModal(false);
    } else {
      dispatch(followUser(user.id, selectedUser.id));
      setShowUserModal(false);
    }
    setTimeout(() => {
      dispatch(followers(user?.id, user.id));
    }, 100);
  };

  const onMessageClick = () => {
    showMessage({
      message: 'Coming Soon',
      type: 'info',
    });
  };



  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <View style={styles.adminoOption}>
          <Text style={[styles.headerText, TextStyles.header]}>
            {DATA?.postTitle}
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
                <Text style={styles.title}>
                  {giveawayData?.all_giveaway?.postTitle}{' '}
                </Text>
              </View>
              <CardBody text={giveawayData?.all_giveaway?.postBody} />
              {link(item.link)}
              <CardBody text={item.MoreDesc} />
              <View style={styles.thumbnailContainer}>
                {giveawayData?.all_giveaway?.postImg.map(url => {
                  return (
                    <Image
                      style={styles.thumbnailImage}
                      source={{
                        uri: url,
                      }}
                    />
                  );
                })}
              </View>
              {giveawayData?.winners?.length > 0 && (
                <View>
                  <Text style={styles.winners}>
                    {strings.giveaway.winners}{' '}
                  </Text>
                </View>
              )}
              {/* winners */}
              {giveawayData?.winners?.map(item => {
                if (item == null) {
                  return;
                } else {
                  return (
                    <View style={styles.listContainer} key={item.id}>
                      <View style={styles.leftContainer}>
                        <Image
                          source={
                            item?.profilePic
                              ? { uri: item?.profilePic }
                              : DefaultProfile
                          }
                          style={styles.profileImage}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            navigationRef.navigate(NAVIGATION.userProfile, {
                              userId: item.id,
                            })
                          }
                        >
                          <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                              {' '}
                              {item?.fullName}{' '}
                            </Text>
                            <Text> {'@' + item?.username} </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      {user?.id !== selectedUser?.id && (
                        <View>
                          <Icon
                            icon={faEllipsis}
                            size={ms(15)}
                            color={theme.light.colors.info}
                            onPress={() => {
                              setSelectedUser({ ...item });
                              setIsFollowing(
                                userFollower?.following_List.filter(
                                  el => el.followingUserId === item?.id
                                ).length === 1
                              );
                              setShowUserModal(true);
                            }}
                          />
                        </View>
                      )}
                    </View>
                  );
                }
              })}
              {/* Admin */}
              {userType.user == `${strings.userType.admin}` && (
                <View style={styles.PostButtonContainer}>
                  {DATA?.giveaway_participants.length > 0 && (
                    <TouchableOpacity>
                      <Button
                        onPress={() =>
                          navigation.navigate(NAVIGATION.seeAllParticipants, {
                            DATA: giveawayData?.all_giveaway
                              .giveaway_participants,
                          })
                        }
                        title={strings.giveaway.seeAllParticipants}
                        style={styles.withdrawBtn}
                        textStyle={{
                          color: theme.light.colors.primary,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Card>
          </View>
        </ScrollView>
      </View>

      <ModalDown open={showUserModal} setOpen={setShowUserModal}>
        <ModalList
          title={
            isFollowing
              ? strings.operations.unFollow + ' @' + selectedUser?.username
              : strings.operations.follow + ' @' + selectedUser?.username
          }
          icon={faUserPlus}
          iconColor={theme.light.colors.primary}
          iconBg={theme.light.colors.primaryBgLight}
          onPress={onFollow}
        />
        <ModalList
          title={strings.profile.sendPrivateMessage}
          icon={faMessage}
          iconColor={theme.light.colors.success}
          iconBg={theme.light.colors.successBgLight}
          onPress={onMessageClick}
        />
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={15}
          paddingBottom={8}
        />
        <ModalList
          title={strings.giveaway.deletePost}
          icon={faTrash}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.report)}
        />
        <ModalList
          title={strings.profile.block}
          icon={faXmark}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.blocked)}
        />
        <ModalList
          title={strings.giveaway.ban}
          icon={faFlag}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.report)}
        />
      </ModalDown>
      {/* Admin */}
      <ModalDown open={open} setOpen={setOpen}>
        <ModalList
          onPress={() => {
            navigation.navigate(NAVIGATION.updateGiveawayPost, { DATA: DATA }),
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

const link = link => {
  return (
    <Text
      style={styles.linkText}
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

  //Card some common thing from active.js
  title: {
    margin: ms(10),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
  },
  linkText: {
    color: theme.light.colors.hyperlink,
    paddingLeft: ms(15),
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    fontSize: ms(16),
  },

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

  // Admin

  PostButtonContainer: {
    margin: ms(10),
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
});
