export const API_BASE_URL = 'https://staging.jatievip.com/api/';

export const API_END_POINTS = {
  LOGIN: 'auth/login',
  VERIFY_OTP: 'auth/verifyotp',
  CHECK_USERNAME: 'auth/getusername',
  UPDATE_USER: 'auth/updateuser',
  UPLOAD_PROFILE_PIC: 'auth/upload',

  //use create post
  CREATE_POST: 'post/create',
  POST_BY_USERID: 'post/post_by_user_id',

  //update Post
  UPDATE_POST: 'post/update',

  //delete post
  DELETE_POST: 'post/delete',

  //vote post
  UPVOTE_POST: 'post/upvote',
  DOWNVOTE_POST: 'post/downvote',

  //post by id
  POST_BY_ID: 'post/single_post',
  POST_BY_ADMIN_ID: 'post/single_post_admin',

  //admin pinned post
  ALL_PINNED_POST: 'post/all_pinned_post',
  ALL_POST_ADMIN: 'post/all_post_admin',
  CREATE_POST_ADMIN: 'post/create_post_admin',

  // View all post
  ALL_POST: 'post/all_post',

  // Search All Post
  SEARCH_ALL_POST: 'post/search_all_post',

  //comment
  COMMENT_ON_POST: 'post/create_comment',
  GET_COMMENT_BY_POST_ID: 'post/comments_by_postId',
  VOTE_UP_COMMENT: 'post/comment_upvote',
  VOTE_DOWN_COMMENT: 'post/comment_downvote',
  EDIT_COMMENT: 'post/update_comment',
  DELETE_COMMENT: 'post/delete_comment',

  // Follow/unfollow
  FOLLOW_USER: 'user/follow',
  UN_FOLLOW_USER: 'user/unfollow',

  //Block/unBlock

  BLOCK_USER: 'user/block',
  UN_BLOCK_USER: 'user/unblock',

  // Report Post
  REPORT_POST: 'post/report',
  ARCHIVE_REPORT: 'post/report_archive',

  // Search user by username
  SEARCH_USER_BY_USERNAME: 'user/search',
  USER_REPORT_CREATE: 'user/report_create',

  //Get user profile by user id
  GET_USER_PROFILE_BY_USER_ID: 'user/user_by_userId',

  // GiveAway Post
  GIVE_AWAY_POST_ENDPOINT: 'giveaway/create',

  UPDATE_GIVEAWAY: 'giveaway/update',
  DELETE_GIVEAWAY: 'giveaway/delete',
  END_GIVEAWAY: 'giveaway/select_random_winners',

  // Active giveaway get
  GET_ACTIVE_GIVEAWAY: 'giveaway/all_giveaway_active',

  //past giveaway get
  GET_PAST_GIVEAWAY: 'giveaway/all_giveaway_past',
  GET_SINGLE_GIVEAWAY_BY_ID: 'giveaway/single_giveaway',

  //join giveaway

  JOIN_GIVEAWAY: 'giveaway/join',

  //With Draw End Point

  WITH_DRAW: 'giveaway/withdraw',

  // exclusive post

  CREATE_EXCLUSIVE_POST: 'exclusive/create',
  GET_EXCLUSIVE_POST: 'exclusive/all_exclusive',
  GET_EXCLUSIVE_POST_BY_ID: 'exclusive/single_exclusive',
  DELETE_EXCLUSIVE_POST: 'exclusive/delete',
  UPDATE_EXCLUSIVE_POST: 'exclusive/update',

  // Schedule post
  SCHEDULE_POST: 'post/all_scheduled_post',

  //Followers endPoint
  FOLLOWERS: 'user/get_follower_list',

  //BLOCK_LIST_ENDPOINT
  BLOCK_LIST: 'user/blocklist_by_userId',

  //SEARCH_USER_ENDPOINT
  SEARCH_USER: 'user/search',

  //GET ALL ACTIVITY
  GET_ALL_ACTIVITY: 'user/all_activity_by_user_id',

  //Manage All Reports
  MANAGE_ALL_REPORTS: 'post/all_report',

  //GET All Banned Users
  GET_ALL_BANNED_USERS: 'user/all_banned',

  //UnBanned user By ID
  UNBANNED_USER_BY_ID: 'user/unban_user',

  //baned User By ID
  BANNED_USER_BY_ID: 'user/ban_user',

  //GET ALL NOTIFICATIONS
  GET_ALL_NOTIFICATIONS: 'user/all_notification_by_user_id',

  //MARK_ALL_READ_NOTIFICATIONS
  MARK_ALL_READ_NOTIFICATIONS: 'user/notification_mark_as_read',

  MARK_SINGLE_READ_NOTIFICATIONS: 'user/single_notification_read',

  //PIN_POST
  CREATE_PINNED_POST: 'post/create_pinned_post',
  REMOVE_PINNED_POST: 'post/remove_pinned_post',
};
