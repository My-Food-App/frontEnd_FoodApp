import React, {useState, useEffect} from 'react';
import {Text, View, ImageBackground, Dimensions, Image,ScrollView,FlatList,TouchableOpacity,StyleSheet} from 'react-native';
import { COLOR, SIZES, FONTS ,icons} from "../../constants";
import { data as listData,dataDetail } from '../../data/data';
import {findProductByIdStore} from '../../api';
const {width, height} = Dimensions.get('window');
export const  DetailStore = ({route, navigation}) => {
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    let {data} = route.params;
    setData(data);
  }, [data]);

  useEffect( () => {
     if(data){
       const storeId = data._id
       const fetchData = async () => {
         const pr = await findProductByIdStore({storeId});
         setProduct(pr);
       };
       fetchData();
     }
   }, [data]);
   console.log("Product ====== ", product);
  // Render data
  const renderDataItem = data => {
    console.log(data);
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Image
            source={{
              uri: data.image,
            }}
            resizeMode="cover"
            style={{
              height: 200,
              width: width,
              opacity: 0.9,
            }}
          />
          <View
            style={{
              width: width * 0.9,
              height: 250,
              backgroundColor: COLOR.WHITE,
              borderRadius: 20,
              borderColor: COLOR.lightGray3,
              borderWidth: 2,
              alignSelf: 'center',
              marginTop: -50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <View style={{flex: 1, marginLeft: 20,}}>
              <Text style={FONTS.titleItem}>{data.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Image
                  source={icons.star_filled_icon}
                  resizeMode="contain"
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
                <Text
                  style={{color: COLOR.BLACK, marginLeft: 20, fontSize: 18}}>
                  4.7
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                  flex: 2,
                }}>
                <Image
                  source={icons.bag_icon}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text
                  style={{color: COLOR.BLACK, marginLeft: 20, fontSize: 18}}>
                  30 Đã bán
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={icons.next_icon}
                  resizeMode="contain"
                  style={{
                    // tintColor: "green",
                    width: 25,
                    height: 25,
                    alignSelf: 'flex-end',
                    marginRight: 20,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 4, flexDirection: 'row',alignItems:'center'}}>
                <Image
                  source={icons.shiper_icon}
                  resizeMode="contain"
                  style={{
                    // tintColor: "green",
                    width: 35,
                    height: 35,
                  }}
                />
                <Text
                  style={{
                    color: COLOR.BLACK,
                    marginLeft: 20,
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  0.4Km (30p)
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={icons.next_icon}
                  resizeMode="contain"
                  style={{
                    // tintColor: "green",
                    width: 25,
                    height: 25,
                    alignSelf: 'flex-end',
                    marginRight: 20,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              <View style={{flex: 4, flexDirection: 'row'}}>
                <Image
                  source={icons.tag_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: 'red',
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{fontSize: 16, color: 'red', marginLeft: 20}}>
                  Ưu đãi đến 35k
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={icons.next_icon}
                  resizeMode="contain"
                  style={{
                    // tintColor: "green",
                    width: 25,
                    height: 25,
                    alignSelf: 'flex-end',
                    marginRight: 20,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
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
              data: item, store:data
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
            <Text numberOfLines={2} style={FONTS.nameItem}>{item.name}</Text>
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
    return (
      <View style={{flex: 1}}>
        {/* foods */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <FlatList
            data={dataDetail}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
  function renderMyFoodsection(foods) {
    const itemSize = width - 20;
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            marginRight: SIZES.radius,
            flexDirection: 'column',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: 160,
            height: 250,
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('DetailItem', {
              data: item, store:data
            })
          }>
          {/* Book Cover */}
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: 160,
              height: 160,
              borderRadius: 20,
              borderWidth: 5,
              borderColor: COLOR.GREEN,
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
            <Text numberOfLines={2} style={FONTS.nameItem}>{item.name}</Text>
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
    return (
      <View style={{flex: 1,justifyContent:'space-between',width:width}}>    
        {/* foods */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <FlatList
            data={foods}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            style={{}}
          />
        </View>
      </View>
    );
  }
  if (product) {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}>
        <View style={{flex: 1}}>{renderDataItem(data)}</View>
        <View style={{flex: 1,marginTop:20}}>
            <Text style={{fontSize: 22, color: 'black', fontWeight: '600',marginLeft:width*0.05}}>Dành cho bạn</Text>
            <ScrollView horizontal>{renderMyFoodsection(product)}</ScrollView>
            </View>
        
        <View style={{flex: 1,marginTop:20}}>
            <Text style={{fontSize: 22, color: 'black', fontWeight: '600',marginLeft:width*0.05}}>Đề xuất</Text>
            <ScrollView horizontal>{renderMyFoodsectionIntoColumn(product)}</ScrollView>
            </View>
      </ScrollView>
    );
  } else return <></>;
};
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

