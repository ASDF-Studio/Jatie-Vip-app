import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Giveaway/Giveaway.styles';
import { TextStyles, theme } from '@/theme';
import {
  CustomLoader,
  HorizontalLine,
  Icon,
  NotificationIcon,
  StatusNavigatorBar,
} from '@/components';
import Past from './past';
import Active from './active';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { NAVIGATION } from '@/constants';
import { Logo } from '@/assets';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { SafeAreaView } from 'react-native-safe-area-context';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { useEffect } from 'react';
import { getUser } from '@/selectors/UserSelectors';
import {
  getAllActiveGiveaway,
  getAllPastGiveaway,
  TYPES,
} from '@/actions/PostActions';
import { useIsFocused } from '@react-navigation/native';
import { geAllActiveGiveAwayData } from '@/selectors/PostSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import ActivePastNavigator from '@/components/ActivePastNavigator';

export function Giveaway({ navigation }) {
  const user = useSelector(getUser);

  const id = user.id;
  const isLoading = useSelector(state =>
    isLoadingSelector(
      [TYPES.GET_ACTIVE_GIVEAWAY, TYPES.GET_PAST_GIVEAWAY],
      state
    )
  );

  const pastDataLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PAST_GIVEAWAY], state)
  );
  const focus = useIsFocused();
  const dispatch = useDispatch();

  const userType = useSelector(state => state?.userType);
  const [status, setStatus] = useState(strings?.giveaway?.active);

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomLoader open={isLoading} /> */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <View style={styles.userPic}>
            <Logo />
          </View>
          <View>
            <Text style={[TextStyles.header, styles.headerDesign]}>
              {strings.giveaway.header}
            </Text>
          </View>
        </View>

        <View style={styles.iconContiner}>
          <Icon
            icon={faSearch}
            size={ms(22)}
            style={styles.searchIcon}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <NotificationIcon />
        </View>
        {/* <View style={styles.bellAlert} /> */}
      </View>

      <StatusNavigatorBar
        title1={strings.giveaway.active}
        key1={strings.giveaway.active}
        title2={strings.giveaway.past}
        key2={strings.giveaway.past}
        status={status}
        setStatus={setStatus}
      />

      <HorizontalLine />

      <View style={styles.feedContainer}>
        {status == strings.giveaway.active ? (
          <Active navigation={navigation} userType={userType} user={user} />
        ) : (
          <Past navigation={navigation} userType={userType} user={user} />
        )}
      </View>

      {userType?.user == strings.userType.admin &&
        status == strings.giveaway.active && (
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.adminGiveawayPost)}
            style={[styles.adminBtn, styles.adminBtnDesign]}
          >
            <Text style={[styles.adminBtnTxt, styles.adminBtnTxtColor]}>
              {strings.giveaway.newGiveaway}
            </Text>
          </TouchableOpacity>
        )}
    </SafeAreaView>
  );
}
