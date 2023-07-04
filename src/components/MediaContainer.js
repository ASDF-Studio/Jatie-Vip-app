import { strings } from '@/localization';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { isEmpty, size } from 'lodash';
import React from 'react';
import { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export const MediaContainer = props => {
  const { contents, onPress, borderBottom = true } = props;

  const isImage = useCallback(
    item => item?.mimetype?.split('/')[0] === 'image',
    []
  );

  if (isEmpty(contents)) {
    return <></>;
  }

  return (
    <View
      style={[
        styles.container,
        borderBottom && {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        },
      ]}
    >
      {contents.slice(0, 2).map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onPress(size(contents) > 2 ? 0 : index)}
            style={{ flex: 1 }}
            key={index}
          >
            {index === 1 && size(contents) > 2 ? (
              <ImageBackground
                source={{
                  uri: isImage(item) ? item.url : item?.cover,
                }}
                style={[
                  styles.imageBackground,
                  {
                    marginLeft: ms(3),
                  },
                ]}
              >
                {index === 1 && <View style={styles.moreImage} />}
                <Text style={styles.extraImage}>
                  {strings.message.plus}
                  {contents.length - 1}
                </Text>
              </ImageBackground>
            ) : isImage(item) ? (
              <Image
                source={{
                  uri: item?.url,
                }}
                style={[
                  styles.image,
                  index === 1 && {
                    marginLeft: ms(3),
                  },
                ]}
              />
            ) : (
              <ImageBackground
                source={{
                  uri: item?.cover,
                }}
                style={[
                  styles.imageBackground,
                  index === 1 && {
                    marginLeft: ms(3),
                  },
                ]}
              >
                <View style={styles.playButton}>
                  <FontAwesomeIcon
                    icon={faPlay}
                    size={ms(15)}
                    style={{ color: 'white' }}
                  />
                </View>
              </ImageBackground>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: vs(180),
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: vs(180),
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: '100%',
    width: '100%',
    height: vs(180),
    backgroundColor: theme.light.colors.hyperlink,
    position: 'relative',
  },
  playButton: {
    backgroundColor: theme.light.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    height: '100%',
    backgroundColor: theme.light.colors.backgroundOpacity,
  },
  extraImage: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(24, 0.3),
    zIndex: 100,
  },
});
