import React, { useState } from 'react';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  faSearch,
  faEllipsis,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  HorizontalLine,
  Icon,
  TextField,
  TopBackButton,
  Badge,
  ModalDown,
  ModalList,
} from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { Data } from './ProfileData/bannedUsersData';

export default function Notification({ navigation }) {
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <View style={styles.listHeader}>
        <Text style={styles.headerTxt}>{strings.profile.bannedUsers}</Text>
        <Badge count={23} size={ms(16)} />
      </View>

      <View style={styles.searchBox}>
        <TextField
          style={styles.searchBoxTextBox}
          placeholder={strings.profile.searchUser}
        />
        <View style={styles.moreIcon}>
          <Icon icon={faSearch} color={theme.light.colors.secondary} />
        </View>
      </View>
      <HorizontalLine />

      <View style={styles.searchList}>
        <View>
          <FlatList
            data={Data}
            key={props => props.id}
            initialNumToRender={10}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => {
              return (
                <View style={styles.listContainer}>
                  <TouchableOpacity style={styles.list}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.profileImage}
                    />
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}> {item.name} </Text>
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
      </View>

      {open && (
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            title={strings.profile.unban}
            icon={faCheck}
            iconColor={theme.light.colors.info}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(9),
    },
  ],
  TopBackButton: { padding: 10 },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContainer: {
    position: 'absolute',
    top: ms(45),
    left: ms(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    marginTop: vs(-15),
    marginBottom: vs(-10),
  },
  searchBoxTextBox: {
    paddingLeft: ms(40),
  },
  moreIcon: {
    position: 'absolute',
    left: ms(10),
    top: ms(30),
  },
  searchBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  searchTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
  },
  searchList: {
    padding: ms(10),
  },
  listHeader: {
    paddingTop: ms(5),
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(8),
    marginRight: ms(8),
    alignItems: 'center',
  },
  contentContainerStyle: { paddingBottom: ms(100) },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.light.colors.secondary,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
  },
});
