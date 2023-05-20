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
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CustomLoader, HorizontalLine, Icon, TextField, TopBackButton } from '@/components';
import { moderateScale, ms, vs } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Data } from '@/screens/CommonData/searchData';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { TYPES, searchUser } from '@/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export default function Search({ navigation }) {
  //Use State hooks
  const [searchListOpen, setSearchListOpen] = useState(false);
  const [searchuservalue, setsearchuservalue] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const searchUserData = user.searchUserKey


  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_USER], state)
  );

  const SearchHandlePress = () => {
    // setLoading(true)
    { searchuservalue.length >= 1 ? dispatch(searchUser(searchuservalue)) : null }

    // setLoading(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomLoader open={loading} />
      <View style={styles.header}>
        <View style={styles.left}>
          <TopBackButton
            onPress={() => navigation.goBack()}
            style={styles.TopBackButton}
          />
          <Text style={[TextStyles.header, styles.headerText]}>
            {' '}
            {strings.exclusive.search}{' '}
          </Text>
        </View>
        <View style={styles.right}>
          <Icon onPress={() => { SearchHandlePress() }}
            icon={faSearch}
            color={theme.light.colors.primary}
            size={ms(20)}
            style={styles.searchButton}
          />
          <Icon
            icon={faBell}
            color={theme.light.colors.black}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
            style={styles.bellIcon}
          />
        </View>
      </View>
      <View style={styles.searchBox}>
        <TextField value={searchuservalue}
          onChangeText={(value) => {
            setsearchuservalue(value),
              setTimeout(() => {
                searchuservalue.length >= 0 ? dispatch(searchUser(searchuservalue)) : null
              }, 2000);
          }
          }
          style={styles.searchBoxTextFirld}
          placeholder={strings.exclusive.searchUser}
          onFocus={() => setSearchListOpen(true)}
        />
        <View style={styles.moreIcon}>
          <Icon icon={faEllipsis} />
        </View>
      </View>
      <HorizontalLine />

      {!searchListOpen && (
        <View style={styles.searchBody}>
          <FontAwesomeIcon
            icon={faSearch}
            size={30}
            color={theme.light.colors.primary}
          />
          <Text style={styles.searchTxt}>
            {' '}
            {strings.exclusive.searchForUsers}
          </Text>
        </View>
      )}
      {searchListOpen && (
        <View style={styles.searchList}>
          {/* <Text style={styles.searchTxt}> {strings.profile.searchResult}</Text> */}
          <View>
            <FlatList ListEmptyComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: moderateScale(15) }}>No User Found</Text>
                </View>
              )
            }}
              data={searchUserData?.data}
              key={props => props.id}
              initialNumToRender={10}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({ item }) => {
                return (
                  <>

                    <View style={styles.listContainer}>

                      <TouchableOpacity
                        style={styles.list}
                        onPress={() => navigation.navigate(NAVIGATION.userProfile, { userId: item?.id })}

                      // onPress = {()=> navigation.navigate(NAVIGATION.userProfile)}
                      >
                        <Image
                          source={{ uri: item?.profilePic == '' ? null : item?.profilePic }}
                          style={styles.profileImage}
                        />

                        <View style={styles.nameContainer}>
                          <Text style={styles.nameTxt}> {item.fullName} </Text>
                          <Text style={styles.userNameTxt}>
                            {' '}
                            {item.username}{' '}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
            />
          </View>
        </View>
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginLeft: ms(10),
  },
  searchButton: {
    marginRight: ms(15),
  },
  switchContainer: {
    position: 'absolute',
    top: ms(45),
    left: ms(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    marginTop: vs(-20),
    marginBottom: vs(-10),
    margin: ms(10),
  },
  moreIcon: {
    position: 'absolute',
    right: ms(10),
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
  contentContainerStyle: {
    paddingBottom: ms(100),
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
    borderColor: 'gray',
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
