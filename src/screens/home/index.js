import React, {
  createRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { data } from "../../data/data";
import { COLOR, SIZES, FONTS ,icons} from "../../constants";
import { User, Key } from "../../icons";
const { width, height } = Dimensions.get("window");

export function Home({ route, navigation }) {
  
  console.log(data);


//Rendering
  function renderMyFoodsection(foods) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
            flexDirection: "column",
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: 160,
            height: 270,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("DetailStore", {
              data: item,
            })
          }
        >
          {/* Book Cover */}
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: 150,
              height: 150,
              borderRadius: 20,
              borderWidth: 5,
              borderColor: COLOR.GREEN,
              marginVertical: 10,
            }}
          />

          {/* Info */}

          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              width: 150,
              height: 100,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Text style={FONTS.nameItem}>{item.name}</Text>
            <Text
              style={{
                color: COLOR.lightGray,
                flexWrap: "wrap-reverse",
                fontSize: 17,
              }}
            >
              Giá: {item.price} đ
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        {/* foods */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <FlatList
            data={foods}
            renderItem={renderItem}
            keyExtractor={(item) => `${item._id}`}
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
            navigation.navigate('DetaiStore', {
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
            <Text style={FONTS.nameItem}>{item.name}</Text>
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
          <TouchableOpacity>
            <Image
              source={icons.cart_icon}
              resizeMode="contain"
              style={{
                tintColor: COLOR.lightGray,
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.chat_icon}
              resizeMode="contain"
              style={{
                tintColor: COLOR.lightGray,
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{marginTop: 0, flex: 1}}>
        {/* <View style={{height: 170}}>
          <Slider></Slider>
        </View> */}
        {/* <View style={{flex: 3, backgroundColor: Colors.white}}>
          {CarouselAutoScroll(data, 3000)}
        </View> */}
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            marginTop: 10,
            backgroundColor: COLOR.WHITE,
          }}>
          <Text style={FONTS.titleFont}>Đề xuất cho bạn</Text>
          {renderMyFoodsection(data)}
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            marginTop: 10,
            backgroundColor: COLOR.WHITE,
          }}>
          <Text style={FONTS.titleFont}>Ưu đãi lớn</Text>
          {renderMyFoodsection(data)}
        </View>
        <View style={{flex: 3, backgroundColor: COLOR.WHITE, marginTop: 10}}>
          <ScrollView horizontal>
            {renderMyFoodsectionIntoColumn(data)}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  customRatingBar: {
    justifyContent: "center",
    flexDirection: "row",
  },
  starImageStyle: {
    width: 15,
    height: 15,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
