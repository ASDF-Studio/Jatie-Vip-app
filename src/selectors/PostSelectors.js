export const getAllPostData = state => {
    return Object.keys(state.post).length > 0 ? state.post : null;
};

export const getCommentsByPostIdData = state => {
    console.log("TESTSTSTTST=-=-=-=-=-=-", state)
    return Object.keys(state.post).length > 0 ? state.post.postComments : null;
};
