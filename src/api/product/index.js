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
  discount,
  category
}) => {
  var data = JSON.stringify({
    name,
    description,
    idStore,
    price,
    image,
    discount,
    category
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

export const updateProduct = async ({
  id,
  name,
  description,
  price,
  image,
  discount,
  category
}) => {
  let data = JSON.stringify({
    id,
    name,
    description,
    price,
    image,
    discount,
    category
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/products/updateProduct/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteProduct = async ({id}) =>{
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/products/deleteProduct/${id}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}
