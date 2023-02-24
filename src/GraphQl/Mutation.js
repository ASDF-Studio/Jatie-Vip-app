export const SignUpMutation = (number) => `mutation MyMutation {
  signup(phoneNumber: `+ number + `) {
    id
  }
}`;

export const UpdateUserProfileMutation = (dob, fullname, gender, id, location, primaryEmail, username) => `mutation MyMutation {
  updateUser(dob: `+ JSON.stringify(dob) + `, fullname: ` + JSON.stringify(fullname) + `, gender: ` + JSON.stringify(gender) + `, id: ` + JSON.stringify(id) + `, location:` + JSON.stringify(location) + `, primaryEmail: ` + JSON.stringify(primaryEmail) + `, username: ` + JSON.stringify(username) + `) {
    affected_rows
  }
}`; 