import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(20),
  },
  submitButton: {
    marginTop: 20,
  },
  logoContainer: { marginBottom: ms(10) },
  linkColor: {
    color: theme.light.colors.hyperlink,
    textDecorationLine: 'underline',
  },
  subTitle: {
    fontSize: ms(18, 0.3),
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.activeTabLabel,
  },
  termsAndConditionsStyle: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    lineHeight: ms(22),
    marginTop: ms(20),
    color: theme.light.colors.activeTabLabel,
    textAlign: 'center',
  },
});
