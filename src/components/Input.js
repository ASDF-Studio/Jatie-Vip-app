import React from 'react';
import { strings } from '@/localization';
import { FontFamily } from '@/theme/Fonts';
import { TextInput, StyleSheet } from 'react-native';

export const PostInput = ({ value, setValue, ...rest }) => {
  return (
    <TextInput
      placeholder={strings.home.whatOnYourMind}
      style={styles.InputTextBoxDEsc}
      value={value}
      onChangeText={val => setValue(val)}
      editable
      multiline
      {...rest}
      // numberOfLines={6}
    />
  );
};

const styles = StyleSheet.create({
  InputTextBoxDEsc: {
    height: '100%',
    textAlignVertical: 'top',
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontWeight: '400',
    fontSize: 18,
  },
});
