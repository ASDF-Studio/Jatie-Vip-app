import { TYPES } from '@/actions/PostActions';

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
    case TYPES.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        ...payload.post

      }
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
