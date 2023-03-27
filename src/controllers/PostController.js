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
            console.log("##########    Data", data)
            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response);
                    console.log("Final response", response);
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

            console.log("##########    Data", data)
            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                    console.log("Final response", response);
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

            console.log("##########    Data", data)
            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                    console.log("Final response", response);
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

            console.log("##########    Data", data)
            HttpClient.post(endpoint, data)
                .then((response) => {
                    resolve(response);
                    console.log("Final response", response);
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
                    console.log("Final response", response);
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

    static async getAllPost() {
        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.ALL_POST;
            HttpClient.post(endpoint)
                .then((response) => {
                    console.log("PIN______", JSON.stringify(response))
                    resolve(response);
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }

    static async logout() {
        return new Promise(resolve => {
            setTimeout(resolve, 500);
        });
    }
}
