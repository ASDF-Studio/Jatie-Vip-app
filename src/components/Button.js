import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextStyles, theme } from '@/theme';
import { useMemo } from 'react';
import { ms } from 'react-native-size-matters';

const customStyles = colors =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: ms(8),
      padding: ms(10),
      width: '100%',
      backgroundColor: colors.primaryBgDark,
    },
  });

export function Button({
  style,
  textStyle,
  opacity,
  title,
  loading = false,
  onPress,
  ...rest
}) {
  const { colors } = useTheme();

  const styles = useMemo(() => customStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        opacity
          ? [
              styles.button,
              { borderColor: colors.border, opacity: opacity },
              style,
            ]
          : [styles.button, { borderColor: colors.border }, style]
      }
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.light.colors.white} />
      ) : (
        <Text
          style={[{ color: colors.white }, TextStyles.buttonText, textStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  style: null,
  textStyle: null,
};

//previous code
// style={[
//   styles.button,
//   { borderColor: colors.border },
//   style,
// ]}
