import { faCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import VideoPlayer from 'react-native-video-controls';
import { theme } from '@/theme';
import { useEffect } from 'react';

export const AppVideoPlayer = ({ url, poster, isPaused }) => {
  const [openFullScreen, setFullScreen] = useState(false);
  const [pause, setPause] = useState(isPaused);

  useEffect(() => {
    setPause(isPaused);
  }, [isPaused]);

  return (
    <View
      style={{
        width: '100%',
        height: ms(200),
      }}
    >
      {openFullScreen ? (
        <Modal visible={openFullScreen} transparent={true}>
          <VideoPlayer
            source={{ uri: url }}
            navigator={null}
            tapAnywhereToPause={true}
            disableBack
            toggleResizeModeOnFullscreen={false}
            onExitFullscreen={() => setFullScreen(false)}
            onPress={() => setPause(!pause)}
            style={{
              height: ms(200),
            }}
            fullscreen={true}
            muted={false}
            paused={pause}
            ignoreSilentSwitch={'ignore'}
            // poster= "https://e7.pngegg.com/pngimages/244/695/png-clipart-play-icon-video-player-information-play-icon-miscellaneous-angle-thumbnail.png"
            playIcon={<FontAwesomeIcon icon={faPlay} />}
            showOnStart={false}
          />
        </Modal>
      ) : (
        <VideoPlayer
          muted={false}
          ignoreSilentSwitch={'ignore'}
          source={{ uri: url }}
          navigator={null}
          toggleResizeModeOnFullscreen={false}
          tapAnywhereToPause={true}
          disableBack
          onEnterFullscreen={() => {
            setFullScreen(true);
          }}
          paused={pause}
          style={{
            width: '100%',
            height: ms(200),
          }}
          onPress={() => setPause(!pause)}
          poster={poster}
          resizeMode="contain"
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
      )}
    </View>
  );
};
