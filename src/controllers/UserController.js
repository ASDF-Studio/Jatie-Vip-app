import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { strings } from '@/localization';
import { HttpClient } from './HttpClient';
import { showMessage } from 'react-native-flash-message';
import { customShowMessage } from '@/utils';

export class UserController {
  static async login(number) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.LOGIN;
      var data = JSON.stringify({
        phoneNumber: number,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  static async verifyOtp(number, Otp) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.VERIFY_OTP;
      var data = JSON.stringify({
        phoneNumber: number,
        otp: Otp,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static async checkUserName(username) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.CHECK_USERNAME;
      var data = JSON.stringify({
        username: username,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static async updateProfile(
    dob,
    fullname,
    gender,
    id,
    primaryEmail,
    location,
    username,
    file,
    mimeType
  ) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_USER;
      var data = new FormData();
      if (mimeType !== null) {
        let filename = file.split('/').pop();
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
        'Content-Type': 'multipart/form-data',
      };
      HttpClient.post(endpoint, data, { headers })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static async upload_Profile_Pic(file, mimeType, number) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPLOAD_PROFILE_PIC;
      let filename = file.split('/').pop();
      var obj = {
        uri: file,
        name: filename,
        type: mimeType,
      };
      var data = new FormData();
      data.append('myimage', obj);
      data.append('phoneNumber', number);
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      HttpClient.post(endpoint, data, { headers })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  }

  static async followUser(followerId, followId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.VERIFY_OTP;
      var data = JSON.stringify({
        followerId: followerId,
        followId: followId,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static async unFollowUser(unFollowerId, followId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.VERIFY_OTP;
      var data = JSON.stringify({
        unfollowerId: unFollowerId,
        followId: followId,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // get User profile by user id API
  static async getUserProfileByUseridAPI(userId, loggedInID) {
    return new Promise((resolve, reject) => {
      const endpoint =
        API_BASE_URL + API_END_POINTS.GET_USER_PROFILE_BY_USER_ID;
      var data = {
        id: userId,
        loggedInUserId: loggedInID,
      };
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(
            'response of every single user',
            JSON.stringify(response)
          );
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // create post

  static async createPost(
    id,
    postTitle,
    postBody,
    file,
    mimeType,
    imageArray,
    isVip
  ) {
    console.log('first', imageArray);
    return new Promise(async (resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.CREATE_POST;
      let data = new FormData();
      if (mimeType !== null) {
        let obj = [];
        imageArray &&
          imageArray?.slice(0, 3)?.map(item => {
            let filename = item.image.split('/').pop();
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
      data.append('isVIPonly', isVip);

      data.append('postImg', mimeType == null && file);
      console.log('CREATE__POST', data);

      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      await HttpClient.post(endpoint, data, { headers })
        .then(response => {
          resolve(response);
          console.log('response of create post', response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  //update post
  static async updatePost({
    id,
    userId,
    postTitle,
    postBody,
    file,
    preImageArray,
    mimeType,
    preMimeType,
    imageArray,
    userType,
    isPinned = false,
    vipOnly = false,
    schedulePost = false,
    scheduleDetails,
    goingLIve = false,
    ad = false,
    publishDate,
    expireDate,
  }) {
    return new Promise(async (resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_POST;
      let data = new FormData();
      console.log(
        '=======================',
        id,
        userId,
        postTitle,
        postBody,
        preImageArray,
        imageArray,
        isPinned,
        vipOnly,
        schedulePost,
        scheduleDetails,
        goingLIve,
        ad,
        '======================='
      );

      imageArray.forEach(item => {
        const fileName = item.video
          ? item.video.split('/').pop()
          : item.image.split('/').pop();

        const url = item.video ? item.video : item.image;
        const mime = item.video ? item.videoMime : item.imageMime;

        data.append('myimage', {
          uri: url,
          name: fileName,
          type: mime,
        });

        if (item.video) {
          const posterName = item.videoPoster.split('/').pop();
          data.append('videoPoster', {
            uri: item.videoPoster,
            name: posterName,
            type: item.videoPostermime,
          });
        }
      });

      data.append(
        'postMediaContent',
        preImageArray.length > 0 ? JSON.stringify(preImageArray) : ''
      );
      console.log('ispinned =====', isPinned);
      data.append('id', id);
      data.append('userId', userId);
      data.append('postTitle', postTitle);
      data.append('postBody', postBody);
      data.append('isPinned', isPinned);
      data.append('isVIPonly', vipOnly);
      data.append('isVisible', true);
      // data.append('postImg', preFile);
      // data.append('userType', userType);

      if (schedulePost) {
        data.append('isScheduled', schedulePost);
        data.append('scheduleDetails', scheduleDetails);
      }

      data.append('goingLive', goingLIve);

      if (ad) {
        data.append('isAdvertisement', ad);
        data.append('publishDate', publishDate);
        data.append('expiryDate', expireDate);
      }

      // return false
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      console.log('  ======', data);
      await HttpClient.post(endpoint, data, { headers })
        .then(response => {
          console.log('resonse -================', response);
          resolve(response);
        })
        .catch(error => {
          console.log('error ================', error);
          reject(error);
        });
    });
  }

  //delete post

  static async deletePost(id, postUserId, userId, userType) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.DELETE_POST;
      var data = JSON.stringify({
        id: id,
        postUserID: postUserId,
        userId: userId,
        userType: userType,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  //up voted

  static async upVote(id, userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPVOTE_POST;
      var data = JSON.stringify({
        id: id,
        likeUserID: userId,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // down vote

  static async downVote(id, userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.DOWNVOTE_POST;
      var data = JSON.stringify({
        id: id,
        unlikeUserID: userId,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // create post by admin

  static async createPostByAdmin({
    id,
    postTitle,
    postBody,
    file,
    mimeType,
    imageArray,
    screen,
    vipOnly,
    schedulePost,
    scheduleDetails,
    goingLIve,
    ad,
    publishDate,
    expireDate,
    isPinned,
  }) {
    return new Promise(async (resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.CREATE_POST_ADMIN;
      let data = new FormData();

      imageArray.forEach(item => {
        const fileName = item.video
          ? item.video.split('/').pop()
          : item.image.split('/').pop();

        const url = item.video ? item.video : item.image;
        const mime = item.video ? item.videoMime : item.imageMime;

        data.append('myimage', {
          uri: url,
          name: fileName,
          type: mime,
        });

        if (item.video) {
          const posterName = item.videoPoster.split('/').pop();
          data.append('videoPoster', {
            uri: item.videoPoster,
            name: posterName,
            type: item.videoPostermime,
          });
        }
      });

      data.append('isPinned', isPinned);
      data.append('userId', id);
      data.append('postTitle', postTitle);
      data.append('postBody', postBody);
      // data.append('postImg', mimeType == null && file);
      data.append('isVIPonly', vipOnly);

      if (schedulePost) {
        data.append('isScheduled', schedulePost);
        data.append('scheduleDetails', scheduleDetails);
      }

      data.append('goingLive', goingLIve);

      if (ad) {
        data.append('isAdvertisement', ad);
        data.append('publishDate', publishDate);
        data.append('expiryDate', expireDate);
      }

      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      await HttpClient.post(endpoint, data, { headers })
        .then(response => {
          resolve(response);
          console.log('response of create post', JSON.stringify(response));
        })
        .catch(error => {
          reject(error);
          console.log('error in create post', error);
        });
    });
  }

  // // post by user id

  static async postByUserId(id, page, loggedInUserId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.POST_BY_USERID;
      var data = JSON.stringify({
        loggedInUserId,
        userId: id,
        dateCursor: page,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          // console.log('resonse of posts id   ', response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  // post by id
  static async postById(id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.POST_BY_ID;
      var data = JSON.stringify({
        id: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  // post by admin id
  static async postByAdminId(id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.POST_BY_ADMIN_ID;
      var data = JSON.stringify({
        id: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  // all post by admin

  static async getAllPostByAdmin(loggedInUserId) {
    return new Promise(async (resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.ALL_POST_ADMIN;
      await HttpClient.post(endpoint, {
        loggedInUserId,
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  // get all pinned post

  static async getAllPinnedPost() {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.ALL_PINNED_POST;
      HttpClient.post(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  static async getAllPost() {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.ALL_POST;
      HttpClient.post(endpoint)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  static async followersList(userId, id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.FOLLOWERS;
      var data = JSON.stringify({
        loggedInUserId: userId,
        id: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  static async BlockListRequest(userId) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.BLOCK_LIST;
      var data = JSON.stringify({
        id: userId,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  static async searchUserRequest(searchuservalue) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.SEARCH_USER;
      var data = JSON.stringify({
        searchWord: searchuservalue,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log('response of search user users', response);
        })
        .catch(error => {
          reject(new Error(error.message));
        });
    });
  }

  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }

  static async getAllActivityRequestApi(id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.GET_ALL_ACTIVITY;
      var data = JSON.stringify({
        loggedInUserId: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of all activity', error);
        });
    });
  }

  static async manageAllreportsRequestApi({
    isArchived,
    viewStatus,
    dateCursor,
  }) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.MANAGE_ALL_REPORTS;

      const body = JSON.stringify({
        isArchived,
        viewStatus: viewStatus ? 'unread' : 'all',
        dateCursor,
      });

      HttpClient.post(endpoint, body)
        .then(response => {
          resolve(response);
          // console.log('response of all managereports', response.data)
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of all manage Reports', error);
        });
    });
  }

  static async getAllBannedUsersRequest() {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.GET_ALL_BANNED_USERS;

      HttpClient.post(endpoint)
        .then(response => {
          resolve(response);
          console.log('response of all banned Users', response);
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of all banned users', error);
        });
    });
  }

  static async unBannedUserRequest(id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UNBANNED_USER_BY_ID;
      var data = JSON.stringify({
        userId: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log('response of unBanned User', response);
          customShowMessage({
            message: 'User Unbanned',
            type: 'success',
          });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of  UnBanned user', error);
        });
    });
  }

  static async bannedUserRequest(id) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.BANNED_USER_BY_ID;
      var data = JSON.stringify({
        userId: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log('response of banned User', response);
          customShowMessage({
            message: 'User Banned',
            type: 'success',
          });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of  banned user', error);
        });
    });
  }

  static async AllNotificationsRequest(id, read) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.GET_ALL_NOTIFICATIONS;

      //  console.log("endPoint", endpoint)
      var data = JSON.stringify({
        loggedInUserId: id,
        viewStatus: read == true ? 'unread' : 'all',
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(
            'response of All Notifications',
            JSON.stringify(response)
          );
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }

  static async markAllNotificationsRequest(id) {
    return new Promise((resolve, reject) => {
      const endpoint =
        API_BASE_URL + API_END_POINTS.MARK_ALL_READ_NOTIFICATIONS;

      //  console.log("endPoint", endpoint)
      var data = JSON.stringify({
        loggedInUserId: id,
      });
      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(
            'response of mark read Notifications',
            JSON.stringify(response)
          );
          customShowMessage({
            message: 'All Notifications are read',
            type: 'success',
          });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }

  static async markSingleNotificationsRequest(userId, notifId) {
    return new Promise((resolve, reject) => {
      const endpoint =
        API_BASE_URL + API_END_POINTS.MARK_SINGLE_READ_NOTIFICATIONS;

      //  console.log("endPoint", endpoint)

      var data = JSON.stringify({
        loggedInUserId: userId,
        notificationId: notifId,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(
            'response of mark read Notifications',
            JSON.stringify(response)
          );
          // customShowMessage({
          //   message: 'All Notifications are read',
          //   type: 'success',
          // });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }

  static async archiveReport({ reportID }) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.ARCHIVE_REPORT;

      //  console.log("endPoint", endpoint)

      var data = JSON.stringify({
        id: reportID,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(JSON.stringify(response));
          customShowMessage({
            message: 'Report Archived Successfully',
            type: 'success',
          });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }

  static async ReportUser({
    reportedUserId,
    loggedInUserId,
    reportTitle,
    reportBody,
    reportImg,
  }) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.USER_REPORT_CREATE;

      const data = JSON.stringify({
        userId: reportedUserId,
        reportedBy: loggedInUserId,
        reportTitle,
        reportBody,
        reportImg,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(JSON.stringify(response));
          // customShowMessage({
          //   message: 'User Reported Successfully',
          //   type: 'success',
          // });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }
  static async MarkSingleReportRead({ reportId }) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.SINGLE_REPORT_READ;

      const data = JSON.stringify({
        reportId,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(JSON.stringify(response));
          // customShowMessage({
          //   message: 'User Reported Successfully',
          //   type: 'success',
          // });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }

  static async UpdateNotificationSettings({
    loggedInUserId,
    notifyForJatieLive,
    notifyForJatiePost,
    notifyOneHourBeforeJatieLive,
    notifyForSomeOneReactPost,
    notifyForSomeoneCommentsOnMyPost,
    notifyForFollowingUserPost,
  }) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.USER_NOTIFICATION_SETTINGS;

      const data = JSON.stringify({
        loggedInUserId,
        notify_for_jatie_live: notifyForJatieLive,
        notify_for_jatie_post: notifyForJatiePost,
        notify_for_one_hour_beofre_jatie_live: notifyOneHourBeforeJatieLive,
        notify_for_someone_react_on_my_post: notifyForSomeOneReactPost,
        notify_for_someone_comments_on_my_post:
          notifyForSomeoneCommentsOnMyPost,
        notify_for_following_user_post: notifyForFollowingUserPost,
      });

      HttpClient.post(endpoint, data)
        .then(response => {
          resolve(response);
          console.log(JSON.stringify(response));
          // customShowMessage({
          //   message: 'User Reported Successfully',
          //   type: 'success',
          // });
        })
        .catch(error => {
          reject(new Error(error.message));
          console.log('error of All notifications', error);
        });
    });
  }
}
