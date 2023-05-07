import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLOR, SIZES, FONTS ,icons} from "../../constants";
import {userInfor,data,dataActivities} from "../../data/data";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {deleteAccount} from '../../api';
const {width, height} = Dimensions.get('window');

export const ManagerAccountDetail = ({navigation,route}) => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    let {data} = route.params;
    setUser(data);
   
  }, [data]);

  const handleDelete = async () =>{
    const id = user._id
    await deleteAccount({id}).then(() => {
        navigation.navigate("AdminTabs")
    })
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
          flex: 1,
          paddingHorizontal: 25,
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

  function renderInforUser() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{height: 130, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: user.avatar,
            }}
            resizeMode="cover"
            style={{
              // tintColor: "green",
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 40,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Mã số</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {user._id}
            </Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 40,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Tên</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {user.fullname}
            </Text>
          </View>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 40,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>
              Số điện thoại
            </Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {user.phone}
            </Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 40,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Email</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {user.email}
            </Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 40,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Địa chỉ</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {user.address}
            </Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 40,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Ngày sinh</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {moment(user.birthday).format('DD-MM-YYYY')}
              
              
            </Text>
          </View>
         
        </TouchableOpacity>
      </View>
    );
  }
  function renderActivities() {
    return (
      <View>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',height:60,alignItems:'center',paddingLeft:20,paddingRight:20,backgroundColor:COLOR.WHITE}}>
          <Text style={{color: COLOR.BLACK, fontSize: 18}}>Đổi mật khẩu</Text>
          <Image
            source={icons.next_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',height:60,alignItems:'center',paddingLeft:20,paddingRight:20,marginTop:10,backgroundColor:COLOR.WHITE}}>
          <Text style={{color: COLOR.BLACK, fontSize: 18}}>Xóa tài khoản</Text>
          <Image
            source={icons.next_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={handleLogout}
        style={{justifyContent:'center',alignItems:'center',backgroundColor:COLOR.WHITE,marginVertical:20,height:60}}>
            <Text style={{color:'red',fontSize:20}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }
 if(user){
  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <View style={{height: 50, backgroundColor: COLOR.WHITE}}>
        {renderHeader()}
      </View>
      <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
        {renderInforUser()}
      </View>
      <TouchableOpacity 
        onPress={handleDelete}
        style={{justifyContent:'center',alignItems:'center',backgroundColor:COLOR.WHITE,marginVertical:20,height:60,width:150,borderWidth:1,borderColor:COLOR.RED,borderRadius:10,alignSelf:'center'}}>
            <Text style={{color:'red',fontSize:20}}>Xóa tài khoản</Text>
        </TouchableOpacity>
    </ScrollView>
  );
 }
 else return <></>
};

