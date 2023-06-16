import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import PropsType from 'prop-types';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';

export const HeaderTab = ({
  title1,
  title2,
  count1,
  count2,
  onPress1,
  onPress2,
}) => {
  return (
    <View style={styles.headerTab}>
      <TouchableOpacity style={styles.tab} onPress={onPress1}>
        <Text style={[styles.txt, { color: theme.light.colors.timerText }]}>
          {' '}
          {title1}
        </Text>
        <Text style={[styles.txt, { color: theme.light.colors.black }]}>
          {' '}
          {count1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={onPress2}>
        <Text style={[styles.txt, { color: theme.light.colors.timerText }]}>
          {title2}
        </Text>
        <Text style={[styles.txt, { color: theme.light.colors.black }]}>
          {' '}
          {count2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

HeaderTab.prototype = {
  title1: PropsType.string.isRequired,
  title2: PropsType.string.isRequired,
  count1: PropsType.string.isRequired,
  count2: PropsType.string.isRequired,
  onPress1: PropsType.func,
  onPress2: PropsType.func,
};

HeaderTab.defaultProps = {
  title1: 'No title',
  title2: 'No title',
  count1: 0,
  count2: 0,
};

const styles = StyleSheet.create({
  headerTab: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    flexDirection: 'row',
    backgroundColor: theme.light.colors.infoBgLight,
    padding: ms(5),
    paddingLeft: ms(12),
    paddingRight: ms(12),
    borderRadius: ms(40),
    margin: ms(2),
    // right: 20,
    alignItems: 'center',
  },
  txt: {
    fontFamily: FontFamily.Recoleta_semibold,
    fontSize: ms(13, 0.3),
  },
});
