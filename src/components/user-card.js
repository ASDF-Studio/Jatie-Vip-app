import React from "react"
import { NAVIGATION } from '@/constants';
import { navigationRef } from '@/navigation/RootNavigation';
import { theme } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export const UserCard = ({ item }) => (
    <View key={item.id} style={styles.listContainer}>
        <TouchableOpacity
            style={styles.list}
            onPress={() =>
                navigationRef.navigate(NAVIGATION.userProfile, {
                    userId: item?.id,
                })
            }
        >
            <Image
                source={{
                    uri: item?.profilePic == '' ? null : item?.profilePic,
                }}
                style={styles.profileImage}
            />

            <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}> {item.fullName} </Text>
                <Text style={styles.userNameTxt}>{` @${item.username}`}</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.colors.white,
    },
    searchBoxTextFirld: {
        backgroundColor: theme.light.colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: ms(10),
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        marginLeft: ms(10),
    },
    searchButton: {
        marginRight: ms(15),
    },
    switchContainer: {
        position: 'absolute',
        top: ms(45),
        left: ms(60),
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBox: {
        marginTop: vs(-20),
        marginBottom: vs(-10),
        margin: ms(10),
    },
    moreIcon: {
        position: 'absolute',
        right: ms(10),
        top: ms(30),
    },
    searchBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.light.colors.primaryBgLight,
    },
    searchTxt: {
        fontFamily: FontFamily.BrandonGrotesque_medium,
    },
    searchList: {
        padding: ms(10),
    },
    contentContainerStyle: {
        paddingBottom: ms(100),
    },
    listHeader: {
        paddingTop: ms(5),
        paddingBottom: ms(5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContainer: {
        padding: ms(2),
        paddingLeft: ms(8),
        paddingRight: ms(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: ms(10),
        marginTop: ms(11),
        alignItems: 'center',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        height: ms(40),
        width: ms(40),
        borderRadius: 100,
        marginRight: ms(10)
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameTxt: {
        fontFamily: FontFamily.Recoleta_bold,
        fontSize: ms(14, 0.3),
        color: theme.light.colors.black,
    },
    userNameTxt: {
        fontFamily: FontFamily.Recoleta_regular,
        fontSize: ms(14, 0.3),
    },
});