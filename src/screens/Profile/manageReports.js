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
import { CardHeader, HorizontalLine, TopBackButton } from '@/components';
import { NAVIGATION } from '@/constants';
import { Data } from './ProfileData/manageReportData';
import { useIsFocused } from '@react-navigation/native';
import { manageAllReports } from '@/actions/UserActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ManageReports({ navigation }) {

  const focus = useIsFocused();
  const dispatch = useDispatch()

  useEffect(() => {
    if (focus) {
      dispatch(manageAllReports())
    }
  }, [focus]);
  return (
    <View style={styles.contianer}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}{' '}
      </Text>
      <HorizontalLine color={theme.light.colors.primaryBg} paddingBottom={12} />
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
                    {strings.profile.reported}
                  </Text>
                  <Text style={styles.reactOnTxt}>
                    {`this ${item.reportOn}`}
                  </Text>
                </View>
                <View style={styles.reasonContainer}>
                  <Text style={styles.reasonTxt}>{strings.profile.reason}</Text>
                </View>
              </View>
              <HorizontalLine
                color={theme.light.colors.infoBg}
                paddingBottom={12}
              />
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
    paddingBottom: ms(10),
  },
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  list: {
    backgroundColor: theme.light.colors.white,
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
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    color: theme.light.colors.black,
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    marginLeft: ms(5),
  },
  reasonContainer: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 4,
    padding: ms(5),
    paddingHorizontal: 10,
    marginLeft: ms(10),
  },
  reasonTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(11, 0.3),
    color: theme.light.colors.black,
  },
});
