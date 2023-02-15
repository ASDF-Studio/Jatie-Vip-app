import { strings } from '@/localization';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faHand, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { Button } from './Button';

export const Toast = ({ open, setOpen, icon, message, onPressOk }) => {
  return (
    <Modal visible={open} transparent={true}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.iconContainer}>
              <View
                style={{
                  backgroundColor: theme.light.colors.primaryBgLight,
                  padding: ms(10),
                  borderRadius: 100,
                }}
              >
                <FontAwesomeIcon
                  icon={icon}
                  size={ms(22)}
                  color={theme.light.colors.primary}
                />
              </View>
            </View>
            <Text style={styles.messageTxt}>{message} </Text>
            <View style={{ alignItems: 'center' }}>
              <Button
                title={strings.operations.ok}
                style={{
                  width: '30%',
                  margin: ms(10),
                }}
                onPress={() => onPressOk(false)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    alignContent: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '95%',
    backgroundColor: theme.light.colors.white,
    borderWidth: 1, //
    borderColor: theme.light.colors.primaryBg, //
    borderRadius: 16, //
    marginLeft: ms(9),
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: ms(20),
  },
  messageTxt: {
    padding: ms(10),
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
    textAlign: 'center',
    paddingLeft: ms(42),
    paddingRight: ms(42),
  },
});
