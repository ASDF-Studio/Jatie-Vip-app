import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropsType from 'prop-types';
import { FontFamily } from '@/theme/Fonts';
import { ms } from 'react-native-size-matters';
import { theme } from '@/theme';

export const CardBody = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

CardBody.prototype = {
  text: PropsType.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: ms(15),
    paddingRight: ms(15),
    paddingBottom: ms(15),
  },
  text: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    // textAlign : 'justify',
    fontSize: ms(16, 0.3),
    lineHeight: ms(22),
    color: theme.light.colors.text,
  },
});
