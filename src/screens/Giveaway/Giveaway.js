import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Giveaway/Giveaway.styles';
import { TextStyles, theme } from '@/theme';
import { HorizontalLine, Icon, StatusNavigatorBar } from '@/components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Past from './past';
import Active from './active';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { NAVIGATION } from '@/constants';
import { Logo } from '@/assets';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Giveaway({ navigation }) {
  const userType = useSelector(state => state.userType);
  const [status, setStatus] = useState(strings.giveaway.active);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Logo />
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
          <Icon
            icon={faBell}
            size={ms(22)}
            style={styles.bellIcon}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
          />
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
        {status == `${strings.giveaway.active}`
          ? Active({ navigation, userType })
          : Past({ navigation })}
      </View>
      {/* Admin Button */}

      {userType.user == `${strings.userType.admin}` && (
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
