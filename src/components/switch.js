import React from 'react';
import { View, Switch } from 'react-native';
import { theme } from '@/theme';
import PropsType from 'prop-types';

export const AppSwitch = ({ value, onChange, style }) => {
  return (
    <View>
      <Switch
        trackColor={{
          false: theme.light.colors.infoBgLight,
          true: theme.light.colors.infoBg,
        }}
        thumbColor={
          value ? theme.light.colors.info : theme.light.colors.secondary
        }
        ios_backgroundColor={theme.light.colors.info}
        onValueChange={onChange}
        value={value}
        style={style}
      />
    </View>
  );
};

AppSwitch.prototype = {
  value: PropsType.string.isRequired,
  onChange: PropsType.func.isRequired,
};
