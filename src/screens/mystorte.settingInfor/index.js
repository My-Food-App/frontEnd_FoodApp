import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const width = Dimensions.get('screen').width;
import {data} from '../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

export function MyStoreInfomation({navigation}) {
  const handleCreateStore = () => {
    navigation.navigate('');
  };
  function renderHeader() {
    return (
      <View
        style={styles.headerContainer}>
        <TouchableOpacity
          style={{marginLeft: SIZES.base}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLOR.BLACK,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginRigth: SIZES.base}}
          onPress={() => console.log('Click More')}>
          <Image
            source={icons.more_icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLOR.BLACK,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={styles.containerContent}>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Tên Shop:</Text>
          <TextInput placeholder="Tên Shop" style={styles.textInput}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Mô tả</Text>
          <TextInput placeholder="Mô tả"  style={styles.textInput}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Địa chỉ lấy hàng:</Text>
          <Text style={styles.textImfor}>12 Nguyễn Văn Bảo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Email:</Text>
          <Text style={styles.textImfor}>Hieu2233ckh@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Số điện thoại:</Text>
          <Text style={styles.textImfor}>0829492559</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
        <Text style={styles.textImfor}>Chọn ảnh:</Text>
          <Icon name="image" size={70} style={{ alignSelf:'center'}}/>
        </TouchableOpacity>
        <View>
        <TouchableOpacity onPress={console.log('click')} style={styles.btnSave}> 
          <Text style={styles.txtSave}>Lưu</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR.GREY_LIGHT,
      }}>
      <View>{renderHeader()}</View>
      <ScrollView>{renderContent()}</ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    backgroundColor: COLOR.WHITE,
    width: width,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inforContent:{
    borderBottomWidth:1,
    borderBottomColor:COLOR.lightGray4,
    marginVertical:10,

  },
  textImfor:{
    fontSize:20,
    color:COLOR.BLACK,
    marginBottom:10,
  },
  textInput:{
   marginTop: -10
  },
  headerContainer:{
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    height: 80,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    marginBottom:10
  },
  txtSave:{
      alignSelf:'center',
      fontSize:24,
      color:COLOR.WHITE
  },
  btnSave:{
    alignSelf:'flex-end',
    justifyContent:'center',
    backgroundColor:COLOR.MAIN,
    height:50,
    width:100,
    borderRadius:10
  }
});
