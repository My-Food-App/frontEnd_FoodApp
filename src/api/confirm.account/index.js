import axios from 'axios';
export const confirmAccount = async ({code, email}) => {
  axios
    .post('http://192.168.1.105:3005/api/v1/auth/verify', {
      code,
      email,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
