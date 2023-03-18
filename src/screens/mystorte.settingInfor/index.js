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
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.radius,
          height: 80,
          width: width,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLOR.WHITE,
        }}>
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
      <ScrollView style={styles.containerContent}>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Tên Shop:</Text>
          <TextInput placeholder="Tên Shop" />
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
        <TouchableOpacity>
        <Text style={styles.textImfor}>Chọn ảnh:</Text>
          {/* <Image 
          source={{uri:'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'}}
            resizeMode="contain"
            style={{
              width: 100,
              height: 70,
              justifyContent:'center',
              alignSelf:'center'
            }}
          /> */}
          <Icon name="image" size={70} color="#900" />
        </TouchableOpacity>
      </ScrollView>
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
      <View>{renderContent()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    marginVertical: 20,
    backgroundColor: COLOR.WHITE,
    width: width,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  inforContent:{
    borderBottomWidth:1,
    borderBottomColor:COLOR.lightGray4,
    marginVertical:20,
    // backgroundColor:'red'
  },
  textImfor:{
    fontSize:20,
    color:COLOR.BLACK,
    marginBottom:10
  }
});
