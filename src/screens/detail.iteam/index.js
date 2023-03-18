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
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import CheckboxList from 'rn-checkbox-list';
import { COLOR, SIZES, FONTS ,icons} from "../../constants";
import { data as listData,dataDetail } from '../../data/data';
const {width, height} = Dimensions.get('window');

export const DetailItem = ({route, navigation}) => {
  // const [cart, setCart] = useState([{'a':1}]);
  var cart = []
  const [isSelected, setSelection] = useState(false);
  const [data, setData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceOption, setTotalPriceOption] = useState(0);
  useEffect(() => {
    let {data} = route.params;
    setData(data);
    setTotalPrice(data.price);
    console.log( 'data',data);
  }, [data]);

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
            <Text
              style={{color: COLOR.BLACK, fontSize: 24, fontWeight: '700'}}>
              {data.price}
            </Text>
            <Text style={{color: COLOR.lightGray, fontSize: 18}}>Giá gốc</Text>
          </View>
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
        <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
          <Text>{item.name}</Text>
          <Text>+{item.price}</Text>
        </View>
      )
    }
    const countTotal = ({items}) => {
      const value= items.reduce((totalPrice, item) => totalPrice+item.price,0)
      setTotalPriceOption(value)
    }
    return (
      
      <View style={{height: 400,}}>
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
          <View style={{marginTop: 10}}>{renderOptionData(data.option)}</View>
        </ScrollView>

        <View
          style={{
            position: 'relative',
            height: height*0.07,
            backgroundColor: 'yellow',
            marginBottom:10,
            marginHorizontal:20,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center'
          }}>
            <TouchableOpacity
                onPress={async () =>{            
                   await AsyncStorage.getItem("cart").then((result) => {
                    console.log('resurl',result)
                });
                }}
            >
              <Text>Thêm vào giỏ hàng - {totalPrice+totalPriceOption}</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  } else return <></>;
};

