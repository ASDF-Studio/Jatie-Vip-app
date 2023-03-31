import { TYPES } from '@/actions/PostActions';
import { strings } from '@/localization';

export const postReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.VOTE_DOWN_SUCCESS:
      return {
        ...state,
        userPost: state.userPost.map(post =>
          post.id === payload.id ? { ...post, upVote: payload.upVote } : post
        )
      };
    case TYPES.VOTE_DOWN_SUCCESS:
      return {
        ...state,
        userPost: state.userPost.map(post =>
          post.id === payload.id ? { ...post, downVote: payload.upVote } : post
        )
      };
    case TYPES.DELETE_POST_SUCCESS:
      return {
        ...state,
        ...payload.post
      }
    case TYPES.GET_ALL_PIN_POST_SUCCESS:
      return {
        ...state,
        pinedPost: payload.post.data

      }
    case TYPES.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        ...payload.post

      }

    case TYPES.SEARCH_ALL_POST_SUCCESS:
      return {
        ...state,
        searchedPosts: payload.post
      }
    case TYPES.GET_COMMENTS_BY_POST_ID_SUCCESS:
      return {
        ...state,
        postComments: payload?.comments
      }
    case TYPES.COMMENT_ON_POST_SUCCESS:
      const updatedComments = [...state.postComments, payload.comment?.data[0]];
      return {
        ...state,
        postComments: updatedComments
      };
    case TYPES.EDIT_COMMENT_SUCCESS:
      var myArr = state.postComments
      myArr[payload.commentIndex] = payload.commentData?.data[0];
      return {
        ...state,
        postComments: [...myArr]
      };
    case TYPES.DELETE_COMMENT_SUCCESS:
      const newItems = state.postComments.filter(item => item.id !== payload.comment?.id);
      return { ...state, postComments: newItems };

    case TYPES.REPORT_POST_SUCCESS:
      return { ...state, reportPost: payload.report }

    case TYPES.FOLLOW_USER_SUCCESS:
      if (payload.type === strings.home.post) {
        var myArr = state.data
        const updatedData = myArr.map(item => {
          if (item.userId === payload.id) {
            return { ...item, is_following: true };
          }
          return item;
        });
        return { ...state, data: [...updatedData] };
      }
      else {
        var myArr = state.postComments
        const updatedData = myArr.map(item => {
          if (item.userId === payload.id) {

            return { ...item, is_following: true };
          }
          return item;
        });
        return { ...state, postComments: [...updatedData] };
      }

    case TYPES.UN_FOLLOW_USER_SUCCESS:
      if (payload.type == strings.home.post) {
        var myArr = state.data
        const updatedData = myArr.map(item => {
          if (item.userId === payload.id) {
            return { ...item, is_following: false };
          }
          return item;
        });
        return { ...state, data: [...updatedData] };
      }
      else {
        var myArr = state.postComments
        const updatedData = myArr.map(item => {
          if (item.userId === payload.id) {
            return { ...item, is_following: false };
          }
          return item;
        });
        return { ...state, postComments: [...updatedData] };
      }
    // case TYPES.BLOCK_USER_SUCCESS:
    // return { ...state, reportPost: payload.report }

    // case TYPES.UN_BLOCK_USER_SUCCESS:
    // return { ...state, reportPost: payload.report }

    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
