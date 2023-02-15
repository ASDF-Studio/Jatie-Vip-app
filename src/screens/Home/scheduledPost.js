import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Card, CardBody, CardHeader, TopBackButton } from '@/components';
import { strings } from '@/localization';
import { TextStyles, theme } from '@/theme';
import { faClock, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ms } from 'react-native-size-matters';
import Moment from 'moment';
import { FontFamily } from '@/theme/Fonts';
import { Data } from './Data/scheduledPostData';

export default function SchedulePost({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TopBackButton
          onPress={() => navigation.goBack()}
          style={styles.TopBackButton}
        />
        <Text style={styles.headerTxt}>{strings.home.scheduledPost} </Text>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.cardContainer}>
          <Card>
            <CardHeader
              fullName={Data.name}
              userName={Data.userName}
              profilePic={Data.profilePic}
              isOfficial={true}
            />
            <CardBody text={Data.txt} />
            <View style={styles.cardFooter}>
              <View style={styles.timeBox}>
                <FontAwesomeIcon
                  icon={faClock}
                  size={ms(13)}
                  color={theme.light.colors.white}
                />
                <Text style={styles.timeTxt}>
                  {' '}
                  {Moment.utc().format('hh:mm A  MMM D, YYYY')}{' '}
                </Text>
              </View>
              <TouchableOpacity style={styles.penIcon}>
                <FontAwesomeIcon
                  icon={faPen}
                  size={ms(13)}
                  color={theme.light.colors.black}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        <View style={styles.sponsordContainer}>
          <Card>
            <ImageBackground
              source={{
                uri: Data.sponsoredPic,
              }}
              style={styles.bgImage}
            />
            <TouchableOpacity style={styles.floaterContainerSponored}>
              <Text style={styles.floaterTxt}>
                {' '}
                {strings.home.sponsordPost}{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.floaterContainer}>
              <Text style={styles.floaterTxt}>{strings.home.learMore} </Text>
            </TouchableOpacity>

            <View style={styles.cardFooter}>
              <View style={styles.timeBox}>
                <FontAwesomeIcon
                  icon={faClock}
                  size={ms(13)}
                  color={theme.light.colors.white}
                />
                <Text style={styles.timeTxt}>
                  {' '}
                  {Moment.utc().format('hh:mm A  MMM D, YYYY')}{' '}
                </Text>
              </View>
              <TouchableOpacity style={styles.penIcon}>
                <FontAwesomeIcon
                  icon={faPen}
                  size={ms(13)}
                  color={theme.light.colors.black}
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    padding: ms(10),
  },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(5),
    },
  ],
  postContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight, //
    padding: ms(9),
  },
  cardContainer: {
    marginTop: ms(10),
  },
  TopBackButton: {
    padding: ms(5),
    paddingBottom: ms(10),
  },
  sponsordContainer: {
    marginTop: ms(10),
  },
  cardFooter: {
    backgroundColor: theme.light.colors.infoBgLight,
    padding: ms(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.light.colors.info,
    borderRadius: 10,
    padding: ms(3),
    paddingLeft: ms(8),
    paddingRight: ms(8),
  },
  penIcon: {
    marginRight: ms(9),
  },
  timeTxt: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.Recoleta_semibold,
    paddingLeft: ms(2),
    fontSize: ms(13, 0.3),
  },
  bgImage: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  floaterContainer: {
    position: 'absolute',
    backgroundColor: theme.light.colors.black,
    padding: ms(5),
    borderRadius: 10,
    margin: ms(10),
    bottom: ms(30),
  },
  floaterContainerSponored: {
    position: 'absolute',
    backgroundColor: theme.light.colors.black,
    padding: ms(5),
    borderRadius: 10,
    margin: ms(10),
    right: ms(8),
  },
  floaterTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.white,
  },
});
