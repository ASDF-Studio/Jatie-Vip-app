import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextField } from '@/components';
import { theme } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { FontFamily } from '@/theme/Fonts';

export const CommentInput = ({ value, onPress }) => {
  return (
    <View style={styles.container}>
      <TextField
        style={styles.textFiled}
        value={value}
        placeholder={strings.home.typeComment}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          size={18}
          color={theme.light.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // bottom : ms(-15),
    borderWidth: 1, //
    borderColor: theme.light.colors.infoBgLight, //
    width: '100%',
  },
  textFiled: {
    backgroundColor: theme.light.colors.white, //inputFiled
    paddingRight: ms(80),
    padding: ms(50),
  },
  iconContainer: {
    backgroundColor: theme.light.colors.primaryBgLight,
    borderRadius: 100,
    position: 'absolute',
    bottom: vs(18),
    right: ms(10),
    padding: ms(10),
  },
});
