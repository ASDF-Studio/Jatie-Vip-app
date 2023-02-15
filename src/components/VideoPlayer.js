import { faCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import VideoPlayer from 'react-native-video-controls';
import { theme } from '@/theme';

export const AppVideoPlayer = ({ url, poster }) => {
  const [openFullScreen, setFullScreen] = useState(false);
  const [pause, setPause] = useState();
  return (
    <View>
      {openFullScreen && (
        <Modal visible={openFullScreen} transparent={true}>
          <VideoPlayer
            source={{ uri: url }}
            navigator={null}
            toggleResizeModeOnFullscreen={true}
            tapAnywhereToPause={true}
            disableBack
            onEnterFullscreen={() => setFullScreen(prev => !prev)}
            style={{
              height: ms(200),
            }}
            // poster= "https://e7.pngegg.com/pngimages/244/695/png-clipart-play-icon-video-player-information-play-icon-miscellaneous-angle-thumbnail.png"
            paused={true}
            playIcon={<FontAwesomeIcon icon={faPlay} />}
            showOnStart={false}
          />
        </Modal>
      )}
      <View>
        <VideoPlayer
          source={{ uri: url }}
          navigator={null}
          toggleResizeModeOnFullscreen={true}
          tapAnywhereToPause={true}
          disableBack
          onEnterFullscreen={() => setFullScreen(prev => !prev)}
          style={{
            height: ms(200),
            // position: 'absolute',
          }}
          poster={poster}
          paused={pause}
          onPress={() => setPause(pause == true ? false : true)}
          resizeMode="cover"
          repeat
          customStyles={{
            playIcon: {
              width: 100,
              height: 100,
              color: 'red',
            },
          }}
          playIcon={true}
          showOnStart={false}
        />
      </View>
    </View>
  );
};
