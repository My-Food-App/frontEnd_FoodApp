import axios from 'axios';
import {ip} from '../../ipconfig';

export const register = async ({
  username,
  password,
  email,
  created_date,
  fullname,
  phone,
  navigation,
}) => {
  var data = JSON.stringify({
    username,
    password,
    email,
    fullname,
    phone,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/auth/register`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      navigation.navigate("ConfirmAccount",{
              email
          });
    })
    .catch(function (error) {
      console.log(error);
    });

  // await axios
  //   .post(`http://${ip}/api/v1/auth/register`, {
  //     username,
  //     password,
  //     email,
  //     fullname,
  //     phone,
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     navigation.navigate("ConfirmAccount",{
  //       email
  //   });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};
