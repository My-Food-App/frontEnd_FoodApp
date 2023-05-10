import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import {myStore, dataDetail} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {MyModal} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {createPaymentIntent} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';

export function Notification() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false);


  const LoadingView = () => {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const handleSuccess = () => {
    setIsSuccessful(true);
  };

  const handleClose = () => {
    setIsSuccessful(false);
  };

  const SuccessView = ({ message, onClose }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }, [onClose]);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Image
          source={require('./success-icon.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        /> */}
        <Text style={{ fontSize: 18 }}>{message}</Text>
      </View>
    );
  };

  const onCheckout = async () => {
    // 1. Create a payment intent
    const amount = 10000;
    const response = await createPaymentIntent({amount})
    console.log("A==",response)
    if (response.error) {
      Alert.alert('Lỗi thanh toán');
      return;
    }
    // 2. Initialize the Payment sheet

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Le Minh Hieu',
      paymentIntentClientSecret: response.paymentIntent,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (initResponse.error) {
      Alert.alert('Lỗi thanh toán');
      return;
    }

    // 3. Present the Payment Sheet from Stripe

    await presentPaymentSheet()

    // 4. If payment ok -> create the order
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={()=>{setIsSuccessful(true)}}
        style={{backgroundColor: COLOR.MAIN}}>
        <Text>Payment</Text>
        
      </TouchableOpacity>
      {isSuccessful && (
        <SuccessView message="Your action was successful!" onClose={handleClose} />
      )}
    </View>
  );
}
