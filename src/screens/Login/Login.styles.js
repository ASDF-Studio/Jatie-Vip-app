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
  countryCodePicker: {
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderRadius: ms(10),
    borderColor: theme.light.colors.textFieldBorderColor,
    paddingHorizontal: ms(10),
    width: '18%',
    height: ms(42),
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FontFamily.BrandonGrotesque_regular,
    marginHorizontal: "1%"
  },
  countryPickerText: {
    color: "black",
    fontFamily: FontFamily.BrandonGrotesque_regular,
  },
  inputFieldView: {
    flexDirection: "row",
    alignItems: "center", justifyContent: "space-between"

  },
  numberinput: {
    width: "81%",
  }
});
