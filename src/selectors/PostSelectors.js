export const getAllPostData = state => {
    return Object.keys(state.post).length > 0 ? state.post : null;
};

export const getCommentsByPostIdData = state => {
    return Object.keys(state.post).length > 0 ? state.post : null;
};

export const getPostByIdData = state => {
    return Object.keys(state.post).length > 0 ? state.post.singlePost : null;
};

export const geAllActiveGiveAwayData = state => {
    return Object.keys(state.post).length > 0 ? state.post : null;
};

export const geAllPastGiveAwayData = state => {
    return Object.keys(state.post).length > 0 ? state.post : null;
};