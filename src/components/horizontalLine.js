import React from 'react';
import { View } from 'react-native';
import { theme } from '@/theme';
import PropsType from 'prop-types';
import { ms } from 'react-native-size-matters';

export const HorizontalLine = ({ color, paddingTop, paddingBottom }) => {
  return (
    <View
      style={{
        borderBottomColor: color ? color : theme.light.colors.primary,
        borderBottomWidth: ms(1), //2.5
        marginTop: paddingTop ? ms(paddingTop) : 0,
        marginBottom: paddingBottom ? ms(paddingBottom) : 0,
      }}
    />
  );
};

HorizontalLine.prototype = {
  color: PropsType.string,
};

HorizontalLine.defaultProps = {
  color: theme.light.colors.primary,
};
