import { strings } from '@/localization';
import { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { createThumbnail } from 'react-native-create-thumbnail';

export const useGallery = () => {
  const [items, setItems] = useState([]);

  const openGallery = isImage => {
    isImage == strings.exclusive.image
      ? ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          mediaType: strings.exclusive.image,
          multiple: true,
          compressImageQuality: 0.5,
        })
          .then(images => {
            images.slices(0, 3).forEach(item => {
              items.push({
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
            setItems([...items]);
          })
      : ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          mediaType: strings.exclusive.video,
          multiple: true,
          compressImageQuality: 0.5,
          loadingLabelText: 'loading',
        })
          .then(videos => {
            videos.slice(0, 3).forEach(async item => {
              createThumbnail({
                url: item.path,
                timeStamp: 10000,
              })
                .then(response => {
                  items.push({
                    image: null,
                    video: item.path,
                    videoMime: item.mime,
                    videoPoster: response?.path,
                  });
                })
                .catch(err => console.log({ err }));
            });
          })
          .catch(e => {
            console.log('Error: ' + e);
          })
          .finally(() => {
            console.log('finally fuckers', items);
            setItems([...items]);
          });
  };

  return {
    items,
    openGallery,
  };
};
