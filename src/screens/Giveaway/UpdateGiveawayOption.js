import { giveAwayPost, TYPES, updateGiveaway } from '@/actions/PostActions';
import {
  AppSwitch,
  Button,
  CustomLoader,
  TextField,
  TopBackButton,
} from '@/components';
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
import { getUser } from '@/selectors/UserSelectors';
import { CustomSwitch } from '@/components/switch';
export default function UpdateGiveawayOption({ navigation, route }) {
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.UPDATE_GIVEAWAY], state)
  );
  const finalData = route.params.prevData;
  const dispatch = useDispatch();
  const [schedulePost, setSchedulePost] = useState(false);
  const user = useSelector(getUser);
  const [vipOnly, setVipOnly] = useState(false);
  const [pinPost, setPinPost] = useState(false);
  const [startSwitch, setStartSwitch] = useState(false);

  const [endSwitch, setEndSwitch] = useState(false);
  const [postDate, setPostDate] = useState(new Date());
  const [endDate, SetEndDate] = useState(new Date());
  const [openEndDatePicker, setopenEndDatePicker] = useState(false);
  const [openPostDatePicker, setOpenPostDatePicker] = useState(false);
  const [winnerCount, setWinnerCount] = useState(0);

  console.log(finalData);

  const onCount = type => {
    var count = winnerCount;
    if (type == 'Minus') {
      if (count > 0) {
        count = count - 1;
        setWinnerCount(count);
      }
    } else {
      count = count + 1;
      setWinnerCount(count);
    }
  };
  const onUpdateGiveaway = () => {
    const data = {
      postExpires: moment(endDate).format(),
      startDate: moment(postDate).format(),
      endDate: moment(endDate).format(),
      isVIPonly: vipOnly,
      isUSAonly: pinPost,
      winnerCount: winnerCount,
      userId: user?.id,
      postTitle: finalData?.postTitle,
      postBody: finalData?.postBody,
      imageArray: finalData?.imageArray,
      preImageArray: finalData?.preImageArray,
      id: finalData?.id,
    };
    dispatch(updateGiveaway(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <CustomLoader open={isLoading} />}
      <ScrollView>
        <View style={styles.headerContainer}>
          <TopBackButton
            onPress={() => navigation.goBack()}
            style={styles.TopBackButton}
          />

          <Text style={styles.headerTxt}>
            {strings.giveaway.giveAwayOption}{' '}
          </Text>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>{strings.giveaway.startDate} </Text>
              <View style={styles.postSwitch}>
                <CustomSwitch
                  value={startSwitch}
                  onChange={() => setStartSwitch(!startSwitch)}
                />
              </View>
            </View>
            <View style={styles.right}>
              {/* Date picker  */}
              <View>
                <TextField
                  style={{
                    ...styles.rightTextFild,
                    backgroundColor: startSwitch
                      ? theme.light.colors.textFieldBackgroundColor
                      : theme.light.colors.white,
                  }}
                  editable={false}
                  value={moment(postDate).format('hh:mm A DD/MM/YYYY')}
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
                <CustomSwitch
                  value={endSwitch}
                  onChange={() => setEndSwitch(!endSwitch)}
                />
              </View>
            </View>
            <View style={styles.right}>
              {/* Date picker  */}
              <View>
                <TextField
                  style={{
                    ...styles.rightTextFild,
                    backgroundColor: endSwitch
                      ? theme.light.colors.textFieldBackgroundColor
                      : theme.light.colors.white,
                  }}
                  editable={false}
                  value={moment(endDate).format('hh:mm A DD/MM/YYYY')}
                  placeholder={strings.home.selectTimeAndDate}
                />
                <TouchableOpacity
                  style={styles.datePickerIcon}
                  disabled={!endSwitch}
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
                {strings.giveaway.numberOfWinners}{' '}
              </Text>
            </View>
            <View style={styles.right}>
              <View style={styles.plusMinusView}>
                <TouchableOpacity onPress={() => onCount('Minus')}>
                  <Text style={styles.minus}>{'-'} </Text>
                </TouchableOpacity>
                <View style={styles.counterView}>
                  <Text style={styles.counterText}>{winnerCount} </Text>
                </View>
                <TouchableOpacity onPress={() => onCount('Plus')}>
                  <Text style={styles.minus}>{'+'} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>
                {strings.giveaway.forVIPsOnly}{' '}
              </Text>
              <View style={styles.vipSwitch}>
                <CustomSwitch
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
                <CustomSwitch
                  value={pinPost}
                  onChange={() => setPinPost(prev => !prev)}
                />
              </View>
            </View>
          </View>

          <View style={styles.PostButtonContainer}>
            <Button
              onPress={() => {
                onUpdateGiveaway();
              }}
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
    top: ms(14),
    right: ms(10),
  },
  rightTextFild: {
    width: ms(190),
    marginVertical: 0,
    height: ms(40),
    // fontSize: 15,
    borderWidth: 1,
    borderColor: theme.light.colors.textFieldBorderColor,
    borderRadius: 8,
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
  minus: {
    fontSize: ms(30, 0.3),
    fontFamily: FontFamily.Recoleta_medium,
    color: theme.light.colors.info,
  },
  counterText: {
    fontSize: ms(18),
    fontFamily: FontFamily.BrandonGrotesque_light,
    color: theme.light.colors.black,
    textAlign: 'center',
  },
  counterView: {
    borderWidth: 0.3,
    borderRadius: 8,
    borderColor: theme.light.colors.inactiveTabLabel,
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(35),
    width: ms(60),
    marginHorizontal: 10,
  },
  postSwitch: {
    marginLeft: ms(2),
  },
  vipSwitch: {
    marginLeft: ms(4),
  },
  plusMinusView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
