import axios from 'axios';
export const register = async ({
  username,
  password,
  email,
  created_date,
  fullname,
  phone,
}) => {
  await axios
    .post('http://192.168.1.105:3005/api/v1/auth/register', {
      username,
      password,
      email,
      created_date,
      fullname,
      phone,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
