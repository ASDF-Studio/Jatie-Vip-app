import { theme } from '@/theme';
import { StyleSheet } from 'react-native';
import { FontFamily } from '@/theme/Fonts';
import { ms, vs } from 'react-native-size-matters';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    margin: ms(10),
  },
  headerImageContainer: {
    // flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerDesign: {
    color: theme.light.colors.text,
    margin: ms(15),
  },
  headerImage: {
    width: ms(50),
    height: vs(50),
    borderWidth: 2,
    borderRadius: 75,
  },
  adminBtnDesign: {
    backgroundColor: theme.light.colors.primary,
    width: ms(140),
  },
  adminBtnTxtColor: { color: theme.light.colors.white },
  iconContiner: {
    // flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // padding: ms(10),
  },
  bellIcon: {
    position: 'relative',
  },
  searchIcon: {
    marginRight: ms(10),
  },
  bellAlert: {
    height: ms(10),
    width: ms(10),
    backgroundColor: theme.light.colors.error,
    position: 'absolute',
    borderRadius: 100,
    left: ms(339),
    top: ms(21),
  },

  feedContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },

  //Admin

  adminBtn: {
    marginTop: vs(10),
    borderWidth: 0,
    borderRadius: 10,
    padding: ms(8),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    position: 'absolute',
    top: '90%',
    left: '60%',
  },
  adminBtnTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(15, 0.3),
  },
});
