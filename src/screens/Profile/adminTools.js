import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  faArrowRight,
  faChartColumn,
  faBan,
  faPeopleRoof,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { ms, vs } from 'react-native-size-matters';
import { TopBackButton } from '@/components';

export default function AdminTools({ navigation }) {
  return (
    <SafeAreaView style={styles.contianer}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={styles.headerText}>{strings.profile.adminTools} </Text>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate(NAVIGATION.manageReports)}
        >
          <View style={styles.RawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faFile}
                size={ms(20)}
                color={theme.light.colors.primary}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.manageReports}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.blockedUsers)}
          style={styles.list}
        >
          <View style={styles.RawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faPeopleRoof}
                color={theme.light.colors.primary}
                size={ms(20)}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.userManagement}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}>
          <View style={styles.RawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faChartColumn}
                size={ms(20)}
                color={theme.light.colors.primary}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.analytics}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.bannedUsers)}
          style={styles.list}
        >
          <View style={styles.RawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faBan}
                size={ms(20)}
                color={theme.light.colors.primary}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.bannedUsers}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerIcon: {
    color: theme.light.colors.info,
  },
  headerText: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(9),
    },
  ],
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(10),
  },
  TopBackButton: {
    padding: 10,
  },
  upgradeBox: {
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.primaryBg,
    borderRadius: 10,
    padding: ms(10),
  },
  upgradeText: [
    TextStyles.header,
    {
      fontSize: ms(15, 0.3),
      color: theme.light.colors.black,
      paddingLeft: ms(10),
    },
  ],
  lebelText: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(15, 0.3),
    paddingTop: ms(10),
  },
  RawContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    backgroundColor: theme.light.colors.white,
    marginTop: vs(10),
    padding: ms(10),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    color: theme.light.colors.black,
    fontSize: ms(15, 0.3),
    paddingLeft: ms(10),
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(100),
  },
  socialContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialIcon: {
    margin: ms(15),
  },
  copyWriteContainer: {
    alignItems: 'center',
  },
  copyRightText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
  },
  iconContainer: {
    padding: ms(10),
    backgroundColor: theme.light.colors.primaryBgLight,
    borderRadius: 100,
  },
});
