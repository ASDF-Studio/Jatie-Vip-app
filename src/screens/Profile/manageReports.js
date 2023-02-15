import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { ms, vs } from 'react-native-size-matters';
import { CardHeader, TopBackButton } from '@/components';
import { NAVIGATION } from '@/constants';
import { Data } from './ProfileData/manageReportData';

export default function ManageReports({ navigation }) {
  return (
    <View style={styles.contianer}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}{' '}
      </Text>
      <View style={styles.body}>
        <FlatList
          data={Data}
          key={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.list}
              onPress={() => {
                if (item.reportOn == 'post') {
                  navigation.navigate(NAVIGATION.manageReportOnPost);
                }
                if (item.reportOn == 'message') {
                  navigation.navigate(NAVIGATION.manageReportOnMessage);
                }
                if (item.reportOn == 'profile') {
                  navigation.navigate(NAVIGATION.manageReportOnProfile);
                }
              }}
            >
              <CardHeader
                fullName={item.fullName}
                userName={item.userName}
                profilePic={item.profilePic}
                time={item.time}
              />
              <View style={styles.activity}>
                <View style={styles.textContainer}>
                  <Text style={styles.statsTxt}>
                    {' '}
                    {strings.profile.reported}{' '}
                  </Text>
                  <Text style={styles.reactOnTxt}>
                    {' '}
                    {`this ${item.reportOn}`}{' '}
                  </Text>
                </View>
                <View style={styles.reasonContainer}>
                  <Text style={styles.reasonTxt}>
                    {strings.profile.reason}{' '}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
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
  headerText: {
    color: theme.light.colors.black,
    paddingLeft: ms(9),
  },
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  list: {
    backgroundColor: theme.light.colors.white,
    marginTop: vs(3),
    borderColor: theme.light.colors.primary,
  },
  TopBackButton: { padding: ms(10) },
  activity: {
    flexDirection: 'row',
    padding: ms(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
    // paddingLeft : ms(5)
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
  },
  reasonContainer: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 10,
    padding: ms(3),
    marginLeft: ms(10),
  },
  reasonTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(10, 0.3),
  },
});
