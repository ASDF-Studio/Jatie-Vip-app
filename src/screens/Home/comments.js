import {
  Button,
  CommentCard,
  CommentInput,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  ReportOnPostModal,
  Toast,
  TopBackButton,
} from '@/components';
import { strings } from '@/localization';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  faClose,
  faFlag,
  faImage,
  faMessage,
  faThumbsUp,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';
import { Data, SingleData } from './Data/commentsData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Comments({ navigation }) {
  const [openReplyTo, setOpenReplyTo] = useState(false);

  //Option and Report
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reportListOpen, setReportListOpen] = useState(false);
  const [reportOption, setReportOption] = useState([
    { label: 'Explicit Content', value: 'Explicit Content' },
    { label: 'Bullying or Hurrasment', value: 'Bullying' },
    { label: 'Sparm', value: 'Sparm' },
    { label: 'Misleading information or Fake News', value: 'Misleading' },
  ]);
  const [reportOptionValue, setReportOptionValue] = useState('');
  const [reportComment, setReportCommnet] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.headerContainer}>
          <TopBackButton
            onPress={() => navigation.goBack()}
            style={styles.TopBackButton}
          />
          <Text style={styles.headTxt}> {strings.home.comments} </Text>
        </View>
        <HorizontalLine color={theme.light.colors.infoBgLight} paddingTop={15} />
        <View style={styles.commentContainer}>
          <FlatList
            data={Data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CommentCard
                name={item.name}
                userName={item.userName}
                imageUrl={item.proflePic}
                time={10}
                commentTxt={item.commentTxt}
                likeCount={10}
                disLikeCount={2}
                replyPress={() => setOpenReplyTo(true)}
                morePress={() => setOpen(true)}
              />
            )}
          />
        </View>
        {openReplyTo && (
          <View style={styles.replyToContainer}>
            <View style={styles.replay}>
              <Text style={styles.replyTxt}> {strings.home.replyTo} </Text>
              <Text style={styles.replayFontWeight}> {SingleData.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setOpenReplyTo(false)}
              style={styles.closeIconContainer}
            >
              <FontAwesomeIcon
                icon={faClose}
                size={ms(13)}
                color={theme.light.colors.white}
              />
            </TouchableOpacity>
          </View>
        )}

        <CommentInput />
      </KeyboardAwareScrollView>

      {/*  Slide up for follow, edit , review  */}
      {open && (
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            title={strings.operations.follow + strings.home.DummyUser}
            icon={faUserPlus}
            iconColor={theme.light.colors.primary}
            iconBg={theme.light.colors.primaryBgLight}
          />
          <ModalList
            title={strings.operations.sendPrivateMessage}
            icon={faMessage}
            iconColor={theme.light.colors.success}
            iconBg={theme.light.colors.successBgLight}
          />
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
            paddingBottom={8}
          />
          <ModalList
            title={strings.home.report}
            icon={faFlag}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
            onPress={() => {
              setOpenReport(true);
              setOpen(false);
            }}
          />
          <ModalList
            title={strings.operations.block + strings.home.DummyUser}
            icon={faXmark}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
        </ModalDown>
      )}

      <ReportOnPostModal open={openReport} setOpen={setOpenReport}>
        <View style={styles.reportPostContainer}>
          <TopBackButton
            onPress={() => setOpenReport(false)}
            style={styles.reportPostBackButton}
          />
          <View style={styles.reportPostTopContainer}>
            <DropDownPicker
              placeholder={strings.home.selectReason}
              open={reportListOpen}
              value={reportOptionValue}
              items={reportOption}
              setOpen={setReportListOpen}
              setValue={setReportOptionValue}
              setItems={setReportOption}
              style={styles.dropDownPicker}
              textStyle={styles.dropListTxt}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
            <TextInput
              multiline
              editable
              onChangeText={val => setReportCommnet(val)}
              placeholder={strings.operations.addComments}
              numberOfLines={4}
              style={styles.txtInput}
            />
          </View>
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
          />
          <View style={styles.reportPostBottomContainer}>
            <Icon
              icon={faImage}
              size={ms(22)}
              color={theme.light.colors.secondary}
            />
            <Button
              title={strings.operations.submit}
              disabled={reportComment.length ? false : true}
              opacity={reportComment.length ? 1 : 0.4}
              style={styles.reportPostButton}
              onPress={() => {
                setOpenToast(true), setOpenReport(false);
              }}
            />
          </View>
        </View>
      </ReportOnPostModal>
      {openToast && (
        <Toast
          open={openToast}
          setOpen={setOpenToast}
          icon={faThumbsUp}
          message={strings.home.reportMessage}
          onPressOk={setOpenToast}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    paddingTop: ms(10),
    paddingLeft: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      fontSize: ms(16),
    },
  ],
  commentContainer: {
    flex: 1,
  },
  TopBackButton: {
    padding: ms(5),
    paddingBottom: ms(10),
  },
  replyToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(5),
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: theme.light.colors.secondary,
  },
  replay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replayFontWeight: { fontWeight: 'bold' },
  closeIconContainer: {
    backgroundColor: theme.light.colors.secondary,
    borderRadius: 100,
    padding: ms(5),
  },
  replyTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
  },

  // reportPostContainer

  reportPostContainer: {
    backgroundColor: theme.light.colors.white,
  },
  reportPostBackButton: {
    padding: ms(10),
    paddingBottom: ms(10),
  },
  reportPostTopContainer: {
    paddingLeft: ms(9),
    paddingRight: ms(9),
  },
  dropDownPicker: {
    padding: ms(10),
    marginBottom: ms(10),
    backgroundColor: theme.light.colors.inputFiled,
    borderWidth: 0,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  reportPostBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(10),
  },
  reportPostButton: {
    width: ms(100),
  },
  txtInput: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    lineHeight: ms(22),
    textAlignVertical: 'top',
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 10,
  },
});
