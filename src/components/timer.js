import { strings } from '@/localization';
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';
import CountDown from 'react-native-countdown-component';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { useCallback } from 'react';
import { ms } from 'react-native-size-matters';
import { useBlinker } from '@/hooks';

export const Timer = memo(({ item }) => {
  const { blink } = useBlinker();

  const getSeconds = useCallback(date => {
    const dateString = date;
    const dateObj = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = dateObj.getTime() - currentTime.getTime();
    const secondsLeft = Math.floor(timeDifference / 1000);
    //   console.log("Seconds left:=-=-=-", secondsLeft);
    return secondsLeft;
  });

  return (
    <View
      style={[
        styles.officialTxt,
        {
          backgroundColor: blink
            ? theme.light.colors.primaryBg
            : theme.light.colors.primaryBgSolid,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >
      <Text
        style={{
          fontFamily: FontFamily.Recoleta_regular,
        }}
      >
        <Text
          style={{
            color: theme.light.colors.timerText,
          }}
        >
          {strings.giveaway.EndsIn + ' '}
        </Text>
        <Text style={styles.EndTimeTxt}>
          {Moment.utc(item.postExpires).format('D/M/YY  hh:mm')}{' '}
          {/* {item.postExpires} */}
        </Text>
      </Text>
      <CountDown
        running={true}
        until={item?.remainingTime ?? getSeconds(item.postExpires)}
        separatorStyle={{ color: 'black', fontSize: 20 }}
        size={20}
        showSeparator={true}
        timeToShow={['D', 'H', 'S']}
        digitTxtStyle={{
          fontSize: ms(11, 0.3),
          color: 'black',
          fontFamily: FontFamily.Recoleta_medium,
        }}
      />
    </View>
  );
});

// export const MemoTimer = memo(Timer);

const styles = StyleSheet.create({
  officialTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    textAlign: 'justify',
    backgroundColor: theme.light.colors.primaryBg,
    borderColor: theme.light.colors.primaryBg,
    borderRadius: 20,
    overflow: 'hidden',
    padding: ms(8),
    fontSize: ms(11, 0.3),
    marginHorizontal: ms(15),
    marginBottom: ms(10),
    marginTop: ms(-5),
    paddingLeft: ms(15),
  },
  EndTimeTxt: {
    color: theme.light.colors.black,
  },
});
