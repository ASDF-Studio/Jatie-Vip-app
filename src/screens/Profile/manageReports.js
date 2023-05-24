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
import { CardHeader, HorizontalLine, StatusNavigatorBar, TopBackButton } from '@/components';
import { NAVIGATION } from '@/constants';
import { Data } from './ProfileData/manageReportData';
import { useIsFocused } from '@react-navigation/native';
import { manageAllReports } from '@/actions/UserActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { useState } from 'react';
import ReportedPosts from '@/components/ReportedPosts';
import ReportedUsers from '@/components/ReportedUsers';

export default function ManageReports({ navigation }) {

  const focus = useIsFocused();
  const dispatch = useDispatch()
  const [status, setStatus] = useState(strings.reports.post);
  const user = useSelector(getUser)
  const reports = user.allReportsKeyKey
  //console.log('reports', reports.data)

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
      <StatusNavigatorBar
        title1={strings.reports.post}
        key1={strings.reports.post}
        title2={strings.reports.users}
        key2={strings.reports.users}
        status={status}
        setStatus={setStatus}
      />
      <HorizontalLine color={theme.light.colors.primaryBg} paddingBottom={12} />
      {status == `${strings.reports.post}` ? (
        <ReportedPosts navigation={navigation} />

      ) : (
        <ReportedUsers navigation={navigation} />
      )}

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
    backgroundColor: '#FFFFFF',

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
