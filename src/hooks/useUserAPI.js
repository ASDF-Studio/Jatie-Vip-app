import {
  blockUser,
  deletePost,
  followUser,
  unBlockUser,
  unFollowUser,
} from '@/actions/PostActions';
import {
  bannedUserById,
  bannedUsers,
  blockUsersList,
  followers,
  getUserProfileByUserId,
  unBannedUserById,
} from '@/actions/UserActions';
import { NAVIGATION } from '@/constants';
import { POST_TYPE } from '@/constants/enums';
import { strings } from '@/localization';
import { getUser } from '@/selectors/UserSelectors';
import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAdminAPI = ({ userId }) => {
  const [isBanned, setIsBanned] = useState(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const bannedList = user?.getAllBannedUsersKey?.data || [];

  const userBanAPI = () => {
    if (isBanned) {
      dispatch(unBannedUserById(userId));
    } else {
      dispatch(bannedUserById(userId));
    }

    setTimeout(() => {
      dispatch(bannedUsers());
      // dispatch(
      //   getAllPost(
      //     user?.id,
      //     sortBy,
      //     follwingSwitch,
      //     vipArea == `${strings.home.newFeed}` ? false : true,
      //     ''
      //   )
      // );
    }, 100);
  };

  useEffect(() => {
    if (!userId) return;
    setIsBanned(!isEmpty(bannedList.filter(x => x?.userId === userId)));
  }, [userId, user]);

  return {
    userBanAPI,
    isBanned,
  };
};

export const useUserAPI = ({ userId, postType }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const userFollower = user.followersDatainReducer?.data?.following_List || [];
  const userType = useSelector(state => state.userType);
  const blockList = user?.blockListKey?.data || [];

  useEffect(() => {
    if (!userId) return;
    setIsFollowing(
      !isEmpty(userFollower?.filter(el => el.followingUserId === userId))
    );

    setIsBlocked(!isEmpty(blockList.filter(el => el?.blockedUser === userId)));

    // setIsBlocked(
    //   !isEmpty
    // )

    // setIsBanned(
    //   !isEmpty(
    //     user?.getAllBannedUsersKey?.data.filter(x => x?.userId === item?.userId)
    //   )
    // );
  }, [userId, user]);

  const followAPI = useCallback(() => {
    if (isFollowing) {
      dispatch(unFollowUser(user?.id, userId, strings.home.post));
    } else {
      dispatch(followUser(user?.id, userId, strings.home.post));
    }

    setTimeout(() => {
      dispatch(getUserProfileByUserId(userId, user?.id));
      dispatch(followers(user?.id, user?.id));
    }, 100);
  });

  const blockAPI = useCallback(({ callBack: callBack }) => {
    if (isBlocked) {
      dispatch(unBlockUser(user?.id, userId));
    } else {
      dispatch(blockUser(user?.id, userId));
    }

    setTimeout(() => {
      dispatch(blockUsersList(user?.id));
      callBack && callBack();
    }, 100);
  });

  const onDeletePostAPI = useCallback(({ postId, callBack, navigate }) => {
    dispatch(deletePost(postId, userId, user?.id, userType.user));

    setTimeout(() => {
      callBack && callBack();
    }, 100);
  });

  return {
    followAPI,
    blockAPI,
    isFollowing,
    isBlocked,
    onDeletePostAPI,
  };
};
