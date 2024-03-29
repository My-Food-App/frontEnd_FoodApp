import React, {
  createRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {data} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {User, Key} from '../../icons';
const {width, height} = Dimensions.get('window');
import {getStores, calculateDelivery} from '../../api';
import axios from 'axios';
import Slider from '../../components/slide';
('../../components/slide/index');
import socket from '../../api/socket';

export function Home({route, navigation}) {
 
  console.log('lll------------------------------------------------------------')
  const [product, setProduct] = useState([]);
  const [stores, setStores] = useState([]);
  const [cart, setCart] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [reset, setReset] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const pr = await getStores();
      setStores(pr);
    };
    fetchData();
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('cart').then(result => {
    if(result != null){
      setCart(JSON.parse(result));
    }else{
      AsyncStorage.setItem('cart', '[]');
      setCart([]);
    }
     
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      console.log('111111111',result);
      setUser(JSON.parse(result));
    });
  }, []);

  useEffect(() => {
    socket.on('LOAD_CART', function () {
      AsyncStorage.getItem('cart').then(result => {
        console.log('resurl--', JSON.parse(result));
        setCart(JSON.parse(result));
      });
    });
  }, []);
 

  //  AsyncStorage.setItem("cart",JSON.stringify(dataTest))
  // AsyncStorage.setItem("cart","[]")
  const types = [
    {
      _id: 1,
      name: 'Cơm',
      image:
        'https://i.pinimg.com/564x/94/08/4b/94084ba112450fcd46bacfa59ad33340.jpg',
    },
    {
      _id: 2,
      name: 'Bún/Phở',
      image:
        'https://i.pinimg.com/564x/22/03/c5/2203c5133347cb94cbc4e2951ac2f1a0.jpg',
    },
    {
      _id: 3,
      name: 'Đồ ăn nhanh',
      image: 'https://cdn-icons-png.flaticon.com/512/4478/4478263.png',
    },
    {
      _id: 4,
      name: 'Đồ uống',
      image:
        'https://i.pinimg.com/564x/b1/f8/d6/b1f8d6fed94b0fd7108f6d981e91d724.jpg',
    },
  ];

  function renderTypes(foods) {
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            //   marginLeft: index == 0 ? SIZES.padding : 0,
            //   marginRight: SIZES.radius,
            flexDirection: 'column',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: width * 0.25,
            height: 100,
            alignItems: 'center',
          }}
          onPress={() => {}}>
          {/* Book Cover */}
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              marginVertical: 10,
            }}
          />

          {/* Info */}
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
        <FlatList
          data={foods}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}`}
          //              pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }



  function DeliveryCalculator({item}) {
    const [deliveryPrice, setDeliveryPrice] = useState(null);
  
    useEffect(() => {
      async function calculateDelivery1() {
        const userAddress = user.address;
        const storeAddress = item.address;
        let ak = await calculateDelivery({userAddress, storeAddress});
      //  console.log('deliveryPrice----', ak);
        setDeliveryPrice(ak);
      }
  
      calculateDelivery1();
    }, [user, item]);
  
    if(deliveryPrice){
      return (
        <View>
          {deliveryPrice && (
            <Text
            style={{
              color: COLOR.lightGray,
              flexWrap: 'wrap-reverse',
              fontSize: 17,
            }}
            >{deliveryPrice.toFixed(2)} km</Text>
          )}
        </View>
      );
    }
    else {
      return (<View></View>)
    }
  }

  //Rendering
  function renderMyFoodsection(foods) {
    const renderItem = ({item, index}) => {


    

      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
            flexDirection: 'column',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: 160,
            height: 270,
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('DetailStore', {
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
              width: 150,
              height: 150,
              borderRadius: 16,
              borderWidth: 5,
              borderColor: COLOR.MAIN,
              marginVertical: 10,
            }}
          />

          {/* Info */}

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: 150,
              height: 100,
            }}>
            {item.tag && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5
                name="check-circle"
                size={20}
                color={COLOR.MAIN}
                style={{marginTop: 2}}
              />
              <Text style={[FONTS.nameItem, {marginLeft: 10}]}>
                {item.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
             
                <DeliveryCalculator  item={item}/>
                {/* <Text
          style={{
            color: COLOR.lightGray,
            flexWrap: 'wrap-reverse',
            fontSize: 17,
          }}
          >2.98 km</Text> */}
              
              <Text
                style={{
                  color: COLOR.lightGray,
                  flexWrap: 'wrap-reverse',
                  fontSize: 17,
                  marginLeft: 20,
                  marginRight: 5,
                }}>
                4.7
              </Text>
              <Icon name="star" size={22} color={COLOR.YELLOW2} />
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1}}>
        {/* foods */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <FlatList
            data={foods}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
  function renderMyFoodsectionIntoColumn(foods) {
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
            navigation.navigate('DetailStore', {
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
              borderRadius: 16,
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
            {item.tag && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5
                name="check-circle"
                size={20}
                color={COLOR.MAIN}
                style={{marginTop: 2}}
              />
              <Text style={[FONTS.nameItem, {marginLeft: 10}]}>
                {item.name}
              </Text>
            </View>
            {/* {<DeliveryCalculator/>} */}
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1}}>
        {/* foods */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <FlatList
            data={foods}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  const CarouselAutoScroll = useCallback((data, interval) => {
    console.log(data);
    const imageRef = useRef();
    const [active, setActive] = useState(0);
    const indexRef = useRef(active);
    indexRef.current = active;

    useInterval(() => {
      if (active < Number(data?.length) - 1) {
        setActive(active + 1);
      } else {
        setActive(0);
      }
    }, interval);

    useEffect(() => {
      imageRef.current.scrollToIndex({index: active, animated: true});
    }, [active]);

    const onViewableItemsChangedHandler = useCallback(
      ({viewableItems, changed}) => {
        if (active != 0) {
          setActive(viewableItems[0].index);
        }
      },
      [],
    );
    const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
      if (active != 0) {
        setActive(viewableItems[0].index);
      }
    }, []);
    const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChangedHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        ref={imageRef}
        pagingEnabled
        data={data}
        horizontal
        renderItem={({item, index}) => (
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: width * 0.9,
              height: 150,
              borderRadius: 20,
              marginVertical: 10,
              marginHorizontal: width * 0.05,
            }}
          />
        )}
      />
    );
  }, []);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  if (user) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            width: width,
            height: 70,
            justifyContent: 'center',
            backgroundColor: COLOR.WHITE,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchStore');
            }}
            style={{
              width: width * 0.7,
              backgroundColor: COLOR.lightGray5,
              height: 45,
              marginLeft: SIZES.padding,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={icons.search_icon}
              resizeMode="contain"
              style={{
                tintColor: COLOR.lightGray,
                width: 20,
                height: 20,
                marginHorizontal: 25,
              }}
            />
            <Text>Bạn muốn ăn gì?</Text>
          </TouchableOpacity>
          <View
            style={{
              width: width * 0.26,
              height: 45,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{width: 40}}
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Icon name="shoppingcart" size={35} color={COLOR.BLACK} />
              <View
                style={{
                  backgroundColor: 'red',
                  marginTop: -15,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  paddingHorizontal: 5,
                }}>
                <Text style={{color: COLOR.WHITE, fontSize: 12}}>
                  {cart.length}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddressPicker');
              }}>
              <Icon name="message1" size={28} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{marginTop: 0, flex: 1}}>
          <View style={{height: 170}}>
            <Slider></Slider>
          </View>
          {/* <View style={{flex:3, backgroundColor: COLOR.WHITE}}>
          {CarouselAutoScroll(data, 3000)}
        </View> */}
          {renderTypes(types)}
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: COLOR.WHITE,
            }}>
            <Text style={FONTS.titleFont}>Đề xuất cho bạn</Text>
            {renderMyFoodsection(stores)}
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: COLOR.WHITE,
            }}>
            <Text style={FONTS.titleFont}>Ưu đãi lớn</Text>
            {renderMyFoodsection(stores)}
          </View>
          <View style={{flex: 3, backgroundColor: COLOR.WHITE, marginTop: 10}}>
            <ScrollView horizontal>
              {renderMyFoodsectionIntoColumn(stores)}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  } else return <></>;
}
const styles = StyleSheet.create({
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
