import { AppSwitch, Button, TextField, TopBackButton } from '@/components';
import { strings } from '@/localization';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
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

export default function PostOptions({ navigation }) {
  const [schedulePost, setSchedulePost] = useState(false);
  const [vipOnly, setVipOnly] = useState(false);
  const [pinPost, setPinPost] = useState(false);
  const [goingLIve, setGoingLive] = useState(false);
  const [ad, setAd] = useState(false);

  const [postDate, setPostDate] = useState(new Date());
  const [openPostDatePicker, setOpenPostDatePicker] = useState(false);

  const [publishingDate, setPublishingDate] = useState(new Date());
  const [openPublishingDatePicker, setOpenPublishingDatePicker] =
    useState(false);

  const [expiringDate, setExpiringDate] = useState(new Date());
  const [openExpiringDatePicker, setOpenExpiringDatePicker] = useState(false);

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
        <View style={styles.optionContainer}>
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>{strings.home.schedulePost} </Text>
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
                  style={styles.rightContainerTextField}
                  editable={false}
                  // value = {Moment(postDate).format('DD-MM-YYYY')}
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
          <View style={styles.list}>
            <View style={styles.left}>
              <Text style={styles.listTxt}>{strings.home.forVIPsOnly} </Text>
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
              <Text style={styles.listTxt}>{strings.home.pinThisPost} </Text>
              <View style={styles.pinSwitch}>
                <AppSwitch
                  value={pinPost}
                  onChange={() => setPinPost(prev => !prev)}
                />
              </View>
            </View>
          </View>
          <View style={styles.listTopAndBottom}>
            <View style={styles.listTop}>
              <Text style={styles.listTxt}>{strings.home.goingLive} </Text>
              <View style={styles.goingLiveSwitch}>
                <AppSwitch
                  value={goingLIve}
                  onChange={() => setGoingLive(prev => !prev)}
                />
              </View>
            </View>
            <Text style={styles.lebelTxt}>{strings.home.goingLiveLebel} </Text>
          </View>

          <View style={styles.listTopAndBottom}>
            <View style={styles.listBottom}>
              <Text style={styles.listTxt}>{strings.home.thisIsAnAd} </Text>
              <View style={styles.adSwitch}>
                <AppSwitch value={ad} onChange={() => setAd(prev => !prev)} />
              </View>
            </View>
            <Text style={styles.lebelTxt}>{strings.home.adLebel} </Text>
          </View>

          {ad && (
            <View>
              <View style={styles.list}>
                <View style={styles.left}>
                  <Text style={styles.publishingTxt}>
                    {strings.home.publishingDate}{' '}
                  </Text>
                </View>
                <View style={styles.right}>
                  {/* Date picker  */}
                  <View>
                    <TextField
                      style={styles.datePicketTextField}
                      editable={false}
                      // value = { publishingDate?Moment(publishingDate).format('DD-MM-YYYY'): null}
                      placeholder={strings.home.publishingDate}
                    />
                    <TouchableOpacity
                      style={styles.datePickerIcon}
                      onPress={() => setOpenPublishingDatePicker(true)}
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size={ms(13)}
                        color={theme.light.colors.info}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      mode="date"
                      open={openPublishingDatePicker}
                      // locale = "fr"
                      date={publishingDate}
                      onConfirm={date => {
                        setOpenPublishingDatePicker(false);
                        setPublishingDate(date);
                      }}
                      onCancel={() => {
                        setOpenPublishingDatePicker(false);
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.list}>
                <View style={styles.left}>
                  <Text style={styles.publishingTxt}>
                    {strings.home.ExpirationDate}
                  </Text>
                </View>
                <View style={styles.right}>
                  {/* Date picker  */}
                  <View>
                    <TextField
                      style={styles.datePicketTextField}
                      editable={false}
                      // value = {Moment(expiringDate).format('DD-MM-YYYY')}
                      placeholder={strings.home.ExpirationDate}
                    />

                    <TouchableOpacity
                      style={styles.datePickerIcon}
                      onPress={() => setOpenExpiringDatePicker(true)}
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        size={ms(13)}
                        color={theme.light.colors.info}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      mode="date"
                      open={openExpiringDatePicker}
                      // locale = "fr"
                      date={expiringDate}
                      onConfirm={date => {
                        setOpenExpiringDatePicker(false);
                        setExpiringDate(date);
                      }}
                      onCancel={() => {
                        setOpenExpiringDatePicker(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.buttomContainer}>
            <Button
              title={strings.home.post}
              // onPress = {}
              style={styles.buttonPost}
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
  headerContainer: {
    paddingTop: 20,
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(9),
    },
  ],
  optionContainer: {
    padding: ms(0),
  },
  TopBackButton: {
    padding: ms(10),
    paddingBottom: ms(10),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    // borderTopWidth: 1, //
    borderBottomWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    padding: ms(12), //9
  },
  listTopAndBottom: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    // borderTopWidth: 1, //
    borderBottomWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    padding: ms(12), //9 },
  },
  listTop: {
    flexDirection: 'row',
  },
  listBottom: {
    flexDirection: 'row',
  },
  rightContainerTextField: {
    width: ms(170),
  },
  datePickerIcon: {
    position: 'absolute',
    top: ms(30),
    right: ms(10),
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
  datePicketTextField: {
    width: ms(170),
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

  //button

  buttomContainer: {
    padding: ms(9),
  },
  buttonPost: {
    marginTop: ms(20),
  },
});
