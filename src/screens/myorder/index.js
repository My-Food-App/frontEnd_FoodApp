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
import axios from 'axios';
import {ip} from '../../ipconfig';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {getOrderByUserid} from '../../api';
const {width, height} = Dimensions.get('window');
export function MyOrder({navigation}) {
  const [orders, setOrders] = useState([]);
  const [subTab, setSubTab] = useState(1);
  const [user, setUser] = useState(null);
  useEffect(  () => {
     AsyncStorage.getItem('user').then(result => {
      console.log(result);
      setUser(JSON.parse(result));
    });
   
  }, []);

    useEffect( () => {
     // const userId = "640f471dfe4f89fcac842a0f"
      if(user){
        const userId = user._id
        const fetchData = async () => {
          const pr = await getOrderByUserid({userId});
          setOrders(pr);
        };
        fetchData();
      }
    }, [user]);

  console.log('Order=== ', orders);
  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Đơn hàng của tôi
        </Text>
        <TouchableOpacity>
          <Icon name="ellipsis-h" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    );
  }
  const renderOrders = () => {
    return (
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => {
            setSubTab(1);
          }}
          style={{
            width: width * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: subTab == 1 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: subTab == 1 ? 1 : 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: subTab == 1 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Chờ xác nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSubTab(2);
          }}
          style={{
            width: width * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: subTab == 2 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: subTab == 2 ? 1 : 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: subTab == 2 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Chờ lấy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSubTab(3);
          }}
          style={{
            width: width * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: subTab == 3 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: subTab == 3 ? 1 : 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: subTab == 3 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Đang giao
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSubTab(4);
          }}
          style={{
            width: width * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: subTab == 4 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: subTab == 4 ? 1 : 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: subTab == 4 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Đã giao
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
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
          onPress={() => {}}>
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
  if (orders) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderOrders()}
        {renderListOrder(orders)}
      </View>
    );
  } else {
    return (
      <View style={{alignItems: 'center'}}>
        {renderHeader()}
        <Icon
          name="file-alt"
          size={100}
          color={COLOR.MAIN}
          style={{marginTop: 20}}
        />
        <Text style={{fontSize: 18, marginTop: 20}}>
          Bạn chưa có đơn hàng nào
        </Text>
      </View>
    );
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
  tabsContainer: {
    width: width,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
