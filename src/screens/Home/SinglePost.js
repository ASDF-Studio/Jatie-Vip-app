import React, { useEffect, useState } from 'react';
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '@/theme';
import { ms, vs } from 'react-native-size-matters';
import { Card, CardBody, CardFooter, CardHeader, HorizontalLine, ModalDown, ModalList, TopBackButton } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NAVIGATION } from '@/constants';
import { FontFamily } from '@/theme/Fonts';
import { navigationRef } from '@/navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getPostById, TYPES } from '@/actions/PostActions';
import { getAllPostData, getPostByIdData } from '@/selectors/PostSelectors';
import { CustomLoader } from '@/components';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getUser } from '@/selectors/UserSelectors';
import { strings } from '@/localization';
import { faFlag, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { log } from 'react-native-reanimated';
import { POST_TYPE } from '@/constants/enums';


export default function SinglePost({ navigation, route }) {
    const { postId, postIndex } = route.params || {}
    const dispatch = useDispatch()
    const ALLPOST = useSelector(getAllPostData)
    const user = useSelector(getUser);
    const postData = useSelector(getPostByIdData)

    const [postUserName, setPostUserName] = useState('');
    const [open, setOpen] = useState(false);
    const [reportOptionValue, setReportOptionValue] = useState('');
    const [reportComment, setReportCommnet] = useState('');
    const [allPinnedPost, setAllPinnedPost] = useState([]);
    const [allPost, setAllPost] = useState(ALLPOST ? ALLPOST : []);
    const [postUserId, setPostUserId] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [postImg, setPostImg] = useState([]);
    const [isAdminPost, setIsAdminPost] = useState(false)
    const [openReplace, setReplace] = useState(false);
    var item = postData

    const [likeCount, setLikeCount] = useState(item?.upVote)
    const [downCount, setDownCount] = useState(item?.downVote)
    const [commentCount, setCommentCount] = useState(item?.comments_aggregate?.aggregate?.count)

    console.log("AllPost=-=-=-Newwww", JSON.stringify(item));
    const isLoading = useSelector(state =>
        isLoadingSelector([TYPES.GET_POST_BY_ID], state)
    );
    useEffect(() => {
        console.log(postId, user?.id);
        dispatch(getPostById(postId, user?.id))
        setLikeCount(item?.upVote)
        setDownCount(item?.downVote)
        setCommentCount(item?.comments_aggregate?.aggregate?.count)

    }, [])
    let counter = 1;
    // const item = {
    //     "id": "5efc76cb-6749-4b46-a60e-0870ef4b8c95",
    //     "userId": "6aae7065-5341-45b1-b717-0c3e3256dc2f",
    //     "postTitle": "",
    //     "postBody": "I was a child and she was a child,\n",
    //     "postImg": [
    //         "https://d2wwqw32p0xkid.cloudfront.net/photo-1680337684341"
    //     ],
    //     "postExpires": null,
    //     "isExclusive": false,
    //     "isGiveaway": false,
    //     "isPinned": true,
    //     "isReported": false,
    //     "isUSAonly": false,
    //     "isVIPonly": false,
    //     "isAdminPost": true,
    //     "upVote": 3,
    //     "upVoteUserId": [
    //         "9c20a34e-43ec-4d5b-8487-9a4eb1cf936d",
    //         "f6851e56-9bf3-464f-9a33-f31d8f2a7d02",
    //         "ce656365-b90f-4b5f-aab6-b436051171f5"
    //     ],
    //     "downVote": 0,
    //     "downVoteUserId": [
    //     ],
    //     "shared": 0,
    //     "sharedUserId": [
    //     ],
    //     "created_at": "2023-03-01T08:28:04.405+00:00",
    //     "updated_at": "2023-04-01T08:28:04.405+00:00",
    //     "user": {
    //         "fullName": "JatieVIP",
    //         "username": "jatieVIP",
    //         "profilePic": "https://d2wwqw32p0xkid.cloudfront.net/photo-1679288548479.jpg",
    //         "followers": [
    //         ],
    //         "following": [
    //             "ce656365-b90f-4b5f-aab6-b436051171f5"
    //         ]
    //     },
    //     "comments_aggregate": {
    //         "aggregate": {
    //             "count": 32
    //         }
    //     },
    //     "has_upvoted": true,
    //     "has_downvoted": false,
    //     "is_following": false
    // }

    return (
        <SafeAreaView style={styles.container}>
            <CustomLoader
                open={isLoading}
            />
            {!isLoading &&
                <View style={styles.header}>
                    <View style={styles.left}>
                        <TopBackButton
                            onPress={() => navigationRef.goBack()}
                            style={styles.TopBackButton}
                        />


                    </View>

                </View>
            }

            {/* <HorizontalLine /> */}
            {!isLoading &&
                <View style={styles.cardContainer}>
                    <Card>
                        <CardHeader
                            fullName={item?.user?.fullName}
                            userName={item?.user?.username}
                            profilePic={item?.user?.profilePic}
                            time={item?.created_at}
                            userId={item?.userId}
                            // isOfficial={item.isOffical}
                            showPin={item?.isPinned}
                        />
                        <CardBody text={item?.postBody} />

                        {item?.postImg?.length <= 2 ? (
                            <View style={styles.imageContainer}>
                                {item?.postImg?.map(data => (
                                    counter = counter + 1,
                                    <TouchableOpacity
                                        key={counter}
                                        style={styles.touchContainer}
                                    // onPress={() => {
                                    //     setShowImageView(true),
                                    //         setFeedImages(item.postImg)
                                    // }}
                                    >
                                        <Image
                                            source={{
                                                uri: data,
                                            }}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : item?.postImg?.length > 2 ? (
                            counter = 1,
                            <View style={styles.imageContainer}>
                                {item?.postImg?.map(data =>
                                    counter == 1 ? (
                                        counter = counter + 1,
                                        <TouchableOpacity
                                            key={counter}
                                            style={styles.touchContainer}
                                        // onPress={() => {
                                        //   setShowImageView(true),
                                        //     setFeedImages(item.postImg);
                                        //   // console.log(feedImages)
                                        // }}
                                        >
                                            <Image
                                                source={{
                                                    uri: data,
                                                }}
                                                key={counter}
                                                style={styles.image}
                                            />
                                        </TouchableOpacity>
                                    ) : counter == 2 ? (
                                        counter = counter + 1,
                                        <TouchableOpacity
                                            key={counter}
                                            style={styles.touchContainer}
                                        // onPress={() => {
                                        //     setShowImageView(true),
                                        //         setFeedImages(item.postImg);
                                        // }}
                                        >
                                            <ImageBackground
                                                source={{
                                                    uri: data,
                                                }}
                                                key={counter}
                                                style={[styles.image, styles.moreImage]}
                                            >
                                                <TouchableOpacity
                                                // onPress={() => {
                                                //     setShowImageView(true),
                                                //         setFeedImages(item.postImg);
                                                // }}
                                                >
                                                    <Text style={styles.extraImage}>
                                                        {strings.message.plus}
                                                        {item?.postImg?.length - 1}
                                                    </Text>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ) : null
                                )}
                            </View>
                        ) : null}

                        <CardFooter
                            postType={POST_TYPE.REGULAR}
                            index={0}
                            postIndex={0}
                            // likePress={() => onUpVote(item.id, item.userId, user?.id, item)}
                            // disLikePress={() => onDownVote(item.id, item.userId, user?.id, item)}
                            postID={item?.id}
                            //postType="Regular"
                            //  postUserID={item?.userId}
                            userID={user?.id}
                            //  showMore={false}
                            likeCount={item?.upVote}
                            disLikeCount={item?.downVote}
                            // commentCount={commentCount}
                            postData={item}
                            //  postIndex={postIndex}
                            commentPress={() =>
                                //navigation.navigate(NAVIGATION.comments, { DATA: item, "POST_INDEX": postIndex })
                                console.log('Comment')
                            }
                        // morePress={() => {
                        //     setPostIndex(0)
                        //     setIsAdminPost(item?.isAdminPost),
                        //         setPostUserName(item?.user?.username)
                        //     setOpen(true);
                        //     setPostUserId(item?.userId);
                        //     setpostId(item?.id);
                        //     setPostTitle(item?.postTitle)
                        //     setPostBody(item?.postBody);
                        //     setPostImg(item?.postImg);
                        // }}
                        />

                    </Card>


                    {open && (
                        (postUserId == user?.id ? (
                            <ModalDown open={open} setOpen={setOpen}>
                                <ModalList
                                    title={strings.profile.editPost}
                                    icon={faPen}
                                    iconBg={theme.light.colors.infoBgLight}
                                    iconColor={theme.light.colors.info}
                                // onPress={() => {
                                //     navigationRef.navigate(NAVIGATION.updatePost, {
                                //         prevData: { DATA },
                                //     }), setOpen(false);
                                // }}
                                />
                                <HorizontalLine
                                    color={theme.light.colors.infoBgLight}
                                    paddingTop={15}
                                    paddingBottom={8}
                                />
                                <ModalList
                                    title={strings.operations.delete}
                                    icon={faTrash}
                                    iconBg={theme.light.colors.infoBgLight}
                                    iconColor={theme.light.colors.secondary}
                                    onPress={() => { setReplace(true), setOpen(false) }}
                                />
                            </ModalDown>
                        ) :
                            <ModalDown open={open} setOpen={setOpen}>
                                <ModalList
                                    //   onPress={() => { onFollow() }}
                                    title={(!ALLPOST[postIndex]?.is_following ? strings.operations.follow : strings.operations.unFollow) + " @" + postUserName}
                                    icon={faUserPlus}
                                    iconColor={theme.light.colors.primary}
                                    iconBg={theme.light.colors.primaryBgLight}
                                />
                                <ModalList
                                    title={strings.operations.sendPrivateMessage}
                                    icon={faMessage}
                                    iconColor={theme.light.colors.success}
                                    iconBg={theme.light.colors.successBgLight}
                                />
                                <HorizontalLine
                                    color={theme.light.colors.infoBgLight}
                                    paddingTop={15}
                                    paddingBottom={8}
                                />
                                {(userType.user == `${strings.userType.free}`) |
                                    (userType.user == `${strings.userType.vip}`) ? (
                                    <>
                                        {
                                            isAdminPost == false &&
                                            <ModalList
                                                title={strings.home.report}
                                                icon={faFlag}
                                                iconColor={theme.light.colors.secondary}
                                                iconBg={theme.light.colors.infoBgLight}
                                                onPress={() => {
                                                    setReportOptionValue('')
                                                    setOpenReport(true);
                                                    setOpen(false);
                                                    setreportImage(null)
                                                }}
                                            />
                                        }

                                        {isAdminPost == false &&
                                            <ModalList
                                                onPress={() => { onBlock() }}
                                                title={strings.operations.block + " @" + postUserName}
                                                // title={(ALLPOST?.data[pos] ? strings.operations.block : strings.operations.unBlock) + " @" + postUserName}
                                                icon={faXmark}
                                                iconColor={theme.light.colors.secondary}
                                                iconBg={theme.light.colors.infoBgLight}
                                            />
                                        }



                                    </>
                                ) : userType.user == `${strings.userType.admin}` ? (
                                    <>
                                        <ModalList
                                            title={strings.home.deletePost}
                                            icon={faTrash}
                                            iconColor={theme.light.colors.secondary}
                                            iconBg={theme.light.colors.infoBgLight}
                                            onPress={() => { setReplace(true), setOpen(false) }}
                                        />
                                        <ModalList
                                            title={strings.operations.block + strings.home.DummyUser}
                                            icon={faXmark}
                                            iconColor={theme.light.colors.secondary}
                                            iconBg={theme.light.colors.infoBgLight}
                                        />
                                        <ModalList
                                            title={strings.operations.ban + strings.home.DummyUser}
                                            icon={faFlag}
                                            iconColor={theme.light.colors.secondary}
                                            iconBg={theme.light.colors.infoBgLight}
                                        />
                                    </>
                                ) :
                                    null
                                }
                            </ModalDown>
                        )
                    )}

                </View>
            }

        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light.colors.primaryBgLight,
        justifyContent: "center"
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
        alignItems: 'center'
    },
    searchBoxTextFirld: {
        paddingRight: ms(45),
        backgroundColor: theme.light.colors.white,
        borderWidth: 2
    },
    searchButton: {
        marginLeft: ms(-30)
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
        margin: ms(8),
        borderRadius: 10,
        flex: 0.9
    },
    nameTxt: [
        {
            fontSize: ms(24, 0.3),
            fontFamily: FontFamily.Recoleta_bold,
        },
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
        backgroundColor: theme.light.colors.hyperlink,
        opacity: 0.7,
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
        alignSelf: "center", justifyContent: "center", marginTop: ms(50)
    }
});
