import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  AppSwitch,
  Button,
  HorizontalLine,
  Icon,
  TopBackButton,
} from '@/components';
import {
  faCircle,
  faImage,
  faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { close } from '@/assets';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';

let nextId = 0;

export default function Post({ navigation }) {
  const userType = useSelector(state => state.userType);
  const [imageArray, setImageArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImage, setIsImage] = useState();
  const [postTxt, setPostTxt] = useState('');
  const [vipOnly, setVipOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };
  deleteFile = id => {
    setImageArray(imageArray.filter(a => a.id !== id));
  };

  const OpenGallery = () => {
    {
      isImage == strings.exclusive.image
        ? ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            mediaType: strings.exclusive.image,
            multiple: true,
          })
            .then(images => {
              images.forEach(item => {
                imageArray.push({
                  id: nextId++,
                  image: item.path,
                  video: null,
                });
                setModalVisible(!isModalVisible);
              });
            })
            .catch(e => {
              console.log('Error: ' + e);
            })
        : ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            mediaType: strings.exclusive.video,
            multiple: true,
            loadingLabelText: 'loading',
          })
            .then(video => {
              imageArray.push({
                id: nextId++,
                image: null,
                video: video.path,
              });
              setModalVisible(!isModalVisible);
            })
            .catch(e => {
              console.log('Error: ' + e);
            });
    }
  };

  const OpenCamera = () => {
    {
      isImage == strings.exclusive.image
        ? ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
          })
            .then(image => {
              imageArray.push({
                id: nextId++,
                image: image.path,
                video: null,
              });
              setModalVisible(!isModalVisible);
            })
            .catch(e => {
              console.log('Error: ' + e);
            })
        : ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            mediaType: strings.exclusive.video,
          })
            .then(image => {
              imageArray.push({
                id: nextId++,
                image: null,
                video: image.path,
              });
              setModalVisible(!isModalVisible);
            })
            .catch(e => {
              console.log('Error: ' + e);
            });
    }
  };
  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.headerText, TextStyles.header]}>
          {strings.home.shareToFeed}
        </Text>
      </View>
      <HorizontalLine />
      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.TextBoxDEsc}>
            <TextInput
              placeholder={strings.home.whatOnYourMind}
              style={styles.InputTextBoxDEsc}
              onChangeText={val => setPostTxt(val)}
              editable
              multiline
              numberOfLines={6}
            />
          </View>
        </View>
      </ScrollView>

      <View>
        {imageArray.length ? (
          <HorizontalLine color={theme.light.colors.infoBgLight} />
        ) : null}
        {FileUpload(imageArray)}
        <View style={styles.BottomFileContainer}>
          <View style={styles.iconContainer}>
            <Icon
              icon={faImage}
              size={ms(20)}
              onPress={() =>
                toggleModal() & setIsImage(strings.exclusive.image)
              }
              style={styles.icon}
            />

            {/* show only for VIP user */}
            {userType.user == strings.userType.vip && (
              <>
                <View style={styles.verticalBar} />
                <View style={styles.vipSwitch}>
                  <Text style={styles.onlyTxt}>
                    {' '}
                    {strings.home.shareToVipOnly}{' '}
                  </Text>
                  <AppSwitch
                    value={vipOnly}
                    onChange={() => setVipOnly(prev => !prev)}
                  />
                </View>
              </>
            )}

            {/* show only for admin */}
            {/* {userType.user == strings.userType.admin && (
              <>
                <View style={styles.verticalBar} />
                <Icon
                  icon={faVideoCamera}
                  size={ms(20)}
                  onPress={() =>
                    toggleModal() & setIsImage(strings.exclusive.video)
                  }
                  style={styles.icon}
                />
              </>
            )} */}
          </View>

          {/* button */}

          <TouchableOpacity>
            {/* show only for Free and vip user */}
            {userType.user == strings.userType.vip && (
              <Button
                title={strings.home.post}
                style={styles.vipButton}
                disabled={postTxt.length == 0 ? false : true}
                opacity={postTxt.length ? 1 : 0.4}
              />
            )}
            {userType.user == strings.userType.free && (
              <Button
                title={strings.home.post}
                disabled={postTxt.length ? false : true}
                opacity={postTxt.length ? 1 : 0.4}
                style={styles.freeButton}
              />
            )}
            {/* show only for Admin */}
            {userType.user == strings.userType.admin && (
              <Button
                title={strings.home.next}
                opacity={postTxt.length ? 1 : 0.4}
                disabled={postTxt.length ? false : true}
                onPress={() => navigation.navigate(NAVIGATION.postOptions)}
                style={styles.adminButton}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Model */}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalBackground}>
          <TouchableOpacity onPress={closeModal}>
            <View style={styles.closeView}>
              <Image source={close} style={styles.closeIcon} />
            </View>
          </TouchableOpacity>
          <Button
            title={strings.operations.imageFromCamera}
            onPress={OpenCamera}
          />
          <View style={styles.imageFromGalleryButton}>
            <Button
              title={strings.operations.imageFromGallery}
              onPress={OpenGallery}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export const FileUpload = imageArray => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {imageArray ? (
        <View style={styles.BottomVideoContainer}>
          <View style={styles.videoContainer}>
            {imageArray.map(item => {
              if (item == null) {
                return;
              } else {
                return item.image ? (
                  <View style={styles.fileSpacing} key={item.id}>
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: item.image }}
                    />
                    <View style={styles.minus}>
                      <Text
                        style={styles.minusTxt}
                        onPress={() => {
                          deleteFile(item.id);
                        }}
                      >
                        {strings.giveaway.minus}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.fileSpacing} key={item.id}>
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: item.image }}
                    />
                    <View style={styles.minus}>
                      <Text
                        style={styles.minusTxt}
                        onPress={() => {
                          deleteFile(item.id);
                        }}
                      >
                        {strings.giveaway.minus}
                      </Text>
                    </View>
                    <View style={styles.videoPlayContainer}>
                      {' '}
                      <ActivityIndicator
                        animating={animating}
                        color={theme.light.colors.primary}
                        size="large"
                        style={styles.activityIndicator}
                      />
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
              }
            })}
          </View>
        </View>
      ) : null}
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
