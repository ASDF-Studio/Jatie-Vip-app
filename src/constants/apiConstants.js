export const API_BASE_URL = "https://staging.jatievip.com/api/";

export const API_END_POINTS = {
    LOGIN: "auth/login",
    VERIFY_OTP: "auth/verifyotp",
    CHECK_USERNAME: "auth/getusername",
    UPDATE_USER: "auth/updateuser",
    UPLOAD_PROFILE_PIC: "auth/upload",

    //use create post
    CREATE_POST: "post/create",
    POST_BY_USERID: "post/post_by_user_id",

    //update Post
    UPDATE_POST: "post/update",

    //delete post
    DELETE_POST: "post/delete",

    //vote post
    UPVOTE_POST: "post/upvote",
    DOWNVOTE_POST: "post/downvote",

    //post by id
    POST_BY_ID: "post/single_post",
    POST_BY_ADMIN_ID: "post/single_post_admin",

    //admin pinned post
    ALL_PINNED_POST: "post/all_pinned_post",
    ALL_POST_ADMIN: "post/all_post_admin",
    CREATE_POST_ADMIN: "post/create_post_admin",

    // View all post
    ALL_POST: "post/all_post",

    // Search All Post
    SEARCH_ALL_POST: 'post/search_all_post',

    //comment 
    COMMENT_ON_POST: "post/create_comment",
    GET_COMMENT_BY_POST_ID: 'post/comments_by_postId',
    VOTE_UP_COMMENT: "post/comment_upvote",
    VOTE_DOWN_COMMENT: 'post/comment_downvote',
    EDIT_COMMENT: 'post/update_comment',
    DELETE_COMMENT: 'post/delete_comment',

    // Follow/unfollow
    FOLLOW_USER: 'user/follow',
    UN_FOLLOW_USER: 'user/unfollow',

    //Block/unBlock

    BLOCK_USER: "user/block",
    UN_BLOCK_USER: "user/unblock",

    // Report Post
    REPORT_POST: 'post/report',

    // Search user by username
    SEARCH_USER_BY_USERNAME: 'user/search',

    //Get user profile by user id
    GET_USER_PROFILE_BY_USER_ID: 'user/user_by_userId',

    //Followers endPoint
    FOLLOWERS: 'user/get_follower_list',

    //BLOCK_LIST_ENDPOINT
    BLOCK_LIST: 'user/blocklist_by_userId'
};
