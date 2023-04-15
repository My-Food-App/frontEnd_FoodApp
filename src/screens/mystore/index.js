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
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
import {myStore, dataDetail} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {findStoreByUserId,findProductByIdStore,getOrderByStoreId} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function MyStore({navigation}) {
  const [productInMyStore, setProductInMyStore] = useState('1');
  const [tab, setTab] = useState(1);
  const [subTab, setSubTab] = useState(1);
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null)
  const [product, setProduct] = useState(null)
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState("Chờ xác nhận");
  const [orderWithStatus, setOrderWithStatus] = useState(null);


  const handleCreateStore = () => {
    navigation.navigate('MyStoreInfomation');
  };

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      console.log(result);
      setUser(JSON.parse(result));
    });
  }, []);

  useEffect( () => {
     if(user){
       const userId = user._id
       const fetchData = async () => {
         const pr = await findStoreByUserId({userId});
         setStore(pr);
       };
       fetchData();
     }
   }, [user]);


   useEffect( () => {
    if(store){
      const storeId = store._id
      const fetchData = async () => {
        const pr = await findProductByIdStore({storeId});
        const orders = await getOrderByStoreId({storeId});
        setProduct(pr);
        setOrders(orders);
      };
      fetchData();
    }
  }, [store]);

  useEffect(() => {
    setOrderWithStatus(orders.filter(checkStatus1))
   function checkStatus1(item) {
     return item.status == status;
   }
   },[status,orders])

   console.log("Store ==========>",store)
   console.log("product ==========>",product)
   console.log("orders ==========>",orders)

  const renderHeader = () => {
    return (
      <ImageBackground
        style={styles.headerContainer}
        source={{
          uri: 'https://assets-global.website-files.com/5e39e095596498a8b9624af1/5f6e93d250a6d04f4eae9f02_Backgrounds-WFU-thumbnail-(size).jpg',
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
            <Text style={{color: COLOR.WHITE, fontSize: 20}}>
              {store.name}
            </Text>
            {store.status && <Text style={{color: COLOR.WHITE}}>Mở cửa</Text>}
            {store.status != true && (
              <Text style={{color: COLOR.WHITE}}>Đóng cửa</Text>
            )}
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
              <Icon name="star" size={20} color={COLOR.YELLOW} />
            </View>
          </View>
          <TouchableOpacity
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
          onPress={() =>
            navigation.navigate('DetailItem', {
              data: item,
            })
          }>
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
              borderColor: COLOR.GREEN,
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
            <Text
              style={{
                color: COLOR.lightGray,
                flexWrap: 'wrap-reverse',
                fontSize: 17,
              }}>
              Giá: {item.price} đ
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    if(product){
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
    }
    else return (<></>)
  }
  const renderOrderStatus = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => {
            setSubTab(1);
            setStatus("Chờ xác nhận")
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
            setStatus("Chờ lấy")
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
            setStatus("Đang giao")
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
            setStatus("Đã giao")
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
            setStatus("Đã hủy")
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
  if (store) {
    return (
      <View style={styles.container}>
        <View>{renderHeader()}</View>
        <View>{rendertabs()}</View>
        {tab == 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderMyFoodsectionIntoColumn(product)}
          </ScrollView>
        )}
        {tab == 2 && <ScrollView >
          <View style={{height:50}}>{renderOrderStatus()}</View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderListOrder(orderWithStatus)}
          </ScrollView>
         
          </ScrollView>}
        {tab == 3 && (
          <ScrollView>
            <Text>3</Text>
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateProduct',{store: store});
          }}>
          <Ionicons
            name="add-circle-outline"
            size={50}
            style={styles.iconAdd}
            color={COLOR.BLACK}
          />
        </TouchableOpacity>
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
    paddingHorizontal:10
  },
  iconAdd: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
