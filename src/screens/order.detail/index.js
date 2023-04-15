import React, {useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {getUserbyId} from '../../api';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

export function OrderDetail({navigation, route}) {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    let {data} = route.params;
    setData(data);
  }, [data]);

  useEffect(() => {
    if (data) {
      const id = data.userId;
      const fetchData = async () => {
        const pr = await getUserbyId({id});
        setUser(pr);
      };
      fetchData();
    }
  }, [data]);

  console.log('User =>=====>', user);
  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Thông tin đơn hàng
        </Text>
        <TouchableOpacity>
          <Icon name="ellipsis-h" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    );
  }

  const renderCartItem = data => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity style={styles.inforItemContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLOR.MAIN, fontSize: 16, fontWeight: '500'}}>
              {item.quantity}x
            </Text>

            <Text
              style={[
                styles.txtStyle,
                {fontSize: 16, fontWeight: '600', marginLeft: 20},
              ]}>
              {item.name}
            </Text>
          </View>
          <Text style={[styles.txtStyle, {fontSize: 16}]}>{item.total} ₫</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  function renderContentOrder(data) {
    return (
      <View style={styles.contentOrderContainer}>
        <View style={styles.statusContainer}>
          <View>
            <Text
              style={[
                styles.txtStatusOrder,
                {fontSize: 20, fontWeight: '500'},
              ]}>
              Trạng thái đơn hàng
            </Text>
            <Text style={[styles.txtStatusOrder, {fontSize: 18}]}>
              {data.status}
            </Text>
          </View>
          <Icon name="box-open" size={30} color={COLOR.WHITE} />
        </View>
        <View style={styles.clientInforContainer}>
          <Icon name="map-marker-alt" size={20} color={COLOR.BLACK} />
          <View style={{marginLeft: 15}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: COLOR.BLACK,
                marginBottom: 5,
              }}>
              Địa chỉ nhận hàng
            </Text>
            <Text style={styles.txtInforUser}>{user.fullname}</Text>
            <Text style={styles.txtInforUser}>{user.phone}</Text>
            <Text style={styles.txtInforUser}>{user.address.value}</Text>
          </View>
        </View>
        <View style={styles.clientInforContainer}>
          <Icon name="dollar-sign" size={20} color={COLOR.RED} />
          <View style={{marginLeft: 15}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: COLOR.BLACK,
                marginBottom: 5,
              }}>
              Phương thức thanh toán
            </Text>
            <Text style={styles.txtInforUser}>{data.paymentMethod}</Text>
          </View>
        </View>
        <View style={styles.storeInforContainer}>
          <View
            style={{
              borderBottomColor: COLOR.lightGray2,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="store" size={20} color={COLOR.GREEN} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOR.BLACK,
                  marginBottom: 5,
                  marginLeft: 10,
                }}>
                {data.name}
              </Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text style={[styles.txtInforUser, {marginHorizontal: 10}]}>
                Xem shop
              </Text>
              <Icon name="angle-right" size={20} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal>{renderCartItem(data.products)}</ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text style={[styles.txtStyle, {fontSize: 16, fontWeight: '600'}]}>
              Phí vận chuyển
            </Text>
            <Text style={[styles.txtStyle, {fontSize: 16, fontWeight: '400'}]}>
              {data.shippingfee} ₫
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              borderBottomColor:COLOR.lightGray2,
              borderBottomWidth:1
            }}>
            <Text style={[styles.txtStyle, {fontSize: 16, fontWeight: '600'}]}>
              Thành tiền
            </Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: COLOR.RED}}>
              {data.totalPrice} ₫
            </Text>
          </View>
          <View style={{paddingVertical: 10}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={[styles.txtStyle, {fontSize: 16, fontWeight: '600'}]}>
                  Mã đơn hàng
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: '400', color: COLOR.BLACK}}>
                  {data._id.toUpperCase()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={[styles.txtStyle, {fontSize: 16, fontWeight: '400'}]}>
                  Thời gian đặt
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: '400', color: COLOR.BLACK}}>
                  {moment(data.created_date).format('YYYY-MM-DD hh:mm')}

                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (data && user) {
    return (
      <ScrollView style={styles.container}>
        {renderHeader()}
        {renderContentOrder(data)}
      </ScrollView>
    );
  } else {
    return <></>;
  }
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
  contentOrderContainer: {},
  statusContainer: {
    backgroundColor: COLOR.GREEN3,
    color: COLOR.WHITE,
    height: 80,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStatusOrder: {
    color: COLOR.WHITE,
  },
  clientInforContainer: {
    padding: 10,
    // backgroundColor:COLOR.MAIN,
    flexDirection: 'row',
    borderBottomWidth: 10,
    borderBottomColor: COLOR.lightGray2,
  },
  txtInforUser: {
    fontSize: 16,
  },
  //   paymentMethodContainer: {
  //     padding:10
  //   },
  storeInforContainer: {
    padding: 10,
  },
  inforItemContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    // marginHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray2,
    backgroundColor: COLOR.WHITE,
    width: width - 20,
  },
  txtStyle: {
    color: COLOR.BLACK,
  },
});
