import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');

export function Cart({navigation}) {
  const dataTest = [
    {
      _id: '11111',
      name: 'One',
      price: 10000,
      quantity: 4,
      total: 40000,
    },
    {
      _id: '21111',
      name: 'Two',
      price: 10000,
      quantity: 2,
      total: 20000,
    },
    {
      _id: '21112',
      name: 'three',
      price: 10000,
      quantity: 2,
      total: 20000,
    },
    {
      _id: '21141',
      name: 'four',
      price: 10000,
      quantity: 2,
      total: 20000,
    },
  ];
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem('cart').then(result => {
      console.log('resurl', JSON.parse(result));
      setCart(JSON.parse(result));
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));

    console.log('newcart', cart);
  }, [cart]);

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Giỏ hàng
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Thông báo', 'Bạn có chắc muốn xóa hết ?', [
              {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Có', onPress: () => setCart([])},
            ]);
          }}>
          <Text style={styles.txtDelete}>Xóa hết</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function countTotal(accumulator, current) {
    return accumulator + current.total;
  }
  // console.log(cart.reduce(countTotal, 0));
  let total = cart.reduce(countTotal, 0);
  // setTotalPrice(total);
  function renderProduct(data) {
    const renderItem = ({item, index}) => {
      const plus = async index => {
        const newCart = [...cart];
        const c = newCart[index].total / newCart[index].quantity;
        newCart[index].quantity += 1;
        newCart[index].total += c;
        setCart(newCart);
      };
      const minus = async index => {
        const newCart = [...cart];
        const c = newCart[index].total / newCart[index].quantity;
        newCart[index].quantity -= 1;
        newCart[index].total -= c;
        setCart(newCart);
      };
      const handleDeleteItem = async index => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        console.log('delete item', cart);
        setCart(newCart);
      };

      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            console.log('Product', cart[index]);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={styles.txtName}>
              {item.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Thông báo', 'Bạn có chắc muốn xóa?', [
                  {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Có', onPress: () => handleDeleteItem(index)},
                ]);
              }}>
              <AntDesign name="close" size={25} color={COLOR.RED} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={styles.txtPrice}>{item.total} đ</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.btnContainer}
                disabled={item.quantity <= 1}
                onPress={() => {
                  minus(index);
                  //  .then(() => {
                  //   AsyncStorage.setItem("cart",JSON.stringify(cart))
                  //   console.log('new Cart',cart)
                  // })
                }}>
                <Icon name="minus" size={20} color={COLOR.SAPPHIRE} />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 20}}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                  plus(index);
                  // .then(() => {
                  //   AsyncStorage.setItem("cart",JSON.stringify(cart))
                  //   console.log('new Cart',cart)
                  // })
                }}>
                <Icon name="plus" size={20} color={COLOR.SAPPHIRE} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.productsContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.totalPriceContainer}>
          <Text style={[styles.txtStyle, {fontSize: 18}]}>Tổng cộng</Text>
          <Text style={[styles.txtStyle, {fontSize: 18, fontWeight: '600'}]}>
            {total}₫
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnOrderContainer}
          onPress={() => {
            navigation.navigate('Order');
          }}>
          <Text style={[{fontSize: 18, fontWeight: '700'}, styles.txtStyle]}>
            Trang thanh toán
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderHeader()}
      {cart && renderProduct(cart)}
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
  txtDelete: {
    fontSize: 20,
    color: COLOR.RED,
    fontWeight: '500',
  },
  productsContainer: {
    flex: 1,
  },
  itemContainer: {
    borderBottomColor: COLOR.BLUE_GRAY,
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.padding,
  },
  txtName: {
    color: COLOR.BLACK,
    fontSize: 18,
    marginTop: 10,
  },
  txtPrice: {
    color: COLOR.BLACK,
    fontSize: 18,
    fontWeight: '600',
  },
  btnContainer: {
    backgroundColor: COLOR.BLUE_GRAY,
    height: 30,
    width: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  txtStyle: {
    color: COLOR.BLACK,
  },
});
