import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  CustomLoader,
  HorizontalLine,
  Icon,
  PostInput,
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
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { TYPES, updatePost } from '@/actions/UserActions';
import { navigationRef } from '@/navigation/RootNavigation';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAllPost } from '@/actions/PostActions';
import { createThumbnail } from 'react-native-create-thumbnail';
import { customShowMessage } from '@/utils';

export default function UpdatePost({ route, navigation }) {
  const { prevData } = route.params;

  const userType = useSelector(state => state.userType);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImage, setIsImage] = useState();
  const [vipOnly, setVipOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user_Type] = useState(userType.user);
  const [imageArrayDisplay, setImageArrayDisplay] = useState([]);

  const [imageArray, setImageArray] = useState([]);
  const [postId, setPostId] = useState('');
  const [userId, setUserId] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImg, setPostImg] = useState([]);
  const [mimeType, setmimeType] = useState([]);
  //edit post
  const [postDetails, setPostDetails] = useState([]);
  const [preImageArray, setPreImageArray] = useState([]);
  const [prePostImg, setPrePostImg] = useState([]);
  const [preMimeType, setPreMimeType] = useState(null);
  const [actionType] = useState('Update');

  useEffect(() => {
    getPostById(prevData);
  }, []);

  const getPostById = async data => {
    setPostDetails(data);
    setPostId(data.id);
    setUserId(user?.id);
    setPostTitle(data.postTitle);
    setPostBody(data.postBody);

    data?.postMediaContent.map(
      item => (
        preImageArray.push({
          url: item.url,
          mimetype: item.mimetype,
          cover: item.cover,
        }),
        imageArray.push({
          image: item.mimetype.split('/')[0] == 'image' ? item.url : null,
          imageMime: null,
          video: item.mimetype.split('/')[0] == 'video' ? item.url : null,
          cover: item?.cover,
          preContent: true,
        })
      )
    );

    setPrePostImg(data.postImg);
  };
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.UPDATE_POST], state)
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };
  const deleteFile = (id, preContent, url) => {
    setImageArray(imageArray.filter((_, index) => index !== id));

    if (preContent) {
      setPreImageArray(preImageArray.filter(x => x.url !== url));
    }
  };

  const OpenGallery = () => {
    isImage == strings.exclusive.image
      ? ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          maxFiles: 3,
          mediaType: strings.exclusive.image,
          multiple: true,
          compressImageQuality: 0.5,
        })
          .then(images => {
            images.forEach(item => {
              imageArray.push({
                image: item.path,
                imageMime: item.mime,
                video: null,
              });
              // postImg.push(item.path);
              // mimeType.push(item.mime);
            });
          })
          .catch(e => {
            console.log('Error: ' + e);
          })
          .finally(() => {
            setImageArray([...imageArray]);
            setModalVisible(!isModalVisible);
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
                .then(response => {
                  imageArray.push({
                    image: null,
                    video: item.path,
                    videoMime: item.mime,
                    videoPoster: response?.path,
                    videoPostermime: response?.mime,
                  });
                  setImageArray([...imageArray]);
                  setModalVisible(!isModalVisible);
                })
                .catch(err => console.log({ err }));
              // setPostImg(video.path);
              // setmimeType(video.mime);
            });
          })
          .catch(e => {
            console.log('Error: ' + e);
          });
  };

  const OpenCamera = () => {
    isImage == strings.exclusive.image
      ? ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
          compressImageQuality: 0.5,
        })
          .then(image => {
            imageArray.push({
              image: image.path,
              imageMime: image.mime,
              video: null,
            });
            // postImg.push(image.path);
            // mimeType.push(image.mime);
          })
          .catch(e => {
            console.log('Error: ' + e);
          })
          .finally(() => {
            setImageArray([...imageArray]);
            setModalVisible(!isModalVisible);
          })
      : ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
          mediaType: strings.exclusive.video,
          compressImageQuality: 0.5,
        })
          .then(video => {
            console.log(video);
            createThumbnail({
              url: video.path,
              timeStamp: 10000,
            })
              .then(response => {
                imageArray.push({
                  image: null,
                  video: video.path,
                  videoMime: video.mime,
                  videoPoster: response?.path,
                  videoPostermime: response?.mime,
                });
                setImageArray([...imageArray]);
                setModalVisible(!isModalVisible);
              })
              .catch(err => console.log({ err }));
          })
          .catch(e => {
            console.log('Error: ' + e);
          });
  };

  const validation = () => {
    if (postBody == '') {
      customShowMessage({
        message: strings.home.postBody,
        type: 'danger',
      });
    } else {
      if (userType.user == strings.userType.free) {
        dispatch(
          updatePost(
            postId,
            userId,
            postTitle,
            postBody,
            postImg,
            preImageArray,
            mimeType,
            preMimeType,
            imageArray.filter(x => !x?.preContent),
            user_Type,
            NAVIGATION.home
          )
        );
        dispatch(getAllPost(user?.id, null, null, NAVIGATION.profile));
      }

      if (userType.user == strings.userType.vip) {
        dispatch(
          updatePost(
            postId,
            userId,
            postTitle,
            postBody,
            postImg,
            preImageArray,
            mimeType,
            preMimeType,
            imageArray.filter(x => !x?.preContent),
            user_Type,
            NAVIGATION.home
          )
        );
        dispatch(getAllPost(user?.id, null, null, NAVIGATION.profile));
      } else {
        dispatch(getAllPost(user?.id, strings.sortBy.recent, false));
        {
          userType.user == strings.userType.admin &&
            navigationRef.navigate(NAVIGATION.postOptions, {
              prevData: {
                postId,
                userId,
                postTitle,
                postBody,
                postImg,
                preImageArray,
                mimeType,
                preMimeType,
                imageArray,
                user_Type,
                actionType,
              },
            });
        }
      }
    }
  };
  const onSave = () => {
    validation();
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
      {isLoading && <CustomLoader open={isLoading} />}
      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.TextBoxDEsc}>
            <PostInput
              placeholder={strings.home.whatOnYourMind}
              value={postBody}
              setValue={setPostBody}
            />
          </View>
        </View>
      </ScrollView>

      <View>
        {imageArray.length ? (
          <HorizontalLine color={theme.light.colors.infoBgLight} />
        ) : null}
        <FileUpload imageArray={imageArray} onDelete={deleteFile} />
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
            {/* {userType.user == strings.userType.vip && (
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
            )} */}

            {/* show only for admin */}
            {userType.user == strings.userType.admin && (
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
            )}
          </View>

          {/* button */}

          <TouchableOpacity>
            {/* show only for Free and vip user */}
            {userType.user == strings.userType.vip && (
              <Button
                title={strings.home.post}
                style={styles.vipButton}
                disabled={postBody.length ? false : true}
                opacity={postBody.length ? 1 : 0.4}
                onPress={onSave}
              />
            )}
            {userType.user == strings.userType.free && (
              <Button
                title={
                  prevData?.postId ? strings.home.update : strings.home.post
                }
                disabled={postBody.length ? false : true}
                opacity={postBody.length ? 1 : 0.4}
                style={styles.freeButton}
                onPress={onSave}
              />
            )}
            {/* show only for Admin */}
            {userType.user == strings.userType.admin && (
              <Button
                title={strings.home.next}
                opacity={postBody.length ? 1 : 0.4}
                disabled={postBody.length ? false : true}
                onPress={onSave}
                // onPress={() => navigation.navigate(NAVIGATION.postOptions)}
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

export const FileUpload = ({ imageArray = [], onDelete }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.BottomVideoContainer}>
        <View style={styles.videoContainer}>
          {imageArray.map((item, index) => {
            console.log(item);
            return item.image ? (
              <View style={styles.fileSpacing} key={item.id}>
                <Image style={styles.thumbnail} source={{ uri: item.image }} />
                <View style={styles.minus}>
                  <Text
                    style={styles.minusTxt}
                    onPress={() => {
                      onDelete(index, item?.preContent, item.image);
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
                  source={{ uri: item?.cover || item?.videoPoster }}
                />
                <View style={styles.minus}>
                  <Text
                    style={styles.minusTxt}
                    onPress={() => {
                      onDelete(index, item?.preContent, item.video);
                    }}
                  >
                    {strings.giveaway.minus}
                  </Text>
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
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontWeight: '400',
    fontSize: 18,
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
