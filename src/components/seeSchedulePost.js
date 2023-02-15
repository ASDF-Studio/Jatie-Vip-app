import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { theme } from '@/theme';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';

export const SeeSchedulePost = ({ title, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(NAVIGATION.scheduledPost)}
      style={styles.schedulePost}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.schedulePostTxt}> {title} </Text>
        <View style={styles.clockContainer}>
          <FontAwesomeIcon
            icon={faClock}
            size={ms(15)}
            color={theme.light.colors.white}
          />
          <Text style={styles.clockTxt}> 2 </Text>
        </View>
      </View>
      <View>
        <FontAwesomeIcon icon={faArrowRight} color={theme.light.colors.info} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  schedulePost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: ms(9),
    padding: ms(10),
    borderRadius: 8,
    backgroundColor: theme.light.colors.white,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  schedulePostTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    color: theme.light.colors.black,
  },
  clockContainer: {
    backgroundColor: theme.light.colors.info,
    padding: ms(3),
    paddingLeft: ms(6),
    paddingRight: ms(6),
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ms(4),
  },
  clockTxt: {
    color: theme.light.colors.white,
  },
});
