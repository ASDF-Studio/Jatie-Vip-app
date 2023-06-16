import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { faEllipsis, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import {
  TopBackButton,
  Icon,
  Badge,
  ModalDown,
  ModalList,
  HorizontalLine,
  CustomLoader,
} from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { TYPES, blockUsersList } from '@/actions/UserActions';
import { useFocusEffect } from '@react-navigation/native';
import { unBlockUser } from '@/actions/PostActions';
import { useCallback } from 'react';

export default function BlockedUsers({ navigation }) {
  const [open, setOpen] = useState(false);
  const [blockUserId, setblockUserId] = useState('');
  const [blockUsername, setblockUserName] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //Selector Usage
  const user = useSelector(getUser);
  const blockListData = user.blockListKey;

  useFocusEffect(
    useCallback(() => {
      customReq();
    }, [])
  );

  const customReq = async () => {
    setLoading(true);
    await blockUsersList(user?.id)(dispatch);
    setLoading(false);
  };

  //handle unblock user By Id
  const handleUnblockPress = () => {
    dispatch(unBlockUser(user.id, blockUserId));
    setOpen(false);
    setTimeout(() => {
      dispatch(blockUsersList(user?.id));
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <View style={styles.listHeader}>
        <Text style={styles.headerTxt}>{strings.profile.blockedUsers}</Text>
        <Badge count={blockListData?.data?.length} size={ms(13)} />
      </View>
      <HorizontalLine
        color={theme.light.colors.primaryBg}
        paddingTop={15}
        // paddingBottom={8}
      />
      {loading ? (
        <ActivityIndicator
          animating={loading}
          color={theme.light.colors.activeTabIcon}
          size={'large'}
          style={styles.loaderStyle}
        />
      ) : (
        <View>
          <FlatList
            data={blockListData?.data}
            key={props => props.id}
            initialNumToRender={10}
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.bellowContainer}
            renderItem={({ item }) => {
              return (
                <View style={styles.listContainer}>
                  <TouchableOpacity
                    style={styles.list}
                    // onPress={() => navigation.navigate(NAVIGATION.userProfile)}
                  >
                    <Image
                      source={{ uri: item.userByBlockeduser.profilePic }}
                      style={styles.profileImage}
                    />
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}>
                        {' '}
                        {item.userByBlockeduser.fullName}
                      </Text>
                      <Text style={styles.userNameTxt}>
                        {' '}
                        {item.userByBlockeduser.username}{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Icon
                    icon={faEllipsis}
                    size={ms(15)}
                    color={theme.light.colors.secondary}
                    onPress={() => {
                      setOpen(true),
                        setblockUserId(item.blockedUser),
                        setblockUserName(item.userByBlockeduser.username);
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      )}

      {open && (
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            title={strings.profile.unblock + ' ' + blockUsername}
            icon={faCheck}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
            onPress={handleUnblockPress}
          />
        </ModalDown>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bellowContainer: {
    paddingTop: 10,
  },
  loaderStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: ms(50),
  },
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingRight: ms(8),
      paddingLeft: ms(9),
    },
  ],
  TopBackButton: { padding: 10 },
  listContainer: {
    padding: ms(2),
    paddingLeft: ms(8),
    paddingRight: ms(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: ms(2),
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
    paddingLeft: ms(5),
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_black,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
  userNameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
  },
});
