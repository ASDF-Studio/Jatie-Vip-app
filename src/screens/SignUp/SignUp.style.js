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
  dropDownContainerStyle: {
    marginTop: ms(17),
    marginBottom: ms(17),
    borderWidth: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: theme.light.colors.dropDownBorder,

    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 50,
  },
  openDropDown: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.colors.info,

    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    marginVertical: vs(10, 0.3),
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
    paddingLeft: ms(10),
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
