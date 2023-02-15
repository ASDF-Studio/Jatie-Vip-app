import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { theme } from '@/theme';
import { Card, CardBody } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Data } from './giveawayData/activeData';

export default function Active({ navigation, userType }) {
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView>
      <FlatList
        data={Data}
        key={props => props.id}
        renderItem={({ item }) => (
          <View style={styles.FlatListContainer}>
            <Card>
              <View>
                <Text style={styles.title}>{strings.giveaway.title} </Text>
              </View>
              <View>
                <Text style={styles.officialTxt}>
                  {strings.giveaway.EndsIn}
                  <Text style={styles.EndTimeTxt}> {item.EndsIn}</Text>
                </Text>
              </View>
              <CardBody text={item.Desc} />

              {/* VIP only */}

              {userType.user == `${strings.userType.free}` &&
              item.status == `${strings.userType.free}` ? (
                <View style={styles.thumbnailContainer}>
                  <Image
                    blurRadius={15}
                    style={styles.thumbnailImage}
                    source={{
                      uri: item.photo,
                    }}
                  />
                  <View style={styles.vipOnlyContainer}>
                    <FontAwesomeIcon
                      icon={faLock}
                      size={ms(10)}
                      style={styles.lock}
                    />
                    <Text style={styles.vipOnlyText}>
                      {strings.giveaway.vipOnly}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.thumbnailContainer}>
                  <Image
                    style={styles.thumbnailImage}
                    source={{
                      uri: item.photo,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(NAVIGATION.giveawayPostDetails)
                    }
                    style={styles.btn}
                  >
                    <Text style={[styles.btnTxt, styles.btnTxtColor]}>
                      {strings.giveaway.learnMore}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Card>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  title: {
    margin: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
  },
  officialTxt: {
    fontFamily: FontFamily.Recoleta_medium,
    textAlign: 'justify',
    backgroundColor: theme.light.colors.primaryBg,
    borderRadius: 20,
    padding: ms(8),
    fontSize: ms(11, 0.3),
    marginLeft: ms(15),
    marginRight: ms(15),
    marginBottom: ms(10),
    marginTop: ms(-5),
    paddingLeft: ms(15),
  },
  FlatListContainer: { margin: ms(10) },
  thumbnailImage: {
    width: '100%',
    height: vs(180),
    padding: ms(80),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  EndTimeTxt: {
    color: theme.light.colors.black,
  },
  btn: {
    borderRadius: 10,
    padding: ms(8),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    position: 'absolute',
    top: '70%',
    left: '5%',
    backgroundColor: theme.light.colors.primary,
    width: ms(130),
  },
  btnTxt: {
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(14, 0.3),
  },
  btnTxtColor: { color: theme.light.colors.white },
  //vip only

  vipOnlyContainer: {
    backgroundColor: theme.light.colors.primary,
    width: ms(100),
    height: vs(25),
    borderRadius: 6,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(10),
    top: '42%',
    left: '38%',

    // marginLeft: '43%',
    // marginTop: '22%',
  },

  vipOnlyText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.background,
    paddingLeft: ms(10),
  },
  lock: {
    color: theme.light.colors.background,
  },
});
