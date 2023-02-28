import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { strings } from '@/localization';
import { Icon } from '@/components';
import { theme } from '@/theme';
import { faArrowRight, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { vs, ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';

export const ShareFeed = ({ onPress }) => {
  return (
    <View style={styles.feedContainer}>
      <View style={styles.feedIconContainer}>
        <Icon icon={faNewspaper} size={ms(15)} style={styles.feedIcon} />
      </View>
      <View
        style={{
          position: 'absolute',
          left: '18%',
        }}
      >
        <Text style={styles.feedTitle}>{strings.profile.feedTitle}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.feedLebel}>{strings.profile.feedLebel} </Text>
        </View>
      </View>
      <Icon
        icon={faArrowRight}
        size={ms(14)}
        color={theme.light.colors.info}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    width: '100%',
    height: vs(75),
    backgroundColor: theme.light.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(12), //9
    borderBottomWidth: 1,
    borderColor: theme.light.colors.primaryBg,
  },
  feedIconContainer: {
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(10),
    borderRadius: 100,
  },
  feedIcon: {
    color: theme.light.colors.primary,
  },
  feedTitle: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
  feedLebel: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    color: theme.light.colors.secondary,
  },
});
