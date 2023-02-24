import { BASE_URL } from '@/constants';
import { SignUpMutation, UpdateUserProfileMutation } from '@/GraphQl/Mutation';
import { checkUserNameQuery, VerifyQuery } from '@/GraphQl/Query';
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
      const endpoint = BASE_URL;
      var data = JSON.stringify({
        query: SignUpMutation(number)
      });
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log(" login values", response);
          resolve(response);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  static async verifyOtp(number, Otp) {
    return new Promise((resolve, reject) => {
      const endpoint = BASE_URL;
      var data = JSON.stringify({
        query: VerifyQuery(number, Otp)
      });
      HttpClient.post(endpoint, data)
        .then((response) => {
          console.log(" Verify Otp values", response);
          resolve(response);
        })
        .catch((error) => {

          reject(new Error(error));
        });
    });
  }


  static async checkUserName(username) {
    return new Promise((resolve, reject) => {
      const endpoint = BASE_URL;

      var data = JSON.stringify({
        query: checkUserNameQuery(username)
      });
      console.log("query_data", data)
      HttpClient.post(endpoint, data)
        .then((response) => {
          // console.log("Check-USername", JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
  static async updateProfile(dob, fullname, gender, id, primaryEmail, location, username) {
    return new Promise((resolve, reject) => {
      const endpoint = BASE_URL;

      var data = JSON.stringify({
        query: UpdateUserProfileMutation(dob, fullname, gender, id, primaryEmail, location, username)
      });

      console.log("query_data___NEWWWWWWWWWWWWWW", data)
      HttpClient.post(endpoint, data)
        .then((response) => {
          // console.log("Check-USername", JSON.stringify(response));
          resolve(response);
        })
        .catch((error) => {
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
