import axios from 'axios';
import {ip} from '../../ipconfig';
import {Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const login = async ({username, password,navigation}) => {
  var data = JSON.stringify({
    username: username,
    password: password,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/auth/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  axios(config)
    .then( async (response) => {
      console.log('user',JSON.stringify(response.data.data));
      await AsyncStorage.setItem('user', JSON.stringify(response.data.data))
      .then(()=> {
       if(response.data.data.status === 'blocked') {
        Alert.alert("Tài khoản của bạn đã bị khóa")
       }else{
        if(response.data.data.role=="user"){
          navigation.navigate("Tabs")
        }
        else if(response.data.data.role=="shipper"){
          navigation.navigate("ShiperTabs")
        }
        else if(response.data.data.role=="admin"){
          navigation.navigate("AdminTabs")
        }
       }
      })
   
      
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert("Tên đăng nhập hoặc mật khẩu không đúng")
    });
};
