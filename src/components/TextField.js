import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms } from 'react-native-size-matters';

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: ms(15),
    paddingVertical: ms(5),
  },
  textFieldStyle: {
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderRadius: ms(10),
    borderColor: theme.light.colors.textFieldBorderColor,
    paddingHorizontal: ms(10),
    width: '100%',
    height: ms(42),
    fontFamily: FontFamily.BrandonGrotesque_regular,
  },
});

export function TextField({ style, value, onChangeText, ...rest }) {
  const { colors } = useTheme();

  return (
    <TextInput value={value}

      onChangeText={onChangeText}
      style={[
        { color: colors.text },
        TextStyles.text,
        styles.input,
        styles.textFieldStyle,
        style,
      ]}
      underlineColorAndroid="transparent"
      {...rest}
    />
  );
}

TextField.propTypes = {
  style: PropTypes.object,
};

TextField.defaultProps = {
  style: null,
};
