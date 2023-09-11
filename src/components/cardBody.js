import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import PropsType from 'prop-types';
import { FontFamily } from '@/theme/Fonts';
import { ms } from 'react-native-size-matters';
import { theme } from '@/theme';
import ParsedText from 'react-native-parsed-text';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { Link } from '@react-navigation/native';
import { getUserId } from '@/actions/UserActions';

export const CardBody = ({ text, VIPKEY, isBold = false }) => {
  const mentionToPlainTextRegex = /({([^{^}]*)}\[([^[]*)]\(([^(^)]*)\))/i;
  const matchMention = /\B@\w+/g;

  const renderUserNameText = (matchingString, matches) => {
    let pattern = mentionToPlainTextRegex;
    let match = matchingString.match(pattern);
    return `@${match[3]}`;
  };

  function extractUserId(string) {
    const pattern = /\((.*?)\)/;
    const match = string.match(pattern);
    if (match) {
      const number = match[1];
      return number;
    } else {
      return null; // or throw an error, depending on your use case
    }
  }

  const onPressUserName = (text, index) => {
    const userId = extractUserId(`${text}`);

    //TODO:  Navigate to the  user profile on the basis of user id mentioned in the comment section
    navigationRef.navigate(NAVIGATION.userProfile, { userId: userId });
  };

  const onPressPostMention = text => {
    const username = text.slice(1);
    getUserId(username).then(user => {
      navigationRef.navigate(NAVIGATION.userProfile, { userId: user.id });
    });
  };

  return (
    <View
      style={[
        styles.container,
        isBold && {
          paddingLeft: ms(10),
          paddingRight: ms(10),
          paddingBottom: ms(10),
        },
      ]}
    >
      <ParsedText
        style={[
          styles.text,
          isBold && styles.textBold,
          VIPKEY == true ? styles.bluretextStyle : null,
        ]}
        parse={[
          {
            pattern: mentionToPlainTextRegex,
            style: styles.username,
            onPress: onPressUserName,
            renderText: renderUserNameText,
          },
          {
            type: 'url',
            style: styles.username,
            onPress: url => {
              Linking.openURL(url);
            },
          },
          {
            pattern: matchMention,
            style: styles.username,
            onPress: onPressPostMention,
          },
        ]}
        childrenProps={{ allowFontScaling: false }}
      >
        {text}
      </ParsedText>
    </View>
  );
};

CardBody.prototype = {
  text: PropsType.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: ms(15),
    paddingRight: ms(15),
    paddingBottom: ms(15),
    backgroundColor: '#FFFFFF',
  },
  textBold: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(18, 0.3),
    color: theme.light.colors.black,
    lineHeight: ms(22),
  },

  text: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(16, 0.3),
    lineHeight: ms(22),
    color: theme.light.colors.text,
  },
  username: {
    color: theme.light.colors.mention,
    fontFamily: FontFamily.BrandonGrotesque_medium,
  },

  bluretextStyle: {
    color: '#fff0',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 12,
    // fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
