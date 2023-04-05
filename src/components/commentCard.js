import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CardBody, CardHeader, Icon } from '@/components';
import { theme, TextStyles } from '@/theme';
import { ms } from 'react-native-size-matters';
import { faEllipsis, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import PropsType from 'prop-types';
import { FontFamily } from '@/theme/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { CommentHeader } from './commentHeader';
import { faCircleDown, faReplyAll } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsByPostIdSuccess, voteDownComment, voteUpComment } from '@/actions/PostActions';
import { getCommentsByPostIdData } from '@/selectors/PostSelectors';

export const CommentCard = ({
  name,
  userName,
  imageUrl,
  time,
  commentTxt,
  likeCount,
  likePress,
  disLikeCount,
  disLikePress,
  replyPress,
  morePress,
  userId, commentId, commentIndex, commentData
}) => {
  const dispatch = useDispatch()
  const [upVote, setUpVote] = useState(likeCount);
  const [downVote, setDownVote] = useState(disLikeCount);
  const comm = useSelector(getCommentsByPostIdData)
  const COMMENTS = comm?.postComments
  const onLikeComment = () => {

    var arr = COMMENTS;
    var voteUpNumber = parseInt(arr[commentIndex].upVote)
    var voteDonwNumber = parseInt(arr[commentIndex].downVote)
    if (!arr[commentIndex].has_upvoted) {
      arr[commentIndex].has_upvoted = true
      arr[commentIndex].upVote = voteUpNumber + 1
      if (arr[commentIndex].has_downvoted) {
        arr[commentIndex].has_downvoted = false
        arr[commentIndex].downVote = voteDonwNumber - 1
        setDownVote(voteDonwNumber - 1)
      }
      setUpVote(voteUpNumber + 1)
    } else {
      arr[commentIndex].has_upvoted = false
      arr[commentIndex].upVote = voteUpNumber - 1
      setUpVote(voteUpNumber - 1)
    }
    dispatch(getCommentsByPostIdSuccess(arr))
    dispatch(voteUpComment(commentId, userId))


  }
  const onDisLikeComment = () => {
    var arr = COMMENTS;
    var voteUpNumber = parseInt(arr[commentIndex].upVote)
    var voteDonwNumber = parseInt(arr[commentIndex].downVote)
    if (!arr[commentIndex].has_downvoted) {
      arr[commentIndex].has_downvoted = true
      arr[commentIndex].downVote = voteDonwNumber + 1
      if (arr[commentIndex].has_upvoted) {
        arr[commentIndex].has_upvoted = false
        arr[commentIndex].upVote = voteUpNumber - 1
        setUpVote(voteUpNumber - 1)
      }
      setDownVote(voteDonwNumber + 1)

    } else {
      arr[commentIndex].has_downvoted = false
      arr[commentIndex].downVote = voteDonwNumber - 1
      setDownVote(voteDonwNumber - 1)
    }
    dispatch(getCommentsByPostIdSuccess(arr))
    dispatch(voteDownComment(commentId, userId))
  }
  return (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <View style={styles.leftBorder}>
            <CommentHeader
              fullName={name}
              userName={userName}
              profilePic={imageUrl}
              time={time}
            />
            <View style={styles.body}>
              <CardBody text={commentTxt} />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.reacContainer}>
            <TouchableOpacity

              onPress={onLikeComment}
              style={[styles.iconContainer, styles.likeContainer,
              COMMENTS[commentIndex].has_upvoted && { backgroundColor: theme.light.colors.infoBgLight }
              ]}
            >
              <Icon
                icon={faCircleUp}
                size={ms(13)}
                color={theme.light.colors.success}
                onPress={onLikeComment}
              />
              <Text style={styles.likeTxt}>{upVote} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDisLikeComment}
              style={
                [styles.iconContainer, styles.disLikeContainer,
                COMMENTS[commentIndex].has_downvoted && { backgroundColor: theme.light.colors.infoBgLight }
                ]}
            >
              <Icon
                icon={faCircleDown}
                size={ms(13)}
                color={theme.light.colors.error}
                onPress={onDisLikeComment}
              />
              <Text style={styles.disLikeTxt}> {downVote} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, styles.ReplyAllContainer]}
            >
              <Icon
                icon={faReplyAll}
                size={ms(13)}
                color={theme.light.colors.info}
                onPress={replyPress}
                style={styles.ReplyAllIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              icon={faEllipsis}
              size={ms(13)}
              color={theme.light.colors.activeTabLabel}
              onPress={morePress}
              style={styles.EllipsisIcon}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

CommentCard.prototype = {
  name: PropsType.string.isRequired,
  userName: PropsType.string.isRequired,
  time: PropsType.string.isRequired,
  imageUrl: PropsType.object.isRequired,
  commentTxt: PropsType.string.isRequired,
  likeCount: PropsType.string.isRequired,
  likePress: PropsType.func.isRequired,
  disLikeCount: PropsType.func.isRequired,
  disLikePress: PropsType.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: ms(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(4),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: ms(40),
    height: ms(40),
    borderRadius: 100,
  },
  body: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(18, 0.3),
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.light.colors.infoBgLight,
    padding: ms(8),
    borderRadius: 10,
    marginLeft: ms(25),
    marginRight: ms(10),
  },
  reacContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(3),
  },
  likeContainer: {
    borderRadius: 13,
    padding: ms(3),
    paddingLeft: ms(10),
    paddingRight: ms(10),
    // marginLeft: ms(8),
  },
  likeTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(13, 0.3),
    paddingLeft: ms(3),
  },
  disLikeContainer: {

    borderRadius: 13,
    padding: ms(3),
    paddingLeft: ms(10),
    paddingRight: ms(10),
    marginLeft: ms(8),
  },
  disLikeTxt: {
    // fontFamily: FontFamily.Recoleta_regular,
    // fontSize: ms(13, 0.3),
    // paddingLeft: ms(3),

    fontFamily: FontFamily.Recoleta_semibold,
    fontSize: ms(13, 0.3),
    paddingLeft: ms(5),
    color: theme.light.colors.black,
  },
  leftBorder: {
    borderLeftWidth: 2,
    borderLeftColor: theme.light.colors.info,
    paddingLeft: ms(10),
  },
  ReplyAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ms(5),
  },
  ReplyAllIcon: {
    marginLeft: ms(10),
  },
  EllipsisIcon: {
    margin: ms(5),
  },
  nameTxt: [
    TextStyles.header,
    {
      color: theme.light.colors.black,
      fontSize: ms(15, 0.13),
    },
  ],
});
