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
          console.log("Final response", response);
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
          console.log('########   postImg', item.image)
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

  // post by user id

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

  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}
