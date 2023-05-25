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
import { Button, HorizontalLine, Icon, TopBackButton } from '@/components';
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
import { Data, File } from './giveawayData/adminGiveawayPostData';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '@/selectors/UserSelectors';
import { giveAwayPost } from '@/actions/PostActions';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { navigate } from '@/navigation/RootNavigation';
import { createThumbnail } from "react-native-create-thumbnail";
let nextId = 0;

export default function AdminExclusivePost({ navigation }) {
  const user = useSelector(getUser);
  const dispatch = useDispatch()
  const [imageArray, setImageArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImage, setIsImage] = useState();
  const [postTxt, setPostTxt] = useState('');
  const [postImg, setPostImg] = useState([]);
  const [mimeType, setmimeType] = useState([]);
  const [postTitle, setPostTitle] = useState('');
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
          width: ms(300),
          height: ms(400),
          mediaType: strings.exclusive.image,
          multiple: true,
          maxFiles: 3,
          compressImageQuality: 0.5
        })
          .then(images => {
            images.forEach(item => {
              imageArray.push({
                id: nextId++,
                image: item.path,
                imageMime: item.mime,
                video: null,
              });
              postImg.push(item.path);
              mimeType.push(item.mime);
              setModalVisible(!isModalVisible)
                ;
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
          maxFiles: 3,
          compressImageQuality: 0.5,
          loadingLabelText: 'loading',
        })
          .then(video => {
            video.forEach(item => {
              createThumbnail({
                url: item.path,
                timeStamp: 10000,
              })
                .then(response => imageArray.push({
                  id: nextId++,
                  image: null,
                  video: item.path,
                  videoMime: item.mime,
                  videoPoster: response?.path
                }))
                .catch(err => console.log({ err }));
              setPostImg(video.path);
              setmimeType(video.mime);
              setModalVisible(!isModalVisible);
            });
            // imageArray.push({
            //   id: nextId++,
            //   image: null,
            //   video: video.path,
            //   videoMime: video.mime,
            // });
            // setPostImg(video.path);
            // setmimeType(video.mime);
            // setModalVisible(!isModalVisible);
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
          compressImageQuality: 0.5,
        })
          .then(image => {
            imageArray.push({
              id: nextId++,
              image: image.path,
              imageMime: image.mime,
              video: null,
            });
            setPostImg(image.path);
            setmimeType(image.mime);
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
          compressImageQuality: 0.5,
        })
          .then(image => {
            imageArray.push({
              id: nextId++,
              image: null,
              video: image.path,
              videoMime: image.mime,
            });
            setPostImg(image.path);
            setmimeType(image.mime);
            setModalVisible(!isModalVisible);
          })
          .catch(e => {
            console.log('Error: ' + e);
          });
    }
  };

  const validation = () => {

    const params = {
      userId: user?.id,
      postTitle: postTitle,
      postBody: postTxt,
      imageArray: imageArray,

    }

    navigation.navigate(NAVIGATION.adminGiveawayOption, { prevData: params })
  }

  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.headerText, TextStyles.header]}>
          {strings.giveaway.createGiveaway}
        </Text>
      </View>
      <HorizontalLine />
      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.title}>
            <Text style={[TextStyles.text, styles.postTextDesign]}>
              {strings.exclusive.title}
            </Text>
          </View>
          <View style={styles.TextBox}>
            <TextInput
              value={postTitle}
              style={styles.InputTextBox}
              multiline={true}
              placeholder={strings.exclusive.titleHere}
              onChangeText={setPostTitle}
            />
          </View>
          <View style={styles.TextBoxDEsc}>
            <TextInput
              value={setPostTxt}
              style={styles.InputTextBoxDEsc}
              multiline={true}
              placeholder={strings.exclusive.whatOnYourMind}
              onChangeText={setPostTxt}
            />
          </View>
        </View>
      </ScrollView>

      {/* {BttomContantLayout()} */}
      {FileUpload(imageArray)}

      <View style={styles.BottomFileContainer}>
        <View style={styles.iconContainer}>
          <Icon
            icon={faImage}
            size={ms(20)}
            onPress={() => toggleModal() & setIsImage(strings.exclusive.image)}
            style={styles.icon}
          />
          <Icon
            icon={faVideoCamera}
            size={ms(20)}
            onPress={() => toggleModal() & setIsImage(strings.exclusive.video)}
            style={styles.icon}
          />
        </View>

        {/* button */}

        <Button
          title={strings.exclusive.next}
          disabled={postTxt ? false : true}
          opacity={postTxt ? 1 : 0.4}
          onPress={validation}
          style={styles.giveAwayButtom}
        />
        {/* </TouchableOpacity> */}
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
          <View style={styles.modelButtonContainer}>
            <Button
              title={strings.operations.imageFromGallery}
              onPress={OpenGallery}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView >
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
                      {/* {' '}
                      <ActivityIndicator
                        animating={animating}
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
              }
            })}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};
export const BttomContantLayout = () => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.BottomVideoContainer}>
        {File.video.map(item => {
          if (item == null) {
            return;
          } else {
            return (
              <View style={styles.videoContainer} key={item.vID}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.videoLink }}
                />
                <View style={styles.minus}>
                  <Text style={styles.minusTxt}>{strings.giveaway.minus}</Text>
                </View>
                <View style={styles.videoPlayContainer}>
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

        {File.photo.map(item => {
          if (item == null) {
            return;
          } else {
            return (
              <View style={styles.videoContainer} key={item.pID}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.photoLink }}
                />
                <View style={styles.minus}>
                  <Text style={styles.minusTxt}>{strings.giveaway.minus}</Text>
                </View>
              </View>
            );
          }
        })}
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
  title: {
    padding: ms(10),
  },
  postTextDesign: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
  },
  InputTextBox: {
    paddingLeft: ms(10),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.light.colors.infoBgLight,
    backgroundColor: theme.light.colors.inputFiled,


  },
  postInputDesign: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    color: theme.light.colors.black,
  },
  TextBox: {
    marginLeft: ms(10),
    marginRight: vs(10),
    marginBottom: vs(10),
  },
  TextBoxDEsc: {
    width: '100%',
    height: vs(300),
    padding: ms(8),
    borderWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
  },
  TextField: {
    backgroundColor: theme.light.colors.white,
  },
  InputTextBoxDEsc: {
    height: '100%',
    textAlignVertical: 'top',
  },

  //BottomLAyout of file contant

  BottomVideoContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: vs(20),
    paddingTop: ms(10),
    // borderTopWidth: 1,
    // borderColor: theme.light.colors.infoBgLight,
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
    borderRightWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
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
  giveAwayButtom: {
    width: ms(100),
    margin: ms(10),
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
  modelButtonContainer: { marginTop: vs(20) },

  // loading

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
