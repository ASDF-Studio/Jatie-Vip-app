import {
  createExclusivePost,
  getAllExclusivePost,
  TYPES,
} from '@/actions/PostActions';
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
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
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
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getUser } from '@/selectors/UserSelectors';
import { CustomSwitch } from '@/components/switch';
export default function AdminPostOption({ navigation, route }) {
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.CREATE_EXCLUSIVE_POST], state)
  );
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [schedulePost, setSchedulePost] = useState(false);
  const [vipOnly, setVipOnly] = useState(false);
  const [pinPost, setPinPost] = useState(false);

  const [postDate, setPostDate] = useState(new Date());
  const [openPostDatePicker, setOpenPostDatePicker] = useState(false);

  const [endDate, SetEndDate] = useState(new Date());
  const [openEndDatePicker, setopenEndDatePicker] = useState(false);
  const finalData = route.params.prevData;

  // const [publishingDate, setPublishingDate] = useState(new Date());
  // const [openPublishingDatePicker, setOpenPublishingDatePicker] = useState(false);

  // const [expiringDate, setExpiringDate] = useState(new Date());
  // const [openExpiringDatePicker, setOpenExpiringDatePicker] = useState(false);

  const onExclusivePost = () => {
    const data = {
      postExpires: moment(postDate).format(),
      isVIPonly: vipOnly,
      isUSAonly: pinPost,
      schedulePost: schedulePost,
      scheduleDate: moment(postDate).format(),
      userId: user?.id,
      postTitle: finalData?.postTitle,
      postBody: finalData?.postBody,
      imageArray: finalData?.imageArray,
    };
    dispatch(createExclusivePost(data));
    const dataa = {
      userId: user?.id,
    };
    // dispatch(getAllExclusivePost(dataa))
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TopBackButton
            onPress={() => navigation.goBack()}
            style={styles.TopBackButton}
          />
          <Text style={styles.headerTxt}>{strings.home.postOptions} </Text>
        </View>
        <CustomLoader open={isLoading} />
        <View style={styles.optionContainer}>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>
                {strings.exclusive.schedulePost}{' '}
              </Text>
              <View style={styles.postSwitch}>
                <CustomSwitch
                  value={schedulePost}
                  onChange={() => setSchedulePost(prev => !prev)}
                />
              </View>
            </View>
            <View style={styles.right}>
              {/* Date picker  */}
              <View>
                <TextField
                  style={{
                    ...styles.rightTextField,
                    backgroundColor: schedulePost
                      ? theme.light.colors.textFieldBackgroundColor
                      : theme.light.colors.white,
                  }}
                  editable={false}
                  value={moment(postDate).format('hh:mm A DD/MM/YYYY')}
                  placeholder={strings.home.selectTimeAndDate}
                />
                <TouchableOpacity
                  style={[styles.datePickerIcon]}
                  disabled={!schedulePost}
                  onPress={() => setOpenPostDatePicker(true)}
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
                  mode="datetime"
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
              <Text style={styles.listTxt}>{strings.home.forVIPsOnly} </Text>
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
              <Text style={styles.listTxt}>{strings.home.pinThisPost} </Text>
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
                onExclusivePost();
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
  rightTextField: {
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
