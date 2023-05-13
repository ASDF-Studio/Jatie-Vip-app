import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { theme } from '@/theme';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Icon } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import { geAllPastGiveAwayData } from '@/selectors/PostSelectors';
import { useEffect } from 'react';
import { getAllPastGiveaway } from '@/actions/PostActions';
import { getUser } from '@/selectors/UserSelectors';
import { useIsFocused } from '@react-navigation/native';

export default function Past({ navigation }) {

  const getdataOfPast = useSelector(geAllPastGiveAwayData)
  console.log('selector data', getdataOfPast)

  const user = useSelector(getUser);
  const focus = useIsFocused()

  const dispatch = useDispatch()

  useEffect(() => {
    getPastData()

  }, [focus])


  const getPastData = () => {
    const data = {
      userId: user?.id,
    }


    dispatch(getAllPastGiveaway(data))
  }

  return (
    <SafeAreaView>
      <FlatList
        data={getdataOfPast?.data || []}
        key={props => props.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card>
              <View>
                <Text style={styles.title}>{item.postTitle} </Text>
              </View>
              <CardBody text={item.postBody} />


              {/* {item.winner.map(item => {
                if (item == null) {
                  return;
                } else {
                  return (
                    <View style={styles.listContainer} key={item.id}>
                      <View style={styles.leftContainer}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.profileImage}
                        />
                        <View style={styles.nameContainer}>
                          <Text style={styles.nameTxt}> {item.name} </Text>
                          <Text> {item.userName} </Text>
                        </View>
                      </View>
                      <View>
                        <Icon
                          icon={faEllipsis}
                          size={ms(15)}
                          color={theme.light.colors.info}
                          onPress={() => setOpen(true)}
                        />
                      </View>
                    </View>
                  );
                }
              })} */}
              {/* endWinners */}

              <View style={styles.thumbnailContainer}>
                {
                  item?.postImg?.map(url =>
                  (
                    <>
                      <Image
                        style={styles.thumbnailImage}
                        source={{
                          uri: url,
                        }}
                      />





                    </>
                  )

                  )}



                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NAVIGATION.giveawayPastDetails)
                  }
                  style={item.postImg.length <= 0 ? [styles.btn, { top: '0%', position: 'relative', marginBottom: 20 }] : styles.btn}
                >
                  <Text style={[styles.btnTxt, styles.btnTxtColor]}>
                    {strings.giveaway.learnMore}
                  </Text>
                </TouchableOpacity>




              </View>
            </Card>
          </View>
        )}
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  //Card some common thing from active.js
  title: {
    margin: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.black,
    fontSize: ms(14, 0.3),
  },
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
  cardContainer: { margin: ms(10) },
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
  //Common thing end

  //winners
  winners: {
    padding: ms(15),
    fontFamily: FontFamily.Recoleta_bold,
    textAlign: 'justify',
    color: theme.light.colors.primary,
    fontSize: ms(14, 0.3),
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
  },
  listContainer: {
    padding: ms(2),
    paddingLeft: ms(12),
    paddingRight: ms(20),
    paddingBottom: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: ms(2),
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.light.colors.info,
  },
  nameContainer: {
    paddingLeft: ms(10),
  },
  nameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(15, 0.3),
    color: theme.light.colors.black,
  },
});
