import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { strings } from '@/localization';
import { Icon } from '@/components';
import { theme } from '@/theme';
import { faArrowRight, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { vs, ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';

export const ShareFeed = ({onPress}) => {
  return (
    <View style={styles.feedContainer}>
        <View style={styles.feedIconContainer}>
          <Icon 
            icon={faNewspaper} 
            size={ms(18)} 
            style={styles.feedIcon} 
          />
        </View>
        <View style={{
            position: 'absolute',
            left: '18%',
          }}
        >
          <Text style={styles.feedTitle}>
            {strings.profile.feedTitle}
          </Text>
          <View
            style={{
              flexDirection : 'row',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}
          >
            <Text style = {styles.feedLebel}>{strings.profile.feedLebel} </Text>
        </View>
      </View>
        <Icon
            icon={faArrowRight}
            size={ms(14)}
            color = {theme.light.colors.info}
            onPress = {onPress}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    elevation: 5,
    width: '100%',
    height: vs(80),
    backgroundColor: theme.light.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ms(9),
  },
  feedIconContainer: {
    backgroundColor: theme.light.colors.primaryBg,
    padding: ms(10),
    borderRadius: 100,
  },
  feedIcon: {
    color: theme.light.colors.primary,
  },
  feedTitle : {
    fontFamily : FontFamily.Recoleta_bold,
    fontSize : ms(14, 0.3),
    color : theme.light.colors.black
  },
  feedLebel :{
    fontFamily : FontFamily.BrandonGrotesque_regular,
    fontSize : ms(18, 0.3)
  }
});
