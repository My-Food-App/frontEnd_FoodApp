import React,{useEffect,useState} from 'react';
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
import { createOrder } from '../../api';
const {width, height} = Dimensions.get('window');

export function Order({navigation}) {
  const [cart, setCart] = useState([]);
  const [fee, setFee] = useState(20000);
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('cart').then(result => {
      console.log('resurl===', JSON.parse(result));
      setCart(JSON.parse(result));
    });
    AsyncStorage.getItem('user').then(result => {
      console.log('user===', JSON.parse(result));
      setUser(JSON.parse(result));
    });
    AsyncStorage.getItem('storeOrder').then(result => {
      console.log('storeOrder===', JSON.parse(result));
      setStore(JSON.parse(result));
    });
  }, []);
  function countTotal(accumulator, current) {
    return accumulator + current.total;
  }
  let total = cart.reduce(countTotal, 0);
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
  const renderCartItem = (cart) => {
    const renderItem = ({item}) => {
      return ( <TouchableOpacity style={styles.inforItemContainer}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:COLOR.MAIN, fontSize:16, fontWeight:'500'}}>{item.quantity}x</Text>

            <Text style={[styles.txtStyle,{fontSize:20,fontWeight:'600', marginLeft:20}]}>{item.name}</Text>

        </View>
        <Text style={[styles.txtStyle,{fontSize:16}]}>{item.total}</Text>
      </TouchableOpacity>)
    }
      return (<View>
        <FlatList 
          data={cart}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>)
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
           <ScrollView horizontal>{renderCartItem(cart)}</ScrollView>
            <View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', paddingHorizontal:20,marginTop:10}}>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>Tổng tạm tính</Text>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>{total}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', paddingHorizontal:20,marginTop:10}}>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>Phí áp dụng</Text>
                    <Text style={[styles.txtStyle,{fontSize:16}]}>{fee}</Text>
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
  const handleOrder = async () => {
    
   // let [userId,storeId,name,products,shippingfee,totalPrice]  = [user._id,store._id,user.name,cart,fee,total+fee]
   const userId = user._id
   const storeId =store._id
   const name = store.name
   const products = cart
   const shippingfee = fee
   const totalPrice = total+fee
    await createOrder({userId,storeId,name,products,shippingfee,totalPrice,navigation})
    AsyncStorage.setItem('cart', '[]');
  }

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.totalPriceContainer}>
          <Text style={[styles.txtStyle, {fontSize: 18}]}>Tổng cộng</Text>
          <Text style={[styles.txtStyle, {fontSize: 18, fontWeight: '600'}]}>
           {total+fee}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnOrderContainer}
          onPress={handleOrder}>
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
    backgroundColor:COLOR.WHITE,
    width : width-40

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
