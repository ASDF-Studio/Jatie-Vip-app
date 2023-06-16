import { strings } from '@/localization';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { createThumbnail } from 'react-native-create-thumbnail';
import ImageCropPicker from 'react-native-image-crop-picker';

export const useMedia = ({ initImages = [] }) => {
  const [selectedMedias, setSelectedMedias] = useState([]);

  const onDelete = index =>
    setSelectedMedias(selectedMedias.filter((_, i) => index !== i));

  const OpenGallery = ({ isImage, closeModal }) => {
    if (isImage) {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        mediaType: strings.exclusive.image,
        multiple: true,
        maxFiles: 3,
      })
        .then(images => {
          images.forEach(item => {
            selectedMedias.push({
              image: item.path,
              imageMime: item.mime,
              video: null,
            });
          });
        })
        .catch(e => {
          console.log('Error: ' + e);
        })
        .finally(() => {
          setSelectedMedias([...selectedMedias]);
          closeModal();
        });
    } else {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        mediaType: strings.exclusive.video,
        multiple: true,
        maxFiles: 3,
        loadingLabelText: 'loading',
      })
        .then(video => {
          video.forEach(item => {
            createThumbnail({
              url: item.path,
              timeStamp: 10000,
            })
              .then(response => {
                selectedMedias.push({
                  image: null,
                  video: item.path,
                  videoMime: item.mime,
                  videoPoster: response?.path,
                  videoPostermime: response?.mime,
                });
                setSelectedMedias([...selectedMedias]);
                closeModal();
              })
              .catch(err => console.log({ err }));
          });
        })
        .catch(e => {
          console.log('Error: ' + e);
        });
    }
  };

  const OpenCamera = ({ isImage, closeModal }) => {
    if (isImage) {
      ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      })
        .then(image => {
          selectedMedias.push({
            imageMime: image.mime,
            video: null,
            image: image.path,
          });
        })
        .catch(e => {
          console.log('Error: ' + e);
        })
        .finally(() => {
          setSelectedMedias([...selectedMedias]);
          closeModal();
        });
    } else {
      ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        mediaType: strings.exclusive.video,
      })
        .then(video => {
          createThumbnail({
            url: video.path,
            timeStamp: 10000,
          })
            .then(response => {
              selectedMedias.push({
                image: null,
                video: video.path,
                videoMime: video.mime,
                videoPoster: response?.path,
                videoPostermime: response?.mime,
              });
              selectedMedias([...selectedMedias]);
              closeModal();
            })
            .catch(err => console.log({ err }));
        })
        .catch(e => {
          console.log('Error: ' + e);
        });
    }
  };

  useEffect(() => {
    if (!isEmpty(initImages)) {
      setSelectedMedias(
        initImages.map(media => ({
          ...media,
          image: media.mimetype.split('/')[0] == 'image' ? media.url : null,
          video: media.mimetype.split('/')[0] == 'video' ? media.url : null,
          preMedia: true,
        }))
      );
    }
  }, [initImages]);

  return {
    selectedMedias,
    setSelectedMedias,
    OpenGallery,
    onDelete,
    OpenCamera,
  };
};
