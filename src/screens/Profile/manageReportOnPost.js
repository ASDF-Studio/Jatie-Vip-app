import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import {
  HorizontalLine,
  TopBackButton,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  CommentCard,
  CommentContainer,
} from '@/components';
import { ms } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { card, Data } from './ProfileData/manageReportOnPostData';

export default function ManageReportOnMessage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.manageReports}
      </Text>
      <HorizontalLine color={theme.light.colors.infoBgLight} paddingTop={10} />
      <CardHeader
        fullName={Data.fullName}
        userName={Data.userName}
        profilePic={Data.profilePic}
        time={Data.time}
      />
      <View style={styles.activity}>
        <View style={styles.textContainer}>
          <Text style={styles.statsTxt}>{strings.profile.reported}</Text>
          <Text style={styles.reactOnTxt}>{strings.profile.thisPost}</Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTxt}>{strings.profile.reason}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Card>
          <View style={styles.reportBound}>
            <CardHeader
              fullName={Data.fullName}
              userName={Data.userName}
              profilePic={Data.profilePic}
              time={Data.time}
            />
            <CardBody text={card.text} />
          </View>
          <CommentContainer
            seeAllPress={() =>
              navigation.navigate(NAVIGATION.manageReportOnPostAllComments)
            }
          >
            <CommentCard
              name={card.name}
              userName={card.userName}
              imageUrl={card.imageUrl}
              time={card.name}
              commentTxt={card.commentTxt}
              likeCount={card.likeCount}
              // likePress = {}
              disLikeCount={card.disLikeCount}
              // disLikePress = {}
            />
          </CommentContainer>
          <CardFooter likeCount={32} disLikeCount={3} commentCount={3} />
        </Card>
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
    paddingLeft: ms(9),
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
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    color: theme.light.colors.black,
  },
  reactOnTxt: {
    color: theme.light.colors.info,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    marginLeft: ms(5),
  },
  reasonContainer: {
    backgroundColor: theme.light.colors.inputFiled,
    borderRadius: 4,
    padding: ms(5),
    paddingHorizontal: 10,
    marginLeft: ms(10),
  },
  reasonTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(11, 0.3),
    color: theme.light.colors.black,
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
    padding: ms(8),
  },
  reportBound: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.primaryBgLightest,
  },
});
