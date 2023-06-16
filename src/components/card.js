import React from 'react';

import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const Card = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.light.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.colors.primaryBg,

    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
});
