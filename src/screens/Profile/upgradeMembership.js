import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Linking, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { TextStyles, theme } from '@/theme';
import { Logo } from '@/assets';
import { ms, vs } from 'react-native-size-matters';
import { Button, CustomLoader, TopBackButton } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import { decode } from 'react-native-base64';
import RNIap, {
  validateReceiptAndroid,
  getAvailablePurchases,
  getSubscriptions,
  initConnection,
  getProducts,
  requestSubscription,
  IapIos,
  purchaseUpdatedListener,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  clearTransactionIOS,
} from 'react-native-iap';
import { buySubscription, cleanupIAP, restorePurchases } from '@/utils/IAPhelper';
import { SKUS } from '@/constants/subscriptionConstant';
import { PRIVACY_POLICY_URL } from '@/constants/apiConstants';
import { NAVIGATION } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { validateReceipt } from '@/actions/SubscriptionAction';

export default function UpgradeMembership({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(false)
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;


  useEffect(() => {
    initIAP();
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      // console.log("s", receipt);
      if (receipt) {
        try {
          await verifyReceipt(receipt);
        } catch (error) {
        }
      }
    });
    return () => {
      clearIAPListeners()
    }
  }, []);
  const clearIAPListeners = async () => {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    await endConnection();
  };
  const initIAP = async () => {
    try {
      await initConnection();
    } catch (error) {
    }
  };

  const buySubscription = async (userProductSku) => {
    if (Platform.OS === 'ios') {
      clearTransactionIOS()
        .catch((error) => {
          console.log({ error });
        })
        .then(async () => {
          await handlePurchase(userProductSku);
        });
    } else {
      flushFailedPurchasesCachedAsPendingAndroid()
        .catch((error) => {
          console.log({ error });
        })
        .then(async () => {
          await handlePurchase(userProductSku);
        });
    }

  };
  const handlePurchase = async (userProductSku) => {
    setLoading(true);
    try {
      const products = await getProducts({ skus: Platform.OS === 'ios' ? SKUS.IOS : SKUS.ANDROID });
      let productFound = false;
      for (const product of products) {
        if (product.productId === userProductSku) {
          await requestSubscription({ sku: product.productId });
          productFound = true;
          break; // Stop checking for more products after finding a match
        }
      }
      if (!productFound) {
        setLoading(false);
        console.log('Desired product not found');
      }
    } catch (error) {
      setLoading(false);
      console.log('Error buying subscription:', error);
    } finally {
      setLoading(false); // Hide loader regardless of success or failure
    }
  }

  async function verifyReceipt(receipt) {
    const data = {
      receipt: receipt,
      loggedInUserId: user?.id,
    }
    dispatch(validateReceipt(data))
  }

  const restorePurchases = async () => {
    setLoading(true);
    try {
      const purchases = await getAvailablePurchases();
      let restored = false;
      for (const purchase of purchases) {
        await requestSubscription({ sku: purchase.productId });
        restored = true;
        break; // Stop checking for more purchases after restoring one
      }
      if (!restored) {
      }
    } catch (error) {
    } finally {
      setLoading(false); // Hide loader regardless of success or failure
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <TopBackButton
            onPress={() => navigationRef.goBack()}
            style={styles.TopBackButton}
          />
        </View>

      </View>
      <CustomLoader
        open={loading}
      />
      <ScrollView>
        {/* <Text>
        Updated create post option of VIP users on newsfeed and myProfile section (In progress).
      </Text> */}
        <View style={styles.logo}>
          <Logo height={ms(100)} width={ms(100)} />
        </View>

        <View style={styles.headerTxtContainer}>
          <Text style={TextStyles.header}> {strings.profile.upgradeTo} </Text>
          <Text style={[TextStyles.header, styles.upgradeToHeader]}>
            {' '}
            {strings.profile.vipMemberShip}{' '}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={[TextStyles.header, styles.benefitsHeader]}>
            {' '}
            {strings.profile.benefits}{' '}
          </Text>
          <View style={styles.list}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faCheck}
                color={theme.light.colors.success}
              />
            </View>
            <Text style={styles.listText}> {strings.profile.benefit_1} </Text>
          </View>
          <View style={styles.list}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faCheck}
                color={theme.light.colors.success}
              />
            </View>
            <Text style={styles.listText}> {strings.profile.benefit_2} </Text>
          </View>
          <View style={styles.list}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faCheck}
                color={theme.light.colors.success}
              />
            </View>
            <Text style={styles.listText}> {strings.profile.benefit_3} </Text>
          </View>
          <View style={styles.list}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faCheck}
                color={theme.light.colors.success}
              />
            </View>
            <Text style={styles.listText}> {strings.profile.benefit_4}</Text>
          </View>
          <View style={styles.list}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={faCheck}
                color={theme.light.colors.success}
              />
            </View>
            <Text style={styles.listText}> {strings.profile.benefit_5} </Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title={strings.profile.monthlyPlan}
              onPress={() => buySubscription(SKUS.ONE_MONTH)}
              style={styles.monthlyPlanButton}
            />
            <Button
              onPress={() => buySubscription(SKUS.YEAR)}
              title={strings.profile.yearlyPlan}
              style={styles.yearlyPlanButton}
            />
          </View>
          <View style={styles.footerTxtContainer}>
            <Text style={styles.footerTxt}>
              {' '}
              {strings.profile.saveByYearlyPlan}{' '}
            </Text>
          </View>

          <View style={styles.cancelTxtContainer}>
            <Text style={styles.cancelSubscription}>
              {' '}
              {strings.subscription.cancelSubscription}{' '}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => { restorePurchases() }}>
            <Text
              style={styles.restorePurchases}>
              {strings.subscription.restorePurchases}
            </Text>
          </TouchableOpacity>


          <Text
            onPress={() => { Linking.openURL(PRIVACY_POLICY_URL) }}
            style={styles.termsAndConditionsStyle}>
            <Text style={styles.linkColor}>{strings.login.termsAndConditions}</Text>
            {strings.login.and}
            <Text style={styles.linkColor}>{strings.login.privacyPolicy}</Text>
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  logo: {
    alignItems: 'center',
    marginTop: ms(10),
  },
  headerTxtContainer: {
    alignItems: 'center',
    marginTop: vs(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
    margin: ms(5),
    flex: 0.1,
  },
  headerText: { color: theme.light.colors.black },
  TopBackButton: {
    paddingRight: ms(5),
    paddingLeft: ms(10),

  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.light.colors.white,
    margin: ms(8),
    borderRadius: 10,
    padding: ms(10),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: theme.light.colors.successBg,
    borderRadius: 100,
    padding: ms(8),
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(5),
  },
  monthlyPlanButton: {
    marginTop: ms(10),
  },
  yearlyPlanButton: {
    marginTop: ms(10),
  },
  listText: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(16, 0.3),
  },
  upgradeToHeader: { color: theme.light.colors.black },
  benefitsHeader: { fontSize: 15, color: theme.light.colors.black },
  btnContainer: {
    alignItems: 'center',
  },
  footerTxtContainer: {
    alignItems: 'center',
    marginVertical: ms(10)
    // padding: ms(),
  },
  cancelTxtContainer: {
    alignItems: 'center',
    marginBottom: ms(10)

  },
  footerTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.black,
    fontSize: ms(14),
  },
  cancelSubscription: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.black,
    textAlign: "center",
    fontSize: ms(14),
  },
  termsAndConditionsStyle: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
    lineHeight: ms(22),
    marginTop: ms(5),
    color: theme.light.colors.activeTabLabel,
    textAlign: 'center',
  },
  linkColor: {
    color: theme.light.colors.hyperlink,
    textDecorationLine: 'underline',
  },
  restorePurchases: {
    color: theme.light.colors.hyperlink,
    fontFamily: FontFamily.BrandonGrotesque_bold,
    fontSize: ms(17, 0.4),
    // textDecorationLine: 'underline',
    textAlign: "center",
    marginBottom: ms(5),
  },
});
