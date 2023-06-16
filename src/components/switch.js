import React from 'react';
import { View, Switch } from 'react-native';
import { theme } from '@/theme';
import PropsType from 'prop-types';
import { Switch as SwitchRN } from 'react-native-switch';

export const AppSwitch = ({ value, onChange, style }) => {
  return (
    <View>
      <Switch
        trackColor={{
          false: theme.light.colors.infoBgLight,
          true: theme.light.colors.infoBg,
        }}
        // thumbColor={
        //   value ? theme.light.colors.info : theme.light.colors.secondary
        // }
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

export const CustomSwitch = ({ value, onChange, style }) => {
  return (
    <SwitchRN
      circleSize={18}
      value={value}
      renderActiveText={false}
      renderInActiveText={false}
      onValueChange={onChange}
      circleActiveColor="rgb(147, 129, 255)"
      circleBorderWidth={0}
      circleInActiveColor="rgb(128, 129, 142)"
      backgroundInactive="rgba(128, 129, 142, 0.2)"
      backgroundActive="rgb(234, 231, 255)"
      disabled={false}
      changeValueImmediately={true}
      barHeight={12}
      switchBorderRadius={6}
    />
  );
};
