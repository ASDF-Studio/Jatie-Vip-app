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
} from 'react-native';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {
  faCircleUp,
  faCircleDown,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppSwitch, HorizontalLine, Icon, CardHeader } from '@/components';
import { ms } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization';
import { Data, profilePic } from '@/screens/CommonData/notoficationData';

export default function Notification({ navigation }) {
  const [read, setRead] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Image
            source={{
              uri: profilePic.Photo,
            }}
            style={styles.profilePic}
          />
          <Text
            style={[TextStyles.header, { color: theme.light.colors.black }]}
          >
            {' '}
            {strings.profile.notificatins}{' '}
          </Text>
        </View>
        <View style={styles.right}>
          <Icon
            icon={faSearch}
            color={theme.light.colors.black}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <Icon
            icon={faBell}
            color={theme.light.colors.primary}
            size={ms(20)}
            style={styles.bellIcon}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.togglerTxt}> {strings.profile.unreadOnly} </Text>
          <AppSwitch
            value={read}
            onChange={() => setRead(prev => !prev)}
            style={styles.appSwitch}
          />
        </View>
      </View>
      <HorizontalLine paddingTop={10} />
      <View style={styles.notifyContainer}>
        <FlatList
          data={Data}
          key={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              //    style={styles.notificationCard}
              style={
                item.new == false
                  ? [
                      styles.notificationCard,
                      { backgroundColor: theme.light.colors.white },
                    ]
                  : styles.notificationCard
              }
            >
              <CardHeader
                fullName={item.fullName}
                userName={item.userName}
                profilePic={item.profilePic}
                time={item.time}
              />
              <View style={styles.activity}>
                {item.status == `${strings.profile.upvoted}` ? (
                  <Icon
                    icon={faCircleUp}
                    size={ms(15)}
                    color={theme.light.colors.success}
                    style={styles.circleUpIcon}
                  />
                ) : null}
                {item.status == `${strings.profile.downVoted}` ? (
                  <Icon
                    icon={faCircleDown}
                    size={ms(15)}
                    color={theme.light.colors.error}
                    style={styles.circleDownIcon}
                  />
                ) : null}
                {item.status == `${strings.profile.commented}` ? (
                  <Icon
                    icon={faMessage}
                    size={ms(15)}
                    color={theme.light.colors.info}
                    style={styles.messageIcon}
                  />
                ) : null}
                <View style={styles.textContainer}>
                  <Text style={styles.statsTxt}> {item.status} </Text>
                  <Text style={styles.reactOnTxt}>
                    {' '}
                    {`${item.reactOn}'s post`}{' '}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
    height: ms(50),
    width: ms(50),
    borderRadius: 100,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginLeft: ms(10),
  },
  switchContainer: {
    position: 'absolute',
    top: ms(45),
    left: ms(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  appSwitch: {
    transform: [{ scaleX: ms(1, 0.01) }, { scaleY: ms(1, 0.01) }],
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
  },
  activity: {
    flexDirection: 'row',
    // padding : ms(10),
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
  },
});
