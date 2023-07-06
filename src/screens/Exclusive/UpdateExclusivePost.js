import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Button,
  CustomLoader,
  HorizontalLine,
  Icon,
  SelectedFiles,
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
import { Data, File } from './exclusiveData/adminExclusivePostData';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { createThumbnail } from 'react-native-create-thumbnail';
import { useMedia } from '@/hooks';

let nextId = 0;

export default function UpdateExclusivePost({ navigation, route }) {
  const { DATA } = route.params

  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const { selectedMedias, onDelete, OpenCamera, OpenGallery } = useMedia({
    initImages: DATA?.postMediaContent || [],
  });
  const [imageArray, setImageArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageArrayDisplay, setImageArrayDisplay] = useState([]);
  const [isImage, setIsImage] = useState();
  const [postTxt, setPostTxt] = useState('');
  const [postImg, setPostImg] = useState([]);
  const [mimeType, setmimeType] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [animating, setAnimating] = useState();
  const [preImageArray, setPreImageArray] = useState([]);
  const [prePostImg, setPrePostImg] = useState([]);

  useEffect(() => {
    setPostTitle(DATA?.postTitle);
    setPostDesc(DATA?.postBody);
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validation = () => {
    const params = {
      userId: user?.id,
      postTitle: postTitle,
      postBody: postDesc,
      imageArray: selectedMedias.filter(x => !x?.preMedia),
      postId: DATA?.id,
      vipOnly: DATA?.isVIPonly,
      pinnedPost: DATA?.isPinned,
      schedulePost: DATA?.isScheduled,
      preImageArray: selectedMedias.filter(x => x?.preMedia),
      mimeType: mimeType,
    };

    // console.log("ARRRAAATA", JSON.stringify(params));
    // return false
    navigation.navigate(NAVIGATION.updateExclusiveOption, { prevData: params });
  };

  return (
    <SafeAreaView style={styles.contianer}>
      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.headerText, TextStyles.header]}>
          {strings.exclusive.adminPostHeader}
        </Text>
      </View>
      <HorizontalLine />

      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.title}>
            <Text style={[TextStyles.text, styles.titleText]}>
              {strings.exclusive.title}
            </Text>
          </View>
          <View style={styles.TextBox}>
            <TextInput
              // value={postTitle}
              style={styles.InputTextBox}
              multiline={true}
              placeholder={strings.exclusive.titleHere}
              onChangeText={val => setPostTitle(val)}
            >
              <Text style={[TextStyles.text, styles.titleTextBox]}>
                {postTitle}
              </Text>
            </TextInput>
          </View>
          <View style={styles.TextBoxDEsc}>
            <TextInput
              style={styles.InputTextBoxDEsc}
              multiline={true}
              placeholder={strings.exclusive.whatOnYourMind}
              onChangeText={val => setPostDesc(val)}
            >
              <Text style={[TextStyles.text, styles.TextBoxDEscDesign]}>
                {postDesc}
              </Text>
            </TextInput>
          </View>
        </View>
      </ScrollView>

      {/* {BttomContantLayout()} */}
      {/* {FileUpload(imageArrayDisplay)} */}
      <SelectedFiles imageArray={selectedMedias} onDelete={onDelete} />

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
          disabled={postDesc.length ? false : true}
          opacity={postDesc.length ? 1 : 0.4}
          style={styles.exclusivePostButton}
          onPress={validation}
        />
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
            onPress={() => {
              OpenCamera({
                isImage: isImage === strings.exclusive.image,
                closeModal: closeModal,
              });
            }}
          />
          <View style={styles.imageFromGalleryButton}>
            <Button
              title={strings.operations.imageFromGallery}
              onPress={() => {
                OpenGallery({
                  isImage: isImage === strings.exclusive.image,
                  closeModal: closeModal,
                });
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
  titleText: {
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
    minHeight: 35,
  },
  TextBox: {
    marginLeft: ms(10),
    marginRight: vs(10),
    marginBottom: vs(10),
  },
  titleTextBox: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    color: theme.light.colors.black,
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
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontWeight: '400',
    fontSize: 18,
  },
  TextBoxDEscDesign: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    textAlign: 'justify',
    color: theme.light.colors.black,
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
  exclusivePostButton: {
    width: ms(100),
    margin: ms(10),
  },
  imageFromGalleryButton: { marginTop: vs(20) },

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
});
