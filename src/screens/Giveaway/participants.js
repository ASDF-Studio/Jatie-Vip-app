import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  faEllipsis,
  faMessage,
  faFlag,
  faXmark,
  faUserPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { TopBackButton, Icon, Badge, HorizontalLine } from '@/components';
import { ModalDown, ModalList } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Data } from './giveawayData/participantsData';

export default function Participants({ navigation }) {
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <View style={styles.listHeader}>
        <Text style={[TextStyles.header, styles.HeaderDesign]}>
          {strings.giveaway.participants}
        </Text>
        <Badge count={strings.giveaway.twentyThree} size={ms(16)} />
      </View>
      <View style={styles.flatListContainer} />
      <View>
        <FlatList
          data={Data}
          key={props => props.id}
          initialNumToRender={10}
          contentContainerStyle={styles.contentContainerStyle}
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
                    <Text style={styles.nameTxt}> {item.name} </Text>
                    <Text> {item.userName} </Text>
                  </View>
                </TouchableOpacity>
                <Icon
                  icon={faEllipsis}
                  size={ms(15)}
                  color={theme.light.colors.black}
                  onPress={() => setOpen(true)}
                />
              </View>
            );
          }}
        />
      </View>
      <ModalDown open={open} setOpen={setOpen}>
        <ModalList
          title={strings.profile.follow}
          icon={faUserPlus}
          iconColor={theme.light.colors.primary}
          iconBg={theme.light.colors.primaryBgLight}
          onPress={() => Alert.alert(strings.giveaway.follow)}
        />
        <ModalList
          title={strings.profile.sendPrivateMessage}
          icon={faMessage}
          iconColor={theme.light.colors.success}
          iconBg={theme.light.colors.successBgLight}
          onPress={() => Alert.alert(strings.giveaway.message)}
        />
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={15}
          paddingBottom={8}
        />
        <ModalList
          title={strings.giveaway.deletePost}
          icon={faTrash}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.report)}
        />
        <ModalList
          title={strings.profile.block}
          icon={faXmark}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.blocked)}
        />
        <ModalList
          title={strings.giveaway.ban}
          icon={faFlag}
          iconColor={theme.light.colors.secondary}
          iconBg={theme.light.colors.infoBgLight}
          onPress={() => Alert.alert(strings.giveaway.report)}
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
  listHeader: {
    paddingTop: ms(5),
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(10),
  },
  HeaderDesign: {
    color: theme.light.colors.black,
    paddingRight: ms(10),
  },
  flatListContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.light.colors.primaryBgLight,
    marginBottom: ms(10),
    marginTop: ms(10),
  },
  contentContainerStyle: { paddingBottom: ms(100) },
  listContainer: {
    padding: ms(2),
    paddingLeft: ms(8),
    paddingRight: ms(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: ms(2),
    alignItems: 'center',
  },
  TopBackButton: { padding: ms(10), paddingBottom: ms(10) },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    // borderWidth: 1,
    // borderColor: theme.light.colors.info,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(15, 0.3),
    color: theme.light.colors.black,
  },
});
