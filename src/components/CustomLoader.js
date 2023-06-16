import React from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '@/theme';
import { ms } from 'react-native-size-matters';

export function CustomLoader({ open }) {
  return (
    <Modal visible={open} transparent={true} animationType="fade">
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <ActivityIndicator
            size={'large'}
            color={theme.light.colors.primary}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

CustomLoader.prototype = {
  open: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.light.colors.transparentGrey,
    justifyContent: 'center',
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
  loader: {
    // alignSelf: "center"
  },
});
