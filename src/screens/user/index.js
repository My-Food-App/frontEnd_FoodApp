import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {userInfor, data, dataActivities} from '../../data/data';
import {Navigation} from '../../navigation';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

export function User({navigation}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      console.log(result);
      setUser(JSON.parse(result));
    });
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
          flex: 1,
          paddingHorizontal: 25,
          borderBottomWidth: 1,
          alignItems: 'center',
          borderBottomColor: COLOR.lightGray3,
        }}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK}}>
          Thông tin tài khoản
        </Text>
        <TouchableOpacity style={{}}>
          <Image
            source={icons.setting_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  const renderUser = () => {
    if (user) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Account')}>
          <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: user.avatar,
              }}
              resizeMode="cover"
              style={{
                // tintColor: "green",
                width: 60,
                height: 60,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                color: COLOR.BLACK,
                marginLeft: 20,
                fontSize: 18,
                fontWeight: '500',
              }}>
              {user.fullname}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Image
              source={icons.next_icon}
              resizeMode="contain"
              style={{
                // tintColor: "green",
                width: 25,
                height: 25,
                alignSelf: 'flex-end',
                marginRight: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  };

  const renderActivity = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLOR.lightGray3,
          }}
          onPress={() => {
            navigation.navigate('MyOrder');
          }}>
          <Image
            source={icons.bill_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
          <Text>Đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLOR.lightGray3,
          }}
          onPress={() => {
            navigation.navigate('FavoriteStore');
          }}>
          <Image
            source={icons.heart_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
          <Text>Quán yêu thích</Text>
        </TouchableOpacity>
      </View>
    );
  };
  function renderOptionAxtivities(dataActivities) {
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            borderTopWidth: index == 0 ? 0 : 1,
            borderTopColor: COLOR.lightGray3,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              width: 35,
              height: 35,
            }}
          />
          <Text
            style={{
              color: COLOR.BLACK,
              marginLeft: 20,
              fontSize: 18,
              fontWeight: '500',
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={dataActivities}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{height: 50, backgroundColor: COLOR.WHITE}}>
        {renderHeader()}
      </View>
      <View style={{height: 80, backgroundColor: COLOR.WHITE}}>
        {renderUser()}
      </View>
      <View style={{height: 80, backgroundColor: COLOR.WHITE}}>
        {renderActivity()}
      </View>
      <View style={{height: 360, marginTop: 10, backgroundColor: COLOR.WHITE}}>
        {renderOptionAxtivities(dataActivities)}
      </View>
      <View
        style={{
          height: 60,
          marginTop: 10,
          backgroundColor: COLOR.WHITE,
          justifyContent: 'center',
        }}>
        <Text style={{marginLeft: 20, fontSize: 18, color: COLOR.BLACK}}>
          Phiên bản hiện tại v1.1.1
        </Text>
      </View>
    </View>
  );
}
