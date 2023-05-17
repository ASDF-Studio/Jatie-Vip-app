import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import PropsType from 'prop-types';
import { s, ms, vs } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { strings } from '@/localization';
import { getAllPastGiveaway } from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { useDispatch, useSelector } from 'react-redux';

export function StatusNavigatorBar({
  status,
  setStatus,
  title1,
  title2,
  key1,
  key2,
  showLock,
  onpress,
}) {



  return (
    <View style={styles.statusContainer}>
      <View style={styles.status}>
        <TouchableOpacity
          onPress={() => setStatus(key1)}
        >
          <Text
            style={
              status != key1
                ? [
                  styles.statusText,
                  { color: theme.light.colors.primaryInactive },
                ]
                : styles.statusText
            }
          >
            {title1}
          </Text>
        </TouchableOpacity>
        {status == key1 ? (
          <View style={styles.statusNaivigator} />
        ) : (
          <View style={[styles.statusNaivigator, { left: ms(195) }]} /> //200
        )}

      </View>
      <View style={styles.status}>

        <TouchableOpacity
          onPress={() => setStatus(key2)}>
          <Text
            style={
              status != key2
                ? [
                  styles.statusText,
                  { color: theme.light.colors.primaryInactive },
                ]
                : styles.statusText
            }

          >

            {title2}
            {showLock ? (
              <FontAwesomeIcon
                icon={faLock}
                color={
                  status != key2
                    ? theme.light.colors.primaryInactive
                    : theme.light.colors.primary
                }
              />
            ) : null}
          </Text>

        </TouchableOpacity>

      </View>
    </View>
  );
}

StatusNavigatorBar.prototype = {
  status: PropsType.string.isRequired,
  setStatus: PropsType.func.isRequired,
  title1: PropsType.string.isRequired,
  title2: PropsType.string.isRequired,
  key1: PropsType.string.isRequired,
  key2: PropsType.string.isRequired,
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.light.colors.primaryBgLight,
    margin: ms(10),
    padding: ms(9),
    borderRadius: 8,
    height: ms(40),
    marginBottom: vs(20),
    paddingTop: ms(5),
  },
  statusText: {
    color: theme.light.colors.primary,
    fontSize: ms(18, 0.3),
    fontFamily: FontFamily.Recoleta_bold,
  },

  statusNaivigator: {
    width: ms(6),
    height: ms(6),
    backgroundColor: theme.light.colors.primary,
    position: 'absolute',
    borderRadius: 100,
    alignSelf: 'center',
    // left: ms(40),
    top: ms(22),
  },
});
