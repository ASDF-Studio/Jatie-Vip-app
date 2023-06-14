import React from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '@/theme';
import { ms } from 'react-native-size-matters';
import { BlurView } from '@react-native-community/blur';

export function PopUp({ open, setOpen, height, children, blurred = false }) {
  return (
    <Modal visible={open} transparent={true} animationType="fade">
      {blurred && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.container}>
          <View
            style={[
              styles.body,
              {
                height: height,
              },
            ]}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

PopUp.prototype = {
  open: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  height: PropTypes.string,
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  body: {
    width: '90%',
    backgroundColor: theme.light.colors.white,
    top: '25%',
    alignItems: 'center',
    padding: ms(10),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.colors.primaryBg,

    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
});
