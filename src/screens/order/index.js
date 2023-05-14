import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR, SIZES} from '../../constants';
import {createOrder, calculateDelivery, createPaymentIntent} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
const {width, height} = Dimensions.get('window');
import {Button, MyModal} from '../../components';
import {Picker} from '@react-native-picker/picker';
import socket from '../../api/socket';

export function Order({navigation}) {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const [cart, setCart] = useState([]);
  const [fee, setFee] = useState(0);
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [space, setSpace] = useState(0);
  const [methodPayment, setMethodPayment] = useState(
    'Thanh toán khi nhận hàng',
  );
  const [modalVisible, setModalVisible] = useState(false);

  const dataDiscount = [
    {label: 'Thanh toán khi nhận hàng', value: 'Thanh toán khi nhận hàng'},
    {label: 'Thẻ Visa/MasterCard', value: 'Thẻ Visa/MasterCard'},
  ];

  const [modalAddressVisible, setModalAddressVisible] = useState(false);

  //for address

  const [dataCountries, setDataCountries] = useState([]);
  const [codeCountries, setCodeCountries] = useState('VN');
  const [dataCities, setDataCities] = useState([]);
  const [codeCities, setCodeCities] = useState('');
  const [dataCounties, setDataCounties] = useState([]);
  const [codeCounties, setCodeCounties] = useState('');
  const [dataWards, setDataWards] = useState([]);
  const [codeWards, setCodeWards] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [numberHouse, setNumberHouse] = useState('');

  // for address

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/countries.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        // this.setState({ dataCountries: Object.values(responseJson) });
        setDataCountries(responseJson);
        //  console.log('dataCountries', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/tinh_tp.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        setDataCities(Object.values(responseJson));
        //      console.log('datacity', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/quan_huyen.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        setDataCounties(Object.values(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/xa_phuong.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        setDataWards(Object.values(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
  useEffect(() => {
    if (user && store) {
      const fetchData = async () => {
        userAddress = user.address;
        storeAddress = store.address;

        const pr = await calculateDelivery({userAddress, storeAddress});
        console.log('PR', pr);
        setSpace(pr);
        setFee(pr * 5000);
      };
      fetchData();
    }
  }, [store, user]);

  console.log('space', space);

  function countTotal(accumulator, current) {
    return accumulator + current.total;
  }

  // function countTotal(accumulator, current) {
  //   return accumulator + (current.price - (current.price / 100) * current.discount);
  // }

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  let total = cart.reduce(countTotal, 0);
  console.log('total====>', +((total + fee) / 230).toFixed(0));
  const onCheckout = async () => {
    // 1. Create a payment intent
    let amount = +((total + fee) / 230).toFixed(0);
    const response = await createPaymentIntent({amount});
    console.log('A==', response);
    if (response.error) {
      Alert.alert('Lỗi thanh toán');
      return;
    }
    // 2. Initialize the Payment sheet

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Le Minh Hieu',
      paymentIntentClientSecret: response.paymentIntent,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (initResponse.error) {
      Alert.alert('Lỗi thanh toán');
      return;
    }

    // 3. Present the Payment Sheet from Stripe

    await presentPaymentSheet();

    // 4. If payment ok -> create the order

    const userId = user._id;
    const storeId = store._id;
    const name = store.name;
    const products = cart;
    const shippingfee = fee;
    const totalPrice = total + fee;
    const paymentMethod = methodPayment;
    const receiveAddress = store.address;
    const deliveryAddress = newAddress !== '' ? newAddress : user.address;
    const created_date = new Date();

    socket.emit('CHANGE_ORDER');
    await createOrder({
      userId,
      storeId,
      name,
      products,
      shippingfee,
      totalPrice,
      navigation,
      paymentMethod,
      receiveAddress,
      deliveryAddress,
      created_date,
    }).then(() => {
      AsyncStorage.setItem('storeOrder', '{}');
      AsyncStorage.setItem('cart', '[]');
      setModalVisible(true);
      setNewAddress('');
    });
  };

  // for  address

  function renderlistCities() {
    if (dataCities && codeCountries === 'VN') {
      return dataCities.map((item, key) => (
        <Picker.Item label={item.name} value={item.code} key={key} />
      ));
    }
    return <Picker.Item label={'Không có dữ liệu'} value={'noData'} />;
  }

  function renderlistCounties() {
    if (dataCounties && codeCountries === 'VN') {
      const filteredDataCounties = dataCounties.filter(item => {
        return item.parent_code === codeCities;
      });
      return filteredDataCounties.map((item, key) => (
        <Picker.Item label={item.name} value={item.code} key={key} />
      ));
    }
    return <Picker.Item label={'Không có dữ liệu'} value={'noData'} />;
  }

  function renderlistWards() {
    if (dataWards && codeCountries === 'VN') {
      const filteredDataWards = dataWards.filter(item => {
        return item.parent_code === codeCounties;
      });
      return filteredDataWards.map((item, key) => (
        <Picker.Item label={item.name} value={item.path_with_type} key={key} />
      ));
    }
    return <Picker.Item label={'Không có dữ liệu'} value={'noData'} />;
  }
  //

  const renderModalPickAddress = () => {
    return (
      <MyModal
        visible={modalAddressVisible}
        onRequestClose={() => {
          setModalAddressVisible(false);
        }}>
        <View
          style={{
            height: 350,
            width: 350,
            backgroundColor: COLOR.WHITE,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: '500',
                fontStyle: 'italic',
                color: COLOR.BLACK,
              }}>
              Chọn địa chỉ
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalAddressVisible(false);
                setNewAddress('');
              }}
              style={{}}>
              <Icon name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Tỉnh/Thành Phố</Text>
              <Picker
                selectedValue={codeCities}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => {
                  setCodeCities(itemValue);
                }}>
                {renderlistCities()}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Quận/Huyện</Text>
              <Picker
                selectedValue={codeCounties}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) =>
                  setCodeCounties(itemValue)
                }>
                {renderlistCounties()}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Phường/Xã</Text>
              <Picker
                selectedValue={codeWards}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) =>
                  setCodeWards(itemValue)
                }>
                {renderlistWards()}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Số nhà</Text>
              <TextInput
                placeholder="Số nhà ..."
                value={numberHouse}
                onChangeText={setNumberHouse}
                style={{
                  width: 200,
                  borderWidth: 1,
                  borderRadius: 15,
                  height: 45,
                }}></TextInput>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setNewAddress(numberHouse + ', ' + codeWards);
              // handleUpdateAddress();
              setModalAddressVisible(false);
            }}
            style={{
              margin: 10,
              height: 40,
              width: 100,
              backgroundColor: COLOR.MAIN,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: '500', color: COLOR.BLACK}}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </MyModal>
    );
  };

  const DropdownComponent = ({data, setStyle}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text
            style={[
              styles.label,
              isFocus && {fontSize: 18, fontWeight: '400', color: COLOR.BLACK},
            ]}>
            Chọn
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[setStyle, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Chọn' : '...'}
          searchPlaceholder="Search..."
          value={methodPayment}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setMethodPayment(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

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
  const renderCartItem = cart => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity style={styles.inforItemContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLOR.MAIN, fontSize: 16, fontWeight: '500'}}>
              {item.quantity}x
            </Text>

            <View style={{marginLeft: 20}}>
              <Text
                style={[styles.txtStyle, {fontSize: 20, fontWeight: '600'}]}>
                {item.name}
              </Text>
              {item.note && <Text>{item.note}</Text>}
            </View>
          </View>
          <Text style={[styles.txtStyle, {fontSize: 16}]}>
            {currencyFormat(item.price - (item.price / 100) * item.discount)} ₫
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  function renderInforOrder() {
    if (space) {
      return (
        <ScrollView style={styles.inforOrderContainer}>
          <View>
            <TouchableOpacity style={styles.inforItemContainer}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="motorcycle" size={25} color={COLOR.GREEN2} />
                <View style={{marginLeft: 20}}>
                  <Text
                    style={[
                      styles.txtStyle,
                      {fontSize: 18, fontWeight: '600'},
                    ]}>
                    Giao hàng
                  </Text>
                  <Text>Giao hàng ngay ({(space * 7).toFixed(0)} phút)</Text>
                </View>
              </View>
              <Icon name="angle-right" size={25} color={COLOR.BLACK} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalAddressVisible(true);
              }}
              style={styles.inforItemContainer}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="map-marker-alt" size={25} color={COLOR.RED} />
                {newAddress === '' && (
                  <View style={{marginLeft: 20}}>
                    {user && (
                      <Text
                        style={[
                          styles.txtStyle,
                          {fontSize: 20, fontWeight: '600'},
                        ]}>
                        {user.address}
                      </Text>
                    )}
                    {/* {space && <Text>Khoảng {space} Km</Text>} */}
                    <Text style={{fontSize: 16}}>{space} Km</Text>
                  </View>
                )}
                {newAddress !== '' && (
                  <View style={{marginLeft: 20}}>
                    {user && (
                      <Text
                        style={[
                          styles.txtStyle,
                          {fontSize: 20, fontWeight: '600'},
                        ]}>
                        {newAddress}
                      </Text>
                    )}
                    {/* {space && <Text>Khoảng {space} Km</Text>} */}
                    <Text style={{fontSize: 16}}>{space} Km</Text>
                  </View>
                )}
              </View>
              {/* <Icon name="angle-right" size={25} color={COLOR.BLACK} /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.itemsOrderContainer}>
            <Text
              style={[
                styles.txtStyle,
                {fontSize: 20, marginHorizontal: 20, fontWeight: '600'},
              ]}>
              Tóm tắt đơn đặt hàng
            </Text>
            <ScrollView horizontal>{renderCartItem(cart)}</ScrollView>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}>
                <Text style={[styles.txtStyle, {fontSize: 16}]}>
                  Tổng tạm tính
                </Text>
                <Text style={[styles.txtStyle, {fontSize: 16}]}>
                  {currencyFormat(total)} ₫
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}>
                <Text style={[styles.txtStyle, {fontSize: 16}]}>
                  Phí áp dụng
                </Text>
                <Text style={[styles.txtStyle, {fontSize: 16}]}>
                  {currencyFormat(fee)} ₫
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemsOrderContainer}>
            <Text
              style={[
                styles.txtStyle,
                {fontSize: 20, marginHorizontal: 20, fontWeight: '600'},
              ]}>
              Tùy chọn
            </Text>

            <Text
              style={[
                styles.txtStyle,
                {
                  fontSize: 16,
                  marginLeft: 20,
                  fontStyle: 'italic',
                  marginTop: 10,
                  color: COLOR.GREEN2,
                },
              ]}>
              Hình thức thanh toán
            </Text>
            <DropdownComponent
              data={dataDiscount}
              setStyle={styles.dropdownDisCount}
            />
            <TouchableOpacity style={styles.optionItemContainer}>
              <View style={{flexDirection: 'row'}}>
                <Fontisto
                  name="shopping-sale"
                  size={30}
                  color={COLOR.ORGANGE}
                />
                <View style={{marginLeft: 20}}>
                  <Text style={[styles.txtStyle, {fontSize: 16}]}>
                    Áp dụng ưu đãi để được giảm giá
                  </Text>
                </View>
              </View>
              <Icon name="angle-right" size={25} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
  const handleOrder = async () => {
    // let [userId,storeId,name,products,shippingfee,totalPrice]  = [user._id,store._id,user.name,cart,fee,total+fee]
    socket.emit('ADD_ITEM_INTO_CART');
    if (methodPayment == 'Thanh toán khi nhận hàng') {
      const userId = user._id;
      const storeId = store._id;
      const name = store.name;
      const products = cart;
      const shippingfee = fee;
      const totalPrice = total + fee;
      // const paymentMethod = methodPayment;
      const receiveAddress = store.address;
      const deliveryAddress = newAddress !== '' ? newAddress : user.address;
      const created_date = new Date();

      socket.emit('CHANGE_ORDER');
      await createOrder({
        userId,
        storeId,
        name,
        products,
        shippingfee,
        totalPrice,
        navigation,
        receiveAddress,
        deliveryAddress,
        created_date,
      }).then(() => {
        setModalVisible(true);
        setNewAddress('');
      });
      AsyncStorage.setItem('storeOrder', '{}');
      AsyncStorage.setItem('cart', '[]');
    } else if (methodPayment == 'Thẻ Visa/MasterCard') {
      if (total + fee >= 23000) {
        onCheckout();
      } else {
        Alert.alert(
          'Giá trị đơn hàng phải lớn hơn 23.000đ mới có thể sử dụng hình thức thanh toán này',
        );
      }
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.totalPriceContainer}>
          <Text style={[styles.txtStyle, {fontSize: 18}]}>Tổng cộng</Text>
          <Text style={[styles.txtStyle, {fontSize: 18, fontWeight: '600'}]}>
            {currencyFormat(total + fee)} ₫
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

  const renderModal = () => {
    return (
      <MyModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            height: 150,
            width: 220,
            backgroundColor: COLOR.WHITE,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 7,
          }}>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <AntDesign name="checkcircleo" size={30} color={COLOR.GREEN3} />
            <Text style={{color: COLOR.BLACK, fontSize: 18, fontWeight: '600'}}>
              Đặt đơn thành công
            </Text>
          </View>
          <TouchableOpacity
          onPress={() =>{
            setModalVisible(false)
            navigation.navigate('Tabs');
          }}
            style={{
              height: 40,
              width: 70,
              alignSelf: 'center',
              borderColor: COLOR.MAIN,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: COLOR.BLUE, fontSize: 20}}>Ok</Text>
          </TouchableOpacity>
        </View>
      </MyModal>
    );
  };

  return (
    <View style={styles.container}>
      {renderModalPickAddress()}
      {renderModal()}
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
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray2,
    backgroundColor: COLOR.WHITE,
    width: width - 40,
  },
  txtStyle: {
    color: COLOR.BLACK,
  },
  itemsOrderContainer: {
    borderTopWidth: 5,
    borderColor: COLOR.lightGray2,
    paddingVertical: 10,
  },
  optionItemContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownDisCount: {
    height: 60,
    width: 300,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 10,
    marginLeft: 20,
  },
});
