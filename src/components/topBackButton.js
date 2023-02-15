import React from 'react';
import { View } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropsType from 'prop-types';
import { Icon } from '@/components';
import { theme } from '@/theme';
import { ms } from 'react-native-size-matters';

export const TopBackButton = ({ onPress, style }) => {
  return (
    <View style={style}>
      <Icon
        icon={faArrowLeft}
        size={ms(15)}
        color={theme.light.colors.info}
        onPress={onPress}
      />
    </View>
  );
};

TopBackButton.prototype = {
  onPress: PropsType.func.isRequired,
};
