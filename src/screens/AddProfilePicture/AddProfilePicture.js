import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TYPES, updateProfile } from '@/actions/UserActions';
import { Button, CustomLoader, ErrorView } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/AddProfilePicture/AddProfilePhoto.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { AuthHeader } from '@/components/AuthHeader';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { close } from '@/assets';
import { EditViewModal } from '@/components/CropPictureModal';
import { showMessage } from 'react-native-flash-message';
import { getUser } from '@/selectors/UserSelectors';
import { NAVIGATION } from '@/constants';

export function AddProfilePicture({ route }) {
  const { prevData } = route.params;
  const user = useSelector(getUser)
  const { colors } = useTheme();
  const [image, setImage] = useState(null);
  const [mimeType, setmimeType] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [cropImageModal, setCropImageModal] = useState();

  const dispatch = useDispatch();

  const ReplaceImage = () => {
    setImage(null);
    setCropImageModal(false);
  };

  const ImageCropModal = () => {
    setCropImageModal(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.UPDATE_PROFILE], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.UPDATE_PROFILE_ERROR], state),
    shallowEqual
  );
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = () => {
    dispatch(updateProfile(prevData?.birthday, prevData?.name, prevData?.genderValue, prevData?.ID, prevData?.email, prevData?.countryvalue, prevData?.username, prevData?.number, null, null, NAVIGATION.addProfilePicture))
  };

  const OpenGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.5
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
        setmimeType(image.mime)
        setModalVisible(!isModalVisible);
        setCropImageModal(true);
      })
      .catch(e => {
        console.log('Error: ' + e);
      });
  };
  const OpenCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.5
    })
      .then(image => {
        setModalVisible(!isModalVisible);
        setImage(image.path);
        setmimeType(image.mime)
        setCropImageModal(true);
      })
      .catch(e => {
        console.log('Error: ' + e);
      });
  };

  const RemovePic = () => {
    setImage(null);
    setmimeType(null)

  };
  const handleFinish = () => {
    if (image == null) {
      showMessage({
        message: strings.profile.selecteImage,
        type: "danger",
      })
    }
    else {
      dispatch(updateProfile(prevData?.birthday, prevData?.name, prevData?.genderValue, prevData?.ID, prevData?.email, prevData?.countryvalue, prevData.username, prevData.number, image, mimeType, NAVIGATION.addProfilePicture))
    }

  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AuthHeader title={strings.addYourProfilePicture.title} />

      <ErrorView errors={errors} />
      <View style={styles.mainView}>
        <View style={styles.formContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.img} />
          ) : (
            <FontAwesomeIcon icon={faUser} size={65} color={colors.white} />
          )}
        </View>

        <EditViewModal
          textStyleHeading={styles.HeadingTextStyle}
          style={[styles.EditViewModal, {
            alignSelf: 'center',
            width: Dimensions.get('window').width,
          }]}
          // style={styles.EditViewModal}
          sourceUrl={image}
          isVisible={cropImageModal}
          onImageCrop={res => {
            const finalImagePath = 'file://' + res.uri;
            setImage(finalImagePath);
            if (res !== null) {
              setCropImageModal(false);
            }
          }}
          onPress={ReplaceImage}
        />
        <CustomLoader
          open={isLoading}
        />
        {!image ? (
          <Button
            onPress={toggleModal}
            style={styles.submitButton}
            title={strings.addYourProfilePicture.upload}
          />
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              onPress={toggleModal}
              style={styles.replaceRemoveButton}
              title={strings.addYourProfilePicture.replace}
            />

            <Button
              onPress={RemovePic}
              style={styles.removeButton}
              textStyle={styles.skipButtonText}
              title={strings.addYourProfilePicture.remove}
            />
          </View>
        )}
      </View>

      <View>
        <View style={styles.bottomButtons}>
          <Button
            onPress={handleFinish}
            title={
              isLoading
                ? strings.common.loading
                : strings.addYourProfilePicture.Finish
            }
          />
          <Button
            onPress={handleSubmit}
            style={styles.skipButton}
            textStyle={styles.skipButtonText}
            title={strings.addYourProfilePicture.skip}
          />
        </View>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalBackground}>
            <TouchableOpacity onPress={closeModal}>
              <View style={styles.closeView}>
                <Image source={close} style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
            <Button
              title={strings.addYourProfilePicture.uploadFromCamera}
              onPress={OpenCamera}
            />
            <View style={styles.addYourPPButton}>
              <Button
                title={strings.addYourProfilePicture.uploadFromGallery}
                onPress={OpenGallery}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
