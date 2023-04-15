import axios from 'axios';
import {ip} from '../../ipconfig';

export const getUserbyId = async ({id}) => {
    data = await (await axios.get(`http://${ip}:3005/api/v1/users/${id}`)).data;
    return data;
  };