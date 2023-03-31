import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { strings } from '@/localization';
import { HttpClient } from './HttpClient';

export class PostController {

    // create post

    static async createPost(id, postTitle, postBody, file, mimeType, imageArray) {
        return new Promise(async (resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.CREATE_POST;
            let data = new FormData()
            if (mimeType !== null) {
                let obj = [];
                imageArray.map(item => {
                    let filename = item.image.split("/").pop();
                    obj = {
                        uri: item.image,
                        name: filename,
                        type: item.imageMime,
                    };
                    data.append('myimage', obj);
                });
            }

            data.append('userId', id);
            data.append('postTitle', postTitle);
            data.append('postBody', postBody);
            data.append('postImg', mimeType == null && file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }


            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    //update post
    static async updatePost(id, userId, postTitle, postBody, file, preImageArray, mimeType, preMimeType, imageArray, userType) {
        return new Promise(async (resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_POST;
            let data = new FormData()
            if (mimeType !== null) {
                let obj = [];
                imageArray.map(item => {
                    let filename = item.image.split("/").pop();
                    obj = {
                        uri: item.image,
                        name: filename,
                        type: item.imageMime,
                    };
                    data.append('myimage', obj);
                });
            }
            if (preMimeType == null) {
                preImageArray.map(item => {
                    data.append('postImg', item.image);
                });
            }
            data.append('id', id);
            data.append('userId', userId);
            data.append('postTitle', postTitle);
            data.append('postBody', postBody);
            // data.append('postImg', preFile);
            data.append('userType', userType);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //delete post

    static async deletePost(id, postUserId, userId, userType) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.DELETE_POST;
            var data = JSON.stringify({
                "id": id,
                "postUserID": postUserId,
                "userId": userId,
                "userType": userType,
            });

            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //up voted

    static async upVote(id, postUserId, userId) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.UPVOTE_POST;
            var data = JSON.stringify({
                "id": id,
                "postUserID": postUserId,
                "likeUserID": userId,
            });

            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // down vote

    static async downVote(id, postUserId, userId) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.DOWNVOTE_POST;
            var data = JSON.stringify({
                "id": id,
                "postUserID": postUserId,
                "unlikeUserID": userId,
            });

            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // create post by admin

    static async createPostByAdmin(id, postTitle, postBody, file, mimeType, imageArray) {
        return new Promise(async (resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.CREATE_POST_ADMIN;
            let data = new FormData()
            if (mimeType !== null) {
                let obj = [];
                imageArray.map(item => {
                    let filename = item.image.split("/").pop();
                    obj = {
                        uri: item.image,
                        name: filename,
                        type: item.imageMime,
                    };
                    data.append('myimage', obj);
                });
            }

            data.append('userId', id);
            data.append('postTitle', postTitle);
            data.append('postBody', postBody);
            data.append('postImg', mimeType == null && file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // // post by user id

    static async postByUserId(id) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.POST_BY_USERID;
            var data = JSON.stringify({
                "userId": id
            });
            HttpClient.post(endpoint, data)
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }

    // post by id
    static async postById(id) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.POST_BY_ID;
            var data = JSON.stringify({
                "id": id
            });
            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }


    // post by admin id
    static async postByAdminId(id) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.POST_BY_ADMIN_ID;
            var data = JSON.stringify({
                "id": id
            });
            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }

    // all post by admin

    static async getAllPostByAdmin() {
        return new Promise(async (resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.ALL_POST_ADMIN;
            await HttpClient.post(endpoint)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }

    // get all pinned post

    static async getAllPinnedPost() {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.ALL_PINNED_POST;
            HttpClient.post(endpoint)
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }
    //get All post 
    static async getAllPost(userId) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.ALL_POST;
            const body = JSON.stringify({
                "loggedInUserId": userId
            })

            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }
    //comment on post 

    static async commentOnPost(postId, userId, commentBody) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.COMMENT_ON_POST;
            var body = JSON.stringify({
                "postId": postId,
                "userId": userId,
                "commentBody": commentBody
            });
            console.log("COMMENT_BODY", body)
            HttpClient.post(endpoint, body)
                .then((response) => {
                    console.log("COMMENT_Response", JSON.stringify(response))
                    resolve(response)
                }).catch((error) => {
                    console.log("COMMENT_Response_ERRR", JSON.stringify(error))
                    reject(error)
                });
        })
    }

    static async editComment(id, userId, commentBody) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.EDIT_COMMENT;
            var body = JSON.stringify({
                "id": id,
                "userId": userId,
                "commentBody": commentBody
            });
            console.log("EDIT_COMMENT_BODY", body)
            HttpClient.post(endpoint, body)
                .then((response) => {
                    console.log("EDIT_COMMENT_Response", JSON.stringify(response))
                    resolve(response)
                }).catch((error) => {
                    console.log("EDIT_COMMENT_Response_ERRR", JSON.stringify(error))
                    reject(error)
                });
        })
    }
    static async DeleteComment(id, userId) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.DELETE_COMMENT;
            var body = JSON.stringify({
                "id": id,
                "userId": userId
            });
            console.log("DELETE_COMMENT_BODY", body)
            HttpClient.post(endpoint, body)
                .then((response) => {
                    console.log("DELETE____COMMENT_Response", JSON.stringify(response))
                    resolve(response)
                }).catch((error) => {
                    console.log("CDELEYE_Response_ERRR", JSON.stringify(error))
                    reject(error)
                });
        })
    }
    // comments by post id
    static async getCommentsByPostId(postId, userID) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.GET_COMMENT_BY_POST_ID;

            var body = JSON.stringify({
                "postId": postId,
                "loggedInUserId": userID
            });

            HttpClient.post(endpoint, body)
                .then((response) => {


                    resolve(response)
                }).catch((error) => {

                    reject(error)
                });
        })
    }

    //vote up comment

    static async voteUpComment(id, userId) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.VOTE_UP_COMMENT;

            var body = JSON.stringify({
                "id": id,
                "likeUserID": userId,
            });
            console.log("COMMMEMEMEMEEMEMEM", body)
            HttpClient.post(endpoint, body)
                .then((response) => {
                    console.log("RESPONSEEEEEEEE", JSON.stringify(response))
                    resolve(response)
                }).catch((error) => {
                    console.log("ERROROROROROR", JSON.stringify(error))
                    reject(error)
                });
        })
    }

    //vote Down comment

    static async voteDownComment(id, userId) {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.VOTE_DOWN_COMMENT;
            var body = JSON.stringify({
                "id": id,
                "likeUserID": userId,
            });
            HttpClient.post(endpoint, body)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                });
        })
    }

    //Report Post
    static async reportPostAPI(params) {
        console.log('check report params: ', params)
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.REPORT_POST;
            let data = new FormData()

            if (params.reportImg !== null) {
                let filename = params.reportImg.path.split("/").pop();
                const reportImageData = {
                    uri: params.reportImg.path,
                    name: filename,
                    type: params.reportImg.mime,
                }
                data.append('reportImg', reportImageData)
            }
            data.append('objectId', params.objectId);
            data.append('reportedBy', params.reportedBy);
            data.append('reportTitle', params.reportTitle);
            data.append('reportBody', params.reportBody);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }


    static async logout() {
        return new Promise(resolve => {
            setTimeout(resolve, 500);
        });
    }
}
