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

export const CardHeader = ({
  fullName,
  userName,
  profilePic,
  time,
  isOfficial,
  showPin,
}) => {
  return (
    <View style={styles.postHeader}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.Image}
          source={{
            uri: profilePic,
          }}
        />
        <View style={{ paddingLeft: ms(5) }}>
          <Text style={styles.fullNameTxt}> {fullName} </Text>
          <Text style={styles.userNameTxt}> {userName} </Text>
        </View>
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
            {time} mins ago
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
