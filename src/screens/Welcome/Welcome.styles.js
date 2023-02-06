import { FontFamily } from '@/theme/Fonts';
import { StyleSheet } from 'react-native';
import { ms, s } from 'react-native-size-matters';

export const styles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: ms(20),
      backgroundColor: 'gray',
    },
    logoContainer: {
      marginBottom: s(41),
    },
    subContainer: {
      position: 'absolute',
      bottom: ms(30),
      alignItems: 'center',
    },
    socialContainer: {
      flexDirection: 'row',
      marginTop: ms(33),
      marginBottom: ms(18),
      justifyContent: 'space-between',
      width: '80%',
    },
    signButton: { marginTop: s(15) },
    copyrightTitle: {
      fontFamily: FontFamily.BrandonGrotesque_regular,
      fontSize: ms(15, 0.3),
      color: colors.white,
    },
  });
