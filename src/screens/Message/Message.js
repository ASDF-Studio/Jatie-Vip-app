import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { TextStyles, theme } from '@/theme';
import { strings } from '@/localization';
import {
  faBellSlash,
  faBoxArchive,
  faFlag,
  faSearch,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ms, vs } from 'react-native-size-matters';
import {
  AppSwitch,
  Button,
  HorizontalLine,
  Icon,
  ModalDown,
  ModalList,
  VerticalLine,
} from '@/components';
import { useState } from 'react';
import { FontFamily } from '@/theme/Fonts';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { NAVIGATION } from '@/constants';
import { Logo } from '@/assets';
import { Data } from './MessageData/messageData';

export function Message({ navigation }) {
  const [unreadOnlySwitch, setUnreadonlySwitch] = useState(false);
  const [archiveSwitch, setArchiveSwitch] = useState(false);
  const [openCrud, setOpenCrud] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.userPic}>
            <Logo />
          </View>
          <View>
            <Text style={styles.nameTxt}> {strings.message.message}</Text>
            <View style={styles.filterContainer}>
              <View style={styles.filter}>
                <Text style={styles.filterTxt}>
                  {' '}
                  {strings.message.unreadOnly}{' '}
                </Text>
                <AppSwitch
                  value={unreadOnlySwitch}
                  onChange={setUnreadonlySwitch}
                />
              </View>

              <VerticalLine />
              <View style={styles.filter}>
                <Text style={styles.filterTxt}>
                  {' '}
                  {strings.message.archive}{' '}
                </Text>
                <AppSwitch value={archiveSwitch} onChange={setArchiveSwitch} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <Icon
            icon={faSearch}
            size={ms(22)}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <Icon
            icon={faBell}
            size={ms(22)}
            style={styles.bellIcon}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
          />
          <View style={styles.bellAlert} />
        </View>
      </View>
      <HorizontalLine paddingTop={10} />

      <View style={styles.messageContainer}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(NAVIGATION.chat, item.id)}
              onLongPress={() => setOpenCrud(true)}
              style={styles.messageCard}
            >
              <View style={styles.messageHeader}>
                <View style={styles.messageCardLeft}>
                  <Image
                    source={{
                      uri: item.profilePic,
                    }}
                    style={styles.messageHeaderImage}
                  />
                  <View style={styles.messageHeaderText}>
                    {item.online == false ? (
                      <Text
                        style={[styles.fullNameTxt, styles.fullNameTxtColor]}
                      >
                        {item.name}{' '}
                      </Text>
                    ) : (
                      <Text style={styles.fullNameTxt}>{item.name} </Text>
                    )}

                    <Text style={styles.userNameTxt}> {item.userName} </Text>
                  </View>
                </View>
                <View style={styles.messageCardRight}>
                  <Text style={styles.minTxt}> {item.time} </Text>
                  {item.online == true ? (
                    <View style={styles.onlineSign} />
                  ) : null}
                </View>
              </View>
              {item.online == false ? (
                <Text style={[styles.messageTxt, styles.fullNameTxtColor]}>
                  {item.textMessage}{' '}
                </Text>
              ) : (
                <Text style={styles.messageTxt}> {item.textMessage}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      <Button
        title={strings.message.newMessage}
        onPress={() => navigation.navigate(NAVIGATION.searchUser)}
        style={styles.messageButton}
      />

      {openCrud && (
        <ModalDown open={openCrud} setOpen={setOpenCrud}>
          <ModalList
            title={strings.message.archive}
            icon={faBoxArchive}
            iconColor={theme.light.colors.primary}
            iconBg={theme.light.colors.primaryBgLight}
          />
          <ModalList
            title={strings.message.snoozeNotification}
            icon={faBellSlash}
            iconColor={theme.light.colors.info}
            iconBg={theme.light.colors.infoBgLight}
          />
          <ModalList
            title={strings.message.delete}
            icon={faTrash}
            iconColor={theme.light.colors.error}
            iconBg={theme.light.colors.infoBgLight}
          />
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
            paddingBottom={8}
          />
          <ModalList
            title={strings.message.reportThisMEssage}
            icon={faFlag}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
            onPress={() => {
              setOpenReport(true);
              setOpen(false);
            }}
          />
          <ModalList
            title={strings.operations.block}
            icon={faXmark}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
        </ModalDown>
      )}
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(8),
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: ms(10),
  },
  bellIcon: { marginLeft: ms(15) },
  nameTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
    },
  ],
  filterTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(12, 0.3),
  },
  userPic: {
    width: ms(61),
    height: ms(66),
    borderRadius: 100,
    marginLeft: ms(10),
    marginRight: ms(10),
    marginTop: ms(10),
  },
  filterContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: ms(28),
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  messageCard: {
    backgroundColor: theme.light.colors.white,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    // paddingTo : ms(15),
    padding: ms(9),
    paddingBottom: ms(30),
  },
  messageCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageHeaderImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: 100,
    marginTop: ms(10),
  },
  messageHeaderText: {
    flexDirection: 'row',
    paddingLeft: ms(10),
  },
  fullNameTxt: {
    fontFamily: FontFamily.Recoleta_black,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
    paddingLeft: ms(3),
  },
  fullNameTxtColor: { color: theme.light.colors.secondary },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
  },
  minTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(12, 0.3),
  },
  onlineSign: {
    width: ms(8),
    height: ms(8),
    backgroundColor: theme.light.colors.success,
    borderRadius: 100,
  },
  messageTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    position: 'absolute',
    top: ms(50),
    left: ms(60),
    color: theme.light.colors.black,
    paddingLeft: ms(10), //
  },
  messageButton: {
    width: '35%',
    position: 'absolute',
    bottom: ms(10),
    right: ms(10),
  },
  bellAlert: {
    height: ms(10),
    width: ms(10),
    backgroundColor: theme.light.colors.error,
    position: 'absolute',
    borderRadius: 100,
    left: ms(57),
    top: ms(28),
  },
});
