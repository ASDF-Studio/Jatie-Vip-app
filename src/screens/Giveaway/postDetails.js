import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button, Card, CardBody, Icon, TopBackButton } from '@/components';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { item } from './giveawayData/postDetailsData';

export default function PostDetails({ navigation }) {
  const [active, setActive] = useState(true);
  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.headerText, TextStyles.header]}>
          {strings.giveaway.title}
        </Text>
      </View>
      <View style={styles.postContainer}>
        <ScrollView>
          <View style={styles.feedContainer}>
            <Card>
              <View>
                <Text style={styles.title}>{strings.giveaway.title} </Text>
              </View>
              <View>
                <Text style={styles.timeLable}>
                  {strings.giveaway.expires}
                  <Text style={styles.EndTimeTxt}> {item.EndsIn}</Text>
                </Text>
              </View>
              <CardBody text={item.Desc} />
              {link(item.link)}
              <CardBody text={item.MoreDesc} />
              <View style={styles.thumbnailContainer}>
                <Image
                  style={styles.thumbnailImage}
                  source={{
                    uri: item.photo,
                  }}
                />

                <View>
                  <View style={styles.PostButtonContainer}>
                    <TouchableOpacity onPress={setActive == false}>
                      <Button
                        title={strings.giveaway.joinThisGiveaway}
                        style={styles.joinBtn}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.termsAndConsition}>
                    {termsAndCondition(
                      strings.giveaway.byJoining,
                      strings.giveaway.termsAndConsition
                    )}
                  </View>
                </View>
                <View style={styles.PostButtonContainer}>
                  <TouchableOpacity>
                    <Button
                      title={strings.giveaway.withdrawFromThisGiveaway}
                      style={styles.withdrawBtn}
                      textStyle={{
                        color: theme.light.colors.primary,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.PostButtonContainer}>
                    <TouchableOpacity>
                      <Button
                        title={strings.giveaway.joinThisGiveaway}
                        style={styles.outOfUS}
                        textStyle={{
                          color: theme.light.colors.background,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.termsAndConsition}>
                    {termsAndCondition(strings.giveaway.onlyUS)}
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const termsAndCondition = (text, link) => {
  return (
    <View>
      <Text style={[TextStyles.text, styles.termsAndConsitionText]}>
        {text}
        <Text
          style={styles.termsTextDesign}
          onPress={() => {
            Linking.openURL(link);
          }}
        >
          {link}
        </Text>
      </Text>
    </View>
  );
};

const link = link => {
  return (
    <Text
      style={styles.linkTextDesign}
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      {link}
    </Text>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  header: {
    padding: ms(15),
    backgroundColor: theme.light.colors.white,
  },
  headerIcon: {
    color: theme.light.colors.info,
  },
  headerText: {
    marginTop: vs(10),
    color: theme.light.colors.black,
  },
  postContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  feedContainer: {
    margin: ms(10),
  },
  PostButtonContainer: {
    margin: ms(10),
  },
  termsAndConsition: {
    paddingLeft: ms(20),
    paddingRight: ms(20),
    paddingBottom: ms(20),
  },

  //Card some common thing from active.js
  title: {
    margin: ms(10),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
  },
  timeLable: {
    fontFamily: FontFamily.Recoleta_medium,
    textAlign: 'justify',
    backgroundColor: theme.light.colors.primaryBg,
    borderRadius: 20,
    padding: ms(8),
    fontSize: ms(11, 0.3),
    margin: ms(10),
    paddingLeft: ms(10),
  },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  EndTimeTxt: {
    color: theme.light.colors.black,
  },
  btn: {
    borderRadius: 10,
    padding: ms(8),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    position: 'absolute',
    top: '70%',
    left: '5%',
    backgroundColor: theme.light.colors.primary,
    width: ms(130),
  },
  btnTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(14, 0.3),
  },
  //Common thing end

  joinBtn: {
    width: '100%',
    backgroundColor: theme.light.colors.primary,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  withdrawBtn: {
    width: '100%',
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  outOfUS: {
    width: '100%',
    backgroundColor: theme.light.colors.primaryBg,
    borderWidth: 2,
    borderColor: theme.light.colors.primaryBg,
  },
  termsTextDesign: {
    color: theme.light.colors.hyperlink,
    textDecorationLine: 'underline',
  },
  termsAndConsitionText: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    color: theme.light.colors.black,
  },
  linkTextDesign: {
    color: theme.light.colors.hyperlink,
    paddingLeft: ms(15),
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    fontSize: ms(16),
  },
});
