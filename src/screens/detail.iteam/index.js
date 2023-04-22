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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckboxList from 'rn-checkbox-list';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {data as listData, dataDetail} from '../../data/data';
const {width, height} = Dimensions.get('window');

export const DetailItem = ({route, navigation}) => {
  // const [cart, setCart] = useState([{'a':1}]);
  const [cart, setCart] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [data, setData] = useState(null);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceOption, setTotalPriceOption] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [storeOrder, setStoreOrder] = useState([]);
  useEffect(() => {
    let {data} = route.params;
    let {store} = route.params;
    setData(data);
    setPrice(data.price - (data.price / 100) * data.discount);
    setStoreOrder(store);
    console.log('data', data);
    console.log('store========', store);
  }, [data]);
  useEffect(() => {
    AsyncStorage.getItem('cart').then(result => {
      console.log('resurl', JSON.parse(result));
      setCart(JSON.parse(result));
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
    console.log('cart', cart);
  }, [cart]);

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i]._id === obj._id) {
            return true;
        }
    }

    return false;
}


  function renderDetailItem(data) {
    return (
      <View>
        <Image
          source={{
            uri: data.image,
          }}
          resizeMode="cover"
          style={{
            height: 180,
            width: width,
            opacity: 0.9,
          }}
        />
        <View style={{flexDirection: 'row', height: 100}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                marginLeft: 20,
                color: COLOR.BLACK,
                fontSize: 24,
                fontWeight: '700',
              }}>
              {data.name}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <Text style={{color: COLOR.BLACK, fontSize: 24, fontWeight: '700'}}>
              {data.price}
            </Text>
            <Text style={{color: COLOR.lightGray, fontSize: 18}}>Giá gốc</Text> */}
              {data.discount == 0 && (
              <View style={{flexDirection: 'row',alignItems:'center'}}>
                <Text
                  style={{
                    color: COLOR.BLACK,
                    flexWrap: 'wrap-reverse',
                    fontSize: 20,
                    //alignSelf:'flex-start'
                  }}>
                  Giá:{' '}
                </Text>
                <Text
                  style={{
                    color: COLOR.RED,
                    flexWrap: 'wrap-reverse',
                    fontSize: 17,
                  }}>
                  {currencyFormat(data.price)} ₫
                </Text>
              </View>
            )}
            {data.discount !== 0 && (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLOR.BLACK,
                    flexWrap: 'wrap-reverse',
                    fontSize: 20,
                  }}>
                  Giá:{' '}
                </Text>
                <View>
                  <Text
                    style={{
                      color: COLOR.lightGray,
                      flexWrap: 'wrap-reverse',
                      fontSize: 17,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    {currencyFormat(data.price)} ₫
                  </Text>
                  <Text
                    style={{
                      color: COLOR.RED,
                      flexWrap: 'wrap-reverse',
                      fontSize: 17,
                    }}>
                    {currencyFormat(
                      data.price - (data.price / 100) * data.discount,
                    )}{' '}
                    ₫
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={2} style={styles.txtDescription}>
            {data.description}
          </Text>
        </View>
      </View>
    );
  }

  const testdata = [
    {id: 1, name: 'Green Book'},
    {id: 2, name: 'Bohemian Rhapsody'},
  ];
  function renderOptionData(data) {
    const renderItem = ({item}) => {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{item.name}</Text>
          <Text>+{item.price}</Text>
        </View>
      );
    };
    const countTotal = ({items}) => {
      const value = items.reduce(
        (totalPrice, item) => totalPrice + item.price,
        0,
      );
      setTotalPriceOption(value);
    };
    return (
      <View style={{height: 400}}>
        <CheckboxList
          headerName="Tất cả"
          theme="red"
          listItems={data}
          renderItem={renderItem}
          onChange={countTotal}
          listItemStyle={{borderBottomColor: '#eee', borderBottomWidth: 1}}
          checkboxProp={{boxType: 'square'}} // iOS (supported from v0.3.0)
          // onLoading={() => <LoaderComponent />}
        />
      </View>
    );
  }

  const plus = () => {
    setQuantity(quantity + 1);
  };

  const minus = () => {
    setQuantity(quantity - 1);
  };
  function render() {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.styleNotification}>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 18,
              fontWeight: '500',
              marginRight: 15,
            }}>
            Thêm lưu ý cho quán
          </Text>
          <Text>Không bắt buộc</Text>
        </View>
        <TouchableOpacity style={styles.btnNotification}>
          <Text>Tùy thuộc vào khả năng của quán</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 30,
          }}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={minus}
            disabled={quantity <= 1}>
            <Icon name="minus" size={20} color={COLOR.SAPPHIRE} />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20}}>{quantity}</Text>
          <TouchableOpacity style={styles.btnContainer} onPress={plus}>
            <Icon name="plus" size={20} color={COLOR.SAPPHIRE} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const addToCart = async () => {
    const newCart = [...cart];
   if(data){
    if (containsObject(data,newCart)) {
      Alert.alert('Mặt hàng này đã có trong giỏ hàng');
    } else {
     
      const newData = {
        ...data,
        quantity,
        total: price * quantity + totalPriceOption * quantity,
      };
      newCart.push(newData);
      console.log('addtoCart');
      setCart(newCart);
    }
   }
  };
  if (data) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <View style={{backgroundColor: COLOR.WHITE}}>
            {renderDetailItem(data)}
          </View>
          <View style={{height: 10, backgroundColor: COLOR.BLUE_GRAY}}></View>
          {/* <View style={{marginTop: 10}}>{renderOptionData(data.option)}</View> */}
          <View>{render()}</View>
        </ScrollView>

        <View
          style={{
            position: 'relative',
            height: 50,
            backgroundColor: COLOR.MAIN,
            marginBottom: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              console.log('add');
              await addToCart().then(() =>{
                AsyncStorage.setItem('storeOrder', JSON.stringify(storeOrder));
              navigation.goBack();
              })
              
            }}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              Thêm vào giỏ hàng - {price * quantity + totalPriceOption}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  descriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  txtDescription: {
    fontSize: 15,
  },
  renderContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  styleNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingBottom: 10,
  },
  btnNotification: {
    height: 50,
    borderColor: COLOR.lightGray2,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: COLOR.BLUE_GRAY,
    height: 30,
    width: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
