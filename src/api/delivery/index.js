import axios from 'axios';
export const calculateDelivery = async ({userAddress, storeAddress}) => {
    // let travelDistance = 1;
    
      try {
        const apiKey =
          'Amn9jc6ebY9SAWGjrWUkv4SIPBGtADQQjxfJmsxmYzAeqCxkS4VMGVyDn1upfyiY';

        const userAddressReplace = userAddress
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const storeAddressReplace = storeAddress
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const response = (await axios.get(
          `http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=${userAddressReplace}%2Cwa&wp.1=${storeAddressReplace}%2Cwa&avoid=minimizeTolls&key=${apiKey}`,
        )).data.resourceSets[0].resources[0].travelDistance
          return response;
          
      } catch (error) {
        console.log(error);
        return 0
      }
    
  };