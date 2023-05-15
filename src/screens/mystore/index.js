import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import {myStore, dataDetail} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {MyModal} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {
  findStoreByUserId,
  findProductByIdStore,
  getOrderByStoreId,
  deleteProduct,
  updateStore,
} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Input} from '../../components';
import socket from '../../api/socket'

export function MyStore({navigation}) {


  socket.on("LOAD_STORE", function () {

    loadingStore()
  });

  socket.on("LOAD_ORDER", function () {
    console.log('LOAD')
    loaddingOrders()
   
  });

  socket.on("LOAD_LIST_PRODUCT", function () {
    console.log('LOAD')
    loaddingProducts()
   
  });


  const [productInMyStore, setProductInMyStore] = useState('1');
  const [tab, setTab] = useState(1);
  const [subTab, setSubTab] = useState(1);
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [product, setProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('Chờ xác nhận');
  const [isEnabled, setIsEnabled] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUpdateStoreVisible, setModalUpdateStoreVisible] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [orderWithStatus, setOrderWithStatus] = useState(null);
  const [ordersWithMonth1, setOrdersWithMonth1] = useState([]);
  const [ordersWithMonth2, setOrdersWithMonth2] = useState([]);
  const [ordersWithMonth3, setOrdersWithMonth3] = useState([]);
  const [ordersWithMonth4, setOrdersWithMonth4] = useState([]);
  const [ordersWithMonth5, setOrdersWithMonth5] = useState([]);
  const [ordersWithMonth6, setOrdersWithMonth6] = useState([]);
  const [ordersWithMonth7, setOrdersWithMonth7] = useState([]);
  const [ordersWithMonth8, setOrdersWithMonth8] = useState([]);
  const [ordersWithMonth9, setOrdersWithMonth9] = useState([]);
  const [ordersWithMonth10, setOrdersWithMonth10] = useState([]);
  const [ordersWithMonth11, setOrdersWithMonth11] = useState([]);
  const [ordersWithMonth12, setOrdersWithMonth12] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  function countTotal(accumulator, current) {
    return accumulator + current.totalPrice - current.shippingfee;
  }

  let totalPrice1 = ordersWithMonth1.reduce(countTotal, 0);
  let totalPrice2 = ordersWithMonth2.reduce(countTotal, 0);
  let totalPrice3 = ordersWithMonth3.reduce(countTotal, 0);
  let totalPrice4 = ordersWithMonth4.reduce(countTotal, 0);
  let totalPrice5 = ordersWithMonth5.reduce(countTotal, 0);
  let totalPrice6 = ordersWithMonth6.reduce(countTotal, 0);
  let totalPrice7 = ordersWithMonth7.reduce(countTotal, 0);
  let totalPrice8 = ordersWithMonth8.reduce(countTotal, 0);
  let totalPrice9 = ordersWithMonth9.reduce(countTotal, 0);
  let totalPrice10 = ordersWithMonth10.reduce(countTotal, 0);
  let totalPrice11 = ordersWithMonth11.reduce(countTotal, 0);
  let totalPrice12 = ordersWithMonth12.reduce(countTotal, 0);

  const handleCreateStore = () => {
    navigation.navigate('MyStoreInfomation');
  };

  const handleDeleteProduct = async () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn xóa?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          const id = itemSelected._id;
          await deleteProduct({id}).then(async () => {
            setModalVisible(false);
            loaddingProducts();
          });
        },
      },
    ]);
  };

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      console.log(result);
      setUser(JSON.parse(result));
    });
  }, []);

  useEffect(() => {
    if (user) {
      const userId = user._id;
      const fetchData = async () => {
        const pr = await findStoreByUserId({userId});
        setStore(pr);
        setIsEnabled(pr.status);
        setName(pr.name);
        setDescription(pr.description);
        setPhone(pr.phone);
        setEmail(pr.email);
        setAddress(pr.address);
        setTag(pr.tag);
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if(store){
      loaddingOrders()
    loaddingProducts()
    }
  }, [store]);

  useEffect(() => {
    setOrderWithStatus(orders.filter(checkStatus1));
    function checkStatus1(item) {
      return item.status == status;
    }
  }, [status, orders]);

  useEffect(() => {
    setOrdersWithMonth1(orders.filter(checkMonth1));
    function checkMonth1(item) {
      return moment(item.created_date).format('MM-YYYY') == '01-2023';
    }

    setOrdersWithMonth2(orders.filter(checkMonth2));
    function checkMonth2(item) {
      return moment(item.created_date).format('MM-YYYY') == '02-2023';
    }

    setOrdersWithMonth3(orders.filter(checkMonth3));
    function checkMonth3(item) {
      return moment(item.created_date).format('MM-YYYY') == '03-2023';
    }

    setOrdersWithMonth4(orders.filter(checkMonth4));
    function checkMonth4(item) {
      return moment(item.created_date).format('MM-YYYY') == '04-2023';
    }

    setOrdersWithMonth5(orders.filter(checkMonth5));
    function checkMonth5(item) {
      return moment(item.created_date).format('MM-YYYY') == '05-2023';
    }

    setOrdersWithMonth6(orders.filter(checkMonth6));
    function checkMonth6(item) {
      return moment(item.created_date).format('MM-YYYY') == '06-2023';
    }

    setOrdersWithMonth7(orders.filter(checkMonth7));
    function checkMonth7(item) {
      return moment(item.created_date).format('MM-YYYY') == '07-2023';
    }

    setOrdersWithMonth8(orders.filter(checkMonth8));
    function checkMonth8(item) {
      return moment(item.created_date).format('MM-YYYY') == '08-2023';
    }

    setOrdersWithMonth9(orders.filter(checkMonth9));
    function checkMonth9(item) {
      return moment(item.created_date).format('MM-YYYY') == '09-2023';
    }

    setOrdersWithMonth10(orders.filter(checkMonth10));
    function checkMonth10(item) {
      return moment(item.created_date).format('MM-YYYY') == '10-2023';
    }

    setOrdersWithMonth11(orders.filter(checkMonth11));
    function checkMonth11(item) {
      return moment(item.created_date).format('MM-YYYY') == '11-2023';
    }

    setOrdersWithMonth12(orders.filter(checkMonth12));
    function checkMonth12(item) {
      return moment(item.created_date).format('MM-YYYY') == '12-2023';
    }
  }, [status, orders]);

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  if (orders) {
    const month = orders.map(item =>
      moment(item.created_date).format('MM-YYYY'),
    );
    // console.log('Month========', month);
  }

  const loaddingProducts = async () => {
    const storeId = store._id;
    const pr = await findProductByIdStore({storeId});
    setProduct(pr);
  };

  const handleUpdateStore = async () => {
    setModalUpdateStoreVisible(true);
  };

  const onUpdateStore = async () => {
    const storeId = store._id;
    await updateStore({
      storeId,
      name,
      description,
      tag,
      email,
      phone,
      address,
    }).then(async () => {
      // await loadingStore();
    });

    setModalUpdateStoreVisible(false);
  };

  const loadingStore = async () => {
    if (user) {
      console.log('Loading');
      const userId = user._id;
      const fetchData = async () => {
        const pr = await findStoreByUserId({userId});
        setStore(pr);
        setName(pr.name);
        setDescription(pr.description);
        setPhone(pr.phone);
        setEmail(pr.email);
        setAddress(pr.address);
        setTag(pr.tag);
      };
      fetchData();
    }
  };

  const loaddingOrders = async () => {
    if (store) {
      const storeId = store._id;
        const orders = await getOrderByStoreId({storeId});
        setOrders(orders);

    }
  }

  // console.log('Store ==========>', store);
  // console.log('product ==========>', product);
  // console.log('orders ==========>', orders);
  // console.log('selectedItem ==========>', itemSelected.name);
  console.log('name ==========>', name);
  const [refreshing, setRefreshing] = useState(false);
  const loadData = async () => {
    // Tải thêm dữ liệu từ server
    // Sau đó cập nhật state `data` với dữ liệu mới

    if (store) {
      const storeId = store._id;
      const fetchData = async () => {
        const pr = await findProductByIdStore({storeId});
        const orders = await getOrderByStoreId({storeId});
        setProduct(pr);
        setOrders(orders);
      };
      fetchData();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const OnOffSwitch = () => {
    const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState);
      const storeId = store._id;
      await updateStore({storeId,status:isEnabled})
    };

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Switch
          trackColor={{false: '#red', true: '#81b0ff'}}
          thumbColor={isEnabled ? COLOR.MAIN : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{marginLeft: 10, color: COLOR.WHITE}}>
          {isEnabled ? 'On' : 'Off'}
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <ImageBackground
        style={styles.headerContainer}
        source={{
          uri: 'https://www.shutterstock.com/image-vector/star-universe-background-stardust-deep-260nw-1907210152.jpg',
        }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{marginLeft: SIZES.base}}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLOR.WHITE,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginRigth: SIZES.base}}
            onPress={() => console.log('Click More')}>
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLOR.WHITE,
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            alignItems: 'center',
            paddingHorizontal: 16,
            justifyContent: 'space-between',
          }}>
          <Image source={{uri: store.image}} style={styles.image} />
          <View style={{width: width * 0.5}}>
            <Text style={{color: COLOR.WHITE, fontSize: 20}}>{name}</Text>
            {/* {store.status && <Text style={{color: COLOR.WHITE}}>Mở cửa</Text>} */}
            {/* {store.status != true && (
              <Text style={{color: COLOR.WHITE}}>Đóng cửa</Text>
            )} */}
            <OnOffSwitch />
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleUpdateStore}
            style={{
              borderWidth: 1,
              borderColor: COLOR.WHITE,
              paddingHorizontal: 20,
              paddingVertical: 5,
              justifyContent: 'flex-end',
            }}>
            <Text style={{color: COLOR.WHITE, fontSize: 20}}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  const rendertabs = () => {
    return (
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => {
            setTab(1);
          }}
          style={{
            width: width * 0.33,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: tab == 1 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: tab == 1 ? 1 : 0.8,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: tab == 1 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab(2);
          }}
          style={{
            width: width * 0.33,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: tab == 2 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: tab == 2 ? 1 : 0.8,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: tab == 2 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Đơn đặt hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab(3);
          }}
          style={{
            width: width * 0.33,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: tab == 3 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: tab == 3 ? 1 : 0.8,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: tab == 3 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Thống kê
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  function renderMyFoodsectionIntoColumn(dataDetail) {
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
            height: 150,
            alignItems: 'center',
          }}
          onPress={() => {
            setModalVisible(true);
            setItemSelected(item);
          }}>
          {/* Book Cover */}
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: 130,
              height: 130,
              borderRadius: 20,
              borderWidth: 5,
              borderColor: COLOR.MAIN,
              marginVertical: 10,
            }}
          />

          {/* Book Info */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: 150,
              height: 100,
              marginLeft: 20,
            }}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.tag_icon}
                resizeMode="contain"
                style={{
                  tintColor: 'red',
                  width: 15,
                  height: 15,
                }}
              />
              <Text style={FONTS.tagNameItem}>{item.tag}</Text>
            </View> */}
            <Text numberOfLines={2} style={FONTS.nameItem}>
              {item.name}
            </Text>
            {item.discount == 0 && (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLOR.lightGray,
                    flexWrap: 'wrap-reverse',
                    fontSize: 17,
                  }}>
                  Giá:{' '}
                </Text>
                <Text
                  style={{
                    color: COLOR.RED,
                    flexWrap: 'wrap-reverse',
                    fontSize: 17,
                  }}>
                  {currencyFormat(item.price)} ₫
                </Text>
              </View>
            )}
            {item.discount !== 0 && (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLOR.lightGray,
                    flexWrap: 'wrap-reverse',
                    fontSize: 17,
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
                    {currencyFormat(item.price)} ₫
                  </Text>
                  <Text
                    style={{
                      color: COLOR.RED,
                      flexWrap: 'wrap-reverse',
                      fontSize: 17,
                    }}>
                    {currencyFormat(
                      item.price - (item.price / 100) * item.discount,
                    )}{' '}
                    ₫
                  </Text>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    };
    if (product) {
      return (
        <View style={{flex: 1}}>
          {/* foods */}

          <FlatList
            data={dataDetail}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    } else return <></>;
  }
  const renderOrderStatus = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => {
            setSubTab(1);
            setStatus('Chờ xác nhận');
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
            setStatus('Chờ lấy');
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
            setStatus('Đang giao');
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
            setStatus('Đã giao');
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
        <TouchableOpacity
          onPress={() => {
            setSubTab(5);
            setStatus('Đã hủy');
          }}
          style={{
            width: width * 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: subTab == 5 ? COLOR.ORGANGE : COLOR.lightGray4,
            borderBottomWidth: subTab == 5 ? 1 : 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: subTab == 5 ? COLOR.ORGANGE : COLOR.BLACK,
            }}>
            Đã hủy
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
          onPress={() => {
            navigation.navigate('OrderDetail', {data: item});
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
            <FontAwesome5 name="cube" size={30} color={COLOR.WHITE} />
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
            <Text style={FONTS.nameItem}>
              {currencyFormat(item.totalPrice)} ₫
            </Text>
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

  const renderStatistical = () => {
    if (product) {
      const nameProduct = product.map(item => item.name);

      const sold = product.map(item => item.sold);
      const chartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      };

      const data = {
        labels: nameProduct,
        datasets: [
          {
            data: sold,
          },
        ],
      };
      return (
        <View style={styles.statisticalComponent}>
          <Text></Text>
          <LineChart
            data={data}
            width={width - 20} // from react-native
            height={450}
            yAxisInterval={1} // optional, defaults to 1
            fromZero={true}
            verticalLabelRotation={45}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    } else {
      return <></>;
    }
  };

  const renderBarChart = () => {
    if (product) {
      const nameProduct = product.map(item => item.name);

      const sold = product.map(item => item.sold);
      const data = {
        labels: nameProduct,
        datasets: [
          {
            data: sold,
          },
        ],
      };
      const chartConfig = {
        backgroundColor: '#0000FF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 255, 0.8)`,
        labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      };
      return (
        <View style={styles.barChar}>
          <BarChart
            style={{marginVertical: 8, borderRadius: 16}}
            data={data}
            width={400} // from react-native
            height={500}
            yAxisInterval={1} // optional, defaults to 1
            fromZero={true}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            showValuesOnTopOfBars={true}
            xLabelsOffset={-10}
            yLabelsOffset={30}
          />
        </View>
      );
    }
  };

  const renderBarChart2 = () => {
    const data = {
      labels: [
        '01-2023',
        '02-2023',
        '03-2023',
        '04-2023',
        '05-2023',
        '06-2023',
        '07-2023',
        '08-2023',
        '09-2023',
        '10-2023',
        '11-2023',
        '12-2023',
      ],
      datasets: [
        {
          data: [
            ordersWithMonth1.length,
            ordersWithMonth2.length,
            ordersWithMonth3.length,
            ordersWithMonth4.length,
            ordersWithMonth5.length,
            ordersWithMonth6.length,
            ordersWithMonth7.length,
            ordersWithMonth8.length,
            ordersWithMonth9.length,
            ordersWithMonth10.length,
            ordersWithMonth11.length,
            ordersWithMonth12.length,
          ],
        },
      ],
    };
    const chartConfig = {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 128, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    };
    return (
      <View style={styles.barChar}>
        <BarChart
          style={{marginVertical: 8, borderRadius: 16}}
          data={data}
          width={570} // from react-native
          height={500}
          yAxisInterval={1} // optional, defaults to 1
          fromZero={true}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
          showValuesOnTopOfBars={true}
          xLabelsOffset={-10}
          yLabelsOffset={30}
        />
      </View>
    );
  };

  const renderBarChart3 = () => {
    const data = {
      labels: [
        '01-2023',
        '02-2023',
        '03-2023',
        '04-2023',
        '05-2023',
        '06-2023',
        '07-2023',
        '08-2023',
        '09-2023',
        '10-2023',
        '11-2023',
        '12-2023',
      ],
      datasets: [
        {
          data: [
            totalPrice1,
            totalPrice2,
            totalPrice3,
            totalPrice4,
            totalPrice5,
            totalPrice6,
            totalPrice7,
            totalPrice8,
            totalPrice9,
            totalPrice10,
            totalPrice11,
            totalPrice12,
          ],
        },
      ],
    };
    const chartConfig = {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    };
    return (
      <View style={styles.barChar}>
        <BarChart
          style={{marginVertical: 8, borderRadius: 16}}
          data={data}
          width={570} // from react-native
          height={500}
          yAxisInterval={1} // optional, defaults to 1
          fromZero={true}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
          showValuesOnTopOfBars={true}
          xLabelsOffset={-10}
          yLabelsOffset={30}
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
            height: 120,
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
              }}></Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('UpdateProduct', {data: itemSelected});
              }}>
              <Text style={styles.txtInBtn}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteProduct}
              style={styles.btnPost}>
              <Text style={styles.txtInBtn}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MyModal>
    );
  };

  const renderModalUpdateStore = () => {
    return (
      <MyModal
        visible={modalUpdateStoreVisible}
        onRequestClose={() => {
          setModalUpdateStoreVisible(false);
        }}>
        <View
          style={{
            height: height - 40,
            width: width - 40,
            backgroundColor: COLOR.WHITE,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            top: 20,
            left: 20,
            elevation: 7,
            position: 'absolute',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                fontStyle: 'italic',
                color: COLOR.BLACK,
              }}>
              Cập nhật thông tin cửa hàng
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalUpdateStoreVisible(false);
                loadingStore();
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flex: 1, paddingTop: 0}}>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Tên Shop:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Tên shop..."
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Mô tả:</Text>
              <TextInput
                style={styles.areaTextInput}
                placeholder="Mô tả..."
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Nổi bật:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="..."
                value={tag}
                onChangeText={setTag}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Email:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="..."
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Số điện thoại:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="..."
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Địa chỉ:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="..."
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={async () => {
                  await loadingStore();
                  setModalUpdateStoreVisible(false);
                }}>
                <Text style={styles.txtInBtn}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onUpdateStore} style={styles.btnPost}>
                <Text style={styles.txtInBtn}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MyModal>
    );
  };

  if (store) {
    return (
      <View style={styles.container}>
        {renderModal()}
        {renderModalUpdateStore()}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View>{renderHeader()}</View>
          <View>{rendertabs()}</View>
          {tab == 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {renderMyFoodsectionIntoColumn(product)}
            </ScrollView>
          )}
          {tab == 2 && (
            <ScrollView>
              <View style={{height: 50}}>{renderOrderStatus()}</View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderListOrder(orderWithStatus)}
              </ScrollView>
            </ScrollView>
          )}
          {tab == 3 && (
            <ScrollView>
              <Text style={styles.title}>
                Số lượng bán được theo từng sản phẩm
              </Text>
              <ScrollView horizontal>{renderBarChart()}</ScrollView>
              <Text style={styles.title}>
                Số lượng đơn đặt hàng theo từng tháng
              </Text>
              <ScrollView horizontal>{renderBarChart2()}</ScrollView>
              <Text style={styles.title}>Doanh thu theo từng tháng</Text>
              <ScrollView horizontal>{renderBarChart3()}</ScrollView>
            </ScrollView>
          )}
        </ScrollView>
        {tab == 1 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateProduct', {store: store});
            }}>
            <Ionicons
              name="add-circle-outline"
              size={50}
              style={styles.iconAdd}
              color={COLOR.BLACK}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.containerAddStore}>
          <Text style={[FONTS.titleFont]}>
            Bạn chưa có sản phẩm nào để bán, vui lòng tạo cửa hàng để bắt đầu
            hoạt động kinh doanh của mình.
          </Text>
        </View>
        <View style={styles.containerAddStore}>
          <Button children={'Tạo cửa hàng '} onPress={handleCreateStore} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    position: 'relative',
  },
  containerAddStore: {
    marginVertical: 50,
    marginHorizontal: 16,
  },
  headerContainer: {
    height: 150,
    width: width,
    alignItems: 'center',
    paddingHorizontal: 10,
    opacity: 0.9,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    height: 60,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabsContainer: {
    width: width,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  iconAdd: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  statisticalComponent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  barChar: {
    flex: 1,
   // paddingHorizontal: 10,
    marginHorizontal:20
  },
  title: {
    fontSize: 22,
    marginLeft: 15,
    marginTop: 10,
    color: COLOR.BLACK,
    fontWeight: '700',
  },
  btnCancel: {
    backgroundColor: COLOR.ORGANGE,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnPost: {
    backgroundColor: COLOR.GREEN2,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtInBtn: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  itemInContent: {
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLOR.BLACK,
  },
  areaTextInput: {
    marginTop: 10,
    height: 100,
    backgroundColor: COLOR.GREY_LIGHT,
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 10,
    fontSize: 16,
  },
});
