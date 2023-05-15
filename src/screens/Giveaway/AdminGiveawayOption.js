import { giveAwayPost, TYPES } from '@/actions/PostActions';
import { AppSwitch, Button, CustomLoader, TextField, TopBackButton } from '@/components';
import { strings } from '@/localization';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faCalendar, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
export default function AdminPostOption({ navigation, route }) {
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GIVE_AWAY_POST], state)
  );

  const dispatch = useDispatch()
  const [schedulePost, setSchedulePost] = useState(false);
  const [vipOnly, setVipOnly] = useState(false);
  const [pinPost, setPinPost] = useState(false);

  const [postDate, setPostDate] = useState(new Date());
  const [endDate, SetEndDate] = useState(new Date())
  const [openEndDatePicker, setopenEndDatePicker] = useState(false)
  const [openPostDatePicker, setOpenPostDatePicker] = useState(false);
  const finalData = route.params.prevData

  const data = {
    postExpires: moment(endDate).format(),
    startDate: moment(postDate).format(),
    endDate: moment(endDate).format(),
    isVIPonly: vipOnly,
    isUSAonly: pinPost
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TopBackButton
            onPress={() => navigation.goBack()}
            style={styles.TopBackButton}
          />
          <CustomLoader open={isLoading} />
          <Text style={styles.headerTxt}>{strings.home.postOptions} </Text>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>{strings.giveaway.startDate} </Text>
              <View style={styles.postSwitch}>
                <AppSwitch
                  value={schedulePost}
                  onChange={() => setSchedulePost(prev => !prev)}
                />
              </View>
            </View>
            <View style={styles.right}>
              {/* Date picker  */}
              <View>
                <TextField

                  style={styles.rightTextFild}
                  editable={false}
                  value={moment(postDate).format('MM-D-YYYY')}
                  placeholder={strings.home.selectTimeAndDate}
                />
                <TouchableOpacity
                  style={styles.datePickerIcon}
                  onPress={() => setOpenPostDatePicker(true)}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    size={ms(13)}
                    color={theme.light.colors.info}
                  />
                </TouchableOpacity>
                <DatePicker
                  minimumDate={new Date()}
                  modal
                  mode="date"
                  open={openPostDatePicker}
                  // locale = "fr"
                  date={postDate}
                  onConfirm={date => {
                    setOpenPostDatePicker(false);
                    setPostDate(date);

                  }}
                  onCancel={() => {
                    setOpenPostDatePicker(false);
                  }}
                />
              </View>
            </View>
          </View>

          {/* 2 */}

          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>{strings.giveaway.endDate} </Text>
              <View style={styles.postSwitch}>
                <AppSwitch
                  value={schedulePost}
                  onChange={() => setSchedulePost(prev => !prev)}
                />
              </View>
            </View>
            <View style={styles.right}>
              {/* Date picker  */}
              <View>
                <TextField
                  style={styles.rightTextFild}
                  editable={false}
                  value={moment(endDate).format('MM-D-YYYY')}
                  placeholder={strings.home.selectTimeAndDate}
                />
                <TouchableOpacity
                  style={styles.datePickerIcon}
                  onPress={() => setopenEndDatePicker(true)}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    size={ms(13)}
                    color={theme.light.colors.info}
                  />
                </TouchableOpacity>
                <DatePicker
                  minimumDate={postDate}
                  modal
                  mode="date"
                  open={openEndDatePicker}
                  date={endDate}
                  onConfirm={date => {
                    setopenEndDatePicker(false);
                    SetEndDate(date);
                  }}
                  onCancel={() => {
                    setopenEndDatePicker(false);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>
                {strings.giveaway.forVIPsOnly}{' '}
              </Text>
              <View style={styles.vipSwitch}>
                <AppSwitch
                  value={vipOnly}
                  onChange={() => setVipOnly(prev => !prev)}
                />
              </View>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>{strings.giveaway.usOnly} </Text>
              <View style={styles.pinSwitch}>
                <AppSwitch
                  value={pinPost}
                  onChange={() => setPinPost(prev => !prev)}
                />
              </View>
            </View>
          </View>

          <View style={styles.PostButtonContainer}>
            <Button
              onPress={() => dispatch(giveAwayPost({ ...finalData, ...data }))}
              style={styles.PostButton}
              title={strings.exclusive.postButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },

  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(9),
    },
  ],
  optionContainer: {
    // height: 600,
    padding: ms(0),
    flexDirection: 'column',
  },
  TopBackButton: { padding: ms(10), paddingBottom: ms(10) },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    // borderTopWidth: 1, //
    borderBottomWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    padding: ms(12), //9
  },
  datePickerIcon: {
    position: 'absolute',
    top: ms(30),
    right: ms(10),
  },
  rightTextFild: {
    width: ms(170),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTxt: {
    fontSize: ms(16, 0.3),
    fontFamily: FontFamily.Recoleta_medium,
    color: theme.light.colors.black,
  },
  postSwitch: {
    marginLeft: ms(2),
  },
  vipSwitch: {
    marginLeft: ms(4),
  },
  pinSwitch: {
    marginLeft: ms(5),
  },
  goingLiveSwitch: {
    marginLeft: ms(25),
  },
  adSwitch: {
    marginLeft: ms(12),
  },
  lebelTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(15, 0.3),
  },
  adPublishDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  publishingTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    lineHeight: ms(22),
  },
  PostButtonContainer: {
    margin: ms(10),
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
