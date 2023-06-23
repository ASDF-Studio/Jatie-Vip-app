import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivityByUserId, getAllPostsByLoggedInUser } from '@/actions/UserActions';
import { getUser } from '@/selectors/UserSelectors';
import { navigate } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';


export default function MyActivity({ navigation }) {
  const dispatch = useDispatch()
  const focus = useIsFocused();
  const user = useSelector(getUser);


  useEffect(() => {
    if (focus) {
      dispatch(getAllActivityByUserId(user.id))

    }
  }, [focus]);
  return (
    <View style={styles.pageContainer}>
      <FlatList
        data={user?.MyActivityKey?.data}
        key={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card>
              <CardHeader
                fullName={user.fullName}
                userName={user.username}
                profilePic={user.profilePic}
                time={item.created_at}
                userId={item?.userId}

              />
              <View style={styles.activity}>
                {item.activityDetails == 'upvoted this' ? (
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
                {item.activityDetails == 'downvoted this' ? (
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
                {item.activityDetails == "commented on this" ? (
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
                  <Text style={styles.statsTxt}> {item.activityDetails} </Text>
                  <TouchableOpacity onPress={() => navigate(NAVIGATION.singlePost, { postId: item.activityObjectId })}>
                    <Text style={styles.reactOnTxt}>

                      {`post`}{' '}

                    </Text>
                  </TouchableOpacity>
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
