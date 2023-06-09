import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '@/components';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { faEllipsis, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { ms } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleDown, faComment } from '@fortawesome/free-regular-svg-icons';
import { faShareNodes } from '@fortawesome/pro-regular-svg-icons';
import { UserController } from '@/controllers';
import { strings } from '@/localization';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostData, getPostByIdData } from '@/selectors/PostSelectors';
import { getAllPostSuccess, getPostById } from '@/actions/PostActions';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
import { cleanSingle } from 'react-native-image-crop-picker';
import { POST_TYPE } from '@/constants/enums';
import { getUser } from '@/selectors/UserSelectors';

export const CardFooter = ({
  postID,
  postUserID,
  userID,
  likeCount,
  disLikeCount,
  commentCount,
  // likePress,
  // disLikePress,
  upVoteUserID,
  downVoteUserID,
  commentPress,
  sharePress,
  morePress,
  postData,
  postIndex,
  postType,
  hasVotedUp,
  hasVotedDown,
  showMore,
}) => {
  const dispatch = useDispatch();
  const [upVote, setUpVote] = useState(likeCount);
  const [downVote, setDownVote] = useState(disLikeCount);
  const ALLPOST = useSelector(getAllPostData);
  const user = useSelector(getUser);
  const singlePost = useSelector(getPostByIdData);

  const postArray =
    postType === POST_TYPE.REGULAR ? ALLPOST : user?.getAllPostsByLoggedInUser;
  const upVoteHandel = () => {
    onUpVote(postID, userID);
  };
  const downVoteHandel = () => {
    onDownVote(postID, userID);
  };

  const onUpVote = async (postID, userID) => {
    const arr = postArray;
    const post = postIndex ? arr[postIndex] : singlePost;

    var upVotenumber = parseInt(post?.upVote);
    var downVoteNumber = parseInt(post?.downVote);
    if (!post.has_upvoted) {
      setUpVote(upVotenumber + 1);
      post.has_upvoted = true;
      post.upVote = upVotenumber + 1;
      if (post?.has_downvoted) {
        post.has_downvoted = false;
        post.downVote = downVoteNumber - 1;
        setDownVote(downVoteNumber - 1);
      }
    } else {
      setUpVote(upVotenumber - 1);
      post.has_upvoted = false;
      post.upVote = upVotenumber - 1;
    }
    const ob = {
      data: arr,
    };

    if (postIndex) {
      dispatch(getAllPostSuccess(ob));
    } else {
      dispatch(getPostByIdData({ ...singlePost }));
    }

    const apiData = await UserController.upVote(postID, userID);
  };

  const onDownVote = async (postID, userID) => {
    var arr = postArray;
    const post = postIndex ? arr[postIndex] : singlePost;

    var upVotenumber = parseInt(post?.upVote);
    var downVoteNumber = parseInt(post?.downVote);
    if (!post.has_downvoted) {
      setDownVote(downVoteNumber + 1);
      post.has_downvoted = true;
      post.downVote = downVoteNumber + 1;
      if (post?.has_upvoted) {
        post.has_upvoted = false;
        post.upVote = upVotenumber - 1;
        setUpVote(upVotenumber - 1);
      }
    } else {
      setDownVote(downVoteNumber - 1);
      post.has_downvoted = false;
      post.downVote = downVoteNumber - 1;
    }
    const ob = {
      data: arr,
    };

    if (postIndex) {
      dispatch(getAllPostSuccess(ob));
    } else {
      dispatch(getPostByIdData({ ...post }));
    }
    const apiData = await UserController.downVote(postID, userID);
  };
  const generateLink = async () => {
    try {
      var link = await dynamicLinks().buildShortLink(
        {
          link: `https://jatievip.page.link/Eit5?postId=${postID}&postIndex=${postIndex}`,
          domainUriPrefix: 'https://jatievip.page.link',
          android: {
            packageName: 'com.airlystudio.jatievip',
            minimumVersion: '18',
          },
          ios: {
            appStoreId: '123456789',
            bundleId: 'com.jatievip.airly',
            minimumVersion: '18',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );
      return link;
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const shareUser = async () => {
    const getLink = await generateLink();
    // console.log("get linkkk kdjfkdlfdf", getLink)
    const res = await Share.open({
      // message: 'Dummy message',
      url: getLink,
    });
  };

  console.log(postData);

  return (
    <View style={styles.footer}>
      <View style={styles.reactionContainer}>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            styles.likeIconContainer,
            postArray?.[postIndex]?.has_upvoted && {
              backgroundColor: theme.light.colors.infoBgLight,
            },
          ]}
          onPress={() => upVoteHandel()}
        >
          <FontAwesomeIcon
            onPress={() => upVoteHandel()}
            icon={faCircleUp}
            size={ms(13)}
            color={theme.light.colors.success}
          />
          <Text style={styles.likeTxt}>{upVote} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            styles.disLikeIconContainer,
            postArray?.[postIndex]?.has_downvoted && {
              backgroundColor: theme.light.colors.infoBgLight,
            },
          ]}
          onPress={() => downVoteHandel()}
        >
          <FontAwesomeIcon
            onPress={() => downVoteHandel()}
            icon={faCircleDown}
            size={ms(13)}
            color={theme.light.colors.error}
          />
          <Text style={styles.disLikeText}>{downVote} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, styles.commentsIconContainer]}
          onPress={commentPress}
        >
          <FontAwesomeIcon
            icon={faComment}
            size={ms(13)}
            color={theme.light.colors.info}
            footerfooter
          // onPress={commentPress}
          />
          <Text style={styles.commentsTxt}>{commentCount} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <Icon
          icon={faShareNodes}
          size={ms(13)}
          color={theme.light.colors.info}
          onPress={() => shareUser()}
          style={styles.ShareNodeIcon}
        />
        {showMore == undefined && (
          <Icon
            icon={faEllipsis}
            size={ms(13)}
            color={theme.light.colors.black}
            onPress={morePress}
            style={styles.EllipsisIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: ms(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.light.colors.infoBgLight,
    padding: ms(6),
    // borderRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIconContainer: {
    borderRadius: 13,
    padding: ms(3),
    paddingLeft: ms(10),
    paddingRight: ms(10),
  },
  likeTxt: {
    fontFamily: FontFamily.Recoleta_semibold,
    fontSize: ms(13, 0.3),
    paddingLeft: ms(5),
    color: theme.light.colors.black,
  },
  disLikeIconContainer: {
    paddingLeft: ms(12),
    borderRadius: 13,
    padding: ms(3),

    paddingRight: ms(10),
  },
  disLikeText: {
    paddingLeft: ms(5),
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(13, 0.3),
    color: theme.light.colors.secondary,
  },
  commentsIconContainer: {
    paddingLeft: ms(15),
  },
  commentsTxt: {
    paddingLeft: ms(5),
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(13, 0.3),
    color: theme.light.colors.secondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  EllipsisIcon: { margin: ms(10) },
  ShareNodeIcon: { margin: ms(10) },
});

const a = {
  comments_aggregate: { aggregate: { count: 11 } },
  created_at: '2023-06-08T06:43:47.505949+00:00',
  downVote: 0,
  downVoteUserId: [],
  has_downvoted: false,
  has_upvoted: false,
  id: 'e6e8ccad-9acf-4325-981d-4b35953cec14',
  isExclusive: false,
  isGiveaway: false,
  isPinned: false,
  isReported: false,
  isUSAonly: false,
  isVIPonly: false,
  is_following: false,
  postBody: 'testingupdate123',
  postExpires: null,
  postImg: [],
  postMediaContent: [],
  postTitle: '',
  postVideo: '[]',
  shared: 0,
  sharedUserId: [],
  upVote: 0,
  upVoteUserId: [],
  updated_at: '2023-06-08T06:43:47.505949+00:00',
  user: {
    followers: [],
    following: [],
    fullName: 'Chris Holland1',
    isAdmin: false,
    isBanned: false,
    isVIP: true,
    profilePic: 'https://d2wwqw32p0xkid.cloudfront.net/photo-1685424207848.jpg',
    username: 'vipUser001',
  },
  userId: 'b9902993-ca3f-4a2f-9de8-397bf6f4767e',
};
