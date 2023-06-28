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
import {
  CardHeader,
  HorizontalLine,
  StatusNavigatorBar,
  TopBackButton,
  VerticalLine,
} from '@/components';
import { NAVIGATION } from '@/constants';
import { Data } from './ProfileData/manageReportData';
import { useIsFocused } from '@react-navigation/native';
import { ArchiveReport, manageAllReports } from '@/actions/UserActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { useState } from 'react';
import ReportedPosts from '@/components/ReportedPosts';
import ReportedUsers from '@/components/ReportedUsers';
import { CustomSwitch } from '@/components/switch';
import { merge, orderBy } from 'lodash';

export default function ManageReports({ navigation }) {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(strings.reports.post);
  const user = useSelector(getUser);
  const reports = user.allReportsKeyKey;
  const [isArchive, setIsArchive] = useState(false);
  const [isUnread, setIsUnread] = useState(false);

  useEffect(() => {
    if (focus) {
      dispatch(manageAllReports());
    }
  }, [focus, isUnread, isArchive]);

  const a = {
    created_at: '2023-05-30T06:32:21.355579+00:00',
    id: '21e11e31-5bfe-49a7-93bf-fd0814ec9d59',
    isArchived: false,
    objectId: null,
    post: null,
    reportBody: 'This post looks like it is a spam post. Please look into this',
    reportImg: [
      'https://d2wwqw32p0xkid.cloudfront.net/report_photo-1685428336659',
    ],
    reportTitle: 'Explicit Content',
    reportedBy: 'ce656365-b90f-4b5f-aab6-b436051171f5',
    reportedContent: 'post',
    updated_at: '2023-05-30T06:32:21.355579+00:00',
    user: {
      fullName: 'Team Airly1',
      id: 'ce656365-b90f-4b5f-aab6-b436051171f5',
      profilePic:
        'https://d2wwqw32p0xkid.cloudfront.net/photo-1679142507829.jpg',
      username: 'Jane',
    },
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
          <CustomSwitch value={isUnread} onChange={val => setIsUnread(val)} />
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
          <CustomSwitch value={isArchive} onChange={val => setIsArchive(val)} />
        </View>
      </View>
      <HorizontalLine color={theme.light.colors.primaryBg} />
      <View
        style={{
          backgroundColor: theme.light.colors.background,
          flex: 1,
        }}
      >
        <FlatList
          data={reports?.data?.reported_post}
          key={item => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.list}>
              <CardHeader
                fullName={item.user.fullName}
                userName={`@${item.user.username}`}
                profilePic={item.user?.profilePic}
                time={item.created_at}
                userId={item?.user.id}
                showArchive
                onArchivePress={() => ArchiveReport({ reportID: item.id })}
              />
              <View style={styles.activity}>
                <View style={styles.textContainer}>
                  <Text style={styles.statsTxt}>
                    {strings.profile.reported}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(NAVIGATION.manageReportOnPost, {
                        item: item,
                      });
                    }}
                  >
                    <Text style={styles.reactOnTxt}>
                      {`this ${item.reportedContent}`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.reasonContainer}>
                  <Text style={styles.reasonTxt}>
                    {strings.profile.reason} {item.reportTitle}
                  </Text>
                </View>
              </View>
              <HorizontalLine color={theme.light.colors.infoBg} />
            </View>
          )}
        />
      </View>
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
