import axios from 'axios';
import {ip} from '../../ipconfig';

export const getUserbyId = async ({id}) => {
  data = await (await axios.get(`http://${ip}:3005/api/v1/users/${id}`)).data;
  return data;
};
export const getUsers = async () => {
  data = await (await axios.get(`http://${ip}:3005/api/v1/users/`)).data;
  return data;
};
export const deleteAccount = async ({id}) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/users/deleteById/${id}`,
    headers: {},
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

export const addShipper = async ({
  username,
  password,
  email,
  fullname,
  phone,
}) => {
  let data = JSON.stringify({
    username,
    password,
    email,
    fullname,
    phone,
    role: 'shipper',
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/users/createShipper`,
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

export const updateAccount = async ({
  id,
  password,
  email,
  fullname,
  status,
  phone,
  birthday,
  address,
}) => {
  let data = JSON.stringify({
    password,
    email,
    fullname,
    status,
    phone,
    birthday,
    address,
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/users/updateAccount/${id}`,
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
export const searchAccount = async ({keyWord}) => {
  let data = JSON.stringify({
    keyWord
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/users/findByName`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  value = (await axios(config)).data;
  return value;
}
