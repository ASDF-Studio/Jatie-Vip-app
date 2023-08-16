import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import { Button, CustomLoader, TopBackButton } from '@/components';
import { TextStyles, theme } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import { Logo } from '@/assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProrationModesAndroid,
  finishTransaction,
  getAvailablePurchases,
  getSubscriptions,
  initConnection,
  purchaseUpdatedListener,
  requestSubscription,
} from 'react-native-iap';
import { useEffect } from 'react';
import { useState } from 'react';
import { SKUS } from '@/constants/subscriptionConstant';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { validateReceipt } from '@/actions/SubscriptionAction';
import { navigationRef } from '@/navigation/RootNavigation';
import { customShowMessage } from '@/utils';
import { getUser } from '@/selectors/UserSelectors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
export default function MonthlyUpgradeSuccess({ navigation }) {
  const userType = useSelector(state => state.userType);
  const user = useSelector(getUser);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [subscriptionRenewDate, setSubscriptionRenewDate] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initConnection().then(async () => {
      checkSubscriptionAndReturnUser();
      getSubscriptions({
        skus: SKUS.ANDROID.subscription,
      }).then(subs => {
        setSubscriptions(subs);
      });
    });
  }, []);

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async purchase => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            verifyReceipt(receipt).then(async () => {
              await finishTransaction({
                purchase: purchase,
                isConsumable: false,
              });
            });
          } catch (error) {
            console.log('Error verifying receipt:', error);
          }
        }
      }
    );

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
    };
  }, []);

  const verifyReceipt = async receipt => {
    const data = {
      receipt: receipt,
      loggedInUserId: user?.id,
    };
    try {
      const res = await validateReceipt(
        data,
        navigation,
        NAVIGATION.upgradeMembership
      )(dispatch);
      if (res.key == 3 || 4) {
        customShowMessage({
          type: 'success',
          message: 'Subscription updated successfully',
        });
        checkSubscriptionAndReturnUser();
      }
    } catch (error) {}
  };

  const checkSubscriptionAndReturnUser = async () => {
    try {
      setLoading(true);
      const availablePurchases = await getAvailablePurchases();
      if (availablePurchases.length <= 0) {
        setLoading(false);
        return;
      }
      availablePurchases.sort((a, b) => a.transactionDate - b.transactionDate);
      const latestPurchase = availablePurchases[availablePurchases.length - 1];
      if (latestPurchase && latestPurchase.productId) {
        setLoading(false);
        setSubscriptionPlan(latestPurchase.productId);
        const timestamp = latestPurchase?.transactionDate; // Replace this with your actual timestamp
        var DATE = null;
        if (latestPurchase.productId == SKUS.ONE_MONTH) {
          DATE = moment(date).add(1, 'month');
        } else {
          DATE = moment(timestamp).add(1, 'year');
        }
        const date = moment(DATE).toDate();
        const formattedDate = moment(date).format('MMMM DD,YYYY');
        setSubscriptionRenewDate(formattedDate);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const upgradeSubscriptionAndroid = async sku => {
    try {
      setLoading(true);

      const currentSubscription = await getAvailablePurchases();
      if (isEmpty(currentSubscription) || isEmpty(subscriptions)) return;

      const selectedSubscription = subscriptions.find(x => x.productId === sku);
      if (isEmpty(selectedSubscription)) return;

      const { subscriptionOfferDetails } = selectedSubscription;
      const { purchaseToken, productId } = currentSubscription[0];
      const { offerToken } = subscriptionOfferDetails[0];

      await requestSubscription({
        sku,
        subscriptionOffers: [
          {
            sku,
            offerToken,
          },
        ],
        purchaseTokenAndroid: purchaseToken,
        prorationModeAndroid:
          ProrationModesAndroid.IMMEDIATE_WITH_TIME_PRORATION,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onUpgradeDowngrade = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    } else {
      upgradeSubscriptionAndroid(
        subscriptionPlan === SKUS.ONE_MONTH ? SKUS.YEAR : SKUS.ONE_MONTH
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={styles.headerTxt}>{strings.profile.vipMemberShip} </Text>
      {/* <CustomLoader open={loading} /> */}

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
            {strings.profile.renews}
            {subscriptionRenewDate}
          </Text>
        </View>
      </View>

      <View style={styles.footerBtnContainer}>
        <Button
          disabled={loading}
          loading={loading}
          title={
            subscriptionPlan == SKUS.ONE_MONTH
              ? strings.profile.upgradeYearlySubsription
              : strings.profile.donwgradeMonthlySubsription
          }
          onPress={
            () => {
              onUpgradeDowngrade();
            }

            // onPurchase(subscriptionPlan == SKUS.ONE_MONTH ? SKUS.YEAR : SKUS.ONE_MONTH)
            //  navigation.navigate(NAVIGATION.upgradeMembership)
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
