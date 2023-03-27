import { NAVIGATION } from '@/constants';
import { UserController } from '@/controllers';
import { PostController } from '@/controllers/PostController';
import { strings } from '@/localization';
import { navigationRef } from '@/navigation/RootNavigation';
import { StackActions } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
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

const getAllPostSuccess = post => ({
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

//GET ALL POST 

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







//update Post
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

const clearStore = () => ({
    type: TYPES.CLEAR_STORE,
    payload: null,
})

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
    dispatch(deletePostRequest());
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

export const getAllPost = () => async dispatch => {
    dispatch(getAllPostRequest());
    try {
        const post = await PostController.getAllPost();
        // console.log("poopspospopso", post)
        dispatch(getAllPostSuccess(post))

    } catch (error) {
        dispatch(getAllPostError(error))
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