import axios from 'axios';
import {ip} from '../../ipconfig';

export const getAll = async () => {
  data = await (await axios.get(`http://${ip}:3005/api/v1/products/`)).data;
  return data;
};
export const findProductByIdStore = async ({storeId}) => {
  var data = JSON.stringify({
    keyWord: storeId,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/products/findByIdStore`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  value = (await axios(config)).data;
  return value;
};

export const createProduct = async ({
  name,
  description,
  idStore,
  price,
  image,
}) => {
  var data = JSON.stringify({
    name,
    description,
    idStore,
    price,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/products/createProduct`,
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
