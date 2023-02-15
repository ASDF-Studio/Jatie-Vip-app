import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { AppSwitch, HorizontalLine, Button, TopBackButton } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';

export default function NotificationSettings({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton onPress={() => navigation.goBack()} />
      <View style={styles.listHeader}>
        <Text style={[TextStyles.header, { color: theme.light.colors.black }]}>
          {' '}
          {strings.profile.notificatin}{' '}
        </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>
      <HorizontalLine color={theme.light.colors.infoBgLight} />
      <Text style={styles.headerText}> {strings.profile.fromMembers}</Text>
      <View style={styles.list}>
        <Text style={styles.listTxt}> {strings.profile.reactTo} </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTxt}> {strings.profile.commentsOn} </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTxt}> {strings.profile.ImFollowing} </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>
      <HorizontalLine color={theme.light.colors.infoBgLight} />
      <Text style={styles.headerText}> {strings.profile.fromJatie} </Text>
      <View style={styles.list}>
        <Text style={styles.listTxt}> {strings.profile.jatiePost} </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTxt}> {strings.profile.JatieLive} </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTxt}> {strings.profile.beforeLive} </Text>
        <AppSwitch value={isEnabled} onChange={toggleSwitch} />
      </View>

      <View style={{ alignItems: 'center', marginTop: ms(150) }}>
        <Button
          title={strings.operations.save}
          style={{
            backgroundColor: theme.light.colors.primary,
            alignItems: 'center',
            borderWidth: 0,
            width: '90%',
          }}
          textStyle={{
            color: theme.light.colors.white,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  listHeader: {
    paddingTop: ms(5),
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
  headerText: {
    fontFamily: FontFamily.Recoleta_medium,
    paddingTop: ms(10),
    paddingBottom: ms(10),
    fontSize: ms(18, 0.3),
    color: theme.light.colors.black,
    paddingHorizontal: ms(10),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(10),
    paddingHorizontal: ms(10),
  },
  listTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(16, 0.3),
  },
});
