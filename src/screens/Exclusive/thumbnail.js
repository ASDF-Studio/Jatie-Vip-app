import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { AppVideoPlayer, Icon, TopBackButton } from '@/components';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Data, Info } from './exclusiveData/thumbnailData';

export default function Thubmnail({ navigation }) {
  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.headerText, TextStyles.header]}>
          {strings.exclusive.header}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.title}>
            <Text style={[TextStyles.text, styles.titleText]}>{Data.text}</Text>
          </View>

          {Data.video.map(item => {
            if (item == null) {
              return;
            } else {
              return (
                <View style={styles.videoContainer} key={item.vID}>
                  {item.videoLink ? (
                    <AppVideoPlayer url={item.videoLink} poster={item.poster} />
                  ) : null}
                </View>
              );
            }
          })}

          {Data.photo.map(item => {
            if (item == null) {
              return;
            } else {
              return (
                <View style={styles.photoContainer} key={item.pID}>
                  <Image
                    style={styles.photo}
                    source={{ uri: item.photoLink }}
                  />
                </View>
              );
            }
          })}

          <View style={styles.description}>
            <Text style={[TextStyles.text, styles.descriptionText]}>
              {Data.description}
            </Text>
          </View>

          <View style={styles.movefit}>
            {infoBox(Info.movefit, Info.movefitLink)}
          </View>
          <View style={styles.jatie}>
            {infoBox(Info.jatie, Info.jatieLink)}
          </View>
          <View style={styles.jatieVIP}>
            {infoBox(Info.jatieVIP, Info.jatieVIPLink)}
          </View>
          <View style={styles.jatieBrand}>{infoBox(Info.jatieBrand)}</View>
          <View style={styles.j80Fit}>
            {infoBox(Info.j80Fit, Info.j80FitLink)}
          </View>
          <View style={styles.jatieBeauty}>
            {infoBox(Info.jatieBeauty, Info.jatieBeautyLink)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const infoBox = (text, link) => {
  return (
    <View style={styles.info}>
      <Text
        style={[
          TextStyles.text,
          {
            fontFamily: FontFamily.BrandonGrotesque_regular,
            textAlign: 'justify',
            color: theme.light.colors.black,
          },
        ]}
      >
        {text}
        <Text
          style={styles.hyperlink}
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

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    padding: ms(15),
    borderBottomWidth: 0.5,
    borderColor: theme.light.colors.primaryBg,
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
  },
  title: {
    padding: ms(20),
  },
  titleText: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(18, 0.3),
    color: theme.light.colors.black,
  },
  description: {
    padding: ms(20),
  },
  descriptionText: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    color: theme.light.colors.black,
  },
  info: {
    paddingLeft: ms(20),
  },
  hyperlink: { color: theme.light.colors.hyperlink },
  videoContainer: {
    width: '100%',
    marginBottom: vs(10),
  },
  photoContainer: {
    width: '100%',
    marginBottom: vs(10),
    resizeMode: 'contain',
  },
  photo: {
    height: vs(180),
  },
  thumbnailImage: {
    height: vs(180),
  },
  movefit: {
    paddingBottom: ms(20),
  },
  jatieBrand: {
    paddingTop: ms(20),
  },
  jatieBeauty: {
    paddingBottom: ms(20),
  },
});
