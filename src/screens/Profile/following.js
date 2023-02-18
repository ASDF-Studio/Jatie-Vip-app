import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  faEllipsis,
  faMessage,
  faFlag,
  faXmark,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { TopBackButton, Icon, Badge, HorizontalLine } from '@/components';
import { ModalDown, ModalList } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { Data } from './ProfileData/followingData';

export default function Following({ navigation }) {
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <View style={styles.listHeader}>
        <Text style={styles.headerTxt}>{strings.profile.myFollowing}</Text>
        <Badge count={23} size={ms(16)} />
      </View>
      <HorizontalLine
        color={theme.light.colors.primaryBg}
        paddingTop={8}
        paddingBottom={20}
      />
      <View>
        <FlatList
          data={Data}
          key={props => props.id}
          initialNumToRender={10}
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.bellowContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.listContainer}>
                <TouchableOpacity
                  style={styles.list}
                  onPress={() => navigation.navigate(NAVIGATION.userProfile)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.profileImage}
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}> {item.name}</Text>
                    <Text style={styles.userNameTxt}> {item.userName} </Text>
                  </View>
                </TouchableOpacity>
                <Icon
                  icon={faEllipsis}
                  size={ms(15)}
                  color={theme.light.colors.secondary}
                  onPress={() => setOpen(true)}
                />
              </View>
            );
          }}
        />
      </View>
      <ModalDown open={open} setOpen={setOpen}>
        <ModalList
          title={strings.profile.unfollow + strings.home.DummyUser}
          icon={faUserMinus}
          iconColor={theme.light.colors.primary}
          iconBg={theme.light.colors.primaryBgLight}
          // onPress = {()=> Alert.alert("follow")}
        />
        <ModalList
          title={strings.profile.sendPrivateMessage}
          icon={faMessage}
          iconColor={theme.light.colors.success}
          iconBg={theme.light.colors.successBgLight}
          // onPress = {()=> Alert.alert("message")}
        />
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={15}
          paddingBottom={8}
        />
        <ModalList
          title={strings.profile.reportUser}
          icon={faFlag}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          // onPress = {()=> Alert.alert("report")}
        />
        <ModalList
          title={strings.profile.block + strings.home.DummyUser}
          icon={faXmark}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          // onPress = {()=> Alert.alert("blocked")}
        />
      </ModalDown>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  TopBackButton: { padding: ms(10) },
  listHeader: {
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(9),
      paddingRight: ms(10),
    },
  ],
  bellowContainer: {
    paddingTop: ms(10),
  },

  listContainer: {
    padding: ms(2),
    paddingLeft: ms(8),
    paddingRight: ms(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: ms(2),
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerStyle: { paddingBottom: ms(100) },
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: ms(5),
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(15, 0.3),
    color: theme.light.colors.black,
  },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
  },
});
