import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import * as Location from 'expo-location';
import {getDistance, getPreciseDistance} from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import _ from 'lodash';
export function GetLocation1({navigation}) {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...',
  );

  const str = '12 Nguyễn Văn Bảo, Phường 4,Quận Gò Vấp, Thành Phố Hồ Chí Minh';
  const test = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  console.log('test: ' + test);

  const addressUser =
    '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành Phố Hồ Chí Minh';

  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const calculateDeliveryPrice = async () => {
    try {
      // Get user address from Firestore
      const apiKey =
        'Amn9jc6ebY9SAWGjrWUkv4SIPBGtADQQjxfJmsxmYzAeqCxkS4VMGVyDn1upfyiY';
      //  const userId = firebase.auth().currentUser.uid;
      // const userDoc = await firebase.firestore().collection('users').doc(userId).get();
      const userAddress =
        '12 Nguyễn Văn Bảo, Phường 4,Quan Gò Vấp, Thành Phố Hồ Chí Minh';
      // const userAddress ='12 Nguyen Van bao, Phuong 4, Quận Go Vap, Thanh pho Ho Chi Minh';

      const storeAddress =
        '16/19 Nguyen Van Nghi, Phuong 5, Quan Go Vap, Thanh pho Ho Chi Minh';

      // Get coordinates of user location and delivery location
      const iuhLocation = {
        latitude: 10.822337659582468,
        longitude: 106.68575779533174,
      };
      const response = await axios.get(
        `http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=${test}%2Cwa&wp.1=${storeAddress}%2Cwa&avoid=minimizeTolls&key=${apiKey}`,
      );
      // console.log('resource = >>>', response);

      const resources = response.data.resourceSets[0].resources;
      const travelDistance = resources[0].travelDistance;
      console.log('resources', resources);
      console.log('Khoang cach', travelDistance);

      // Calculate delivery price based on distance
      const deliveryPricePerKm = 5000;
      const deliveryPrice = travelDistance * deliveryPricePerKm;
      console.log('Gia', deliveryPrice);

      setDeliveryPrice(deliveryPrice);
    } catch (error) {
      console.log(error);
      setDeliveryPrice(0);
    }
  };

  useEffect(() => {
    calculateDeliveryPrice();
  }, []);

  // useEffect(() => {
  //   CheckIfLocationEnabled();
  //   GetCurrentLocation();
  // }, [displayCurrentAddress]);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    console.log('hello');
    let {status} = await Location.requestForegroundPermissionsAsync();
    console.log('status', status);
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
    console.log('cord: =>>>>>>>>>>');
    let {coords} = await Location.getCurrentPositionAsync();
    console.log('cord: =>>>>>>>>>>', coords);
    if (coords) {
      const {latitude, longitude} = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        // console.log(item)
        let address = `${item.name}, ${item.street}, ${item.subregion}, ${item.region}`;
        console.log('location', item);
        setDisplayCurrentAddress(address);

        if (address.length > 0) {
          setTimeout(() => {
            navigation.navigate('Home', {item: address});
          }, 2000);
        }
      }
    }
  };
  // Tính khoảng cách
  const pdis = getPreciseDistance(
    {latitude: 10.823859756666916, longitude: 106.68670546328143},
    {latitude: 10.8219425, longitude: 106.6891062},
  );
  //  console.log(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="map-marker-alt" size={30} color={'red'} />
        <Text style={styles.title}>What's your address???</Text>
      </View>
      <Text style={styles.text}>{displayCurrentAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    paddingTop: 130,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FD0139',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
});

// import React, {useState, useEffect} from 'react';
// import {Platform, Text, View, StyleSheet} from 'react-native';
// //import * as Location from 'expo-location';
// import GetLocation from 'react-native-get-location';

// export function GetLocation1() {
//   const [location, setLocation] = useState('helo');
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     GetLocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 60000,
//     })
//       .then(location => {
//         console.log("location",location);

//       })
//       .catch(error => {
//         const {code, message} = error;
//         console.warn(code, message);
//       });
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{location}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });
