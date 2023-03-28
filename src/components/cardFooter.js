import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
import { getAllPostData } from '@/selectors/PostSelectors';
import { getAllPostSuccess } from '@/actions/PostActions';

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
  postType
}) => {
  const dispatch = useDispatch()
  const [upVote, setUpVote] = useState(likeCount);
  const [downVote, setDownVote] = useState(disLikeCount);
  const ALLPOST = useSelector(getAllPostData)
  const postArray = ALLPOST?.data
  const upVoteHandel = () => {

    onUpVote(postID, userID)
  }
  const downVoteHandel = () => {

    onDownVote(postID, userID)
  }

  const onUpVote = async (postID, userID,) => {
    var arr = {}
    arr = postArray;
    if (postType == "Admin") {
      var upVotenumber = parseInt(arr.Admin_Post[postIndex].upVote)
      var downVoteNumber = parseInt(arr.Admin_Post[postIndex].downVote)
      if (!arr.Admin_Post[postIndex].has_upvoted) {
        setUpVote(upVotenumber + 1)
        arr.Admin_Post[postIndex].has_upvoted = true;
        arr.Admin_Post[postIndex].upVote = upVotenumber + 1;
        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))
        if (!arr.Admin_Post[postIndex].has_downvoted) {
          if (downVoteNumber !== 0) {
            setDownVote(downVoteNumber - 1)
          }

        }
        const apiData = await UserController.upVote(postID, userID);
      }
      else {
        setUpVote(upVotenumber - 1)
        arr.Admin_Post[postIndex].has_upvoted = false;
        arr.Admin_Post[postIndex].upVote = upVotenumber - 1;
        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))
        const apiData = await UserController.upVote(postID, userID);
      }
    } else {
      var upVotenumber = parseInt(arr.Regular_Post[postIndex].upVote)
      var downVoteNumber = parseInt(arr.Regular_Post[postIndex].downVote)
      if (!arr.Regular_Post[postIndex].has_upvoted) {
        setUpVote(upVotenumber + 1)
        arr.Regular_Post[postIndex].has_upvoted = true;
        arr.Regular_Post[postIndex].upVote = upVotenumber + 1

        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))
        if (!arr.Admin_Post[postIndex].has_downvoted) {
          if (downVoteNumber !== 0) {
            setDownVote(downVoteNumber - 1)
          }
        }
        const apiData = await UserController.upVote(postID, userID);
      }
      else {
        setUpVote(upVotenumber - 1)
        arr.Regular_Post[postIndex].has_upvoted = false;
        arr.Regular_Post[postIndex].upVote = upVotenumber - 1
        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))

        const apiData = await UserController.upVote(postID, userID);
      }
    }

  }

  const onDownVote = async (postID, userID) => {
    var arr = {}
    arr = postArray;

    if (postType == "Admin") {
      var upVotenumber = parseInt(arr.Admin_Post[postIndex].upVote)
      var downVoteNumber = parseInt(arr.Admin_Post[postIndex].downVote)
      if (!arr.Admin_Post[postIndex].has_downvoted) {
        setDownVote(downVoteNumber + 1)
        arr.Admin_Post[postIndex].has_downvoted = true;
        arr.Admin_Post[postIndex].downVote = downVoteNumber + 1;
        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))
        if (!arr.Admin_Post[postIndex].has_upvoted) {
          if (upVotenumber !== 0) {
            setUpVote(upVotenumber - 1)
          }
        }
        const apiData = await UserController.downVote(postID, userID);
      }
      else {
        setDownVote(downVoteNumber - 1)
        arr.Admin_Post[postIndex].has_downvoted = false;
        arr.Admin_Post[postIndex].downVote = downVoteNumber - 1;
        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))
        // if (!arr.Admin_Post[postIndex].has_upvoted) {
        //   setUpVote(upVotenumber - 1)
        // }
        const apiData = await UserController.downVote(postID, userID);
      }
    } else {
      var upVotenumber = parseInt(arr.Regular_Post[postIndex].upVote)
      var downVoteNumber = parseInt(arr.Regular_Post[postIndex].downVote)
      if (!arr.Regular_Post[postIndex].has_downvoted) {
        setDownVote(downVoteNumber + 1)
        arr.Regular_Post[postIndex].has_downvoted = true;
        arr.Regular_Post[postIndex].downVote = downVoteNumber + 1;
        var data = {
          "data": arr
        }

        if (!arr.Admin_Post[postIndex].has_upvoted) {
          if (upVotenumber !== 0) {
            setUpVote(upVotenumber - 1)
          }
        }
        dispatch(getAllPostSuccess(data))
        const apiData = await UserController.downVote(postID, userID);
      }
      else {

        setDownVote(downVoteNumber - 1)
        arr.Regular_Post[postIndex].has_downvoted = false;
        arr.Regular_Post[postIndex].has_downvoted = downVoteNumber - 1;

        var data = {
          "data": arr
        }
        dispatch(getAllPostSuccess(data))
        const apiData = await UserController.downVote(postID, userID);
      }
    }
  }
  return (
    <View style={styles.footer}>
      <View style={styles.reactionContainer}>
        <TouchableOpacity
          style={[styles.iconContainer, styles.likeIconContainer]}
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
          style={[styles.iconContainer, styles.disLikeIconContainer]}
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
          onPress={sharePress}
          style={styles.ShareNodeIcon}
        />
        <Icon
          icon={faEllipsis}
          size={ms(13)}
          color={theme.light.colors.black}
          onPress={morePress}
          style={styles.EllipsisIcon}
        />
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
    backgroundColor: theme.light.colors.infoBgLight,
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
