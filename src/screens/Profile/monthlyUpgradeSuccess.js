import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button, TopBackButton } from '@/components';
import { TextStyles, theme } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import { Logo } from '@/assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';

export default function MonthlyUpgradeSuccess({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={styles.headerTxt}>{strings.profile.vipMemberShip} </Text>

      <View style={styles.succesBox}>
        <View>
          <Logo height={ms(70)} width={ms(70)} />
        </View>
        <View>
          <View>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={ms(25)}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={[TextStyles.header, styles.headerDesign]}>
            {strings.profile.youAreVIP}{' '}
          </Text>
          <Text style={styles.RenewsTxt}>{strings.profile.renews} </Text>
        </View>
      </View>

      <View style={styles.footerBtnContainer}>
        <Button title={strings.profile.upgradeYearlySubsription} />
        <Button
          title={strings.profile.cancelMemberShip}
          onPress={() => navigation.navigate(NAVIGATION.cancelMembership)}
          style={styles.Button}
          textStyle={{
            color: theme.light.colors.primary,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopBackButton: { padding: ms(10) },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(8),
    },
  ],
  succesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.light.colors.primaryBg,
    padding: ms(30),
  },
  Button: {
    marginTop: vs(10),
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.white,
  },
  footerBtnContainer: {
    margin: ms(10),
  },
  headerDesign: { fontSize: ms(18, 0.3), color: theme.light.colors.black },
  RenewsTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
  },
});
