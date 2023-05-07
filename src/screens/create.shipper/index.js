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
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Input} from '../../components';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addShipper} from '../../api';
const {width, height} = Dimensions.get('window');

export function CreateShipper({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');


    const handleCreateProduct = async () =>{
        await addShipper({username, password, email, fullname, phone}).then(() => navigation.goBack())
    }

    function renderHeader() {
        return (
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: COLOR.BLACK}}>Thêm Shipper</Text>
            <TouchableOpacity style={{}}>
              <Entypo name="dots-three-horizontal" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
        );
      }

      function renderCotent() {
        return (
          <ScrollView
            style={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Tài khoản</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Username..."
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Mật khẩu:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Password..."
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Họ và tên</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Fullname..."
                value={fullname}
                onChangeText={setFullname}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Số điện thoại:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Phone..."
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Email:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Email..."
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </ScrollView>
        );
      }

      const renderFooter = () => {
        return (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => navigation.goBack()}>
              <Text style={styles.txtInBtn}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPost}>
              <Text style={styles.txtInBtn} onPress={handleCreateProduct}>
                Thêm
              </Text>
            </TouchableOpacity>
          </View>
        );
      };

  return (
    <View
      style={styles.container}>
       <View>{renderHeader()}</View>
       <View style={{flex: 1}}>{renderCotent()}</View>
       {renderFooter()}
    </View>
  )
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
      paddingHorizontal: 25,
      borderBottomWidth: 1,
      alignItems: 'center',
      borderBottomColor: COLOR.lightGray3,
      height: 50,
      backgroundColor: COLOR.WHITE,
    },
    contentContainer: {
      marginHorizontal: 20,
      marginTop: 20,
    },
    itemInContent: {
      justifyContent: 'center',
      marginTop: 10,
    },
    textTitle: {
      fontSize: 18,
      fontWeight: '400',
      color: COLOR.BLACK,
    },
    areaTextInput: {
      marginTop: 10,
      height: 100,
      backgroundColor: COLOR.GREY_LIGHT,
      borderRadius: 10,
      paddingLeft: 40,
      paddingRight: 10,
      fontSize: 16,
    },
    dropdown: {
      height: 60,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 10,
      marginTop: 10,
    },
    dropdownDisCount: {
      height: 60,
      width: 200,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 10,
      marginTop: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    footerContainer: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    btnCancel: {
      backgroundColor: COLOR.ORGANGE,
      height: 45,
      width: 110,
      borderRadius: 10,
      justifyContent: 'center',
    },
    btnPost: {
      backgroundColor: COLOR.GREEN2,
      height: 45,
      width: 110,
      borderRadius: 10,
      justifyContent: 'center',
    },
    txtInBtn: {
      color: COLOR.WHITE,
      fontSize: 18,
      fontWeight: '700',
      alignSelf: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  