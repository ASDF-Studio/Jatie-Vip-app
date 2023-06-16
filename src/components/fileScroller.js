import React from 'react';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faCircle, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';

export const SelectedFiles = ({ imageArray, onDelete }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.BottomVideoContainer}>
        <View style={styles.videoContainer}>
          {imageArray.map((item, index) => {
            return item.image ? (
              <View style={styles.fileSpacing} key={index}>
                <Image style={styles.thumbnail} source={{ uri: item.image }} />
                <TouchableOpacity
                  style={styles.minus}
                  onPress={() => {
                    onDelete(index);
                  }}
                >
                  <Text style={styles.minusTxt}>{strings.giveaway.minus}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.fileSpacing} key={index}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.videoPoster || item.cover }}
                />
                <TouchableOpacity
                  onPress={() => {
                    onDelete(index);
                  }}
                  style={styles.minus}
                >
                  <Text style={styles.minusTxt}>{strings.giveaway.minus}</Text>
                </TouchableOpacity>
                <View style={styles.videoPlayContainer}>
                  {/* <ActivityIndicator
                      animating={true}
                      color={theme.light.colors.primary}
                      size="large"
                      style={styles.activityIndicator}
                    /> */}
                  <FontAwesomeIcon
                    icon={faCircle}
                    size={ms(30)}
                    style={styles.videoPlay}
                  />
                  <FontAwesomeIcon
                    icon={faVideoCamera}
                    size={ms(15)}
                    style={styles.Play}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    padding: ms(15),
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
  TextBoxDEsc: {
    width: '100%',
    height: vs(320),
    padding: ms(8),
    // borderWidth: 1,
    // borderColor: theme.light.colors.infoBgLight,
  },
  InputTextBoxDEsc: {
    height: '100%',
    textAlignVertical: 'top',
  },
  vipButton: {
    width: ms(100),
    margin: ms(10),
  },

  //BottomLAyout of file contant

  verticalBar: {
    height: 40,
    width: 1,
    backgroundColor: theme.light.colors.infoBgLight,
    marginRight: ms(5),
    marginLeft: ms(5),
  },
  BottomVideoContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: vs(10),
    paddingTop: ms(10),
  },
  fileSpacing: {
    padding: 10,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginLeft: ms(10),
    marginRight: ms(15),
    height: ms(110),
    alignItems: 'center',
  },
  thumbnail: {
    flex: 1,
    maxWidth: ms(80),
    minWidth: ms(80),
    height: vs(80),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.light.colors.infoBgLight,
    backgroundColor: theme.light.colors.inputFiled,
    // resizeMode: 'contain',
  },
  freeButton: {
    width: ms(100),
    margin: ms(10),
  },
  adminButton: {
    width: ms(100),
    margin: ms(10),
  },
  imageFromGalleryButton: { marginTop: vs(20) },
  //BottomLayout of file upload

  BottomFileContainer: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: ms(10),
  },
  icon: {
    margin: ms(10),
    color: theme.light.colors.secondary,
  },
  ButtonContainer: {
    margin: ms(10),
    borderRadius: 10,
    padding: ms(8),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    position: 'relative',
    backgroundColor: theme.light.colors.primary,
    width: ms(120),
  },

  // - circle

  minus: {
    width: ms(30),
    height: ms(30),
    backgroundColor: theme.light.colors.userBackgroundColor,
    borderRadius: 50,
    position: 'absolute',
    marginLeft: ms(65),
    top: 0,
  },
  minusTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    color: theme.light.colors.primary,
    fontSize: ms(23, 0.3),
    textAlign: 'center',
  },
  //Video Icon

  videoPlayContainer: {
    position: 'absolute',
    marginLeft: '45%',
    marginTop: '45%',
  },
  videoPlay: {
    color: theme.light.colors.primary,
  },
  Play: {
    position: 'absolute',
    color: theme.light.colors.background,
    marginLeft: ms(8),
    marginTop: ms(8),
  },

  //File upload

  //modal

  modalBackground: {
    padding: ms(30),
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  closeView: {
    alignItems: 'flex-end',
    marginTop: -23,
    marginBottom: vs(10),
    marginRight: -22,
  },
  closeIcon: {
    height: vs(20),
    width: ms(20),
  },

  // loading

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },

  //vip only

  vipSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  onlyTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    fontSize: ms(12, 0.3),
    marginRight: ms(10),
  },
});
