import axios from 'axios';
import {ip} from '../../ipconfig';

export const createPaymentIntent = async ({amount}) => {
  let data = JSON.stringify({
    amount,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/payments/intent`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  value = (await axios(config)).data;
  return value;
};
