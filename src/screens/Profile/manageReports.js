import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { ms, vs } from 'react-native-size-matters';
import {
  CardHeader,
  HorizontalLine,
  StatusNavigatorBar,
  TopBackButton,
  VerticalLine,
} from '@/components';
import { useIsFocused } from '@react-navigation/native';
import { ArchiveReport, manageAllReports } from '@/actions/UserActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { useState } from 'react';
import ReportedPosts from '@/components/ReportedPosts';
import ReportedUsers from '@/components/ReportedUsers';
import { CustomSwitch } from '@/components/switch';

export default function ManageReports({ navigation }) {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(strings.reports.post);
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    isArchived: false,
    viewStatus: false,
    dateCursor: '',
  });
  const reports = user?.allReportsKeyKey

  useEffect(() => {
    if (focus) {
      getReportReq();
    }
  }, [focus, filter]);

  const getReportReq = async () => {
    setLoading(true);
    await manageAllReports({ filter })(dispatch);
    setLoading(false);
  };

  const onArchiveReport = reportId => {
    ArchiveReport({
      reportID: reportId,
    });
    setTimeout(() => {
      getReportReq();
    }, 100);
  };

  return (
    <View style={styles.contianer}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}{' '}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: ms(21),
          marginLeft: ms(9),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: ms(10),
              fontFamily: FontFamily.Recoleta_medium,
              fontSize: ms(12, 0.3),
              marginRight: ms(10),
            }}
          >
            {strings.profile.unreadOnly}
          </Text>
          <CustomSwitch
            value={filter.viewStatus}
            onChange={val =>
              setFilter({
                ...filter,
                viewStatus: val,
              })
            }
          />
        </View>

        <View
          style={{
            width: 2,
            marginHorizontal: 10,
            height: ms(19),
            backgroundColor: theme.light.colors.infoBgLight,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: ms(10),
              fontFamily: FontFamily.Recoleta_medium,
              fontSize: ms(12, 0.3),
              marginRight: ms(10),
            }}
          >
            {strings.message.archive}
          </Text>
          <CustomSwitch
            value={filter.isArchived}
            onChange={val =>
              setFilter({
                ...filter,
                isArchived: val,
              })
            }
          />
        </View>
      </View>
      <StatusNavigatorBar
        title1={strings.reports.post}
        key1={strings.reports.post}
        title2={strings.reports.users}
        key2={strings.reports.users}
        status={status}
        setStatus={setStatus}
      />
      <HorizontalLine color={theme.light.colors.primaryBg} />
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={theme.light.colors.activeTabIcon}
          style={{ alignSelf: 'center', marginTop: 50 }}
          animating={loading}
        />
      ) : status == `${strings.reports.post}` ? (
        <ReportedPosts
          navigation={navigation}
          onArchiveReport={onArchiveReport}
        />
      ) : (
        <ReportedUsers
          navigation={navigation}
          onArchiveReport={onArchiveReport}
        />
      )}

      {/* {status == `${strings.reports.post}` ? (
        <ReportedPosts navigation={navigation} />
      ) : (
        <ReportedUsers navigation={navigation} />
      )} */}
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
