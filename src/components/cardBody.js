import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropsType from 'prop-types';
import { FontFamily } from '@/theme/Fonts';
import { ms } from 'react-native-size-matters';
import { theme } from '@/theme';
import ParsedText from 'react-native-parsed-text';

export const CardBody = ({ text }) => {

  const mentionToPlainTextRegex = /({([^{^}]*)}\[([^[]*)]\(([^(^)]*)\))/i

  const renderUserNameText = (matchingString, matches) => {
    let pattern = mentionToPlainTextRegex
    let match = matchingString.match(pattern);
    return `@${match[3]}`;
  }

  function extractUserId(string) {
    const pattern = /\((.*?)\)/;
    const match = string.match(pattern);
    if (match) {
      const number = match[1];
      return number;
    } else {
      return null;  // or throw an error, depending on your use case
    }
  }

  const onPressUserName = (text, index) => {
    console.log('check syntax text: ' + text)
    const userId = extractUserId(`${text}`)
    alert(userId)
    console.log('check text: ' + userId)
    console.log('check index:' + index)
    //TODO:  Navigate to the  user profile on the basis of user id mentioned in the comment section

  }

  return (
    <View style={styles.container}>
      <ParsedText style={styles.text}
        parse={
          [
            { pattern: mentionToPlainTextRegex, style: styles.username, onPress: onPressUserName, renderText: renderUserNameText },
          ]
        }
        childrenProps={{ allowFontScaling: false }}
      >{text}</ParsedText>
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
  },
  text: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(16, 0.3),
    lineHeight: ms(22),
    color: theme.light.colors.text,
  },
  username: {
    color: theme.light.colors.mention,
    fontFamily: FontFamily.BrandonGrotesque_medium
  }
});
