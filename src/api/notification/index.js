import axios from 'axios';
import {ip} from '../../ipconfig';

export const createNotification = async ({
  name,
  value,
  userId,
  created_date,
}) => {
  let data = JSON.stringify({
    name,
    value,
    userId,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/notifications/createNotfication`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //   console.log('notify ====', JSON.stringify(response.data));
      //   navigation.navigate('Tabs');
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getNotifications = async () => {
  data = await (
    await axios.get(`http://${ip}:3005/api/v1/notifications/`)
  ).data;
  return data;
};

export const getNotyficationByUserId = async ({userId}) => {
  let data = JSON.stringify({
    keyWord: userId,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/notifications/getByUserId`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  value = (await axios(config)).data;
  return value;
};

export const updateNotification = async ({id}) => {
  let data = JSON.stringify({
    status: 'Đã xem',
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://${ip}:3005/api/v1/notifications/updateNotification/${id}`,
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
