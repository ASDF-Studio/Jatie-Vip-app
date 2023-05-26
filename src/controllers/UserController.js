import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { strings } from '@/localization';
import { HttpClient } from './HttpClient';

export class UserController {

  static async login(number) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.LOGIN;
      var data = JSON.stringify({
        "phoneNumber": number
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

  static async verifyOtp(number, Otp) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.VERIFY_OTP;
      var data = JSON.stringify({
        "phoneNumber": number,
        "otp": Otp
      });
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log("LOGIN_R_0-0-0-0ESSSSS", JSON.stringify(response))
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static async checkUserName(username) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.CHECK_USERNAME;
      var data = JSON.stringify({
        "username": username
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
  static async updateProfile(dob, fullname, gender, id, primaryEmail, location, username, file, mimeType) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_USER;
      var data = new FormData()
      if (mimeType !== null) {
        let filename = file.split("/").pop();
        var obj = {
          uri: file,
          name: filename,
          type: mimeType,
        };
        data.append('myimage', obj);
      }
      data.append('id', id);
      data.append('fullname', fullname);
      data.append('primaryEmail', primaryEmail);
      data.append('location', location);
      data.append('username', username);
      data.append('dob', dob);
      data.append('gender', gender);
      data.append('profilePic', mimeType == null && file);
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
  static async upload_Profile_Pic(file, mimeType, number) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPLOAD_PROFILE_PIC;
      let filename = file.split("/").pop();
      var obj = {
        uri: file,
        name: filename,
        type: mimeType,
      };
      var data = new FormData()
      data.append('myimage', obj);
      data.append('phoneNumber', number)
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      HttpClient.post(endpoint, data, { headers })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }


  static async followUser(followerId, followId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.VERIFY_OTP;
      var data = JSON.stringify({
        "followerId": followerId,
        "followId": followId
      });
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log("followerId-0-0-0ESSSSS", JSON.stringify(response))
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async unFollowUser(unFollowerId, followId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.VERIFY_OTP;
      var data = JSON.stringify({
        "unfollowerId": unFollowerId,
        "followId": followId

      });
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log("unfollowerId-0-0-0ESSSSS", JSON.stringify(response))
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  // get User profile by user id API
  static async getUserProfileByUseridAPI(userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.GET_USER_PROFILE_BY_USER_ID;
      var data = {
        id: userId
      }
      HttpClient.post(endpoint, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }




  // create post

  static async createPost(id, postTitle, postBody, postTxt, postImg, mimeType, imageArray) {
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
        // if (isImage == strings.exclusive.video) {
        let obj = [];
        let videoPoster = [];
        var isVideo = false

        imageArray.map(item => {
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
      if (preImageArray.length > 0) {
        let preMedia = [];

        preImageArray.map(item => {
          preMedia = {
            "url": item.url,
            "mimetype": item.mimetype,
            "cover": item.cover
          };

        });
        data.append('postMediaContent', preMedia);

      }
      data.append('id', id);
      data.append('userId', userId);
      data.append('postTitle', postTitle);
      data.append('postBody', postBody);
      // data.append('postImg', preFile);
      data.append('userType', userType);


      console.log("FormDATA=-=-=-=-=-", JSON.stringify(data));
      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      await HttpClient.post(endpoint, data, { headers })
        .then((response) => {
          console.log("respnseeefdsfdsfdsf", response);
          resolve(response);
        })
        .catch((error) => {
          console.log("ERROR", error);
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

  static async upVote(id, userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPVOTE_POST;
      var data = JSON.stringify({
        "id": id,
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

  static async downVote(id, userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.DOWNVOTE_POST;
      var data = JSON.stringify({
        "id": id,
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

  static async createPostByAdmin(id, postTitle, postBody, file, mimeType, imageArray, isImage) {
    return new Promise(async (resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.CREATE_POST_ADMIN;
      let data = new FormData()
      console.log("VIDEO----", imageArray);
      if (mimeType !== null) {
        // if (isImage == strings.exclusive.video) {
        let obj = [];
        let videoPoster = [];
        var isVideo = false
        imageArray.map(item => {
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

      data.append('userId', id);
      data.append('postTitle', postTitle);
      data.append('postBody', postBody);
      data.append('postImg', mimeType == null && file);
      console.log("FORM_DATA_______", JSON.stringify(data));
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      await HttpClient.post(endpoint, data, { headers })
        .then((response) => {
          console.log("POST_CREAT", response);
          resolve(response);
        })
        .catch((error) => {
          console.log("ERROR__RESPONSE", error);

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
          console.log("API_RESPOMSEE_+_+_+_+_+_+_++_+", JSON.stringify(response));
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
          resolve(response);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  static async followersList(userId, id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.FOLLOWERS;
      var data = JSON.stringify({
        "loggedInUserId": userId,
        "id": id
      });
      HttpClient.post(endpoint, data)
        .then((response) => {

          resolve(response);
          console.log('response of list', response.data)


        })
        .catch((error) => {
          console.log('error in folloowers list', error)
          reject(new Error(error.message));
        });
    });
  }

  static async BlockListRequest(userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.BLOCK_LIST;
      var data = JSON.stringify({
        "id": userId
      });
      HttpClient.post(endpoint, data)
        .then((response) => {

          resolve(response);

        })
        .catch((error) => {
          console.log('error in block list', error)
          reject(new Error(error.message));
        });
    });
  }

  static async searchUserRequest(searchuservalue) {

    return new Promise((resolve, reject) => {

      const endpoint = API_BASE_URL + API_END_POINTS.SEARCH_USER;
      var data = JSON.stringify({
        "searchWord": searchuservalue
      });
      HttpClient.post(endpoint, data)
        .then((response) => {

          resolve(response);

        })
        .catch((error) => {
          console.log('error in search user', error)
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
