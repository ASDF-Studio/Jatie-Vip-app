import React from 'react';
import { PopUp } from './popUp';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { ms } from 'react-native-size-matters';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { Button } from './Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';

const CircleIcon = ({ onClick }) => (
  <TouchableWithoutFeedback onPress={onClick}>
    <View style={styles.iconContainer}>
      <Icon icon={faTimes} size={ms(13)} style={styles.icon} />
    </View>
  </TouchableWithoutFeedback>
);

export const PopUpAlert = ({
  title = '',
  body = '',
  onClose,
  isOpen = false,
  onPress,
}) => {
  return (
    <PopUp open={isOpen} setOpen={onClose} blurred>
      <View style={styles.container}>
        <CircleIcon onClick={onClose} />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.bodyText}>{body}</Text>
        </View>
        <Button
          title={strings.operations.gotIT}
          style={styles.alertButton}
          onPress={onPress}
        />
      </View>
    </PopUp>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(34),
    paddingTop: ms(25),
    paddingBottom: ms(37),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    display: 'flex',
  },
  titleText: {
    fontFamily: FontFamily.Recoleta_semibold,
    fontSize: ms(17, 0.3),
    // lineHeight: ms(22),
    color: theme.light.colors.headingBlack,
    fontWeight: '600',
  },
  bodyText: {
    marginTop: ms(10),
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontWeight: '500',
    fontSize: ms(15, 0.3),
    // lineHeight: ms(22),
    color: theme.light.colors.headingBlack,
    textAlign: 'center',
  },
  alertButton: {
    marginTop: ms(18),
    paddingHorizontal: ms(60),
    paddingVertical: ms(10),
  },
  iconContainer: {
    width: ms(30),
    height: ms(30),
    borderRadius: 100,
    backgroundColor: theme.light.colors.iconbackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(9),
  },
  icon: {
    color: theme.light.colors.red,
  },
});
