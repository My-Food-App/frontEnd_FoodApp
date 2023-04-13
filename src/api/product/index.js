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
