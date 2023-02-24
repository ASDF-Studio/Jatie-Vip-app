export const VerifyQuery = (number, Otp) => `query MyQuery {
    verifyotp(otp: `+ Otp + `, phoneNumber: ` + number + `) {
      id
    }
  }`;
export const checkUserNameQuery = (username) => `query MyQuery {
  users(where: {username: {_eq: `+ JSON.stringify(username) + `}}) {
    username
  }
}`;
