import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ms } from 'react-native-size-matters';
import { TextStyles, theme } from '@/theme';
import PropTypes from 'prop-types';

export const ModalList = ({ title, icon, onPress, iconBg, iconColor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.list}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: iconBg,
              },
            ]}
          >
            <FontAwesomeIcon
              icon={icon}
              size={ms(13)}
              color={iconColor}
              style={styles.icon}
            />
          </View>
          <Text style={[TextStyles.title, styles.text]}> {title} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ModalList.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  iconColor: PropTypes.string,
  iconBg: PropTypes.string,
};

ModalList.defaultProps = {
  title: 'No title',
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
  },
  list: {
    flexDirection: 'row',
    paddingTop: ms(15),
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    paddingLeft: ms(5),
    fontSize: ms(16),
    color: theme.light.colors.black,
  },
  iconContainer: {
    padding: ms(10),
    borderRadius: 100,
  },
});
