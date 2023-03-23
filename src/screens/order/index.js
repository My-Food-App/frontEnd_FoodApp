import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLOR, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');

export function Order({navigation}) {
  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Trang đặt hàng
        </Text>
        <TouchableOpacity>
          <Icon name="ellipsis-h" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderInforOrder() {
    return (
      <ScrollView style={styles.inforOrderContainer}>
        <View>
          <TouchableOpacity style={styles.inforItemContainer}>
            <View style={{flexDirection:'row'}}>
              <Icon name="motorcycle" size={25} color={COLOR.GREEN2} />
              <View style={{marginLeft: 20}}>
                <Text style={[styles.txtStyle,{fontSize:18,fontWeight:'600'}]}>Giao hàng</Text>
                <Text>Giao hàng ngay (30 phút)</Text>
              </View>
            </View>
            <Icon name="angle-right" size={25} color={COLOR.BLACK} />
          </TouchableOpacity>   
          <TouchableOpacity style={styles.inforItemContainer}>
            <View style={{flexDirection:'row'}}>
              <Icon name="map-marker-alt" size={25} color={COLOR.RED} />
              <View style={{marginLeft: 20}}>
                <Text style={[styles.txtStyle,{fontSize:20,fontWeight:'600'}]}>334/25 Lê Quang Định</Text>
                <Text>Khoảng 2 Km</Text>
              </View>
            </View>
            <Icon name="angle-right" size={25} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsOrderContainer}>
            <Text style={[styles.txtStyle,{fontSize:20,marginHorizontal:20,fontWeight:'600'}]}>Tóm tắt đơn đặt hàng</Text>
            <View>
            <TouchableOpacity style={styles.inforItemContainer}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{color:COLOR.MAIN, fontSize:16, fontWeight:'500'}}>2x</Text>

                <Text style={[styles.txtStyle,{fontSize:20,fontWeight:'600', marginLeft:20}]}>Cơm chiên trứng</Text>

            </View>
            <Text style={[styles.txtStyle,{fontSize:16}]}>200.000₫</Text>
          </TouchableOpacity>
            </View>
            <View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', paddingHorizontal:20,marginTop:10}}>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>Tổng tạm tính</Text>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>200.000₫</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', paddingHorizontal:20,marginTop:10}}>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>Phí áp dụng</Text>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>20.000₫</Text>
                </View>
            </View>
        </View>
        <View style={styles.itemsOrderContainer}>
        <Text style={[styles.txtStyle,{fontSize:20,marginHorizontal:20,fontWeight:'600'}]}>Tùy chọn</Text>
        <TouchableOpacity style={styles.optionItemContainer}>
            <View style={{flexDirection:'row'}}>
              <Icon name="money-bill" size={25} color={COLOR.lightGray} />
              <View style={{marginLeft: 20}}>
                <Text style={[styles.txtStyle,{fontSize:16}]}>Tiền mặt</Text>
              </View>
            </View>
            <Icon name="angle-right" size={25} color={COLOR.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItemContainer}>
            <View style={{flexDirection:'row'}}>
              <Fontisto name="shopping-sale" size={30} color={COLOR.ORGANGE} />
              <View style={{marginLeft: 20}}>
                <Text style={[styles.txtStyle,{fontSize:16}]}>Áp dụng ưu đãi để được giảm giá</Text>
              </View>
            </View>
            <Icon name="angle-right" size={25} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.totalPriceContainer}>
          <Text style={[styles.txtStyle, {fontSize: 18}]}>Tổng cộng</Text>
          <Text style={[styles.txtStyle, {fontSize: 18, fontWeight: '600'}]}>
            330.333 đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnOrderContainer}
          onPress={() => {
            navigation.navigate('Order');
          }}>
          <Text style={[{fontSize: 18, fontWeight: '700'}, styles.txtStyle]}>
            Đặt đơn
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderInforOrder()}
      {renderFooter()}
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
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLOR.lightGray3,
    height: 50,
    backgroundColor: COLOR.WHITE,
  },
  inforOrderContainer: {
    flex: 1,
  },
  inforItemContainer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomWidth:1,
    borderBottomColor: COLOR.lightGray2,
    backgroundColor:COLOR.WHITE
  },
  txtStyle:{
    color: COLOR.BLACK
  },
  itemsOrderContainer:{
    borderTopWidth:5,
    borderColor:COLOR.lightGray2,
    paddingVertical:10
  },
 optionItemContainer : {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor:COLOR.WHITE
  },
  footerContainer: {
    height: 150,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: COLOR.BLUE_GRAY,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnOrderContainer: {
    height: 50,
    backgroundColor: COLOR.MAIN,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
