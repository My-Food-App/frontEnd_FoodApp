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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');

export function Cart({navigation}) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('cart').then(result => {
      console.log('resurl', JSON.parse(result));
      setCart(JSON.parse(result));
    });
  }, []);
  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Giỏ hàng
        </Text>
        <TouchableOpacity style={{}}>
          <Text style={styles.txtDelete}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function renderProduct(data) {

    const renderItem = ({item,index}) => {
       const plus = async (index) => {
          const newCart = [...cart]
          const c = newCart[index].total/ newCart[index].quantity
          newCart[index].quantity +=1
          newCart[index].total += c 
          setCart(newCart)
       }
       const minus = async (index) => {
        const newCart = [...cart]
        const c = newCart[index].total/ newCart[index].quantity
        newCart[index].quantity -=1
        newCart[index].total -= c 
        setCart(newCart)
     }
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            console.log('Product',cart[index]);
          }}>
          <Text style={styles.txtName}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={styles.txtPrice}>{item.total} đ</Text>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <TouchableOpacity 
              style={styles.btnContainer}
              disabled={item.quantity <= 1}
              onPress={ async () =>{
               await minus(index)
               .then(() => { 
                AsyncStorage.setItem("cart",JSON.stringify(cart))
                console.log('new Cart',cart)
              })
              
              }}
              >
                <Icon name="minus" size={20} color={COLOR.SAPPHIRE} />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 20}}>{item.quantity}</Text>
              <TouchableOpacity style={styles.btnContainer} 
                onPress = { async () =>{
                  await plus(index)
                  .then(() => { 
                    AsyncStorage.setItem("cart",JSON.stringify(cart))
                    console.log('new Cart',cart)
                  })
                }}
              >
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
  return (
    <View style={styles.container}>
      {renderHeader()}
      {cart && renderProduct(cart)}
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
    borderBottomColor: COLOR.lightGray3,
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
  btnContainer:{
    backgroundColor:COLOR.BLUE_GRAY,
    height:30,
    width:30,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',

  }
});
