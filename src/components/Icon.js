import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';

export function Icon({ icon, size, onPress, color, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon icon={icon} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
}

Icon.prototype = {
  icon: PropTypes.object.isRequired,
};
