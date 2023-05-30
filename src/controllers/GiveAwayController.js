import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { showMessage } from 'react-native-flash-message';
import { HttpClient } from './HttpClient';

export class GiveAwayController {

    // create post
    static async createGiveAwayPost(params) {

        return new Promise(async (resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.GIVE_AWAY_POST_ENDPOINT;
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
            data.append('postExpires', params.postExpires);
            data.append('startDate', params.startDate);
            data.append('endDate', params.endDate);
            data.append('isVIPonly', params.isVIPonly);
            data.append('isUSAonly', params.isUSAonly);
            data.append('numOfWinners', params.winnerCount);
            console.log("GIVEATWA__BOSY", data);
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

    static async getAllActiveGivePost(data) {

        return new Promise((resolve, reject) => {
            const endpoint = API_BASE_URL + API_END_POINTS.GET_ACTIVE_GIVEAWAY;
            const body = JSON.stringify({
                "loggedInUserId": data.userId,

            })
            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)
                    console.log('response of active giveaway JOIN', response)
                })
                .catch((error) => {
                    reject(new Error(error.message));
                    console.log("error", error)
                });
        });
    }

    static async getAllPastGiveAwayPost(data) {

        return new Promise((resolve, reject) => {
            console.log('check data', data)
            const endpoint = API_BASE_URL + API_END_POINTS.GET_PAST_GIVEAWAY;
            const body = JSON.stringify({
                "loggedInUserId": data.userId,

            })

            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)
                    console.log('response of past giveaway', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(new Error(error.message));
                    console.log("error of past giveaway", error)
                });
        });
    }

    static async joinGiveawaydata(data) {

        return new Promise((resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.JOIN_GIVEAWAY;
            const body = JSON.stringify({
                "giveawayId": data?.giveawayId,
                "participantId": data?.participantId
            })
            console.log("JOINNNNN", body);
            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)
                    console.log('response of join giveaway', JSON.stringify(response))

                    {
                        response.status == "User already joined" ? showMessage({
                            message: "User already joined",
                            type: 'success'
                        }) : showMessage({
                            message: 'Participant Join the giveaway',
                            type: 'success'
                        })
                    }

                })
                .catch((error) => {
                    reject(new Error(error.message));
                    console.log("error of join giveaway", error)
                });
        });
    }

    static async updateGiveawayData(params) {

        return new Promise(async (resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_GIVEAWAY;
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
                console.log("preImageArray=-=-=-=-=-", params.preImageArray);

            }

            data.append('postMediaContent', params.preImageArray.length > 0 ? JSON.stringify(params.preImageArray) : "")
            data.append('id', params?.id);
            data.append('postImg', '');
            data.append('userId', params.userId);
            data.append('postTitle', params.postTitle);
            data.append('postBody', params.postBody);
            data.append('postExpires', params.postExpires);
            data.append('startDate', params.startDate);
            data.append('endDate', params.endDate);
            data.append('isVIPonly', params.isVIPonly);
            data.append('isUSAonly', params.isUSAonly);
            data.append('numOfWinners', params.winnerCount);
            console.log("GIVEATWA__Update=-=-=-=", data);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response)
                    console.log('giveaway update response', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(error)
                    console.log('errror', error)
                });
        });


    }

    static async deleteGiveawayData(params) {

        return new Promise(async (resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.DELETE_GIVEAWAY;
            let data = new FormData()

            data.append('id', params?.id);
            data.append('userId', params?.userId);

            console.log("GIVEATWA__End", data);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response)
                    console.log('giveaway delete response', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(error)
                    console.log('errror', error)
                });
        });


    }

    static async endGiveawayData(params) {

        return new Promise(async (resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.END_GIVEAWAY;
            let data = new FormData()

            data.append('giveawayId', params.giveawayId);
            console.log("GIVEATWA__End", data);
            const headers = {
                'Content-Type': 'multipart/form-data'
            }

            await HttpClient.post(endpoint, data, { headers })
                .then((response) => {
                    resolve(response)
                    console.log('giveaway end response', JSON.stringify(response))
                })
                .catch((error) => {
                    reject(error)
                    console.log('errror', error)
                });
        });


    }

























    static async withDrawGiveawaydata(data) {

        return new Promise((resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.WITH_DRAW;
            const body = JSON.stringify({
                "giveawayId": data?.giveawayId,
                "participantId": data?.participantId
            })

            HttpClient.post(endpoint, body)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }

    static async getSingleGiveAwayById(data) {

        return new Promise((resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.GET_SINGLE_GIVEAWAY_BY_ID;
            const body = JSON.stringify({
                "giveawayId": data?.giveawayId,
                "loggedInUserId": data?.userId
            })
            HttpClient.post(endpoint, body)
                .then((response) => {

                    resolve(response)

                    // showMessage({
                    //     message: 'Participant withdrawn from the giveaway',
                    //     type: 'success'
                    // })
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
    }
}
