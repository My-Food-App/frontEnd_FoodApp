import axios from 'axios';
import {ip} from '../../ipconfig';
export const createOrder = async ({
  userId,
  storeId,
  name,
  products,
  shippingfee,
  totalPrice,
  navigation,
}) => {
  var data = JSON.stringify({
    userId,
    storeId,
    name,
    products,
    shippingfee,
    totalPrice,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/orders/createOrder`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log('order ====', JSON.stringify(response.data));
      navigation.navigate('Tabs');
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getOrderByUserid = async ({userId}) => {
  var data = JSON.stringify({
    keyWord: userId,
  });

  var config = {
    method: 'post',
    url: `http://${ip}:3005/api/v1/orders/getByUserId`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  value = (await axios(config)).data;
  return value;
};
