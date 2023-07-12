import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { Button, CustomLoader, TopBackButton } from '@/components';
import { TextStyles, theme } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import { Logo } from '@/assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { useSelector } from 'react-redux';
import { getAvailablePurchases } from 'react-native-iap';
import { useEffect } from 'react';
import { useState } from 'react';
import { SKUS } from '@/constants/subscriptionConstant';
import moment from 'moment';
export default function MonthlyUpgradeSuccess({ navigation }) {
  const userType = useSelector(state => state.userType);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null)
  const [subscriptionRenewDate, setSubscriptionRenewDate] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => { checkSubscriptionAndReturnUser() }, [])
  const checkSubscriptionAndReturnUser = async () => {
    try {
     setLoading(true)
      const availablePurchases = await getAvailablePurchases();
      if (availablePurchases.length <= 0) {
         setLoading(false)
        return;
      }  
      availablePurchases.sort((a, b) => a.transactionDate - b.transactionDate);
      const latestPurchase = availablePurchases[availablePurchases.length - 1];
      if (latestPurchase && latestPurchase.productId) {
        setSubscriptionPlan(latestPurchase.productId);
        const timestamp = latestPurchase?.transactionDate; // Replace this with your actual timestamp
        var DATE=null
        if(latestPurchase.productId == SKUS.ONE_MONTH){
        DATE=moment(date).add(1, 'month');
        }else{
        DATE=moment(timestamp).add(1, 'year');
        }        
        const date = moment(DATE).toDate();
        const formattedDate = moment(date).format('MMMM DD,YYYY');
        setSubscriptionRenewDate(formattedDate)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };
  const onUpgradeDowngrade=()=>{
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    } else {
      Linking.openURL('https://play.google.com/store/account/subscriptions');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={styles.headerTxt}>{strings.profile.vipMemberShip} </Text>
     <CustomLoader
        open={loading}
      />
      {!loading &&
      <>
      <View style={styles.succesBox}>
        <View>
          <Logo height={ms(70)} width={ms(70)} />
        </View>
        <View>
          <View>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={ms(25)}
              color={theme.light.colors.success}
            />
          </View>
          <Text style={[TextStyles.header, styles.headerDesign]}>
            {strings.profile.youAreVIP}{' '}
          </Text>
          
           <Text style={styles.RenewsTxt}>
           {strings.profile.renews}{subscriptionRenewDate}
            </Text>
          
         
        </View>
      </View>

      <View style={styles.footerBtnContainer}>
        <Button title={
          subscriptionPlan == SKUS.ONE_MONTH ? strings.profile.upgradeYearlySubsription : strings.profile.donwgradeMonthlySubsription}
          onPress={() => 
             onUpgradeDowngrade()
            // onPurchase(subscriptionPlan == SKUS.ONE_MONTH ? SKUS.YEAR : SKUS.ONE_MONTH)
            // navigation.navigate(NAVIGATION.upgradeMembership)
          
          }

        />
        <Button
          title={strings.profile.cancelMemberShip}
          onPress={() => navigation.navigate(NAVIGATION.cancelMembership)}
          style={styles.Button}
          textStyle={{
            color: theme.light.colors.primary,
          }}
        />
      </View>
      </>
       }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopBackButton: { padding: ms(10) },
  headerTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      paddingLeft: ms(8),
    },
  ],
  succesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.light.colors.primaryBg,
    padding: ms(30),
  },
  Button: {
    marginTop: vs(10),
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    backgroundColor: theme.light.colors.white,
  },
  footerBtnContainer: {
    margin: ms(10),
  },
  headerDesign: { fontSize: ms(18, 0.3), color: theme.light.colors.black },
  RenewsTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
  },
});
