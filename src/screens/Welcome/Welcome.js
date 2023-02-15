import { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { styles as customStyles } from '@/screens/Welcome/Welcome.styles';
import { Button } from '@/components';
import { navigate } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { Logo } from '@/assets';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFacebook,
  faTiktok,
  faSnapchat,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { ms } from 'react-native-size-matters';

export function Welcome() {
  const { colors } = useTheme();
  const styles = useMemo(() => customStyles(colors), [colors]);

  return (
    <ImageBackground style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.logoContainer}>
          <Logo height={ms(250)} width={ms(235)} />
        </View>
        <Button
          title={strings.Welcome.login}
          onPress={() => navigate(NAVIGATION.login)}
        />
        <Button title={strings.Welcome.signup} style={styles.signButton} />

        <View style={styles.socialContainer}>
          <FontAwesomeIcon
            icon={faFacebook}
            size={ms(22)}
            color={colors.white}
          />
          <FontAwesomeIcon icon={faTiktok} size={ms(22)} color={colors.white} />
          <FontAwesomeIcon
            icon={faSnapchat}
            size={ms(22)}
            color={colors.white}
          />
          <FontAwesomeIcon
            icon={faYoutube}
            size={ms(22)}
            color={colors.white}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            size={ms(22)}
            color={colors.white}
          />
        </View>

        <Text style={styles.copyrightTitle}>{strings.Welcome.copyright}</Text>
      </View>
    </ImageBackground>
  );
}
