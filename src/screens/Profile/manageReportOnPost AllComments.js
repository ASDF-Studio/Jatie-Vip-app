import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import {
  HorizontalLine,
  TopBackButton,
  CardHeader,
  CommentCard,
  CommentInput,
} from '@/components';
import { ms } from 'react-native-size-matters';
import { CommentData, Data } from './ProfileData/manageReportOnPostAllComments';

export default function ManageReportOnPostAllComments({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {' '}
        {strings.profile.manageReports}{' '}
      </Text>
      <HorizontalLine color={theme.light.colors.infoBgLight} />
      <CardHeader
        fullName={Data.fullName}
        userName={Data.userName}
        profilePic={Data.profilePic}
        time={Data.time}
      />
      <View style={styles.activity}>
        <View style={styles.textContainer}>
          <Text style={styles.statsTxt}> {strings.profile.reported} </Text>
          <Text style={styles.reactOnTxt}> {`this post`} </Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTxt}>{strings.profile.reason}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={CommentData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.FlatListContainer}>
              <CommentCard
                name={item.name}
                userName={item.userName}
                imageUrl={item.imageUrl}
                time={item.time}
                commentTxt={item.commentTxt}
                likeCount={10}
                disLikeCount={20}
              />
            </View>
          )}
        />

        <CommentInput />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerText: {
    color: theme.light.colors.black,
  },
  TopBackButton: { padding: ms(10) },
  activity: {
    flexDirection: 'row',
    padding: ms(10),
    alignItems: 'center',
    justifyContent: 'space-between',
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
  reasonContainer: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 10,
    padding: ms(3),
    marginLeft: ms(10),
  },
  reasonTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(10, 0.3),
  },
  body: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    // padding : ms(8)
  },
  FlatListContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
