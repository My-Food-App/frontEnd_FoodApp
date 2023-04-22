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
import {getOrders} from '../../api';
const {width, height} = Dimensions.get('window');

export function HomeShipper({navigation}) {
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(true);
  const choXacNhanStatus = orders.filter(checkStatus1);
  function checkStatus1(item) {
    return item.status == 'Chờ xác nhận';
  }

  useEffect(() => {
    const fetchData = async () => {
      const pr = await getOrders();
      setOrders(pr);
    };
    fetchData();
  }, [load]);
  console.log("=======================================")
  const renderListOrder = data => {
    const itemSize = width - 20;
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            marginRight: SIZES.radius,
            flexDirection: 'row',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: itemSize,
            height: 80,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLOR.lightGray5,
          }}
          onPress={() => {
            navigation.navigate("OrderDetail",{data:item})
          }}>
          <View
            style={{
              backgroundColor: COLOR.GREEN,
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Icon name="cube" size={30} color={COLOR.WHITE} />
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
            <Text style={FONTS.nameItem}>{item.totalPrice} ₫</Text>
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

  console.log("Order:",orders)
  return (
    <View
      style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={{fontSize:22,fontWeight:'800',color:COLOR.BLACK}}>Danh sách các đơn đặt hàng</Text>
      <TouchableOpacity
        onPress={()=> setLoad(!load)}
      ><Icon name="redo-alt" size={25} color={COLOR.BLACK} /></TouchableOpacity>
      </View>
      <View style={{height:10,backgroundColor:COLOR.lightGray2}}></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {orders && renderListOrder(choXacNhanStatus)}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  headerContainer: {
    height:70,
    alignItems:'center',
    marginHorizontal:10, 
    flexDirection:'row',
    justifyContent:'space-between'
  }

});
