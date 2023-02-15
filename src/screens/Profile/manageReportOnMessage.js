import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import {
  HorizontalLine,
  TopBackButton,
  CardHeader,
  ModalDown,
  ModalList,
} from '@/components';
import { ms, vs } from 'react-native-size-matters';
import {
  faMessage,
  faUserPlus,
  faFlag,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ChatData } from './ProfileData/manageReportOnMessageData';

export default function ManageReportOnMessage({ navigation }) {
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}{' '}
      </Text>
      <HorizontalLine color={theme.light.colors.infoBgLight} />
      <CardHeader
        fullName={UserData.fullName}
        userName={UserData.userName}
        profilePic={UserData.profilePic}
        time={UserData.time}
      />
      <View style={styles.activity}>
        <View style={styles.textContainer}>
          <Text style={styles.statsTxt}> {strings.profile.reported} </Text>
          <Text style={styles.reactOnTxt}> {strings.profile.thisPost} </Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTxt}> {strings.profile.reason} </Text>
        </View>
      </View>
      <FlatList
        data={ChatData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.chatBoxContainer}
              onPress={() => setOpen(true)}
            >
              <View style={styles.leftChatBox}>
                <Text style={styles.chatTxt}> {item.userText} </Text>
              </View>
              <View>
                <Image
                  source={{ uri: item.userImage }}
                  style={styles.chatImage}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.rightChatBox}>
              <Text style={[styles.chatTxt, styles.chatTxtColor]}>
                {item.adminText}{' '}
              </Text>
            </View>
          </View>
        )}
      />
      {open && (
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            title={strings.operations.follow}
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
          <HorizontalLine color={theme.light.colors.infoBgLight} />
          <ModalList
            title={strings.operations.report}
            icon={faFlag}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
          <ModalList
            title={strings.profile.block}
            icon={faXmark}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
          <ModalList
            title={strings.profile.ban}
            icon={faFlag}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
        </ModalDown>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerText: {
    color: theme.light.colors.black,
    paddingLeft: ms(9),
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
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
    // paddingLeft : ms(5)
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
  },
  reasonContainer: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 10,
    padding: ms(3),
    marginLeft: ms(10),
  },
  reasonTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(10, 0.3),
    color: theme.light.colors.black,
  },
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(8),
  },
  chatTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.white,
  },
  chatTxtColor: { color: theme.light.colors.black },
  chatBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: '80%',
  },
  leftChatBox: {
    backgroundColor: theme.light.colors.activeTabIcon,
    padding: ms(10),
    borderRadius: 10,
  },
  rightChatBox: {
    width: '80%',
    marginLeft: '14%',
    backgroundColor: theme.light.colors.white,
    margin: ms(10),
    marginTop: vs(20),
    borderRadius: 10,
    alignItems: 'flex-end',
    padding: ms(5),
  },
  chatImage: {
    height: ms(50),
    width: ms(50),
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
  },
});

const UserData = {
  fullName: 'Adam',
  userName: '@adam',
  profilePic:
    'https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=ovIQ5GPurLd3mOUj82jB9v-bjGZ8updgy1ACaHMeEC0=',
  time: 10,
};
