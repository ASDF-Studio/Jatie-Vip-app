// IAPHelper.js
import { SKUS } from '@/constants/subscriptionConstant';
import { Platform } from 'react-native';
import {
    initConnection,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase,
    requestSubscription,
    getProducts,
    getAvailablePurchases,
    finishTransaction,
    finishTransactionIOS,
} from 'react-native-iap';

import { InAppPurchase } from 'react-native-iap';
// Initialize IAP module
initConnection();

// Add purchase error listener
const purchaseErrorSubscription = purchaseErrorListener((error) => {
});

// Add purchase updated listener
const purchaseUpdatedSubscription = purchaseUpdatedListener(async (purchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
        try {
            // Validate the receipt and process the purchase
            const validReceipt = await validateReceipt(receipt);
            if (validReceipt) {
                // Process the purchase
                processPurchase(purchase);
                // Finish transaction (required for iOS)
                if (Platform.OS === 'ios') {
                    await finishTransactionIOS(purchase.transactionId);
                } else {
                    await finishTransaction(purchase);
                }
            } else {
                // Receipt validation faile
            }
        } catch (error) {
        }
    }
});

// Validate the purchase receipt (you can implement your own validation logic here)
async function validateReceipt(receipt) {
    // Implement your receipt validation logic here
    // For example, you can send the receipt to your server for verification

    // Return true if receipt is valid, false otherwise
    return true;
}

// Process the purchase
function processPurchase(purchase) {
    // Implement your purchase processing logic here
    // For example, you can update the user's subscription status in your database

    // Extract necessary information from the purchase object
    const { productId, transactionId, transactionDate } = purchase;
    // Perform any necessary actions based on the purchase

}

// Buy a subscription
export async function buySubscription(userProductSku) {
    try {
        const products = await getProducts({ skus: Platform.OS == 'ios' ? SKUS.IOS : SKUS.ANDROID });
        let productFound = false;
        for (const product of products) {
            if (product.productId === userProductSku) {
                await requestSubscription({ sku: product.productId });
                productFound = true;
                break; // Stop checking for more products after finding a match
            }
        }
        if (!productFound) {
        }
    } catch (error) {

    }
}

// Restore purchases
export async function restorePurchases() {
    try {
        const purchases = await getAvailablePurchases();
        if (purchases && purchases.length > 0) {
            for (const purchase of purchases) {
                if (purchase.transactionReceipt) {
                    processPurchase(purchase);
                    // Finish transaction (required for iOS)
                    if (Platform.OS === 'ios') {
                        await finishTransactionIOS(purchase.transactionId);
                    } else {
                        await finishTransaction(purchase);
                    }
                }
            }
        } else {

        }
    } catch (error) {

    }
}

// Clean up
export function cleanupIAP() {
    if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
    }
    if (purchaseUpdatedSubscription) {
        purchaseUpdatedSubscription.remove();
    }

    // End IAP module connection
    // Note: The latest version of react-native-iap does not require explicit cleanup
}
