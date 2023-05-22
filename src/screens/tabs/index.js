import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getNotyficationByUserId,updateNotification} from '../../api';
import socket from '../../api/socket';

import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Home, Notification, User, MyStore} from '../index';

const Tab = createBottomTabNavigator();

export function Tabs() {
  const [notification, setNotification] = useState([]);
  const [notifi, setNotifi] = useState(0);
  const [user, setUser] = useState(null);
  const [notificationSeen, setNotificationSeen] = useState([]);
  const [notificationNotSeen, setNotificationNotSeen] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      setUser(JSON.parse(result));
    });
  }, []);

  useEffect(() => {
    loaddingNotifications();
  }, [user]);

  useEffect(() => {  
    socket.on("LOAD_LIST_NOTIFICATION", function () {
     if(user){
      loaddingNotifications();
     }
    });
  }, [user]);

  const loaddingNotifications = async () => {
   if(user){
    const userId = user._id
    const data = await getNotyficationByUserId({userId});
    setNotification(data);
   }
  };

  // useEffect(() => {
  //   AsyncStorage.getItem('notifi').then(result => {
  //     if (result != null) {
  //       setNotifi(JSON.parse(result));
  //     } else {
  //       AsyncStorage.setItem('notifi', '0');
  //       setNotifi(0);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setNotificationSeen(notification.filter(checkStatus1));
     function checkStatus1(item) {
       return item.status == 'Đã xem';
     }
   }, [notification]);
   useEffect(() => {
    setNotificationNotSeen(notification.filter(checkStatus1));
     function checkStatus1(item) {
       return item.status == 'Chưa xem';
     }
   }, [notification]);

  console.log('======NOTYFI-----Not', notificationNotSeen);
 const  handleUpdateStatus = async (array) => {
  for (let index = 0; index < array.length; index++) {
    let id = array[index]._id
    await updateNotification({id})
  }

 }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? COLOR.BLUE : COLOR.BLACK;

          switch (route.name) {
            case 'Trang chủ':
              return (
                <Image
                  source={icons.home_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'Thông báo':
              return (
                <View>
                  <Image
                    source={icons.notification_icon}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                 {(notification.length - notificationSeen.length) != 0 &&  <View
                    style={{
                      backgroundColor: 'red',
                      marginTop: -15,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                      paddingHorizontal: 5,
                    }}>
                    <Text style={{color: COLOR.WHITE, fontSize: 12}}>
                      {notification.length - notificationSeen.length}
                    </Text>
                  </View>}
                </View>
              );

            case 'Cửa hàng':
              return (
                <Image
                  source={icons.store_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Tôi':
              return (
                <Image
                  source={icons.user_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Cửa hàng" component={MyStore} />
      <Tab.Screen
        name="Thông báo"
        component={Notification}
        listeners={{
          tabPress: async () => {
          await  handleUpdateStatus(notificationNotSeen)
          setTimeout(() => {
            socket.emit('ADD_NOTIFICATION');
          }, 1000)
          },
        }}
      />
      <Tab.Screen name="Tôi" component={User} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
