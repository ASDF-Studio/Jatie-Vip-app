import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '@/theme';
import { Card, CardHeader, Icon } from '@/components';
import {
  faCircleUp,
  faCircleDown,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { Data } from './ProfileData/myActivityData';

export default function MyActivity({ navigation }) {
  return (
    <View style={styles.pageContainer}>
      <FlatList
        data={Data}
        key={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card>
              <CardHeader
                fullName={item.fullName}
                userName={item.userName}
                profilePic={item.profilePic}
                time={item.time}
              />
              <View style={styles.activity}>
                {item.status == `${strings.profile.upvoted}` ? (
                  <Icon
                    icon={faCircleUp}
                    size={ms(15)}
                    style={[
                      styles.icon,
                      {
                        color: theme.light.colors.success,
                      },
                    ]}
                  />
                ) : null}
                {item.status == `${strings.profile.downVoted}` ? (
                  <Icon
                    icon={faCircleDown}
                    size={ms(15)}
                    style={[
                      styles.icon,
                      {
                        color: theme.light.colors.error,
                      },
                    ]}
                  />
                ) : null}
                {item.status == `${strings.profile.commented}` ? (
                  <Icon
                    icon={faComment}
                    size={ms(15)}
                    style={[
                      styles.icon,
                      {
                        color: theme.light.colors.info,
                      },
                    ]}
                  />
                ) : null}
                <View style={styles.textContainer}>
                  <Text style={styles.statsTxt}> {item.status} </Text>
                  <Text style={styles.reactOnTxt}>
                    {' '}
                    {`${item.reactOn}'s post`}{' '}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activity: {
    flexDirection: 'row',
    padding: ms(10),
    alignItems: 'center',
  },
  pageContainer: {
    marginTop: ms(5),
  },
  cardContainer: {
    margin: ms(5),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
    paddingLeft: ms(5),
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(15, 0.3),
  },
});
