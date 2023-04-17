import axios from 'axios';
import {ip} from '../../ipconfig';

export const getStores = async () => {
  data = await (await axios.get(`http://${ip}:3005/api/v1/stores/`)).data;
  return data;
};

export const findStoreByUserId = async ({userId}) => {
  var data = JSON.stringify({
    keyWord: userId,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/stores/findByUserId`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  value = (await axios(config)).data;
  return value;
};

export const createStore = async ({
  name,
  description,
  userId,
  tag = '',
  type,
  image,
  address,
  email,
  phone,
}) => {
  var data = JSON.stringify({
    name,
    description,
    userId,
    tag,
    email,
    phone,
    address,
    image
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/stores/createStore`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getStoreById = async ({storeId}) =>{

  data = await (await axios.get(`http://${ip}:3005/api/v1/stores/${storeId}`)).data;
  return data;

}