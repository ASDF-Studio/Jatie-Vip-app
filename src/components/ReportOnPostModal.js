import { theme } from '@/theme';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export const ReportOnPostModal = ({ open, setOpen, height, children }) => {
  return (
    <Modal visible={open} transparent={true}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.container}>
          <View style={[styles.body, { height: height }]}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight, //
  },
  body: {
    width: '100%',
    backgroundColor: theme.light.colors.white,
    position: 'absolute',
    top: vs(80),
    borderWidth: 1, //
    borderColor: theme.light.colors.primaryBg, //
    // borderRadius: 16,
  },
});
