import { NAVIGATION } from '@/constants';
import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CardHeader } from './cardHeader';
import { Card } from './card';
import { CardBody } from './cardBody';
import { CardFooter } from './cardFooter';
import { navigationRef } from '@/navigation/RootNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { MediaContainer } from './MediaContainer';
import { POST_TYPE } from '@/constants/enums';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';

const PostCard = ({ item, onViewImageVideo, onMorePress, index, vipArea }) => {
  const user = useSelector(getUser);
  const userType = useSelector(state => state.userType);

  return (
    <View style={styles.cardContainer}>
      {userType.user == `${strings.userType.free}` &&
      vipArea == `${strings.home.vipArea}` ? (
        <BluredCard item={item} />
      ) : (
        <Card>
          <CardHeader
            fullName={item?.user?.fullName}
            userName={item?.user?.username}
            profilePic={item?.user?.profilePic}
            time={item?.created_at}
            userId={item?.userId}
            showPin={item?.isPinned}
          />
          <CardBody text={item.postBody} />

          <MediaContainer
            contents={item?.postMediaContent}
            onPress={index => {
              onViewImageVideo(item, index);
            }}
            borderBottom={false}
          />

          <CardFooter
            postID={item?.id}
            postType={POST_TYPE.REGULAR}
            postUserID={item?.userId}
            userID={user?.id}
            likeCount={item?.upVote}
            isDownVoted={item?.has_downvoted}
            isUpvoted={item?.has_upvoted}
            disLikeCount={item?.downVote}
            commentCount={item?.comments_aggregate?.aggregate?.count}
            postData={item}
            postIndex={index}
            commentPress={() =>
              navigationRef.navigate(NAVIGATION.comments, {
                DATA: item,
                POST_INDEX: index,
                type: POST_TYPE.REGULAR,
              })
            }
            morePress={onMorePress}
          />
        </Card>
      )}
    </View>
  );
};

export const MemoPostcard = memo(PostCard);

export const BluredCard = memo(({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => navigationRef.navigate(NAVIGATION.upgradeMembership)}
    >
      <Card>
        <CardHeader
          fullName={item?.user?.fullName}
          userName={item?.user?.username}
          profilePic={item?.user?.profilePic}
          time={item?.created_at}
          userId={item?.userId}
          showPin={item?.isPinned}
        />
        <CardBody text={item.postBody} />

        {item?.postMediaContent?.length > 0 ? (
          <View style={styles.thumbnailContainer}>
            <Image
              blurRadius={4}
              style={styles.thumbnailImage}
              source={{
                uri:
                  item?.postMediaContent[0]?.mimetype?.split('/')[0] == 'image'
                    ? item?.postMediaContent[0]?.url
                    : item?.postMediaContent[0]?.cover,
              }}
            />
            <View style={styles.vipOnlyContainer}>
              <FontAwesomeIcon
                icon={faLock}
                size={ms(10)}
                style={styles.lock}
              />
              <Text style={styles.vipOnlyText}>{strings.giveaway.vipOnly}</Text>
            </View>
          </View>
        ) : null}
      </Card>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    margin: ms(8),
    borderRadius: 10,
  },
});
