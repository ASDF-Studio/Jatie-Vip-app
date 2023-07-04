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
import { faEllipsis, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  HorizontalLine,
  Icon,
  TextField,
  TopBackButton,
  Badge,
  ModalDown,
  ModalList,
  CustomLoader,
} from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { Data } from './ProfileData/bannedUsersData';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES, bannedUsers, unBannedUserById } from '@/actions/UserActions';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getUser } from '@/selectors/UserSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { DefaultProfile } from '@/assets';

export default function Notification({ navigation }) {
  const [open, setOpen] = useState(false);
  const [bannedId, SetBannedId] = useState(null);
  const [userName, setUserName] = useState('');
  const focus = useIsFocused();

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_BANNED_USERS], state)
  );

  useEffect(() => {
    if (focus) {
      dispatch(bannedUsers());
    }
  }, [focus]);

  const unBannedHandlePress = () => {
    dispatch(unBannedUserById(bannedId.id));
    setOpen(false);
    setTimeout(() => {
      dispatch(bannedUsers());
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomLoader open={isLoading} />
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <View style={styles.listHeader}>
        <Text style={styles.headerTxt}>{strings.profile.bannedUsers}</Text>
        <Badge count={user?.getAllBannedUsersKey?.data.length} size={ms(13)} />
      </View>
      <HorizontalLine
        color={theme.light.colors.primaryBg}
        paddingTop={5}
        paddingBottom={5}
      />
      <View style={styles.searchBox}>
        <TextField
          style={styles.searchBoxTextBox}
          placeholder={strings.profile.searchUser}
        />
        <View style={styles.moreIcon}>
          <Icon icon={faSearch} size={13} color={theme.light.colors.black} />
        </View>
      </View>
      <HorizontalLine
        color={theme.light.colors.infoBgLight}
        paddingTop={2}
        paddingBottom={2}
      />
      <View style={styles.searchList}>
        <View>
          <FlatList
            data={user?.getAllBannedUsersKey?.data}
            key={props => props.id}
            initialNumToRender={10}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item, id }) => {
              return (
                <View style={styles.listContainer}>
                  <TouchableOpacity style={styles.list}>
                    <Image
                      source={
                        item.user.profilePic
                          ? { uri: item.user.profilePic }
                          : DefaultProfile
                      }
                      style={styles.profileImage}
                    />
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}> {item.user.fullName} </Text>
                      <Text style={styles.userNameTxt}>
                        {' '}
                        {`@${item.user.username}`}{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Icon
                    icon={faEllipsis}
                    size={ms(15)}
                    color={theme.light.colors.secondary}
                    onPress={() => {
                      SetBannedId(item.user), setOpen(true);
                    }}
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
            onPress={unBannedHandlePress}
            title={strings.profile.unban + ` @${bannedId?.username}`}
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
      paddingRight: ms(5),
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
    backgroundColor: theme.light.colors.white,
  },
  moreIcon: {
    position: 'absolute',
    left: ms(20),
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
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: ms(7),
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
