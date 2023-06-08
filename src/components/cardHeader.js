import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextStyles, theme } from '@/theme';
import PropsType from 'prop-types';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { Icon } from './Icon';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';

export const CardHeader = ({
  fullName,
  userName,
  profilePic,
  time,
  isOfficial,
  showPin,
  userId,
  isProfile,
}) => {
  const getTime = t2 => {
    const t1 = new Date().getTime();
    const t3 = new Date(t2).getTime();
    let ts = parseInt((t1 - t3) / 60000);
    if (ts < 60) {
      return ts + ' mins ago';
    }
    if (ts >= 60) {
      let hour = parseInt(ts / 60);
      if (hour > 24) {
        let day = parseInt(hour / 24);
        if (day > 7) {
          let week = parseInt(day / 7);
          if (week > 4) {
            let month = parseInt(week / 4);
            if (month > 12) {
              let year = parseInt(month / 12);
              return year + ' years ago';
            } else {
              return month + ' months ago';
            }
          } else {
            return week + ' weeks ago';
          }
        } else {
          return day + ' days ago';
        }
      } else {
        return hour + ' hours ago';
      }
    }
  };
  const navigateToUserProfile = () => {
    navigationRef.navigate(NAVIGATION.userProfile, { userId: userId });
  };

  return (
    <View style={styles.postHeader}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.Image}
          source={{
            uri: profilePic || null,
          }}
        />
        <TouchableOpacity
          onPress={() => !isProfile && navigateToUserProfile()}
          style={{ paddingLeft: ms(5) }}
        >
          <Text style={styles.fullNameTxt}> {fullName} </Text>
          <Text style={styles.userNameTxt}> {userName} </Text>
        </TouchableOpacity>
        {isOfficial ? (
          <View>
            <Text style={styles.officialTxt}> {strings.home.offical} </Text>
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {time ? (
          <Text style={[styles.timeTxt, { paddingRight: showPin ? 40 : 0 }]}>
            {' '}
            {getTime(time)}
          </Text>
        ) : null}
        {showPin ? (
          <TouchableOpacity style={styles.pinIcon}>
            <FontAwesomeIcon
              icon={faThumbTack}
              color={theme.light.colors.primary}
              size={ms(13)}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

CardHeader.prototype = {
  fullName: PropsType.string.isRequired,
  userName: PropsType.string.isRequired,
  profilePic: PropsType.string.isRequired,
  time: PropsType.string.isRequired,
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10), //8
    paddingTop: ms(20), //
  },
  Image: {
    width: ms(45),
    height: ms(45),
    borderWidth: 0.5,
    borderRadius: 100,
    marginTop: ms(-5),
    borderColor: theme.light.colors.primaryBg,
  },
  fullNameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(12, 0.3),
    color: theme.light.colors.secondary,
    paddingLeft: ms(2),
  },
  officialTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    color: theme.light.colors.primary,
    backgroundColor: theme.light.colors.primaryBgLight, //primaryOg
    borderRadius: 4,
    padding: ms(2),
    fontSize: ms(12, 0.3),
    marginLeft: ms(3),
    paddingLeft: ms(6),
    paddingRight: ms(6),
  },
  timeTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(12, 0.3),
  },
  pinIcon: {
    backgroundColor: theme.light.colors.primaryBgLight,
    borderWidth: 1,
    borderColor: theme.light.colors.primaryBgLight,
    padding: ms(8),
    marginTop: -8, //
    borderRadius: 100,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
});
