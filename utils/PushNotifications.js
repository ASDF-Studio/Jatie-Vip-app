import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log("Authorization status:", authStatus);
    }
}

export async function getFCMToken() {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");

    if (!fcmtoken) {
        try {
            const fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log("newtokennnnnnnn", fcmtoken);
                await AsyncStorage.setItem("fcmtoken", fcmtoken);
            }
        } catch (error) {
            console.log("error in fcmtoken", error);
        }
    }
}