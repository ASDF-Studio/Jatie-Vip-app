import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { CardHeader } from './cardHeader';
import { strings } from '@/localization';
import { HorizontalLine } from './horizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import {
  ArchiveReport,
  MarkSingleReportRead,
  TYPES,
  manageAllReports,
  markSingleNotifRead,
} from '@/actions/UserActions';
import { theme } from '@/theme';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { NAVIGATION } from '@/constants';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { CustomLoader } from './CustomLoader';
import { useState } from 'react';
import { size } from 'lodash';

const ReportedPosts = ({ navigation, onArchiveReport }) => {
  const [loading, setLoading] = useState(false);

  const user = useSelector(getUser);
  const reports = user.allReportsKeyKey;

  // const customReq = async () => {
  //   setLoading(true);
  //   await manageAllReports()(dispatch);
  //   setLoading(false);
  // };

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (focus) {
  //     customReq();
  //   }
  // }, [focus]);

  return (
    <View style={styles.body}>
      <FlatList
        data={reports?.data?.reported_post || []}
        key={item => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.list,
              !item?.isReadByAdmin && {
                backgroundColor: theme.light.colors.primaryBgSolid,
              },
            ]}
          >
            <CardHeader
              fullName={item.user.fullName}
              profilePic={item.user?.profilePic}
              userName={`@${item.user.username}`}
              time={item.created_at}
              userId={item?.user.id}
              showArchive={!item?.isArchived}
              onArchivePress={() => {
                onArchiveReport(item.id);
              }}
            />
            <View style={styles.activity}>
              <View style={styles.textContainer}>
                <Text style={styles.statsTxt}>{strings.profile.reported}</Text>
                <TouchableOpacity
                  onPress={() => {
                    {
                      MarkSingleReportRead({ reportId: item.id });
                      navigation.navigate(NAVIGATION.manageReportOnPost, {
                        item: item,
                      });
                    }
                  }}
                >
                  <Text style={styles.reactOnTxt}>
                    {`this ${item.reportedContent}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.reasonContainer}>
                <Text style={[styles.reasonTxt]} numberOfLines={1}>
                  {strings.profile.reason} {item.reportTitle}
                </Text>
              </View>
            </View>
            {size(reports?.data?.reported_post) - 1 !== index && (
              <HorizontalLine
                color={theme.light.colors.infoBg}
                paddingBottom={12}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};
export const styles = StyleSheet.create({
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
    maxWidth: '60%',
  },
  reasonTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(11, 0.3),
    color: theme.light.colors.black,
  },
});

export default ReportedPosts;
