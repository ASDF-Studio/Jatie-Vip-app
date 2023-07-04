import { strings } from '@/localization';
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment, { min } from 'moment';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { ms } from 'react-native-size-matters';
import { useCountdown } from '@/hooks/useCountDown';
import { useCallback } from 'react';

export const Timer = memo(({ item }) => {
  const [days, hours, minutes, seconds] = useCountdown(item?.endDate);

  const isOdd = useCallback(number => number % 2 === 0, []);

  return (
    <View
      style={[
        styles.officialTxt,
        {
          backgroundColor: theme.light.colors.primaryBgSolid,
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
          {Moment.utc(item.endDate).format('D/M/YY  hh:mm A')}{' '}
        </Text>
      </Text>
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: ms(12, 0.3),
              color: 'black',
              fontFamily: FontFamily.Recoleta_medium,
              width: ms(16),
              textAlign: 'right',
            }}
          >
            {`${days}`}
          </Text>
          <Text
            style={{
              fontSize: ms(12, 0.3),
              color: 'black',
              fontFamily: FontFamily.Recoleta_medium,
              width: ms(25),
            }}
          >{` Day`}</Text>
        </View>
        <Text
          style={{
            fontSize: ms(12, 0.3),
            color: 'black',
            fontFamily: FontFamily.Recoleta_medium,
            marginBottom: 2,
            textAlign: 'center',
            width: 5,
          }}
        >
          :
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: ms(12, 0.3),
              color: 'black',
              fontFamily: FontFamily.Recoleta_medium,
              width: ms(16),
              textAlign: 'right',
            }}
          >
            {`${hours}`}
          </Text>

          <Text
            style={{
              fontSize: ms(12, 0.3),
              color: 'black',
              fontFamily: FontFamily.Recoleta_medium,
              width: ms(25),
            }}
          >{` Hrs`}</Text>
        </View>
        <Text
          style={{
            fontSize: ms(12, 0.3),
            color: isOdd(seconds) ? 'black' : 'transparent',
            fontFamily: FontFamily.Recoleta_medium,
            marginBottom: 2,
            textAlign: 'center',
            width: 5,
          }}
        >
          :
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: ms(12, 0.3),
              color: 'black',
              fontFamily: FontFamily.Recoleta_medium,
              width: ms(16),
              textAlign: 'right',
            }}
          >
            {`${seconds}`}
          </Text>
          <Text
            style={{
              fontSize: ms(12, 0.3),
              color: 'black',
              fontFamily: FontFamily.Recoleta_medium,
              width: ms(25),
            }}
          >{` Sec`}</Text>
        </View>
      </View>
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
    alignItems: 'center',
    padding: ms(8),
    fontSize: ms(11, 0.3),
    marginHorizontal: ms(15),
    marginBottom: ms(10),
    marginTop: ms(-5),
    paddingLeft: ms(15),
  },
  EndTimeTxt: {
    color: theme.light.colors.black,
    fontSize: ms(12),
  },
});
