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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MyModal} from '../../components';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {
  getUserbyId,
  updateOrderById,
  getStoreById,
  getOrderById,
  findStoreByUserId,
} from '../../api';
import moment from 'moment';
import socket from '../../api/socket';
const {width, height} = Dimensions.get('window');

export function OrderDetail({navigation, route}) {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [userCurrent, setUserCurrent] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [store, setStore] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [shipperId, setShipperId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('Chờ lấy');
  const [statusSelected, setStatusSelected] = useState(null);
  const [statusClone, setStatusClone] = useState(null);
  const [storeCurrent, setStoreCurrent] = useState(null);
  const listStatus = [
    {id: 2, name: 'Đang giao'},
    {id: 3, name: 'Đã giao'},
  ];

  useEffect(() => {
    let {data} = route.params;
    setData(data);
    setOrderId(data._id);
    setStoreId(data.storeId);
    setStatusSelected(data.status);
  }, [data]);

  useEffect(() => {
    if (orderId) {
      const fetchData = async () => {
        const pr = await getOrderById({orderId});
        setOrder(pr);
        setStatusSelected(pr.status);
      };
      fetchData();
    }
  }, [modalVisible, orderId]);

  console.log('orderId =>>>>>', orderId);

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

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      setUserCurrent(JSON.parse(result));
      setShipperId(JSON.parse(result)._id);
    });
  }, []);

  useEffect(() => {
    if (storeId) {
      const fetchData = async () => {
        const pr = await getStoreById({storeId});
        setStore(pr);
      };
      fetchData();
    }
  }, [data]);
  console.log('STORE =>>>>', store);
  const handleReceiveOrder = async () => {
    if ((orderId, shipperId)) {
      const status = 'Đang giao';
      await updateOrderById({orderId, status, shipperId}); 
      navigation.navigate('ShiperTabs');
      socket.emit('CHANGE_ORDER');
    }
  };

  useEffect(() => {
    if (userCurrent) {
      const userId = userCurrent._id;
      const fetchData = async () => {
        const pr = await findStoreByUserId({userId});
        setStoreCurrent(pr);
      };
      fetchData();
    }
  }, [userCurrent]);
  console.log('storeCurrent =>>>>', storeCurrent);

  useEffect(() => {
    if (statusSelected) {
      setStatusClone(statusSelected);
    }
  }, [statusSelected]);
  console.log('User =>=====>', user);
  //console.log('userCurrent =>=====>', userCurrent);

  const handleUpdateStatus = () => {
    console.log('update');
    setModalVisible(true);
  };
  const handleConfirmChangeStatus = async () => {
    const status = statusClone;
    await updateOrderById({orderId, status});
    setModalVisible(false);
    socket.emit('CHANGE_ORDER');
  };

  const handleCancelOrder = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn hủy đơn?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          const status = 'Đã hủy';
          await updateOrderById({orderId, status}).then(() =>
            navigation.navigate('ShiperTabs'),
          );
        },
      },
    ]);
  };

  const handleCancelOrderForUser = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn hủy đơn?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          const status = 'Đã hủy';
          await updateOrderById({orderId, status}).then(() => {         
            navigation.navigate('MyOrder');
            socket.emit('CHANGE_ORDER');
          });
        },
      },
    ]);
  };

  const handleCancelOrderForStore = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn từ chối đơn hàng?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          const status = 'Đã hủy';
          await updateOrderById({orderId, status}).then(() => {
            navigation.goBack();
            socket.emit('CHANGE_ORDER');
          });
        },
      },
    ]);
  };

  const handlereceiveOrderForStore = async () => {
    socket.emit('CHANGE_ORDER');
    const status = 'Chờ lấy';
    await updateOrderById({orderId, status}).then(() => navigation.goBack());
  };

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
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

            <View style={{marginLeft: 20}}>
              <Text
                style={[styles.txtStyle, {fontSize: 20, fontWeight: '600'}]}>
                {item.name}
              </Text>
              {item.note && <Text>{item.note}</Text>}
            </View>
          </View>
          <Text style={[styles.txtStyle, {fontSize: 16}]}>
            {currencyFormat(item.total)} ₫
          </Text>
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
          {data.shipperId !== userCurrent._id && (
            <View>
              <Icon name="box-open" size={30} color={COLOR.WHITE} />
            </View>
          )}
          {data.shipperId == userCurrent._id && (
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={handleUpdateStatus}>
              <Icon name="edit" size={30} color={COLOR.WHITE} />
              <Text
                style={[styles.txtStatusOrder, {fontSize: 16, marginTop: 5}]}>
                Cập nhật
              </Text>
            </TouchableOpacity>
          )}
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
            <Text style={styles.txtInforUser}>{store.name}</Text>
            <Text style={styles.txtInforUser}>{store.phone}</Text>
            {order.receiveAddress && (
              <Text style={styles.txtInforUser}>{order.receiveAddress}</Text>
            )}
            {!order.receiveAddress && (
              <Text style={styles.txtInforUser}>{store.address}</Text>
            )}
          </View>
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
              Địa chỉ giao hàng
            </Text>
            <Text style={styles.txtInforUser}>{user.fullname}</Text>
            <Text style={styles.txtInforUser}>{user.phone}</Text>

            {order.deliveryAddress && (
              <Text style={styles.txtInforUser}>{order.deliveryAddress}</Text>
            )}
            {!order.deliveryAddress && (
              <Text style={styles.txtInforUser}>{user.address}</Text>
            )}
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
              {currencyFormat(data.shippingfee)} ₫
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              borderBottomColor: COLOR.lightGray2,
              borderBottomWidth: 1,
            }}>
            <Text style={[styles.txtStyle, {fontSize: 16, fontWeight: '600'}]}>
              Thành tiền
            </Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: COLOR.RED}}>
              {currencyFormat(data.totalPrice)} ₫
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
                  {moment(data.created_date).format('HH:mm DD-MM-YYYY')}
                </Text>
              </View>
            </View>
          </View>
          {data.status === 'Chờ lấy' && data.shipperId == userCurrent._id && (
            <TouchableOpacity
              onPress={handleCancelOrder}
              style={{
                backgroundColor: COLOR.ORGANGE,
                height: 50,
                width: 130,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <Text
                style={{color: COLOR.BLACK, fontSize: 20, fontWeight: '600'}}>
                Hủy đơn
              </Text>
            </TouchableOpacity>
          )}
          {data.status === 'Chờ xác nhận' &&
            data.userId == userCurrent._id &&
            data.storeId !== storeCurrent._id && (
              <TouchableOpacity
                onPress={handleCancelOrderForUser}
                style={{
                  backgroundColor: COLOR.ORGANGE,
                  height: 50,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{color: COLOR.BLACK, fontSize: 20, fontWeight: '600'}}>
                  Hủy đơn
                </Text>
              </TouchableOpacity>
            )}

          {data.storeId == storeCurrent._id && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {data.status === 'Chờ xác nhận' &&
                data.userId == userCurrent._id && (
                  <TouchableOpacity
                    onPress={handleCancelOrderForStore}
                    style={{
                      backgroundColor: COLOR.ORGANGE,
                      height: 50,
                      width: 130,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLOR.BLACK,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      Từ chối
                    </Text>
                  </TouchableOpacity>
                )}

              {data.status === 'Chờ xác nhận' &&
                data.storeId == storeCurrent._id && (
                  <TouchableOpacity
                    onPress={handlereceiveOrderForStore}
                    style={{
                      backgroundColor: COLOR.MAIN,
                      height: 50,
                      width: 130,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLOR.BLACK,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      Nhận đơn
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          )}
        </View>
      </View>
    );
  }

  const renderListStatusToChange = data => {
    const renderItem = ({item}) => {
      return (
        <View>
          {statusClone != item.name && (
            <TouchableOpacity
              onPress={() => {
                setStatusClone(item.name);
              }}
              style={{margin: 10, flexDirection: 'row', marginLeft: 20}}>
              <Icon name="check" size={20} color={COLOR.BLACK} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOR.BLACK,
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          {statusClone == item.name && (
            <TouchableOpacity
              onPress={() => {
                setStatusClone(item.name);
              }}
              style={{margin: 10, flexDirection: 'row', marginLeft: 20}}>
              <Icon name="check" size={20} color={COLOR.GREEN} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOR.GREEN,
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
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
            height: 230,
            width: 250,
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
              Trạng thái đơn hàng
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setStatusClone(statusSelected);
              }}
              style={{}}>
              <Icon name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            {/* <TouchableOpacity
              style={{margin: 10, flexDirection: 'row', marginLeft: 20}}>
              <Icon name="check" size={20} color={COLOR.BLACK} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOR.BLACK,
                  marginLeft: 10,
                }}>
                Chờ lấy
              </Text>
            </TouchableOpacity> */}
            {statusClone && renderListStatusToChange(listStatus)}
          </View>

          <TouchableOpacity
            onPress={handleConfirmChangeStatus}
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

  if (order && user && store && storeCurrent) {
    return (
      <View style={styles.container}>
        {renderModal()}
        {renderHeader()}
        <ScrollView>{renderContentOrder(order)}</ScrollView>
        {userCurrent.role == 'shipper' && !order.shipperId && (
          <View
            style={{
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderColor: COLOR.lightGray2,
            }}>
            <TouchableOpacity
              onPress={handleReceiveOrder}
              style={{
                backgroundColor: COLOR.MAIN,
                height: 50,
                width: 130,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{color: COLOR.BLACK, fontSize: 20, fontWeight: '600'}}>
                Nhận đơn
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
