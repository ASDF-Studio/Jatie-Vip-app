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
}) => {
  const [upVote, setUpVote] = useState(likeCount);
  const [downVote, setDownVote] = useState(disLikeCount);
  let upVoteCount = 0;
  let downVoteCount = 0;

  const upVoteHandel = () => {

    onUpVote(postID, postUserID, userID)
  }
  const downVoteHandel = () => {

    onDownVote(postID, postUserID, userID)
  }

  const onUpVote = async (postID, postUserID, userID) => {

    const data = await UserController.upVote(postID, postUserID, userID);
    if (data?.message !== strings.home.upVoteAgain) {
      var upVotenumber = parseInt(upVote)
      var downVoteNumber = parseInt(downVote)
      setUpVote(upVotenumber + 1)
      if (downVoteNumber !== 0) {
        setDownVote(downVoteNumber - 1)
      }
    }
  }

  const onDownVote = async (postID, postUserID, userID) => {
    const data = await UserController.downVote(postID, postUserID, userID);
    if (data?.message !== strings.home.downVoteAgain) {
      var upVotenumber = parseInt(upVote)
      var downVoteNumber = parseInt(downVote)
      if (upVotenumber !== 0) {
        setUpVote(upVotenumber - 1)
      }
      setDownVote(downVoteNumber + 1)
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
