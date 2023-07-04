import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TextStyles, theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import {
  AppSwitch,
  HorizontalLine,
  Button,
  TopBackButton,
  CustomLoader,
} from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { CustomSwitch } from '@/components/switch';
import { UpdateNotifactionSettings } from '@/actions/UserActions';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';

export default function NotificationSettings({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [loading, setLoading] = useState(false);
  const user = useSelector(getUser);
  const userType = useSelector(state => state.userType);

  const [config, setConfig] = useState({
    masterConfig: false,
    postReact: false,
    postComment: false,
    postFollowing: false,
    jatiePost: false,
    jatieLive: false,
    oneHourBeforeLive: false,
  });

  const handleSubmit = async () => {
    setLoading(true);
    await UpdateNotifactionSettings({
      loggedInUserId: user.id,
      notifyForJatieLive: config.masterConfig || config.jatieLive,
      notifyForJatiePost: config.masterConfig || config.jatiePost,
      notifyOneHourBeforeJatieLive:
        config.masterConfig || config.oneHourBeforeLive,
      notifyForSomeOneReactPost: config.masterConfig || config.postReact,
      notifyForSomeoneCommentsOnMyPost:
        config.masterConfig || config.postComment,
      notifyForFollowingUserPost: config.masterConfig || config.postFollowing,
    });
    setLoading(false);
  };

  const handleSwitch = key => setConfig({ ...config, [key]: !config[key] });

  console.log(userType?.user, '====');

  return (
    <SafeAreaView style={styles.container}>
      {loading && <CustomLoader open={true} />}
      <View>
        <TopBackButton
          onPress={() => navigation.goBack()}
          style={styles.TopBackButton}
        />
        <View style={styles.listHeader}>
          <Text
            style={[TextStyles.header, { color: theme.light.colors.black }]}
          >
            {strings.profile.notificatin}
          </Text>
          <CustomSwitch
            value={config.masterConfig}
            onChange={() => handleSwitch('masterConfig')}
          />
        </View>

        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={5}
          paddingBottom={5}
        />

        <Text style={styles.headerText}> {strings.profile.fromMembers}</Text>
        <View style={styles.list}>
          <Text style={styles.listTxt}> {strings.profile.reactTo} </Text>
          <CustomSwitch
            value={config.masterConfig || config.postReact}
            onChange={() => handleSwitch('postReact')}
          />
          {/* <AppSwitch /> */}
        </View>
        <View style={styles.list}>
          <Text style={styles.listTxt}> {strings.profile.commentsOn} </Text>
          <CustomSwitch
            value={config.masterConfig || config.postComment}
            onChange={() => handleSwitch('postComment')}
          />
          {/* <AppSwitch
          value={config.masterConfig || config.postComment}
          onChange={() => handleSwitch('postComment')}
        /> */}
        </View>
        <View style={styles.list}>
          <Text style={styles.listTxt}> {strings.profile.ImFollowing} </Text>
          <CustomSwitch
            value={config.masterConfig || config.postFollowing}
            onChange={() => handleSwitch('postFollowing')}
          />
          {/* <AppSwitch
          value={config.masterConfig || config.postFollowing}
          onChange={() => handleSwitch('postFollowing')}
        /> */}
        </View>

        {userType?.user !== `${strings.userType.admin}` && (
          <>
            <HorizontalLine
              color={theme.light.colors.infoBgLight}
              paddingTop={5}
              paddingBottom={5}
            />
            <Text style={styles.headerText}> {strings.profile.fromJatie} </Text>
            <View style={styles.list}>
              <Text style={styles.listTxt}> {strings.profile.jatiePost} </Text>
              <CustomSwitch
                value={config.masterConfig || config.jatiePost}
                onChange={() => handleSwitch('jatiePost')}
              />
              {/* <AppSwitch
          value={config.masterConfig || config.jatiePost}
          onChange={() => handleSwitch('jatiePost')}
        /> */}
            </View>
            <View style={styles.list}>
              <Text style={styles.listTxt}> {strings.profile.JatieLive} </Text>
              <CustomSwitch
                value={config.masterConfig || config.jatieLive}
                onChange={() => handleSwitch('jatieLive')}
              />
              {/* <AppSwitch
          value={config.masterConfig || config.jatieLive}
          onChange={() => handleSwitch('jatieLive')}
        /> */}
            </View>
            <View style={styles.list}>
              <Text style={styles.listTxt}> {strings.profile.beforeLive} </Text>
              <CustomSwitch
                value={config.masterConfig || config.oneHourBeforeLive}
                onChange={() => handleSwitch('oneHourBeforeLive')}
              />
              {/* <AppSwitch
          value={config.masterConfig || config.oneHourBeforeLive}
          onChange={() => handleSwitch('oneHourBeforeLive')}
        /> */}
            </View>
          </>
        )}
      </View>

      <View>
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={5}
          paddingBottom={5}
        />
        <Button
          title={strings.operations.save}
          onPress={handleSubmit}
          style={{
            backgroundColor: theme.light.colors.primary,
            borderWidth: 0,
            width: '90%',
            marginVertical: ms(15),
            alignSelf: 'center',
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
    justifyContent: 'space-between',
  },
  TopBackButton: { padding: ms(10), paddingLeft: ms(15) },
  listHeader: {
    paddingTop: ms(5),
    paddingBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
    paddingLeft: ms(10),
  },
  headerText: {
    fontFamily: FontFamily.Recoleta_bold,
    paddingTop: ms(10),
    paddingBottom: ms(10),
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
    paddingHorizontal: ms(10),
    paddingLeft: ms(15),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(10),
    paddingHorizontal: ms(10),
    paddingLeft: ms(15),
  },
  listTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
});
