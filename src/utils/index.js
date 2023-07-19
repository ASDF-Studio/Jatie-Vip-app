import React from 'react';
import { theme } from '@/theme';
import { faBomb, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { showMessage } from 'react-native-flash-message';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();

const styles = {
  containerStyle: {
    base: {
      borderWidth: 1,
      bottom: 110,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    success: {
      backgroundColor: theme.light.colors.toastBgSuccess,
      borderColor: theme.light.colors.toastBorderSuccess,
    },
    danger: {
      backgroundColor: theme.light.colors.iconbackground,
      borderColor: theme.light.colors.red,
    },
  },
  titleStyle: {
    base: {
      paddingLeft: ms(12),
      color: theme.light.colors.black,
      fontFamily: FontFamily.BrandonGrotesque_regular,
      fontSize: ms(18, 0.3),
      lineHeight: 24,
    },
    success: {},
    danger: {
      color: theme.light.colors.red,
    },
  },
  iconStyle: {
    success: {
      icon: faCheckCircle,
      color: theme.light.colors.success,
    },
    danger: {
      icon: faBomb,
      color: theme.light.colors.red,
    },
  },
};

export const customShowMessage = ({ type, message }) =>
  showMessage({
    message: message,
    style:
      {
        ...styles.containerStyle.base,
        ...styles.containerStyle?.[type],
      } || null,
    titleStyle:
      {
        ...styles.titleStyle.base,
        ...styles.titleStyle?.[type],
      } || null,
    icon: props => (
      <FontAwesomeIcon
        icon={styles?.iconStyle[type]?.icon || null}
        color={styles?.iconStyle[type]?.color || null}
        size={ms(15)}
      />
    ),
  });

export const checkPhoneNumber = (countryCode, phoneNumber) => {
  const finalNumber = countryCode + phoneNumber;
  try {
    const phoneNumberFormat = phoneUtil.format(
      phoneUtil.parse(finalNumber),
      PNF.E164
    );

    const phone = phoneNumberFormat.split(countryCode)[1];

    return {
      phoneNumberFormat,
      phone,
    };
  } catch (e) {
    return {
      phoneNumberFormat: null,
      phone: phoneNumber,
    };
  }
};
