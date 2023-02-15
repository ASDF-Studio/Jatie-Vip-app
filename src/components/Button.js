import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextStyles } from '@/theme';
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
      backgroundColor: colors.primary,
    },
  });

export function Button({ style, textStyle, opacity, title, ...rest }) {
  const { colors } = useTheme();

  const styles = useMemo(() => customStyles(colors), [colors]);

  return (
    <TouchableOpacity
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
      <Text style={[{ color: colors.white }, TextStyles.buttonText, textStyle]}>
        {title}
      </Text>
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
