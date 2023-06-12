import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { Card, CardBody, CardFooter, CardHeader } from '@/components';
import { useSelector } from 'react-redux';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faPlay, faLock } from '@fortawesome/free-solid-svg-icons';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { POST_TYPE, SCREEN_TYPE } from '@/constants/enums';
import { NAVIGATION } from '@/constants';
import { navigationRef } from '@/navigation/RootNavigation';
import { getUser } from '@/selectors/UserSelectors';

export const PostCard = props => {
    const { index, item, setSelectedPost, navigation, vipArea, onImagePress, onMorePress } = props;
    const {
        user,
        userId,
        isPinned,
        postBody,
        postMediaContent,
        upVote,
        downVote,
        comments_aggregate,
        id,
        created_at,
        isAdminPost,
        postTitle,
        postImg
    } = item;
    const userType = useSelector(state => state.userType);
    const signedInUser = useSelector(getUser);

    let counter = 1;


    return (
        <View style={styles.cardContainer}>
            {userType.user == `${strings.userType.free}` &&
                vipArea == `${strings.home.vipArea}` ? (
                <TouchableOpacity
                    onPress={() =>
                        userType.user == `${strings.userType.free}` &&
                        navigation.navigate(NAVIGATION.upgradeMembership)
                    }
                >
                    <Card>
                        <CardHeader
                            fullName={user?.fullName}
                            userName={user?.username}
                            profilePic={user?.profilePic}
                            time={created_at}
                            userId={userId}
                            // isOfficial={item.isOffical}
                            showPin={isPinned}
                        />
                        <CardBody text={item.postBody} />

                        {postMediaContent?.length > 0 ? (
                            <View style={styles.thumbnailContainer}>
                                <Image
                                    blurRadius={4}
                                    style={styles.thumbnailImage}
                                    source={{
                                        uri:
                                            postMediaContent[0]?.mimetype?.split('/')[0] == 'image'
                                                ? postMediaContent[0]?.url
                                                : postMediaContent[0]?.cover,
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
                        ) : null}
                    </Card>
                </TouchableOpacity>
            ) : (
                <Card>
                    <CardHeader
                        fullName={user?.fullName}
                        userName={user?.username}
                        profilePic={user?.profilePic}
                        time={created_at}
                        userId={userId}
                        // isOfficial={item.isOffical}
                        showPin={isPinned}
                    />
                    <CardBody text={item.postBody} />
                    {postMediaContent?.length <= 2 ? (
                        <View style={styles.imageContainer}>
                            {postMediaContent?.map(
                                data => (
                                    (counter = counter + 1),
                                    (
                                        <TouchableOpacity
                                            key={counter}
                                            style={styles.touchContainer}
                                            onPress={onImagePress}
                                        >
                                            {data?.mimetype?.split('/')[0] == 'image' ? (
                                                <Image
                                                    source={{
                                                        uri: data.url,
                                                    }}
                                                    style={styles.image}
                                                />
                                            ) : (
                                                <ImageBackground
                                                    source={{
                                                        uri: data?.cover,
                                                    }}
                                                    key={counter}
                                                    style={[styles.image, styles.playButtonBg]}
                                                >
                                                    <TouchableOpacity
                                                        // activeOpacity={1}
                                                        style={styles.playButton}
                                                        onPress={() => {
                                                            onViewImageVideo(item);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlay}
                                                            size={ms(15)}
                                                            style={styles.Play}
                                                        />
                                                    </TouchableOpacity>
                                                </ImageBackground>
                                            )}
                                        </TouchableOpacity>
                                    )
                                )
                            )}
                        </View>
                    ) : postMediaContent?.length > 2 ? (
                        ((counter = 1),
                            (
                                <View style={styles.imageContainer}>
                                    {postMediaContent?.map(data =>
                                        counter == 1
                                            ? ((counter = counter + 1),
                                                (
                                                    <TouchableOpacity
                                                        key={counter}
                                                        style={styles.touchContainer}
                                                        onPress={onImagePress}
                                                    >
                                                        {data?.mimetype?.split('/')[0] == 'image' ? (
                                                            <Image
                                                                source={{
                                                                    uri: data.url,
                                                                }}
                                                                style={styles.image}
                                                            />
                                                        ) : (
                                                            <ImageBackground
                                                                source={{
                                                                    uri: data?.cover,
                                                                }}
                                                                key={counter}
                                                                style={[styles.image, styles.playButtonBg]}
                                                            >
                                                                <TouchableOpacity
                                                                    // activeOpacity={1}
                                                                    style={styles.playButton}
                                                                    onPress={() => {
                                                                        onViewImageVideo(item);
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={faPlay}
                                                                        size={ms(15)}
                                                                        style={styles.Play}
                                                                    />
                                                                </TouchableOpacity>
                                                            </ImageBackground>
                                                        )}
                                                    </TouchableOpacity>
                                                ))
                                            : counter == 2
                                                ? ((counter = counter + 1),
                                                    (
                                                        <TouchableOpacity
                                                            key={counter}
                                                            style={styles.touchContainer}
                                                            onPress={onImagePress}
                                                        >
                                                            <ImageBackground
                                                                source={{
                                                                    uri:
                                                                        data?.mimetype?.split('/')[0] == 'image'
                                                                            ? data.url
                                                                            : data?.cover,
                                                                }}
                                                                key={counter}
                                                                style={[styles.image, styles.moreImage]}
                                                            >
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        onViewImageVideo(item);
                                                                    }}
                                                                >
                                                                    <Text style={styles.extraImage}>
                                                                        {strings.message.plus}
                                                                        {item.postMediaContent?.length - 1}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </ImageBackground>
                                                        </TouchableOpacity>
                                                    ))
                                                : null
                                    )}
                                </View>
                            ))
                    ) : null}
                    <CardFooter
                        postID={id}
                        postType={POST_TYPE.SEARCH}
                        postUserID={userId}
                        userID={signedInUser?.id}
                        likeCount={upVote}
                        disLikeCount={downVote}
                        commentCount={comments_aggregate?.aggregate?.count}
                        postData={item}
                        postIndex={index}
                        commentPress={() =>
                            navigationRef.navigate(NAVIGATION.comments, {
                                DATA: item,
                                SEARCH_POST_INDEX: index
                            })
                        }
                        type={POST_TYPE.SEARCH}
                        morePress={onMorePress}
                    />
                </Card>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.colors.white,
    },
    Play: {
        position: 'absolute',
        color: theme.light.colors.background,
        marginLeft: ms(8),
        marginTop: ms(8),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: vs(8),
    },
    searchheaderText: { color: theme.light.colors.black },
    searchContainer: {
        position: 'absolute',
        height: ms(140),
        paddingTop: ms(10),
        top: Platform.OS === 'android' ? ms(10) : ms(50),
        backgroundColor: theme.light.colors.white,
        width: '100%',
    },
    TopBackButton: {
        paddingRight: ms(5),
        paddingLeft: ms(10),
    },
    searchBox: {
        marginTop: vs(-10),
        margin: ms(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBoxTextFirld: {
        paddingRight: ms(45),
        backgroundColor: theme.light.colors.white,
        borderWidth: 2,
    },
    searchButton: {
        marginLeft: ms(-30),
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: ms(10),
    },
    searchIcon: { marginRight: ms(5) },
    bellIcon: { marginRight: ms(10) },
    cardContainer: {
        marginTop: ms(18),
        marginHorizontal: ms(10),
        borderRadius: 10,
    },
    nameTxt: [
        TextStyles.header,
        {
            color: theme.light.colors.black,
        },
    ],

    recentTxt: {
        fontFamily: FontFamily.Recoleta_medium,
        fontSize: ms(12, 0.3),
        color: theme.light.colors.secondary,
    },
    reportTxt: {
        fontFamily: FontFamily.Recoleta_bold,
        fontSize: ms(14, 0.3),
        color: theme.light.colors.black,
        padding: 10,
    },
    userPic: {
        width: ms(61),
        height: ms(66),
        borderRadius: 100,
        marginLeft: ms(10),
        marginRight: ms(10),
        marginTop: ms(10),
    },
    filterContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: ms(25),
        paddingLeft: ms(3),
    },
    recent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    feedContainer: {
        flex: 1,
        backgroundColor: theme.light.colors.primaryBgLight,
    },
    sortModalContainer: {
        flex: 1,
        backgroundColor: theme.light.colors.primaryBgLight, //
    },
    sortByContainer: {
        backgroundColor: theme.light.colors.white,
        padding: ms(20),
        marginTop: vs(65),
        //IOS
        shadowOffset: { width: -2, height: 4 },
        shadowColor: theme.light.colors.secondary,
        shadowOpacity: 0.2,
        shadowRadius: 3,

        //android
        elevation: 5,
        borderRadius: 12, //
    },
    sortByTxt: {
        fontFamily: FontFamily.Recoleta_semibold,
        fontSize: ms(16, 0.3),
        color: theme.light.colors.secondary,
    },
    recentList: {
        padding: ms(8), //5
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentListTxt: {
        marginLeft: ms(10),
        fontFamily: FontFamily.Recoleta_semibold,
        color: theme.light.colors.black,
        fontSize: ms(16, 0.3),
    },
    txtInput: {
        fontFamily: FontFamily.BrandonGrotesque_regular,
        fontSize: ms(18, 0.3),
        lineHeight: ms(22),
        textAlignVertical: 'top',
        backgroundColor: theme.light.colors.textFieldBackgroundColor,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.light.colors.infoBg,
        paddingLeft: ms(15),
        height: 100,
    },
    dropListTxt: {
        fontFamily: FontFamily.BrandonGrotesque_regular,
        fontSize: ms(16, 0.3),
    },

    // single image viwer
    touchContainer: {
        flex: 1,
        flexDirection: 'row',
        // paddingRight: ms(40),
        justifyContent: 'space-between',
        marginRight: ms(-5),
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        // paddingRight: ms(40),
        justifyContent: 'space-between',
        marginRight: ms(-5),
    },
    extraImage: {
        color: theme.light.colors.white,
        fontFamily: FontFamily.BrandonGrotesque_regular,
        fontSize: ms(24, 0.3),
        width: '100%',
        padding: 35,
    },
    image: {
        flex: 1,
        width: '85%',
        height: ms(200),
        marginRight: ms(10),
    },
    moreImage: {
        height: ms(200),
        // backgroundColor: theme.light.colors.hyperlink,
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
    },
    playButtonBg: {
        height: ms(200),
        backgroundColor: theme.light.colors.hyperlink,
        // opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
    },

    // sponsored post

    sponsordContainer: {
        marginTop: ms(10),
    },
    bgImage: {
        height: 200,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    floaterContainer: {
        position: 'absolute',
        backgroundColor: theme.light.colors.black,
        padding: ms(5),
        borderRadius: 10,
        margin: ms(10),
        bottom: ms(0),
    },
    floaterContainerSponsord: {
        right: ms(8),

        position: 'absolute',
        backgroundColor: theme.light.colors.black,
        padding: ms(5),
        borderRadius: 10,
        margin: ms(10),
    },
    floaterTxt: {
        fontFamily: FontFamily.BrandonGrotesque_bold,
        fontSize: ms(14, 0.3),
        color: theme.light.colors.white,
    },

    // reportPostContainer

    reportPostContainer: {
        // backgroundColor: theme.light.colors.white,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.light.colors.primary,
    },
    reportPostBackButton: {
        padding: ms(10),
        paddingBottom: ms(-10),
    },
    reportPostTopContainer: {
        paddingLeft: ms(9),
        paddingRight: ms(9),
    },
    dropDownPicker: {
        padding: ms(10),
        marginBottom: ms(10),
        backgroundColor: theme.light.colors.textFieldBackgroundColor,
        borderWidth: 0.5,
        borderColor: theme.light.colors.infoBg,
        paddingLeft: ms(15),
    },
    dropDownContainerStyle: {
        borderWidth: 1,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderColor: theme.light.colors.infoBgLight,
        shadowOffset: {
            width: 0,
            height: ms(2),
        },
        padding: ms(10),
        marginTop: ms(5),
        //IOS
        shadowOffset: { width: -2, height: 4 },
        shadowColor: theme.light.colors.secondary,
        shadowOpacity: 0.2,
        shadowRadius: 3,

        //android
        elevation: 5,
    },
    reportPostBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: ms(10),
    },
    reportPostButton: {
        width: ms(100),
    },
    arrowIconStyle: {
        color: theme.light.colors.infoBgLight,
    },
    playButton: {
        backgroundColor: theme.light.colors.primary,
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // delet confirm

    confirmButton: {
        margin: ms(5),
    },
    cancelButton: {
        margin: ms(5),
    },
    ConfirmationTextContainer: {
        paddingLeft: ms(15),
        paddingRight: ms(15),
        paddingBottom: ms(15),
    },
    ConfirmationText: {
        fontFamily: FontFamily.BrandonGrotesque_bold,
        fontSize: ms(16, 0.3),
        lineHeight: ms(22),
        color: theme.light.colors.text,
    },
    loaderStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: ms(50),
    },
    thumbnailImage: {
        width: '100%',
        height: vs(180),
        padding: ms(80),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

        //  marginBottom: 10
    },
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
    thumbnailContainer: {
        width: '100%',
        height: vs(180),
    },
});
