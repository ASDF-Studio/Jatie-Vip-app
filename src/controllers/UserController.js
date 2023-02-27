import { API_BASE_URL, API_END_POINTS } from '@/constants';
import { strings } from '@/localization';
import { HttpClient } from './HttpClient';

export class UserController {
  // static async login(username, password) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (username && password) {
  //         resolve({ username });
  //       } else {
  //         reject(new Error(strings.login.invalidCredentials));
  //       }
  //     }, 500);
  //   });
  // }
  static async login(number) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.LOGIN;
      var data = JSON.stringify({
        "phoneNumber": number
      });
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log(" login values", response);
          resolve(response);
        })
        .catch((error) => {
          console.log("ERROR=-=-=-=", error);
          reject(new Error(error));
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
          console.log(" Verify Otp values", response);
          resolve(response);
        })
        .catch((error) => {
          console.log(" Verify Otp values", error);
          reject(new Error(error));
        });
    });
  }


  static async checkUserName(username) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.CHECK_USERNAME;
      var data = JSON.stringify({
        "username": username
      });
      console.log("query_data", data)
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log("Check-USername", JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          console.log("errorsd", error)
          reject(new Error(error));
        });
    });
  }
  static async updateProfile(dob, fullname, gender, id, primaryEmail, location, username) {
    return new Promise((resolve, reject) => {
      const endpoint = API_BASE_URL + API_END_POINTS.UPDATE_USER;
      var data = JSON.stringify({
        "id": id,
        "fullname": fullname,
        "primaryEmail": primaryEmail,
        "location": location,
        "username": "username",
        "dob": dob,
        "gender": gender
      });

      console.log("dadasdasdasdasdasdas", data)
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log("Update_user", JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          console.log("errr", error)
          reject(new Error(error));
        });
    });
  }
  static async upload_Profile_Pic(file, number) {

    return new Promise((resolve, reject) => {
      // const endpoint = API_BASE_URL + API_END_POINTS.UPLOAD_PROFILE_PIC;
      const endpoint = "https://24c4-103-223-15-30.in.ngrok.io/api/upload"
      let filename = file.split("/").pop();
      let fileType = filename.split(".").pop();
      var obj = {
        uri: file,
        name: filename,
        type: fileType,
      };
      var data = new FormData()
      data.append('myimage', obj);
      data.append('phoneNumber', number)
      // console.log("query_data___NEWWWWWWWWWWWWWW", JSON.stringify(data))
      HttpClient.post(endpoint, data)
        .then((response) => {
          // console.log("Upload Profile=-=-=-=-", JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          console.log("Upload Error=-=-=-=-", JSON.stringify(error));
          reject(new Error(error));
        });
    });
  }


  static async logout() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}
