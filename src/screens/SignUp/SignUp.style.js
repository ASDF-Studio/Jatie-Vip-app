import { theme } from '@/theme';

import { FontFamily } from '@/theme/Fonts';
import { StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  showDatepicker: { marginBottom: vs(12) },
  subTitle: {
    fontSize: ms(18, 0.3),
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.text,
  },
  dropDownPicker: {
    borderWidth: 0,
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    marginVertical: vs(10, 0.3),
  },
  birthdayView: {
    marginVertical: ms(15),
    paddingVertical: ms(5),
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderRadius: ms(10),
    borderColor: theme.light.colors.textFieldBorderColor,
    paddingHorizontal: ms(10),
    width: '100%',
    height: ms(42),
  },
  calenderView: {
    paddingTop: vs(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dobInput: {
    width: '94%',
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  calenderIcon: {
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    width: '6%',
    height: vs(40),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  dropdowntextstyle: { color: 'gray' },
});
