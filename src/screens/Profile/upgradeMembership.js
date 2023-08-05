import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { TextStyles, theme } from '@/theme';
import { Logo } from '@/assets';
import { ms, vs } from 'react-native-size-matters';
import { Button, CustomLoader, TopBackButton } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { navigationRef, resetStackToScreen } from '@/navigation/RootNavigation';
import { decode } from 'react-native-base64';
import RNIap, {
  getAvailablePurchases,
  getSubscriptions,
  initConnection,
  requestSubscription,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  clearTransactionIOS,
  finishTransaction,
  purchaseUpdatedListener,
  getProducts,
} from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { validateReceipt } from '@/actions/SubscriptionAction';
import { CommonActions } from '@react-navigation/native';
import { updateUserType } from '@/actions/UserActions';
import { RECEIPT_STATUS, SKUS } from '@/constants/subscriptionConstant';
import {
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITION_URL,
} from '@/constants/apiConstants';
import { NAVIGATION } from '@/constants';

export default function UpgradeMembership({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(false);
  const [stopPurchase, setStopPurchase] = useState(false);
  const [purchasedStatus, setPurchasedStatus] = useState(false);
  const [purchasedMessage, setPurchasedMessage] = useState(null);
  const [isMakingPurchase, setIsMakingPurchase] = useState(false);
  const [productSKU, setProductSKU] = useState(SKUS.ONE_MONTH);
  const [subsExpired, setSubsExpired] = useState(false);
  const [restorePurchaseStatus, setRestorePurchaseStatus] = useState(false);
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

  useEffect(() => {
    initIAP();
    return () => {
      setStopPurchase(false);
      setRestorePurchaseStatus(false);
      clearIAPListeners();
    };
  }, []);

  const initIAP = async () => {
    try {
      await initConnection();
    } catch (error) {
      console.log('Error initializing connection:', error);
    }
  };
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

  useEffect(() => {
    if (isMakingPurchase) {
      purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
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
      });
    } else {
      // If the user is not making a purchase, remove the listener
      // if (purchaseUpdateSubscription) {
      //   purchaseUpdateSubscription.remove();
      //   purchaseUpdateSubscription = null;
      // }
    }

    // return () => {
    //   setStopPurchase(false);
    //   clearIAPListeners();
    // };
  }, [isMakingPurchase]);

  const checkForSubscriptionUpdates = async userProductSku => {
    try {
      setLoading(true);
      const availablePurchases = await getAvailablePurchases();
      if (availablePurchases?.length > 0) {
        availablePurchases.sort(
          (a, b) => parseInt(b.transactionDate) - parseInt(a.transactionDate)
        );
        const latestPurchase = availablePurchases[0];
        if (latestPurchase?.transactionReceipt) {
          await verifyReceipt(latestPurchase.transactionReceipt);
        }
      } else {
        buySubscription(userProductSku);
      }
    } catch (error) {
      setLoading(false);
      setRestorePurchaseStatus(false);
      // console.log('Error during subscription update check:', error);
    }
  };

  const buySubscription = async userProductSku => {
    if (Platform.OS === 'ios') {
      clearTransactionIOS()
        .catch(error => {
          setLoading(false);
          console.log({ error });
        })
        .then(async () => {
          await handlePurchase(userProductSku);
        });
    } else {
      flushFailedPurchasesCachedAsPendingAndroid()
        .catch(error => {
          setLoading(false);
          console.log({ error });
        })
        .then(async () => {
          await handlePurchase(userProductSku);
        });
    }
  };

  const handlePurchase = async userProductSku => {
    try {
      setIsMakingPurchase(true);
      const skus = Platform.OS === 'ios' ? SKUS.IOS : SKUS.ANDROID;
      if (Platform.OS === 'android') {
        const subscriptions = await getSubscriptions({ skus });
        const product = subscriptions.find(
          product => product.productId === userProductSku
        );
        if (product) {
          await requestSubscription({
            sku: userProductSku,
            ...(product?.subscriptionOfferDetails && {
              subscriptionOffers: [
                {
                  sku: product?.productId,
                  offerToken: product?.subscriptionOfferDetails[0]?.offerToken,
                },
              ],
            }),
          });
        } else {
          setLoading(false);
          console.log('Desired product not found');
        }
      } else {
        const products = await getProducts({ skus });
        const product = products.find(
          product => product.productId === userProductSku
        );
        if (product) {
          await requestSubscription({ sku: product.productId });
        } else {
          setLoading(false);
          console.log('Desired product not found');
        }
      }
    } catch (error) {
      setIsMakingPurchase(false);
      setLoading(false);
      console.log('Error during subscription request:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handlePurchase = async userProductSku => {
  //   try {
  //     setIsMakingPurchase(true);
  //     const subscriptions = await getSubscriptions({ skus: Platform.OS === 'android' ? SKUS.ANDROID : SKUS.IOS });
  //     const product = subscriptions.find((product) => product.productId === userProductSku);
  //     if (product) {
  //       await requestSubscription({
  //         sku: userProductSku,
  //         ...(product?.subscriptionOfferDetails && {
  //           subscriptionOffers: [
  //             {
  //               sku: product?.productId,
  //               offerToken: product?.subscriptionOfferDetails[0]?.offerToken,
  //             },
  //           ],
  //         }),
  //       });
  //     } else {
  //       setLoading(false);
  //       // console.log('Desired product not found');
  //     }
  //   } catch (error) {
  //     // console.log('Error during subscription request:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  async function verifyReceipt(receipt) {
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
      // console.log("restorePurchaseStatus",restorePurchaseStatus);
      if (res.key == 1 && restorePurchaseStatus == false) {
        // console.log("CALLL=-=-=-=-=--=-=-=-=-=-=-");
        buySubscription(productSKU);
      } else if (res.key == 1 && restorePurchaseStatus) {
        alert(
          'There is no subscription purchased by you. Please buy a subscription.'
        );
        setRestorePurchaseStatus(false);
        setLoading(false);
      } else if (res.key == 2) {
        setLoading(false);
        setStopPurchase(true);
        setPurchasedStatus(true);
        setPurchasedMessage(res.message);
        showAlert(res.message);
      } else if (res.key == 3 || 4) {
        setLoading(false);
        resetStackToScreen(NAVIGATION.home);
      } else {
        setLoading(false);
      }
      setRestorePurchaseStatus(false);
    } catch (error) {
      setLoading(false);
      setStopPurchase(false);
      setRestorePurchaseStatus(false);
    }
  }

  const showAlert = message => {
    Alert.alert('Purchase Info', message, [{ text: 'OK' }], {
      cancelable: false,
    });
  };

  function processPurchase(purchase) {
    const { productId, transactionId, transactionDate } = purchase;
    const Data = {
      isVIP: true,
      userId: user?.id,
    };
    dispatch(updateUserType(Data));
  }

  async function restorePurchases() {
    try {
      setLoading(true);
      const availablePurchases = await getAvailablePurchases();
      // console.log("AAAAVAV",availablePurchases);
      if (availablePurchases?.length > 0) {
        availablePurchases.sort(
          (a, b) => parseInt(b.transactionDate) - parseInt(a.transactionDate)
        );
        const latestPurchase = availablePurchases[0];
        if (latestPurchase?.transactionReceipt) {
          await verifyReceipt(latestPurchase.transactionReceipt);
        }
      } else {
        // setRestorePurchase(false)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // setRestorePurchase(false)
      console.log('Error during subscription update check:', error);
    }
  }

  const handleMonthlyPlanPress = () => {
    setProductSKU(SKUS.ONE_MONTH);
    if (stopPurchase) {
      showAlert(purchasedMessage);
    } else {
      checkForSubscriptionUpdates(SKUS.ONE_MONTH);
    }
  };
  const handleYearlyPlanPress = () => {
    setProductSKU(SKUS.YEAR);
    if (stopPurchase) {
      showAlert(purchasedMessage);
    } else {
      checkForSubscriptionUpdates(SKUS.YEAR);
    }
  };
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
      <CustomLoader open={loading} />
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
              onPress={handleMonthlyPlanPress}
              // onPress={() =>{
              //   setProductSKU(SKUS.ONE_MONTH)
              //   stopPurchase?showAlert(purchasedMessage): checkForSubscriptionUpdates(SKUS.ONE_MONTH)}}
              style={styles.monthlyPlanButton}
            />
            <Button
              onPress={handleYearlyPlanPress}
              // onPress={() =>
              //  { setProductSKU(SKUS.ONE_MONTH)
              //   stopPurchase?showAlert(purchasedMessage):
              //   checkForSubscriptionUpdates(SKUS.YEAR)}}
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
            onPress={() => {
              setRestorePurchaseStatus(true);
              stopPurchase ? showAlert(purchasedMessage) : restorePurchases();
            }}
          >
            <Text style={styles.restorePurchases}>
              {strings.subscription.restorePurchases}
            </Text>
          </TouchableOpacity>

          <Text style={styles.termsAndConditionsStyle}>
            <Text
              onPress={() => {
                Linking.openURL(TERMS_AND_CONDITION_URL);
              }}
              style={styles.linkColor}
            >
              {strings.login.termsAndConditions}
            </Text>
            {strings.login.and}
            <Text
              onPress={() => {
                Linking.openURL(PRIVACY_POLICY_URL);
              }}
              style={styles.linkColor}
            >
              {strings.login.privacyPolicy}
            </Text>
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
    marginVertical: ms(10),
    // padding: ms(),
  },
  cancelTxtContainer: {
    alignItems: 'center',
    marginBottom: ms(10),
  },
  footerTxt: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.black,
    fontSize: ms(14),
  },
  cancelSubscription: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    color: theme.light.colors.black,
    textAlign: 'center',
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
    textAlign: 'center',
    marginBottom: ms(5),
  },
});
