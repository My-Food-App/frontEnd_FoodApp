import axios from 'axios';
import { ip } from '../../ipconfig';
import {Alert } from "react-native";
export const confirmAccount = async ({code, email,navigation}) => {

  var data = JSON.stringify({
   code,
   email
  });
  
  var config = {
    method: 'post',
    url:`http://${ip}:3005/api/v1/auth/verify`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    navigation.navigate("Login")
  })
  .catch(function (error) {
    console.log(error);
    Alert.alert("Sai code")
  });

  // axios
  //   .post(`http://${ip}:3005/api/v1/auth/verify`, {
  //     code,
  //     email,
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     navigation.navigate("Login")
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     Alert.alert("Sai code")
  //   });
};
