import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { showMessage } from 'react-native-flash-message';
import { HttpClient } from './HttpClient';

export class ExclusivePostController {

    // create post
    static async createExclusivePost(params) {
        console.log("Params=-=-=->>>", JSON.stringify(params));
        return new Promise(async (resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.CREATE_EXCLUSIVE_POST;
            let data = new FormData()
            // if (params.imageArray.length !== 0) {
            //     let obj = [];
            //     params.imageArray.map(item => {
            //         let filename = item.image.split("/").pop();
            //         obj = {
            //             uri: item.image,
            //             name: filename,
            //             type: item.imageMime,
            //         };
            //         data.append('myimage', obj)
            //     });
            // }
            if (params.imageArray.length !== 0) {
                // if (isImage == strings.exclusive.video) {
                let obj = [];
                let videoPoster = [];
                var isVideo = false
                params.imageArray.map(item => {
                    let filename = item.video == null ? item.image.split("/").pop() : item.video.split("/").pop();
                    obj = {
                        uri: item.video == null ? item.image : item.video,
                        name: filename,
                        type: item.video == null ? item.imageMime : item.videoMime,
                        // videoPoster: item.video == null ? null : item?.videoPoster
                    };
                    if (item.video !== null) {
                        let filename = item.videoPoster.split("/").pop();
                        videoPoster = {
                            uri: item.videoPoster,
                            name: filename,
                            // type: item.videoMime,
                            // videoPoster: item.video == null ? null : item?.videoPoster
                        };
                        isVideo = true
                    }
                    data.append('myimage', obj);
                });
                if (isVideo) {
                    data.append('videoPoster', videoPoster)
                }
                // data.append('videoPoster', videoPoster);
                console.log("VIDEEO___OPOSTER", videoPoster);

            }

            data.append('postImg', '');
            data.append('userId', params.userId);
            data.append('postTitle', params.postTitle);
            data.append('postBody', params.postBody);
            data.append('isVIPonly', params.isVIPonly);
            data.append('isScheduled', params.schedulePost);
            data.append('scheduleDetails', params.scheduleDate);
            console.log("create_post=-=-=daa", JSON.stringify(data));
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            console.log("END_POIMNT===", endpoint);
            try {
                await HttpClient.post(endpoint, data, { headers })
                    .then((response) => {
                        resolve(response)
                        console.log('excl;uiveee post response', JSON.stringify(response))
                    })
                    .catch((error) => {
                        reject(error)
                        console.log('errror', error)
                    });
            } catch (error) {
                console.log("Error-catsc", error);
            }

        });


    }

    static async getAllExclusivePost(data) {

        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.GET_EXCLUSIVE_POST;
            const body = JSON.stringify({
                "loggedInUserId": data.userId,

            })
            // console.log("BODY=-=-=-=-EXclusive", body);
            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)


                    // console.log('response of active exclusive', response)
                })
                .catch((error) => {
                    reject(new Error(error.message));
                    console.log("error", error)
                });
        });
    }

    static async getExclusivePostById(data) {

        return new Promise((resolve, reject) => {
            console.log('check data', data)
            const endpoint = API_BASE_URL + API_END_POINTS.GET_EXCLUSIVE_POST_BY_ID;
            const body = JSON.stringify({
                "loggedInUserId": data.userId,
                "id": data.postId

            })
            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)
                    console.log('response of past exclusiveBY ID', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(new Error(error.message));
                    console.log("error of past giveaway", error)
                });
        });
    }

    static async deleteExclusivePostById(data) {

        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.DELETE_EXCLUSIVE_POST;
            const body = JSON.stringify({
                "userId": data.userId,
                "id": data.postId

            })
            console.log("FORM__DATA", body);
            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)
                    console.log('response of past exclusive delete', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(new Error(error.message));
                    console.log("error of past giveaway", error)
                });
        });
    }
    static async updateExclusivePost(params) {

        return new Promise(async (resolve, reject) => {
            console.log("POSTTSTSTTSSTS", params);
            const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_EXCLUSIVE_POST;
            let data = new FormData()
            if (params.imageArray.length !== 0) {
                let obj = [];
                params.imageArray.map(item => {
                    let filename = item.image.split("/").pop();
                    obj = {
                        uri: item.image,
                        name: filename,
                        type: item.imageMime,
                    };

                    data.append('myimage', obj)
                });
            }
            data.append("id", params.postId)
            data.append('postImg', '');
            data.append('userId', params.userId);
            data.append('postTitle', params.postTitle);
            data.append('postBody', params.postBody);
            data.append('isVIPonly', params.isVIPonly);
            data.append('isScheduled', params.schedulePost);
            data.append('scheduleDetails', params.scheduleDate);
            console.log("update_exclisisadasdas", JSON.stringify(data));
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response)
                    console.log('giveaway post response', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(error)
                    console.log('errror', error)
                });
        });


    }

}
