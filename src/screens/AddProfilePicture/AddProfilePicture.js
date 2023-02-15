import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/AddProfilePicture/AddProfilePhoto.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { vs } from 'react-native-size-matters';
import { AuthHeader } from '@/components/AuthHeader';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { close } from '@/assets';
import { EditViewModal } from '@/components/CropPictureModal';

export function AddProfilePicture() {
  const { colors } = useTheme();
  const [image, setImage] = useState(null);
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
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = () => {
    const dummyUserName = 'Dummy';
    const dummyUserPassword = 'Dummy';
    dispatch(login(dummyUserName, dummyUserPassword));
  };

  const OpenGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
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
      height: 400,
      cropping: false,
    })
      .then(image => {
        setModalVisible(!isModalVisible);
        setImage(image.path);
        setCropImageModal(true);
      })
      .catch(e => {
        console.log('Error: ' + e);
      });
  };

  const RemovePic = () => {
    setImage(!image);
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
          style={styles.EditViewModal}
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
        {!image ? (
          <Button
            onPress={toggleModal}
            style={styles.submitButton}
            title={strings.addYourProfilePicture.upload}
          />
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              onPress={RemovePic}
              style={styles.replaceRemoveButton}
              title={strings.addYourProfilePicture.remove}
            />

            <Button
              onPress={toggleModal}
              style={styles.replaceRemoveButton}
              title={strings.addYourProfilePicture.replace}
            />
          </View>
        )}
      </View>
      <View style={styles.bottomButtons}>
        <Button
          onPress={handleSubmit}
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
