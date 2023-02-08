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
  faLock,
  faUser,
  faCrown,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTiktok,
  faYoutube,
  faInstagram,
  faSnapchat,
} from '@fortawesome/free-brands-svg-icons';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { ms, vs } from 'react-native-size-matters';
import { Button, HorizontalLine, Icon, TopBackButton } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/actions/UserActions';

export default function Settings({ navigation }) {
  const userType = useSelector(state => state.userType);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.contianer}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.settings}{' '}
      </Text>
      <HorizontalLine
        color={theme.light.colors.primaryBgLight}
        paddingTop={15}
      />
      <View style={styles.body}>
        {/* This feature is for free user */}
        {userType?.user == `${strings.userType.free}` && (
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.upgradeMembership)}
            style={styles.upgradeBox}
          >
            <View style={styles.iconView}>
              <View style={styles.bellIcon}>
                <FontAwesomeIcon
                  icon={faBell}
                  color={theme.light.colors.primary}
                />
                <Text style={styles.upgradeText}>
                  {' '}
                  {strings.profile.upgradeMembership}{' '}
                </Text>
              </View>
              <View>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  color={theme.light.colors.info}
                  size={13}
                  style={styles.ArrowRight}
                />
              </View>
            </View>
            <Text style={styles.lebelText}>{strings.profile.upgradeLebel}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate(NAVIGATION.editProfile)}
        >
          <View style={styles.rawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faUser}
                size={ms(13)}
                color={theme.light.colors.primary}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.editProfile}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
            size={13}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.blockedUsers)}
          style={styles.list}
        >
          <View style={styles.rawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faLock}
                color={theme.light.colors.primary}
                size={ms(13)}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.blockedUsers}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
            size={13}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.notificationSettings)}
          style={styles.list}
        >
          <View style={styles.rawContainer}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faBell}
                size={ms(13)}
                color={theme.light.colors.primary}
              />
            </View>
            <Text style={[TextStyles.header, styles.listText]}>
              {strings.profile.notificationSettings}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={theme.light.colors.info}
            size={13}
          />
        </TouchableOpacity>

        {/* This feature is for VIP user */}
        {userType.user == `${strings.userType.vip}` && (
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.notificationSettings)}
            style={styles.list}
          >
            <View style={styles.rawContainer}>
              <View style={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={faCrown}
                  size={ms(13)}
                  color={theme.light.colors.primary}
                />
              </View>
              <Text style={[TextStyles.header, styles.listText]}>
                {strings.profile.vipMemberShip}
              </Text>
            </View>
            <FontAwesomeIcon
              icon={faArrowRight}
              color={theme.light.colors.info}
              size={13}
            />
          </TouchableOpacity>
        )}

        {/* This feature for admin user */}
        {userType.user == `${strings.userType.admin}` && (
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.adminTools)}
            style={styles.list}
          >
            <View style={styles.rawContainer}>
              <View style={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={faSliders}
                  size={ms(13)}
                  color={theme.light.colors.primary}
                />
              </View>
              <Text style={[TextStyles.header, styles.listText]}>
                {strings.profile.adminTools}
              </Text>
            </View>
            <FontAwesomeIcon
              icon={faArrowRight}
              color={theme.light.colors.info}
              size={13}
            />
          </TouchableOpacity>
        )}

        <View style={styles.PostButtonContainer}>
          <TouchableOpacity>
            <Button
              title={strings.profile.logout}
              style={styles.withdrawBtn}
              textStyle={{
                color: theme.light.colors.primary,
              }}
              onPress={() => dispatch(logout())}
            />
          </TouchableOpacity>
        </View>

        {/* This feature is for free and VIP users */}
        {userType.user == `${strings.userType.free}` && Footer()}
        {userType.user == `${strings.userType.vip}` && Footer()}
      </View>
    </SafeAreaView>
  );
}

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.socialContainer}>
        <Icon icon={faFacebook} size={ms(25)} style={styles.socialIcon} />
        <Icon icon={faTiktok} size={ms(25)} style={styles.socialIcon} />
        <Icon icon={faSnapchat} size={ms(25)} style={styles.socialIcon} />
        <Icon icon={faYoutube} size={ms(25)} style={styles.socialIcon} />
        <Icon icon={faInstagram} size={ms(25)} style={styles.socialIcon} />
      </View>
      <View style={styles.copyWriteContainer}>
        <Text style={styles.copyRightText}> {strings.profile.appVersion} </Text>
        <Text style={styles.copyRightText}>
          {strings.profile.copyRightText}{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerIcon: {
    color: theme.light.colors.info,
  },
  TopBackButton: { padding: ms(10) },
  headerText: {
    color: theme.light.colors.black,
    paddingLeft: ms(9),
  },
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(10),
  },
  upgradeBox: {
    height: 100,
    borderWidth: 1,
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.primaryBgLight,
    borderRadius: 10,
    padding: ms(10),
    paddingTop: ms(20),
    paddingLeft: ms(20),
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bellIcon: { flexDirection: 'row' },
  rawContainer: { flexDirection: 'row', alignItems: 'center' },
  upgradeText: [
    TextStyles.header,
    {
      fontSize: ms(16, 0.3),
      color: theme.light.colors.activeTabLabel,
      paddingLeft: ms(12),
    },
  ],
  lebelText: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    paddingTop: ms(10),
  },
  list: {
    height: ms(65),
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
    fontSize: ms(16, 0.3),
    paddingLeft: ms(10),
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(50),
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

  // logout

  withdrawBtn: {
    width: '100%',
    backgroundColor: theme.light.colors.white,
    borderWidth: 1,
    borderColor: theme.light.colors.primary,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  PostButtonContainer: {
    marginTop: ms(12),
  },
  ArrowRight: {
    top: ms(20),
  },
});
