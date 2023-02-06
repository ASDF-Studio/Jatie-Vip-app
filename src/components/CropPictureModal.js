import { strings } from '@/localization';
import { theme } from '@/theme';
import React, { useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CropView as ImageCropView } from 'react-native-image-crop-tools';
import Modal from 'react-native-modal';
import { ms, vs } from 'react-native-size-matters';
import { Button } from './Button';

export const EditViewModal = ({
  isVisible,
  onPress,
  sourceUrl,
  onImageCrop,
  style,
  textStyleHeading,
}) => {
  const cropViewRef = useRef();
  return (
    <Modal isVisible={isVisible}>
      <View style={style}>
        <View
          style={{
            width: '100%',
            height: vs(40),
            backgroundColor: 'white',
            alignSelf: 'center',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            justifyContent: 'center',
            paddingHorizontal: ms(10),
          }}
        >
          <Text style={textStyleHeading}>
            {strings.addYourProfilePicture.adjustPicture}
          </Text>
        </View>
        <ImageCropView
          sourceUrl={sourceUrl}
          style={{
            height: 450,
            width: Dimensions.get('window').width,
          }}
          ref={cropViewRef}
          onImageCrop={onImageCrop}
          keepAspectRatio
          aspectRatio={{ width: 16, height: 16 }}
        />
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: theme.light.colors.white,
            paddingBottom: 20,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <Button
            style={{ marginTop: 20, width: '95%', alignSelf: 'center' }}
            title={strings.addYourProfilePicture.cropAndClose}
            onPress={() => cropViewRef.current.saveImage(true, 90)}
          />
          <Button
            style={{
              marginTop: 20,
              width: '95%',
              alignSelf: 'center',
              backgroundColor: theme.light.colors.white,
              borderWidth: 2,
              borderColor: theme.light.colors.primary,
            }}
            title={strings.addYourProfilePicture.replace}
            textStyle={{ color: theme.light.colors.primary }}
            onPress={onPress}
          />
        </View>
      </View>
    </Modal>
  );
};
