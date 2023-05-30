import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers';
import { ExclusivePostController } from '@/controllers/ExclusivePostController';
import { GiveAwayController } from '@/controllers/GiveAwayController';
import { PostController } from '@/controllers/PostController';
import { strings } from '@/localization';
import { navigate, navigationRef } from '@/navigation/RootNavigation';
import { getUser } from '@/selectors/UserSelectors';
import { StackActions } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { globalReset } from './GlobalActions';

export const TYPES = {
    CLEAR_STORE: 'CLEAR_STORE',
    //user create post
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_REQUEST: "CREATE_POST_REQUEST",
    CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
    CREATE_POST_ERROR: "CREATE_POST_ERROR",

    //user create post by admin
    CREATE_POST_BY_ADMIN: 'CREATE_POST_BY_ADMIN',
    CREATE_POST_BY_ADMIN_REQUEST: "CREATE_POST_BY_ADMIN_REQUEST",
    CREATE_POST_BY_ADMIN_SUCCESS: "CREATE_POST_BY_ADMIN_SUCCESS",
    CREATE_POST_BY_ADMIN_ERROR: "CREATE_POST_BY_ADMIN_ERROR",

    //user update post
    UPDATE_POST: 'UPDATE_POST',
    UPDATE_POST_REQUEST: "UPDATE_POST_REQUEST",
    UPDATE_POST_SUCCESS: "UPDATE_POST_SUCCESS",
    UPDATE_POST_ERROR: "UPDATE_POST_ERROR",

    //user delete post
    DELETE_POST: 'DELETE_POST',
    DELETE_POST_REQUEST: "DELETE_POST_REQUEST",
    DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
    DELETE_POST_ERROR: "DELETE_POST_ERROR",

    // vote up post
    VOTE_UP: "VOTE_UP",
    VOTE_UP_REQUEST: "VOTE_UP_REQUEST",
    VOTE_UP_SUCCESS: "VOTE_UP_SUCCESS",
    VOTE_UP_ERROR: "VOTE_UP_ERROR",

    // vote up post
    VOTE_DOWN: "VOTE_DOWN",
    VOTE_DOWN_REQUEST: "VOTE_DOWN_REQUEST",
    VOTE_DOWN_SUCCESS: "VOTE_DOWN_SUCCESS",
    VOTE_DOWN_ERROR: "VOTE_DOWN_ERROR",

    //get all post 

    GET_ALL_POST: "GET_ALL_POST",
    GET_ALL_POST_REQUEST: "GET_ALL_POST_REQUEST",
    GET_ALL_POST_SUCCESS: "GET_ALL_POST_SUCCESS",
    GET_ALL_POST_ERROR: "GET_ALL_POST_ERROR",

    // Search All Post 

    SEARCH_ALL_POST: "SEARCH_ALL_POST",
    SEARCH_ALL_POST_REQUEST: "SEARCH_ALL_POST_REQUEST",
    SEARCH_ALL_POST_SUCCESS: "SEARCH_ALL_POST_SUCCESS",
    SEARCH_ALL_POST_ERROR: "SEARCH_ALL_POST_ERROR",


    //get all post by admin

    GET_ALL_POST_BY_ADMIN: "GET_ALL_POST_BY_ADMIN",
    GET_ALL_POST_BY_ADMIN_REQUEST: "GET_ALL_POST_BY_ADMIN_REQUEST",
    GET_ALL_POST_BY_ADMIN_SUCCESS: "GET_ALL_POST_BY_ADMIN_SUCCESS",
    GET_ALL_POST_BY_ADIMN_ERROR: "GET_ALL_POST_BY_ADMIN_ERROR",

    //get all pined post 

    GET_ALL_PIN_POST: "GET_ALL_PIN_POST",
    GET_ALL_PIN_POST_REQUEST: "GET_ALL_PIN_POST_REQUEST",
    GET_ALL_PIN_POST_SUCCESS: "GET_ALL_PIN_POST_SUCCESS",
    GET_ALL_PIN_POST_ERROR: "GET_ALL_PIN_POST_ERROR",

    //get post by adminID

    GET_POST_BY_ADMIN_ID: "GET_POST_BY_ADMIN_ID",
    GET_POST_BY_ADMIN_ID_REQUEST: "GET_POST_BY_ADMIN_ID_REQUEST",
    GET_POST_BY_ADMIN_ID_SUCCESS: "GET_POST_BY_ADMIN_ID_SUCCESS",
    GET_POST_BY_ADMIN_ID_ERROR: "GET_POST_BY_ADMIN_ID_ERROR",

    //get post by postID

    GET_POST_BY_POST_ID: "GET_POST_BY_POST_ID",
    GET_POST_BY_POST_ID_REQUEST: "GET_POST_BY_POST_ID_REQUEST",
    GET_POST_BY_POST_ID_SUCCESS: "GET_POST_BY_POST_ID_SUCCESS",
    GET_POST_BY_POST_ID_ERROR: "GET_POST_BY_POST_ID_ERROR",


    //get post by userID

    GET_POST_BY_USER_ID: "GET_POST_BY_USER_ID",
    GET_POST_BY_USER_ID_REQUEST: "GET_POST_BY_USER_ID_REQUEST",
    GET_POST_BY_USER_ID_SUCCESS: "GET_POST_BY_USER_ID_SUCCESS",
    GET_POST_BY_USER_ID_ERROR: "GET_POST_BY_USER_ID_ERROR",

    //Comment on post

    COMMENT_ON_POST: "COMMENT_ON_POST",
    COMMENT_ON_POST_REQUEST: "COMMENT_ON_POST_REQUEST",
    COMMENT_ON_POST_SUCCESS: "COMMENT_ON_POST_SUCCESS",
    COMMENT_ON_POST_ERROR: "COMMENT_ON_POST_ERROR",

    //Comments by post id

    GET_COMMENTS_BY_POST_ID: "GET_COMMENTS_BY_POST_ID",
    GET_COMMENTS_BY_POST_ID_REQUEST: "GET_COMMENTS_BY_POST_ID_REQUEST",
    GET_COMMENTS_BY_POST_ID_SUCCESS: "GET_COMMENTS_BY_POST_ID_SUCCESS",
    GET_COMMENTS_BY_POST_ID_ERROR: "GET_COMMENTS_BY_POST_ID_ERROR",

    //Post by Id

    GET_POST_BY_ID: "GET_POST_BY_ID",
    GET_POST_BY_ID_REQUEST: "GET_POST_BY_ID_REQUEST",
    GET_POST_BY_ID_SUCCESS: "GET_POST_BY_ID_SUCCESS",
    GET_POST_BY_ID_ERROR: "GET_POST_BY_ID_ERROR",
    //Comments votUp

    VOTE_UP_COMMENT: "VOTE_UP_COMMENT",
    VOTE_UP_COMMENT_REQUEST: "VOTE_UP_COMMENT_REQUEST",
    VOTE_UP_COMMENT_SUCCESS: "VOTE_UP_COMMENT_SUCCESS",
    VOTE_UP_COMMENT_ERROR: "VOTE_UP_COMMENT_ERROR",

    //Comments donwVote

    VOTE_DOWN_COMMENT: "VOTE_DOWN_COMMENT",
    VOTE_DOWN_COMMENT_REQUEST: "VOTE_DOWN_COMMENT_REQUEST",
    VOTE_DOWN_COMMENT_SUCCESS: "VOTE_DOWN_COMMENT_SUCCESS",
    VOTE_DOWN_COMMENT_ERROR: "VOTE_DOWN_COMMENT_ERROR",

    //Edit comment

    EDIT_COMMENT: "EDIT_COMMENT",
    EDIT_COMMENT_REQUEST: "EDIT_COMMENT_REQUEST",
    EDIT_COMMENT_SUCCESS: "EDIT_COMMENT_SUCCESS",
    EDIT_COMMENT_ERROR: "EDIT_COMMENT_ERROR",

    //Update Comment

    DELETE_COMMENT: "DELETE_COMMENT",
    DELETE_COMMENT_REQUEST: "DELETE_COMMENT_REQUEST",
    DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
    DELETE_COMMENT_ERROR: "DELETE_COMMENT_ERROR",

    //Report Post
    REPORT_POST: "REPORT_POST",
    REPORT_POST_REQUEST: "REPORT_POST_REQUEST",
    REPORT_POST_SUCCESS: "REPORT_POST_SUCCESS",
    REPORT_POST_ERROR: "REPORT_POST_ERROR",

    //FOLLOW USER

    FOLLOW_USER: "FOLLOW_USER",
    FOLLOW_USER_REQUEST: "FOLLOW_USER_REQUEST",
    FOLLOW_USER_SUCCESS: "FOLLOW_USER_SUCCESS",
    FOLLOW_USER_ERROR: "FOLLOW_USER_ERROR",


    //UNFOLLOW USER

    UN_FOLLOW_USER: "UN_FOLLOW_USER",
    UN_FOLLOW_USER_REQUEST: "UN_FOLLOW_USER_REQUEST",
    UN_FOLLOW_USER_SUCCESS: "UN_FOLLOW_USER_SUCCESS",
    UN_FOLLOW_USER_ERROR: "UN_FOLLOW_USER_ERROR",

    //FOLLOW USER

    BLOCK_USER: "BLOCK_USER",
    BLOCK_USER_REQUEST: "BLOCK_USER_REQUEST",
    BLOCK_USER_SUCCESS: "BLOCK_USER_SUCCESS",
    BLOCK_USER_ERROR: "BLOCK_USER_ERROR",


    //UNFOLLOW USER

    UN_BLOCK_USER: "UN_BLOCK_USER",
    UN_BLOCK_USER_REQUEST: "UN_BLOCK_USER_REQUEST",
    UN_BLOCK_USER_SUCCESS: "UN_BLOCK_USER_SUCCESS",
    UN_BLOCK_USER_ERROR: "UN_BLOCK_USER_ERROR",

    // SEARCH USER BY USERNAME

    SEARCH_USER_BY_USERNAME: "SEARCH_USER_BY_USERNAME",
    SEARCH_USER_BY_USERNAME_REQUEST: "SEARCH_USER_BY_USERNAME_REQUEST",
    SEARCH_USER_BY_USERNAME_SUCCESS: ' SEARCH_USER_BY_USERNAME_SUCCESS',
    SEARCH_USER_BY_USERNAME_ERROR: ' SEARCH_USER_BY_USERNAME_ERROR',


    //  CREATE GIVEAWAY POST



    GIVE_AWAY_POST: "GIVE_AWAY_POST",
    GIVE_AWAY_POST_REQUEST: "GIVE_AWAY_POST_REQUEST",
    GIVE_AWAY_POST_SUCCESS: "GIVE_AWAY_POST_SUCCESS",
    GIVE_AWAY_POST_ERROR: "GIVE_AWAY_POST_ERROR",

    // GET ACTIVE GIVEAWAY

    GET_ACTIVE_GIVEAWAY: "GET_ACTIVE_GIVEAWAY",
    GET_ACTIVE_GIVEAWAY_REQUEST: "GET_ACTIVE_GIVEAWAY_REQUEST",
    GET_ACTIVE_GIVEAWAY_SUCCESS: "GET_ACTIVE_GIVEAWAY_SUCCESS",
    GET_ACTIVE_GIVEAWAY_ERROR: "GET_ACTIVE_GIVEAWAY_ERROR",


    //GET PAST GIVEAWAY

    GET_PAST_GIVEAWAY: "GET_PAST_GIVEAWAY",
    GET_PAST_GIVEAWAY_REQUEST: "GET_PAST_GIVEAWAY_REQUEST",
    GET_PAST_GIVEAWAY_SUCCESS: "GET_PAST_GIVEAWAY_SUCCESS",
    GET_PAST_GIVEAWAY_ERROR: "GET_PAST_GIVEAWAY_ERROR",

    GET_SINGLE_GIVEAWAY_BY_ID: "GET_PAST_GIVEAWAY_BY_ID",
    GET_SINGLE_GIVEAWAY_BY_ID_REQUEST: " GET_SINGLE_GIVEAWAY_BY_ID_REQUEST",
    GET_SINGLE_GIVEAWAY_BY_ID_SUCCESS: " GET_SINGLE_GIVEAWAY_BY_ID_SUCCESS",
    GET_SINGLE_GIVEAWAY_BY_ID_ERROR: " GET_SINGLE_GIVEAWAY_BY_ID_ERROR",

    UPDATE_GIVEAWAY: "UPDATE_GIVEAWAY",
    UPDATE_GIVEAWAY_REQUEST: " UPDATE_GIVEAWAY_REQUEST",
    UPDATE_GIVEAWAY_SUCCESS: " UPDATE_GIVEAWAY_SUCCESS",
    UPDATE_GIVEAWAY_ERROR: " UPDATE_GIVEAWAY_ERROR",


    DELETE_GIVEAWAY: "DELETE_GIVEAWAY",
    DELETE_GIVEAWAY_REQUEST: " DELETE_GIVEAWAY_REQUEST",
    DELETE_GIVEAWAY_SUCCESS: " DELETE_GIVEAWAY_SUCCESS",
    DELETE_GIVEAWAY_ERROR: "DELETE_GIVEAWAY_ERROR",

    END_GIVEAWAY: "END_GIVEAWAY",
    END_GIVEAWAY_REQUEST: " END_GIVEAWAY_REQUEST",
    END_GIVEAWAY_SUCCESS: " END_GIVEAWAY_SUCCESS",
    END_GIVEAWAY_ERROR: "END_GIVEAWAY_ERROR",


    //GET PAST GIVEAWAY

    JOIN_GIVEAWAY: "JOIN_GIVEAWAY",
    JOIN_GIVEAWAY_REQUEST: "JOIN_GIVEAWAY_REQUEST",
    JOIN_GIVEAWAY_SUCCESS: "JOIN_GIVEAWAY_SUCCESS",
    JOIN_GIVEAWAY_ERROR: " JOIN_GIVEAWAY_ERROR",


    WITHDRAW_GIVEAWAY: "WITHDRAW_GIVEAWAY",
    WITHDRAW_GIVEAWAY_REQUEST: "WITHDRAW_GIVEAWAY_REQUEST",
    WITHDRAW_GIVEAWAY_SUCCESS: "WITHDRAW_GIVEAWAY_SUCCESS",
    WITHDRAW_GIVEAWAY_ERROR: "WITHDRAW_GIVEAWAY_ERROR",

    //EXCLUSIVE POST 

    CREATE_EXCLUSIVE_POST: "CREATE_EXCLUSIVE_POST",
    CREATE_EXCLUSIVE_POST_REQUEST: "CREATE_EXCLUSIVE_POST_REQUEST",
    CREATE_EXCLUSIVE_POST_SUCCESS: "CREATE_EXCLUSIVE_POST_SUCCESS",
    CREATE_EXCLUSIVE_POST_ERROR: "CREATE_EXCLUSIVE_POST_ERROR",

    GET_ALL_EXCLUSIVE_POST: "GET_ALL_EXCLUSIVE_POST",
    GET_ALL_EXCLUSIVE_POST_REQUEST: "GET_ALL_EXCLUSIVE_POST_REQUEST",
    GET_ALL_EXCLUSIVE_POST_SUCCESS: "GET_ALL_EXCLUSIVE_POST_SUCCESS",
    GET_ALL_EXCLUSIVE_POST_ERROR: "GET_ALL_EXCLUSIVE_POST_ERROR",

    GET_ALL_EXCLUSIVE_POST_BY_ID: "GET_ALL_EXCLUSIVE_POST_BY_ID",
    GET_ALL_EXCLUSIVE_POST_BY_ID_REQUEST: "GET_ALL_EXCLUSIVE_POST_BY_ID_REQUEST",
    GET_ALL_EXCLUSIVE_POST_BY_ID_SUCCESS: "GET_ALL_EXCLUSIVE_POST_BY_ID_SUCCESS",
    GET_ALL_EXCLUSIVE_POST_BY_ID_ERROR: "GET_ALL_EXCLUSIVE_POST_BY_ID_ERROR",

    UPDATE_EXCLUSIVE_POST: "UPDATE_EXCLUSIVE_POST",
    UPDATE_EXCLUSIVE_POST_REQUEST: "UPDATE_EXCLUSIVE_POST_REQUEST",
    UPDATE_EXCLUSIVE_POST_SUCCESS: "UPDATE_EXCLUSIVE_POST_SUCCESS",
    UPDATE_EXCLUSIVE_POST_ERROR: "UPDATE_EXCLUSIVE_POST_ERROR",

    DELETE_EXCLUSIVE_POST: "DELETE_EXCLUSIVE_POST",
    DELETE_EXCLUSIVE_POST_REQUEST: "DELETE_EXCLUSIVE_POST_REQUEST",
    DELETE_EXCLUSIVE_POST_SUCCESS: "DELETE_EXCLUSIVE_POST_SUCCESS",
    DELETE_EXCLUSIVE_POST_ERROR: "DELETE_EXCLUSIVE_POST_ERROR",



};




export const createPostSuccess = user => ({
    type: TYPES.CREATE_POST_SUCCESS,
    payload: { user },
});

const createPostRequest = () => ({
    type: TYPES.CREATE_POST_REQUEST,
    payload: null,
});

const createPostError = error => ({
    type: TYPES.CREATE_POST_ERROR,
    payload: { error },
});

//GET ALL POST 

export const getAllPostSuccess = post => ({
    type: TYPES.GET_ALL_POST_SUCCESS,
    payload: { post },
});

const getAllPostRequest = () => ({
    type: TYPES.GET_ALL_POST_REQUEST,
    payload: null,
});

const getAllPostError = error => ({
    type: TYPES.GET_ALL_POST_ERROR,
    payload: { error },
});

//SEARCH ALL POST 

export const searchAllPostSuccess = post => ({
    type: TYPES.SEARCH_ALL_POST_SUCCESS,
    payload: { post },
});

const searchAllPostRequest = () => ({
    type: TYPES.SEARCH_ALL_POST_REQUEST,
    payload: null,
});

const searchAllPostError = error => ({
    type: TYPES.SEARCH_ALL_POST_ERROR,
    payload: { error },
});

//GET ALL PINNED POST 

const getAllPinPostSuccess = post => ({
    type: TYPES.GET_ALL_PIN_POST_SUCCESS,
    payload: { post },
});


const getAllPinPostRequest = () => ({
    type: TYPES.GET_ALL_PIN_POST_REQUEST,
    payload: null,
});

const getAllPinPostError = error => ({
    type: TYPES.GET_ALL_PIN_POST_ERROR,
    payload: { error },
});

export const commentOnPostSuccess = comment => ({
    type: TYPES.COMMENT_ON_POST_SUCCESS,
    payload: { comment },
});

const commentOnPostRequest = () => ({
    type: TYPES.COMMENT_ON_POST_REQUEST,
    payload: null,
});

const commentOnPostError = error => ({
    type: TYPES.COMMENT_ON_POST_ERROR,
    payload: { error },
});

// Edit comment

export const editCommentSuccess = comment => ({
    type: TYPES.EDIT_COMMENT_SUCCESS,
    payload: comment,
});

const editCommentRequest = () => ({
    type: TYPES.EDIT_COMMENT_REQUEST,
    payload: null,
});

const editCommentError = error => ({
    type: TYPES.EDIT_COMMENT_ERROR,
    payload: { error },
});

// update comment

export const deleteCommentSuccess = comment => ({
    type: TYPES.DELETE_COMMENT_SUCCESS,
    payload: { comment },
});

const deleteCommentRequest = () => ({
    type: TYPES.DELETE_COMMENT_REQUEST,
    payload: null,
});

const deleteCommentError = error => ({
    type: TYPES.DELETE_COMMENT_ERROR,
    payload: { error },
});

//SEARCH ALL POST 

export const searchUserByUserNameSuccess = users => ({
    type: TYPES.SEARCH_USER_BY_USERNAME_SUCCESS,
    payload: { users },
});


const searchUserByUserNameRequest = () => ({
    type: TYPES.SEARCH_USER_BY_USERNAME_REQUEST,
    payload: null,
});

const searchUserByUserNameError = error => ({
    type: TYPES.SEARCH_USER_BY_USERNAME_ERROR,
    payload: { error },
});




export const getSingleGiveawayByIdSuccess = post => ({
    type: TYPES.GET_SINGLE_GIVEAWAY_BY_ID_SUCCESS,
    payload: { post },
});


const getSingleGiveawayByIdRequest = () => ({
    type: TYPES.GET_SINGLE_GIVEAWAY_BY_ID_REQUEST,
    payload: null,
});

const getSingleGiveawayByIdError = error => ({
    type: TYPES.GET_SINGLE_GIVEAWAY_BY_ID_ERROR,
    payload: { error },
});





export const updateGiveawaySuccess = post => ({
    type: TYPES.UPDATE_GIVEAWAY_SUCCESS,
    payload: { post },
});


const updateGiveawayRequest = () => ({
    type: TYPES.UPDATE_GIVEAWAY_REQUEST,
    payload: null,
});

const updateGiveawayError = error => ({
    type: TYPES.UPDATE_GIVEAWAY_ERROR,
    payload: { error },
});

export const deleteGiveawaySuccess = post => ({
    type: TYPES.DELETE_GIVEAWAY_SUCCESS,
    payload: { post },
});


const deleteGiveawayRequest = () => ({
    type: TYPES.DELETE_GIVEAWAY_REQUEST,
    payload: null,
});

const deleteGiveawayError = error => ({
    type: TYPES.DELETE_GIVEAWAY_ERROR,
    payload: { error },
});


export const endGiveawaySuccess = post => ({
    type: TYPES.END_GIVEAWAY_SUCCESS,
    payload: { post },
});


const endGiveawayRequest = () => ({
    type: TYPES.END_GIVEAWAY_REQUEST,
    payload: null,
});

const endGiveawayError = error => ({
    type: TYPES.END_GIVEAWAY_ERROR,
    payload: { error },
});






//Comment
export const updatePostSuccess = post => ({
    type: TYPES.UPDATE_POST_SUCCESS,
    payload: { post },
});

const updatePostRequest = () => ({
    type: TYPES.UPDATE_POST_REQUEST,
    payload: null,
});

const updatePostError = error => ({
    type: TYPES.UPDATE_POST_ERROR,
    payload: { error },
});

const getCommentByPostIdError = error => ({
    type: TYPES.GET_COMMENTS_BY_POST_ID_ERROR,
    payload: { error },
});

export const getCommentsByPostIdSuccess = comments => ({
    type: TYPES.GET_COMMENTS_BY_POST_ID_SUCCESS,
    payload: { comments },
});

const getCommentsByPostIdRequest = () => ({
    type: TYPES.GET_COMMENTS_BY_POST_ID_REQUEST,
    payload: null,
});


const getPostByIdError = error => ({
    type: TYPES.GET_POST_BY_ID_ERROR,
    payload: { error },
});

export const getPostByIdSuccess = post => ({
    type: TYPES.GET_POST_BY_ID_SUCCESS,
    payload: { post },
});

const getPostByIdRequest = () => ({
    type: TYPES.GET_POST_BY_ID_REQUEST,
    payload: null,
});

const voteUpCommentError = error => ({
    type: TYPES.VOTE_UP_COMMENT_ERROR,
    payload: { error },
});

export const voteUpCommentSuccess = comments => ({
    type: TYPES.VOTE_UP_COMMENT_SUCCESS,
    payload: { comments },
});


const voteUpCommentRequest = () => ({
    type: TYPES.VOTE_UP_COMMENT_REQUEST,
    payload: null,
});


const voteDownCommentError = error => ({
    type: TYPES.VOTE_DOWN_COMMENT_ERROR,
    payload: { error },
});


export const voteDownCommentSuccess = comments => ({
    type: TYPES.VOTE_DOWN_COMMENT_SUCCESS,
    payload: { comments },
});


const voteDownCommentRequest = () => ({
    type: TYPES.VOTE_DOWN_COMMENT_REQUEST,
    payload: null,
});


//delete Post
export const deletePostSuccess = user => ({
    type: TYPES.DELETE_POST_SUCCESS,
    payload: { user },
});


const deletePostRequest = () => ({
    type: TYPES.DELETE_POST_REQUEST,
    payload: null,
});

const deletePostError = error => ({
    type: TYPES.DELETE_POST_ERROR,
    payload: { error },
});

//delete Post
export const reportPostSuccess = report => ({
    type: TYPES.REPORT_POST_SUCCESS,
    payload: { report },
});

const reportPostRequest = () => ({
    type: TYPES.REPORT_POST_REQUEST,
    payload: null,
});

const reportPostError = error => ({
    type: TYPES.REPORT_POST_ERROR,
    payload: { error },
});

const clearStore = () => ({
    type: TYPES.CLEAR_STORE,
    payload: null,
})

export const followUserSuccess = user => ({
    type: TYPES.FOLLOW_USER_SUCCESS,
    payload: user,
});

const followUserRequest = () => ({
    type: TYPES.FOLLOW_USER_REQUEST,
    payload: null,
});

const followUserError = error => ({
    type: TYPES.FOLLOW_USER_ERROR,
    payload: { error },
});

export const unFollowUserSuccess = user => ({
    type: TYPES.UN_FOLLOW_USER_SUCCESS,
    payload: user,
});


const unFollowUserRequest = () => ({
    type: TYPES.UN_FOLLOW_USER_REQUEST,
    payload: null,
});

const unFollowUserError = error => ({
    type: TYPES.UN_FOLLOW_USER_ERROR,
    payload: { error },
});

const blockUserRequest = () => ({
    type: TYPES.BLOCK_USER_REQUEST,
    payload: null,
});

const blockUserError = error => ({
    type: TYPES.BLOCK_USER_ERROR,
    payload: { error },
});

export const blockUserSuccess = user => ({
    type: TYPES.BLOCK_USER_SUCCESS,
    payload: { user },
});

const unBockUserRequest = () => ({
    type: TYPES.UN_BLOCK_USER_REQUEST,
    payload: null,
});

const unBlockUserError = error => ({
    type: TYPES.UN_BLOCK_USER_ERROR,
    payload: { error },
});

export const unBlockUserSuccess = user => ({
    type: TYPES.UN_BLOCK_USER_SUCCESS,
    payload: { user },
});


//  Give_away Post
export const giveAwayPostSuccess = user => ({
    type: TYPES.GIVE_AWAY_POST_SUCCESS,
    payload: { user },
});

const giveAwayPostRequest = () => ({
    type: TYPES.GIVE_AWAY_POST_REQUEST,
    payload: null,
});

const giveAwayPostError = error => ({
    type: TYPES.GIVE_AWAY_POST_ERROR,
    payload: { error },
});

// Get_Active_GiveAWay
export const getActiveGiveAwaySuccess = user => ({
    type: TYPES.GET_ACTIVE_GIVEAWAY_SUCCESS,
    payload: { user },
});

const getActiveGiveAwayRequest = () => ({
    type: TYPES.GET_ACTIVE_GIVEAWAY_REQUEST,
    payload: null,
});

const getActiveGiveAwayError = error => ({
    type: TYPES.GET_ACTIVE_GIVEAWAY_ERROR,
    payload: { error },
});


//GET_PAST_GIVEAWAY
export const getPastGiveAwaySuccess = user => ({
    type: TYPES.GET_PAST_GIVEAWAY_SUCCESS,
    payload: { user },
});

const getPastGiveAwayRequest = () => ({
    type: TYPES.GET_PAST_GIVEAWAY_REQUEST,
    payload: null,
});

const getPastGiveAwayError = error => ({
    type: TYPES.GET_PAST_GIVEAWAY_ERROR,
    payload: { error },
});


//Join Giveaway
export const joinGiveAwaySuccess = user => ({
    type: TYPES.JOIN_GIVEAWAY_SUCCESS,
    payload: { user },
});

const joinGiveAwayRequest = () => ({
    type: TYPES.JOIN_GIVEAWAY_REQUEST,
    payload: null,
});

const joinGiveAwayError = error => ({
    type: TYPES.JOIN_GIVEAWAY_ERROR,
    payload: { error },
});

//Withdraw Giveaway
export const withDrawGiveAwaySuccess = user => ({
    type: TYPES.WITHDRAW_GIVEAWAY_SUCCESS,
    payload: { user },
});

const withDrawGiveAwayRequest = () => ({
    type: TYPES.WITHDRAW_GIVEAWAY_REQUEST,
    payload: null,
});

const withGiveAwayError = error => ({
    type: TYPES.WITHDRAW_GIVEAWAY_ERROR,
    payload: { error },
});

export const createExclusivePostSuccess = post => ({
    type: TYPES.CREATE_EXCLUSIVE_POST_SUCCESS,
    payload: { post },
});

const createExclusivePostRequest = () => ({
    type: TYPES.CREATE_EXCLUSIVE_POST_REQUEST,
    payload: null,
});

const createExclusivePostError = error => ({
    type: TYPES.CREATE_EXCLUSIVE_POST_ERROR,
    payload: { error },
});
//
export const getAllExclusivePostSuccess = post => ({
    type: TYPES.GET_ALL_EXCLUSIVE_POST_SUCCESS,
    payload: { post },
});

const getAllExclusivePostRequest = () => ({
    type: TYPES.GET_ALL_EXCLUSIVE_POST_REQUEST,
    payload: null,
});

const getAllExclusivePostError = error => ({
    type: TYPES.GET_ALL_EXCLUSIVE_POST_ERROR,
    payload: { error },
});
//
export const deleteExclusivePostSuccess = id => ({
    type: TYPES.DELETE_EXCLUSIVE_POST_SUCCESS,
    payload: { id },
});

const deleteExclusivePostRequest = () => ({
    type: TYPES.DELETE_EXCLUSIVE_POST_REQUEST,
    payload: null,
});

const deleteExclusivePostError = error => ({
    type: TYPES.DELETE_EXCLUSIVE_POST_ERROR,
    payload: { error },
});
//
export const updateExclusivePostSuccess = post => ({
    type: TYPES.UPDATE_EXCLUSIVE_POST_SUCCESS,
    payload: { post },
});

const updateExclusivePostRequest = () => ({
    type: TYPES.UPDATE_EXCLUSIVE_POST_REQUEST,
    payload: null,
});

const updateExclusivePostError = error => ({
    type: TYPES.UPDATE_EXCLUSIVE_POST_ERROR,
    payload: { error },
});

//
export const getExclusivePostByIdSuccess = post => ({
    type: TYPES.GET_ALL_EXCLUSIVE_POST_BY_ID_SUCCESS,
    payload: { post },
});

const getExclusivePostByIdRequest = () => ({
    type: TYPES.GET_ALL_EXCLUSIVE_POST_BY_ID_REQUEST,
    payload: null,
});

const getExclusivePostByIdError = error => ({
    type: TYPES.GET_ALL_EXCLUSIVE_POST_BY_ID_ERROR,
    payload: { error },
});









// create_post action

export const createPost = (id, postTitle, postBody, file, mimeType, imageArray, screen) => async dispatch => {
    dispatch(globalReset())
    dispatch(createPostRequest());
    try {
        const user = await UserController.createPost(id, postTitle, postBody, file, mimeType, imageArray);
        dispatch(createPostSuccess(user))
        if (screen == NAVIGATION.home) {
            showMessage({
                message: strings.createPost.updatedSuccess,
                type: "success"
            })
            navigationRef.dispatch(StackActions.popToTop())
            navigationRef.navigate(NAVIGATION.home)
        }
        if (screen == NAVIGATION.profile) {
            showMessage({
                message: strings.createPost.updatedSuccess,
                type: "success"
            })
            navigationRef.dispatch(StackActions.popToTop())
            navigationRef.navigate(NAVIGATION.profile)
        }
    } catch (error) {
        showMessage({
            message: error?.message,
            type: "danger"
        })
        dispatch(createPostError(error));
    }
};

// create_post_by_admin action

export const createPostByAdmin = (id, postTitle, postBody, file, mimeType, imageArray, screen) => async dispatch => {
    dispatch(globalReset())
    dispatch(createPostRequest());
    try {
        const user = await UserController.createPostByAdmin(id, postTitle, postBody, file, mimeType, imageArray);
        dispatch(createPostSuccess(user))
        if (screen == NAVIGATION.home) {
            showMessage({
                message: strings.createPost.updatedSuccess,
                type: "success"
            })
            navigationRef.dispatch(StackActions.popToTop())
            navigationRef.navigate(NAVIGATION.home)
        }
        if (screen == NAVIGATION.profile) {
            showMessage({
                message: strings.createPost.updatedSuccess,
                type: "success"
            })
            navigationRef.dispatch(StackActions.popToTop())
            navigationRef.navigate(NAVIGATION.profile)
        }
    } catch (error) {
        showMessage({
            message: error?.message,
            type: "danger"
        })
        dispatch(createPostError(error));
    }
};

// update_post action

export const updatePost = (id, userId, postTitle, postBody, file, preImageArray, mimeType, preMimeType, imageArray, userType, screen) => async dispatch => {
    dispatch(globalReset())
    dispatch(updatePostRequest());
    try {
        const user = await UserController.updatePost(id, userId, postTitle, postBody, file, preImageArray, mimeType, preMimeType, imageArray, userType);
        dispatch(updatePostSuccess(user))
        if (screen == NAVIGATION.home) {
            showMessage({
                message: strings.updatePost.updatedSuccess,
                type: "success"
            })
            navigationRef.dispatch(StackActions.popToTop())
            navigationRef.navigate(NAVIGATION.home)
        }
        if (screen == NAVIGATION.profile) {
            showMessage({
                message: strings.updatePost.updatedSuccess,
                type: "success"
            })
            navigationRef.dispatch(StackActions.popToTop())
            navigationRef.navigate(NAVIGATION.profile)
        }
    } catch (error) {
        showMessage({
            message: error?.message,
            type: "danger"
        })
        dispatch(updatePostError(error));
    }
};

// update_post action

export const deletePost = (id, postUserId, userId, userType, screen) => async dispatch => {
    dispatch(globalReset())
    dispatch(deletePostRequest())
    try {
        const user = await UserController.deletePost(id, postUserId, userId, userType);
        dispatch(deletePostSuccess(user))
        if (screen == NAVIGATION.home) {
            showMessage({
                message: strings.deletePost.deletedSuccess,
                type: "success"
            })
            navigationRef.navigate(NAVIGATION.home)
        }
        if (screen == NAVIGATION.profile) {
            showMessage({
                message: strings.deletePost.deletedSuccess,
                type: "success"
            })
            navigationRef.navigate(NAVIGATION.profile)
        }
    } catch (error) {
        showMessage({
            message: error?.message,
            type: "danger"
        })
        dispatch(deletePostError(error));
    }
};
export const getAllPost = (userId, filterBy, isFollowingData, isVip) => async dispatch => {
    dispatch(getAllPostRequest());
    try {
        const post = await PostController.getAllPost(userId, filterBy, isFollowingData, isVip);
        dispatch(getAllPostSuccess(post))

    } catch (error) {
        dispatch(getAllPostError(error))
    }

};
export const searchAllPost = (searchWord, userID) => async dispatch => {
    dispatch(globalReset())
    dispatch(searchAllPostRequest());
    try {
        const searchAllPostData = await PostController.searchAllPost(searchWord, userID);
        dispatch(searchAllPostSuccess(searchAllPostData?.data))
    } catch (error) {
        dispatch(searchAllPostError(error))
    }
};
export const getAllPinPost = () => async dispatch => {
    dispatch(getAllPinPostRequest());
    try {
        const post = await PostController.getAllPinnedPost();
        dispatch(getAllPinPostSuccess(post))

    } catch (error) {
        dispatch(getAllPinPostError(error))
    }

};
export const commentOnPost = (postId, userId, commentBody) => async dispatch => {
    dispatch(commentOnPostRequest());
    // try {
    const comment = await PostController.commentOnPost(postId, userId, commentBody);
    dispatch(commentOnPostSuccess(comment));
    // } catch (error) {
    //     alert(error)
    //     console.log("NEWdfdfdfdWW_COMMENT_erorr", error)
    //     dispatch(commentOnPostError(error))
    // }
};
export const editComment = (id, userId, commentBody, commentIndex) => async dispatch => {
    dispatch(editCommentRequest());
    // try {
    const comment = await PostController.editComment(id, userId, commentBody);
    var object = {
        commentData: comment,
        commentIndex: commentIndex
    }
    dispatch(editCommentSuccess(object))
    // } catch (error) {
    //     console.log("NEWdfdfdfdWW_COMMENT_erorr", error)
    //     dispatch(editCommentError(error))
    // }
};
export const deleteComment = (id, userId) => async dispatch => {
    dispatch(deleteCommentRequest());
    try {
        const comment = await PostController.DeleteComment(id, userId);
        showMessage({
            message: strings.deleteCommentSuccsess.deletedSuccess,
            type: "success"
        })
        dispatch(deleteCommentSuccess(comment?.data[0]));
    } catch (error) {
        //     alert(error)
        //     console.log("NEWdfdfdfdWW_COMMENT_erorr", error)
        dispatch(deleteCommentError(error))
    }
};
export const followUser = (followerId, followId, type) => async dispatch => {
    dispatch(followUserRequest());
    try {
        const user = await PostController.followUser(followerId, followId);
        var object = {
            id: followId,
            type: type
        }
        dispatch(followUserSuccess(object));
        // showMessage({
        //     message: strings.userFollowedSuccsess.followedSuccess,
        //     type: "success"
        // })
    } catch (error) {
        dispatch(followUserError(error))
    }
};
export const unFollowUser = (unFollowerId, followId, type) => async dispatch => {
    dispatch(unFollowUserRequest());
    try {
        const user = await PostController.unFollowUser(unFollowerId, followId);
        var object = {
            id: followId,
            type: type
        }
        dispatch(unFollowUserSuccess(object));
    } catch (error) {
        dispatch(unFollowUserError(error))
    }
};
export const blockUser = (blockedByUser, blockedUser) => async dispatch => {
    dispatch(blockUserRequest());
    try {
        const user = await PostController.blockUser(blockedByUser, blockedUser);
        dispatch(blockUserSuccess(user));
    } catch (error) {

        dispatch(blockUserError(error))
    }
};
export const unBlockUser = (blockedByUser, blockedUser) => async dispatch => {
    dispatch(unBockUserRequest());
    try {
        const user = await PostController.unBlockUser(blockedByUser, blockedUser);
        dispatch(unBlockUserSuccess(user));
    } catch (error) {

        dispatch(unBlockUserError(error))
    }
};
export const getCommentsByPostId = (postId, userId) => async dispatch => {
    dispatch(getCommentsByPostIdRequest())
    try {
        const user = await PostController.getCommentsByPostId(postId, userId)
        dispatch(getCommentsByPostIdSuccess(user.data))
    } catch (error) {
        dispatch(getCommentByPostIdError(error))
    }
};

export const getPostById = (postId, userId) => async dispatch => {
    dispatch(getPostByIdRequest())
    try {
        const user = await PostController.getPostById(postId, userId)
        dispatch(getPostByIdSuccess(user.data))
    } catch (error) {
        dispatch(getPostByIdError(error))
    }
};

export const voteUpComment = (id, userId) => async dispatch => {
    dispatch(voteUpCommentRequest())
    try {
        const user = await PostController.voteUpComment(id, userId)
        dispatch(voteUpCommentSuccess(user))
    } catch (error) {

        dispatch(voteUpCommentError(error))
    }
};

export const voteDownComment = (id, userId) => async dispatch => {
    dispatch(voteDownCommentRequest())
    try {
        const user = await PostController.voteDownComment(id, userId)
        dispatch(voteDownCommentSuccess(user))
    } catch (error) {
        dispatch(voteDownCommentError(error))
    }
};

export const reportPost = (paramsObj) => async dispatch => {
    dispatch(reportPostRequest())
    try {
        const reportResp = await PostController.reportPostAPI(paramsObj)
        dispatch(reportPostSuccess(reportResp))
    } catch (error) {
        dispatch(reportPostError(error))
    }
};

export const searchUserbyUserName = (searchWord) => async dispatch => {
    dispatch(globalReset())
    dispatch(searchUserByUserNameRequest());
    try {
        const searchedUser = await PostController.searchUserByUserNameAPI(searchWord);
        dispatch(searchUserByUserNameSuccess(searchedUser?.data))
    } catch (error) {
        dispatch(searchUserByUserNameError(error))
    }
};

export const giveAwayPost = (params) => async dispatch => {

    dispatch(globalReset())
    dispatch(giveAwayPostRequest());
    try {
        const user = await GiveAwayController.createGiveAwayPost(params);
        dispatch(giveAwayPostSuccess(user))
        const data = {
            userId: params.userId
        }
        dispatch(getAllActiveGiveaway(data))
        navigate(NAVIGATION.giveaway)

    } catch (error) {
        showMessage({
            message: error?.message,
            type: "danger"
        })
        dispatch(giveAwayPostError(error));
    }
};

//GET All Active GiveAway
export const getAllActiveGiveaway = (data) => async dispatch => {

    dispatch(getActiveGiveAwayRequest());
    try {
        const post = await GiveAwayController.getAllActiveGivePost(data);
        dispatch(getActiveGiveAwaySuccess(post))

    } catch (error) {
        dispatch(getActiveGiveAwayError(error))
    }
};

export const getAllPastGiveaway = (data) => async dispatch => {

    dispatch(getPastGiveAwayRequest());
    try {
        const post = await GiveAwayController.getAllPastGiveAwayPost(data);
        dispatch(getPastGiveAwaySuccess(post))

    } catch (error) {
        dispatch(getPastGiveAwayError(error))
    }
};

export const getSingleGiveAwayById = (data) => async dispatch => {

    dispatch(getSingleGiveawayByIdRequest());
    try {
        const post = await GiveAwayController.getSingleGiveAwayById(data);
        dispatch(getSingleGiveawayByIdSuccess(post?.data))

    } catch (error) {
        dispatch(getSingleGiveawayByIdError(error))
    }
};






export const joinGiveAway = (data) => async dispatch => {

    dispatch(joinGiveAwayRequest());
    try {
        const post = await GiveAwayController.joinGiveawaydata(data);
        dispatch(joinGiveAwaySuccess(post))
        const Data = {
            userId: data?.userId
        }
        dispatch(getAllActiveGiveaway(Data))

    } catch (error) {
        dispatch(joinGiveAwayError(error))
    }
};

export const updateGiveaway = (data) => async dispatch => {

    dispatch(updateGiveawayRequest());
    try {
        const post = await GiveAwayController.updateGiveawayData(data);
        dispatch(updateGiveawaySuccess(post))
        const Data = {
            userId: data?.userId
        }
        dispatch(getAllActiveGiveaway(Data))
        navigationRef.navigate(NAVIGATION.giveaway)

    } catch (error) {
        dispatch(updateGiveawayError(error))
    }
};



export const deleteGiveaway = (data) => async dispatch => {

    dispatch(deleteGiveawayRequest());
    try {
        const post = await GiveAwayController.deleteGiveawayData(data);
        dispatch(deleteGiveawaySuccess(post))
        const Data = {
            userId: data?.userId
        }
        dispatch(getAllActiveGiveaway(Data))
        navigationRef.navigate(NAVIGATION.giveaway)

    } catch (error) {
        dispatch(deleteGiveawayError(error))
    }
};



export const endGiveaway = (data) => async dispatch => {

    dispatch(endGiveawayRequest());
    try {
        const post = await GiveAwayController.endGiveawayData(data);
        dispatch(endGiveawaySuccess(post))
        const Data = {
            userId: data?.userId
        }
        dispatch(getAllActiveGiveaway(Data))
        navigationRef.navigate(NAVIGATION.giveaway)

    } catch (error) {
        dispatch(endGiveawayError(error))
    }
};
















export const WithDrawAway = (data) => async dispatch => {

    dispatch(withDrawGiveAwayRequest());
    try {
        const post = await GiveAwayController.withDrawGiveawaydata(data);
        dispatch(withDrawGiveAwaySuccess(post))
        const Data = {
            userId: data?.userId
        }
        dispatch(getAllActiveGiveaway(Data))

    } catch (error) {
        dispatch(withDrawGiveAwaySuccess(error))
    }
};
export const createExclusivePost = (data) => async dispatch => {

    dispatch(createExclusivePostRequest());
    try {
        const post = await ExclusivePostController.createExclusivePost(data);
        dispatch(createExclusivePostSuccess(post))
        const dataa = {
            userId: data?.userId,
        }
        // dispatch(getAllExclusivePost(dataa))
        navigationRef.navigate(NAVIGATION.exclusive)
    } catch (error) {
        dispatch(createExclusivePostError(error))
    }

};

export const getAllExclusivePost = (data) => async dispatch => {
    dispatch(getAllExclusivePostRequest());
    try {
        const post = await ExclusivePostController.getAllExclusivePost(data);

        dispatch(getAllExclusivePostSuccess(post))

    } catch (error) {
        dispatch(getAllExclusivePostError(error))
    }

};


export const getExclusivePostById = (data) => async dispatch => {

    dispatch(getExclusivePostByIdRequest());
    try {
        const post = await ExclusivePostController.getExclusivePostById(data);
        dispatch(getExclusivePostByIdSuccess(post))

    } catch (error) {
        dispatch(getExclusivePostByIdError(error))
    }

};
export const deleteExclusivePost = (data) => async dispatch => {

    dispatch(deleteExclusivePostRequest());
    try {

        const post = await ExclusivePostController.deleteExclusivePostById(data)
        dispatch(deleteExclusivePostSuccess(post?.data[0]?.id))
        const dataa = {
            userId: data?.userId,
        }
        dispatch(getAllExclusivePost(dataa))

    } catch (error) {
        dispatch(deleteExclusivePostError(error))
    }

};

export const updateExclusivePost = (data) => async dispatch => {

    dispatch(updateExclusivePostRequest());
    try {
        const post = await ExclusivePostController.updateExclusivePost(data);
        dispatch(updateExclusivePostSuccess(post))
        const dataa = {
            userId: data?.userId,
        }
        // dispatch(getAllExclusivePost(dataa))
        navigationRef.navigate(NAVIGATION.exclusive)

    } catch (error) {
        dispatch(updateExclusivePostError(error))
    }

};