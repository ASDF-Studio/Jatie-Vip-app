import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TextStyles, theme } from '@/theme';
import { Logo } from '@/assets';
import { ms, vs } from 'react-native-size-matters';
import { Button } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';

export default function UpgradeMembership({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Logo height={ms(100)} width={ms(100)} />
      </View>

      <View style={styles.headerTxtContainer}>
        <Text style={TextStyles.header}> {strings.profile.upgradeTo} </Text>
        <Text style={[TextStyles.header, styles.upgradeToHeader]}>
          {' '}
          {strings.profile.vipMemberShip}{' '}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[TextStyles.header, styles.benefitsHeader]}>
          {' '}
          {strings.profile.benefits}{' '}
        </Text>
        <View style={styles.list}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={styles.listText}> {strings.profile.benefit_1} </Text>
        </View>
        <View style={styles.list}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={styles.listText}> {strings.profile.benefit_2} </Text>
        </View>
        <View style={styles.list}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={styles.listText}> {strings.profile.benefit_3} </Text>
        </View>
        <View style={styles.list}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={styles.listText}> {strings.profile.benefit_4}</Text>
        </View>
        <View style={styles.list}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={styles.listText}> {strings.profile.benefit_5} </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={strings.profile.monthlyPlan}
            onPress={() =>
              navigation.navigate(NAVIGATION.monthlyUpgradeSuccess)
            }
            style={styles.monthlyPlanButton}
          />
          <Button
            title={strings.profile.yearlyPlan}
            style={styles.yearlyPlanButton}
          />
        </View>
        <View style={styles.footerTxtContainer}>
          <Text style={styles.footerTxt}>
            {' '}
            {strings.profile.saveByYearlyPlan}{' '}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  logo: {
    alignItems: 'center',
    marginTop: ms(10),
  },
  headerTxtContainer: {
    alignItems: 'center',
    marginTop: vs(20),
  },
  card: {
    backgroundColor: theme.light.colors.white,
    margin: ms(8),
    borderRadius: 10,
    padding: ms(10),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: theme.light.colors.successBg,
    borderRadius: 100,
    padding: ms(8),
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(5),
  },
  monthlyPlanButton: {
    marginTop: ms(10),
  },
  yearlyPlanButton: {
    marginTop: ms(10),
  },
  listText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(16, 0.3),
  },
  upgradeToHeader: { color: theme.light.colors.black },
  benefitsHeader: { fontSize: 15, color: theme.light.colors.black },
  btnContainer: {
    alignItems: 'center',
  },
  footerTxtContainer: {
    alignItems: 'center',
    padding: ms(10),
  },
  footerTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.black,
  },
});
