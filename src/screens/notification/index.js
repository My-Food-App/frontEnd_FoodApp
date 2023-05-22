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
  ActivityIndicator,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import {myStore, dataDetail} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {MyModal} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {getNotyficationByUserId} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';
import socket from '../../api/socket';

export function Notification({navigation}) {
  const [notifications, setNotifications] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      setUser(JSON.parse(result));
    });
  }, []);

  

  useEffect(() => {
    loaddingNotifi();
  }, [user]);

  useEffect(() => {
    socket.on("LOAD_LIST_NOTIFICATION", function () {
      loaddingNotifi();
    });
   
  }, [user]);

  const loaddingNotifi = async () => {
    if (user) {
      const userId = user._id;
      const data = await getNotyficationByUserId({userId});
      setNotifications(data);
    }
  };

  // useEffect(() => {
  //   AsyncStorage.getItem('zzzzzzzdade').then(result => {
  //     console.log('==========', result);

  //   });
  // }, [])

  console.log('Notifi===============', notifications);

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Thông báo
        </Text>
        <TouchableOpacity>
          <Icon name="ellipsis-h" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    );
  }
  const renderNotifications = data => {
    const itemSize = width - 30;
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            marginRight: 20,
            paddingRight: 40,
            flexDirection: 'row',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: itemSize,
            height: 85,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLOR.lightGray5,
          }}
          onPress={() => {
            // navigation.navigate('OrderDetail', {data: item});
          }}>
          <View
            style={{
              backgroundColor: item.name === 'Có đơn đặt hàng mới' ? COLOR.MAIN:COLOR.GREEN,
              height: 70,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Icon name="scroll" size={30} color={COLOR.WHITE} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: 80,
              marginHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Text style={FONTS.nameItem}>{item.name}</Text>
            <Text numberOfLines={2} style={{}}>{item.value}</Text>
           
            <Text style={{fontStyle:'italic',marginTop:3,alignSelf:'flex-end'}}> {moment(item.created_date).format('HH:mm DD-MM-YYYY')}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1}}>
        {/* foods */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderHeader()}
     <ScrollView horizontal>
     {notifications && renderNotifications(notifications.reverse())}
     </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLOR.lightGray3,
    height: 50,
    backgroundColor: COLOR.WHITE,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
  },
});
