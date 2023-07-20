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
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { keys } from 'lodash';

export default function NotificationSettings({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [loading, setLoading] = useState(false);
  const user = useSelector(getUser);
  const userType = useSelector(state => state.userType);
  const dispatch = useDispatch();

  const checkMasterConfig = useCallback(() => {
    if (userType?.user !== `${strings.userType.admin}`) {
      return (
        user?.notify_for_someone_react_on_my_post &&
        user?.notify_for_someone_comments_on_my_post &&
        user?.notify_for_following_user_post &&
        user?.notify_for_jatie_post &&
        user?.notify_for_jatie_live
      );
    } else {
      return (
        user?.notify_for_someone_react_on_my_post &&
        user?.notify_for_someone_comments_on_my_post &&
        user?.notify_for_following_user_post
      );
    }
  }, []);

  const [config, setConfig] = useState({
    masterConfig: checkMasterConfig(),
    postReact: user?.notify_for_someone_react_on_my_post,
    postComment: user?.notify_for_someone_comments_on_my_post,
    postFollowing: user?.notify_for_following_user_post,
    ...(userType?.user !== `${strings.userType.admin}` && {
      jatiePost: user?.notify_for_jatie_post,
      jatieLive: user?.notify_for_jatie_live,
    }),
  });

  const handleSubmit = async () => {
    setLoading(true);
    await UpdateNotifactionSettings(
      {
        loggedInUserId: user.id,
        ...(userType?.user !== `${strings.userType.admin}` && {
          notifyForJatieLive: config.masterConfig || config.jatieLive,
          notifyForJatiePost: config.masterConfig || config.jatiePost,
        }),
        notifyForSomeOneReactPost: config.masterConfig || config.postReact,
        notifyForSomeoneCommentsOnMyPost:
          config.masterConfig || config.postComment,
        notifyForFollowingUserPost: config.masterConfig || config.postFollowing,
      },
      dispatch
    );
    setLoading(false);
  };

  const handleSwitch = key => {
    config[key] = !config[key];

    if (key !== 'masterConfig') {
      const isAllOn = keys(config).reduce((acc, cur) => {
        if (cur === 'masterConfig') {
          return true;
        }
        return acc && config[cur];
      }, true);

      config.masterConfig = isAllOn;
    } else {
      if (config[key]) {
        keys(config).forEach(key => {
          config[key] = true;
        });
      } else {
        keys(config).forEach(key => {
          config[key] = false;
        });
      }
    }

    setConfig({
      ...config,
    });
  };

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
            value={config.postReact || config.masterConfig}
            onChange={() => handleSwitch('postReact')}
          />
          {/* <AppSwitch /> */}
        </View>
        <View style={styles.list}>
          <Text style={styles.listTxt}> {strings.profile.commentsOn} </Text>
          <CustomSwitch
            value={config.postComment || config.masterConfig}
            onChange={() => handleSwitch('postComment')}
          />
        </View>
        <View style={styles.list}>
          <Text style={styles.listTxt}> {strings.profile.ImFollowing} </Text>
          <CustomSwitch
            value={config.postFollowing || config.masterConfig}
            onChange={() => handleSwitch('postFollowing')}
          />
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
                value={config.jatiePost || config.masterConfig}
                onChange={() => handleSwitch('jatiePost')}
              />
            </View>
            <View style={styles.list}>
              <Text style={styles.listTxt}> {strings.profile.JatieLive} </Text>
              <CustomSwitch
                value={config.jatieLive || config.masterConfig}
                onChange={() => handleSwitch('jatieLive')}
              />
            </View>
            {/* <View style={styles.list}>
              <Text style={styles.listTxt}> {strings.profile.beforeLive} </Text>
              <CustomSwitch
                value={config.oneHourBeforeLive || config.masterConfig}
                onChange={() => handleSwitch('oneHourBeforeLive')}
              />
            </View> */}
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
