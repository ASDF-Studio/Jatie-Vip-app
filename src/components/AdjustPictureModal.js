import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { TYPES } from '@/actions/UserActions';
import { Button } from '@/components';
import { strings } from '@/localization';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { ms, vs } from 'react-native-size-matters';
import { theme } from '@/theme';
import { AuthHeader } from '@/components/AuthHeader';
import { FontFamily } from '@/theme/Fonts';
import { StyleSheet } from 'react-native';

export function AdjustPictureModal() {
  const { colors } = useTheme();
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AuthHeader />
      </View>

      <View style={styles.pictureView}>
        <View style={styles.header}>
          <Text style={styles.headingText}>
            {strings.addYourProfilePicture.adjustPicture}
          </Text>
        </View>

        <View style={styles.mainView}></View>
      </View>
      <View style={styles.bottomButtons}>
        <Button title={strings.addYourProfilePicture.cropAndClose} />

        <Button
          style={styles.skipButton}
          textStyle={styles.skipButtonText}
          title={strings.addYourProfilePicture.replace}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: ms(20),
  },
  mainView: {
    alignItems: 'center',
    flex: 1.4,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,

    backgroundColor: theme.light.colors.userBackgroundColor,
  },
  skipButton: {
    backgroundColor: theme.light.colors.white,
    borderColor: theme.light.colors.activeTabIcon,
    borderWidth: 1,
    marginTop: vs(15),
  },
  skipButtonText: {
    color: theme.light.colors.activeTabIcon,
  },
  bottomButtons: {
    flex: 0.6,
    justifyContent: 'flex-start',
    paddingVertical: vs(10),
    paddingHorizontal: ms(20),
  },
  headingText: {
    color: theme.light.colors.title,
    fontFamily: FontFamily.Recoleta_bold,
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: theme.light.colors.white,
    justifyContent: 'center',
    paddingHorizontal: ms(20),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  pictureView: {
    flex: 1.4,
    paddingHorizontal: ms(10),
  },
});
