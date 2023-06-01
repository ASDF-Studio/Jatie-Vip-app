export const getAllPostData = state => {
    return Object.keys(state.post).length > 0 ? state.post.feedData : null;
};

export const getCommentsByPostIdData = state => {
    return Object.keys(state.post).length > 0 ? state.post : null;
};

export const getPostByIdData = state => {
    return Object.keys(state.post).length > 0 ? state.post.singlePost : null;
};

export const geAllActiveGiveAwayData = state => {
    return Object.keys(state.post).length > 0 ? state.post.ActiveGiveaway : null;
};

export const geAllPastGiveAwayData = state => {
    return Object.keys(state.post).length > 0 ? state.post.PastGiveaway : null;
};

export const getAllExclusiveData = state => {
    return Object.keys(state.post).length > 0 ? state.post?.exclusivePost : null;
};
export const getSingleExclusiveData = state => {
    return Object.keys(state.post).length > 0 ? state.post?.exclusiveSinglePost : null;
};
export const getSingleGiveAwayData = state => {
    return Object.keys(state.post).length > 0 ? state.post?.giveAwaySinglePost : null;
};
export const getSchedulePostData = state => {
    return Object.keys(state.post).length > 0 ? state.post?.schedulePost : null;
};