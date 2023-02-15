import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Button,
  Card,
  CardBody,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  TopBackButton,
} from '@/components';
import {
  faEllipsis,
  faFlag,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NAVIGATION } from '@/constants';
import { item } from './giveawayData/pastDetailsData';

export default function PastDetails({ navigation }) {
  const userType = useSelector(state => state.userType);
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <View style={styles.adminoOption}>
          <Text style={[styles.headerText, TextStyles.header]}>
            {strings.giveaway.title}
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
                <Text style={styles.title}>{strings.giveaway.title} </Text>
              </View>
              <CardBody text={item.Desc} />
              {link(item.link)}
              <CardBody text={item.MoreDesc} />
              <View>
                <Text style={styles.winners}>{strings.giveaway.winners} </Text>
              </View>
              {/* winners */}
              {item.winner.map(item => {
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
              })}
              {/* Admin */}
              {userType.user == `${strings.userType.admin}` && (
                <View style={styles.PostButtonContainer}>
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        navigation.navigate(NAVIGATION.seeAllParticipants)
                      }
                      title={strings.giveaway.seeAllParticipants}
                      style={styles.withdrawBtn}
                      textStyle={{
                        color: theme.light.colors.primary,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.thumbnailContainer}>
                <Image
                  style={styles.thumbnailImage}
                  source={{
                    uri: item.photo,
                  }}
                />
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>

      {/* Admin */}

      <ModalDown open={open} setOpen={setOpen}>
        <ModalList
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
          title={strings.giveaway.endNow}
          icon={faFlag}
          iconBg={theme.light.colors.infoBgLight}
          iconColor={theme.light.colors.secondary}
        />
        <ModalList
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
