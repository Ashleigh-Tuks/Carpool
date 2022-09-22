export const USER_LOGIN = `
  query ($email: String!, $password: String!) {
     login(email: $email, password: $password) {
        id
        token
        email
        isDriver
     }
  }
`;

export const USER_PROFILE = `
  query ($id: String!) {
   findUserById(id: $id) {
      id
      name
      surname
      email
      university
      studentNumber
      cellNumber
   }
  }
`;

export const USER_REGISTER = `
  mutation ($name: String!, $surname: String!, $email: String!, $university: String!, $studentNumber: String!, $password: String!) {
      register(name: $name, surname: $surname, email: $email, university: $university, studentNumber: $studentNumber, password: $password) {
        id
        email
        verificationCode
        expires
      }
  }
`;

export const DRIVER_REGISTER = `
  mutation ($ID: String!, $licensePlate: String!, $carModel: String!, $userId: String!) {
      registerDriver(ID: $ID, licensePlate: $licensePlate, carModel: $carModel, userId: $userId) {
        userId
        idNumber
        license
        licensePlate
        model
        carPicture
      }
  }
`;

export const VERIFY_EMAIL = `
  mutation ($id: String!) {
    verifyEmail(id: $id)
  }
`;

export const USER_UPDATE = `
mutation ($id: String!, $name: String!, $surname: String!, $email: String!, $university: String!, $studentNumber: String!) {
  updateUser(id: $id, name: $name, surname: $surname, email: $email, university: $university, studentNumber: $studentNumber)
}`;
