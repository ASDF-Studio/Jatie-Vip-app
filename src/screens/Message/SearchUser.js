import React, { useState } from 'react';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faEllipsis,
  faFaceMehBlank,
  faUser,
  faBirthdayCake,
  faCrown,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { HorizontalLine, Icon, TextField, TopBackButton } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Data } from './MessageData/searchUserData';

export default function SearchUser({ navigation }) {
  const [searchListOpen, setSearchListOpen] = useState(false);
  const userType = useSelector(state => state.userType);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <TopBackButton
            onPress={() => navigation.goBack()}
            style={styles.TopBackButton}
          />
        </View>
        <View style={styles.right}>
          <Icon
            icon={faSearch}
            color={theme.light.colors.black}
            size={ms(20)}
            style={styles.searchIcon}
          />
          <Icon
            icon={faBell}
            color={theme.light.colors.black}
            size={ms(20)}
            // onPress={() => navigation.navigate(NAVIGATION.notification)}
            style={styles.bellIcon}
          />
        </View>
      </View>
      <View style={styles.searchBox}>
        <View>
          <TextField
            style={styles.searchBoxTextField}
            placeholder={strings.message.typeUser}
            onFocus={() => setSearchListOpen(true)}
          />
          <View style={styles.userIcon}>
            <FontAwesomeIcon icon={faUser} size={ms(13)} />
          </View>
        </View>
        <View style={styles.moreIcon}>
          <Icon icon={faEllipsis} />
        </View>
      </View>
      <HorizontalLine />

      {!searchListOpen && (
        <View style={styles.searchBody}>
          <FontAwesomeIcon
            icon={faFaceMehBlank}
            size={ms(44)}
            color={theme.light.colors.primary}
          />
          <Text style={[styles.searchTxt, styles.searchBodyTxt]}>
            {' '}
            {strings.message.emptyTxt}
          </Text>
        </View>
      )}

      {searchListOpen && (
        <ScrollView>
          <View style={styles.searchList}>
            {/* <Text style={styles.searchTxt}> {strings.profile.searchResult}</Text> */}
            <View>
              {userType.user == `${strings.userType.admin}` && (
                <View>
                  {groupMessage(
                    faUserGroup,
                    strings.message.toEveryOne,
                    navigation
                  )}
                  {groupMessage(faCrown, strings.message.toVipOnly, navigation)}
                  {groupMessage(
                    faUser,
                    strings.message.toFreeMemberOnly,
                    navigation
                  )}
                  {groupMessage(
                    faBirthdayCake,
                    strings.message.birthDaysToday,
                    navigation
                  )}
                  <HorizontalLine
                    color={theme.light.colors.infoBgLight}
                    paddingTop={10}
                    paddingBottom={10}
                  />
                </View>
              )}

              {Data.map(item => {
                return (
                  <View style={styles.listContainer} key={item.id}>
                    <TouchableOpacity
                      style={styles.list}
                      // onPress = {()=> navigation.navigate(NAVIGATION.userProfile)}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.profileImage}
                      />
                      <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}> {item.name} </Text>
                        <Text style={styles.userNameTxt}>
                          {' '}
                          {item.userName}{' '}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// group message for admin

const groupMessage = (icon, name, navigation) => {
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        style={styles.list}
        onPress={() =>
          navigation.navigate(NAVIGATION.adminGroupChat, {
            paramName: name,
            paramIcon: icon,
          })
        }
      >
        <View style={styles.iconContainer}>
          <Icon icon={icon} size={ms(20)} style={styles.iconDesign} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}> {name}</Text>
        </View>

        {name == strings.message.birthDaysToday ? (
          <View style={styles.bdayUsersContainer}>
            <Text style={styles.bdayUsersText}>
              {strings.message.birthdayUsers}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: ms(10),
    paddingBottom: ms(10),
    padding: ms(3),
  },
  TopBackButton: { paddingLeft: ms(10) },
  bellIcon: { marginRight: ms(10) },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: { marginRight: ms(15) },
  switchContainer: {
    position: 'absolute',
    top: ms(45),
    left: ms(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    marginTop: vs(-15),
    marginBottom: vs(-15),
    paddingLeft: ms(10),
    marginRight: ms(5),
  },
  searchBoxTextField: {
    paddingLeft: ms(30),
    paddingRight: ms(80),
    paddingBottom: ms(10),
    backgroundColor: theme.light.colors.white,
  },
  userIcon: {
    position: 'absolute',
    top: ms(28),
    left: ms(9),
  },
  moreIcon: {
    position: 'absolute',
    right: ms(10),
    top: ms(25),
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
  searchBodyTxt: {
    fontSize: ms(18),
    marginTop: ms(10),
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
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    borderWidth: 1,
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

  //admin

  iconContainer: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light.colors.primaryBg,
  },
  iconDesign: {
    color: theme.light.colors.primary,
  },

  // birthday users

  bdayUsersContainer: {
    marginLeft: ms(5),
    backgroundColor: theme.light.colors.infoBgLight,
    borderRadius: 5,
    paddingLeft: ms(10),
    paddingRight: ms(10),
    paddingTop: ms(2),
    paddingBottom: ms(2),
  },
  bdayUsersText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.info,
    fontSize: ms(12, 0.3),
  },
});
