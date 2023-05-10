import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { HttpClient } from './HttpClient';

export class GiveAwayController {

    // create post
    static async createGiveAwayPost(params) {

        return new Promise(async (resolve, reject) => {

            const endpoint = API_BASE_URL + API_END_POINTS.GIVE_AWAY_POST_ENDPOINT;
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

            data.append('postImg', '');
            data.append('userId', params.userId);
            data.append('postTitle', params.postTitle);
            data.append('postBody', params.postBody);
            data.append('postExpires', params.postExpires);
            data.append('startDate', params.startDate);
            data.append('endDate', params.endDate);
            data.append('isVIPonly', params.isVIPonly);
            data.append('isUSAonly', params.isUSAonly);
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
