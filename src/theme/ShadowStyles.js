import { StyleSheet } from 'react-native';
import { theme } from './theme';

/*
 * generated with https://ethercreative.github.io/react-native-shadow-generator/
 * to get the same shadow on both platforms
 */
export const ShadowStyles = StyleSheet.create({
  shadow: {
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    shadowColor: theme.light.colors.black,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
