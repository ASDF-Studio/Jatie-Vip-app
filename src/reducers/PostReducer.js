import { TYPES } from '@/actions/PostActions';

export const postReducer = (state = {}, { payload, type }) => {
  console.log("PayLOddsfsdfdsfdsfdsfsewdewAD_)__)_)_)_", JSON.stringify(payload))
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
    case TYPES.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        ...payload.post

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

    case TYPES.REPORT_POST_SUCCESS:
      return { ...state, reportPost: payload.report }

    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
