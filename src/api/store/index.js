import axios from 'axios';
import { ip } from '../../ipconfig';
export const getStores = async () =>{
   
    data = await (await axios.get(`http://${ip}:3005/api/v1/stores/`)).data
   return data

   // var config = {
   //     method: 'get',
   //     url: `http://${ip}:3005/api/v1/products/`,
   //     headers: { }
   //   };
     
   //   axios(config)
   //   .then(function (response) {
   //     // console.log(JSON.stringify(response.data));
   //     return response.data
   //   })
   //   .catch(function (error) {
   //     console.log(error);
   //   });
   //   return []
}