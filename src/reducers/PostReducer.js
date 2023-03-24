import { TYPES } from '@/actions/UserActions';

export const postReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.UPVOTE_POST_SUCCESS:
      return {
        ...state,
        userPost: state.userPost.map(post =>
          post.id === payload.id ? { ...post, upVote: payload.upVote } : post
        )
      };
    case TYPES.DOWNVOTE_POST_SUCCESS:
      return {
        ...state,
        userPost: state.userPost.map(post =>
          post.id === payload.id ? { ...post, downVote: payload.upVote } : post
        )
      };
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
