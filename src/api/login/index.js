import axios from 'axios';
export const login = async ({username, password}) => {
  axios
    .post('http://192.168.1.105:3005/api/v1/auth/login', {
        username,
        password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};