import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
  },
  mainView: {
    alignItems: 'center',
  },
  submitButton: {
    marginTop: vs(10),
    width: '50%',
  },
  EditViewModal: { width: '100%' },
  buttonContainer: { flexDirection: 'row' },
  addYourPPButton: { marginTop: vs(20) },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light.colors.userBackgroundColor,
    borderRadius: ms(70),
    height: ms(140),
    width: ms(140),
    marginTop: vs(50),
  },
  skipButton: {
    backgroundColor: theme.light.colors.white,
    borderColor: theme.light.colors.activeTabIcon,
    borderWidth: 1,
    marginTop: vs(15),
  },
  skipButtonText: {
    color: theme.light.colors.activeTabIcon,
  },
  bottomButtons: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  img: {
    height: ms(140),
    width: ms(140),
    position: 'absolute',
    borderRadius: ms(70),
    borderWidth: 1,
    borderColor: theme.light.colors.activeTabIcon,
  },
  replaceRemoveButton: {
    width: '40%',
    margin: 10,
    borderRadius: 8,
  },
  removeButton: {
    width: '40%',
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: theme.light.colors.white,
    borderColor: theme.light.colors.activeTabIcon,
  },
  modalBackground: {
    padding: ms(30),
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  closeView: {
    alignItems: 'flex-end',
    marginTop: -23,
    marginBottom: vs(10),
    marginRight: -22,
  },
  closeIcon: {
    height: vs(20),
    width: ms(20),
  },
  HeadingTextStyle: {
    color: 'black',
    fontFamily: FontFamily.Recoleta_bold,
  },
});
