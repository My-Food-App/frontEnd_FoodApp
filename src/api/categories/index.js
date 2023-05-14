import axios from 'axios';
import {ip} from '../../ipconfig';

export const getCategories = async () => {
    data = await (await axios.get(`http://${ip}:3005/api/v1/categories/`)).data;
    return data;
  };

export const deleteCategories = async ({id}) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/categories/deleteCategory/${id}`,
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
export const updateCategory = async ({name,image,id}) =>{
  let data = JSON.stringify({
    name,
    image
  });
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/categories/updateCategory/${id}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}

export const addCategory = async ({name,image}) =>{
  let data = JSON.stringify({
    name,image
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/categories/createCategory`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}