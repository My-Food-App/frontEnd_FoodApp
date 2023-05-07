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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {searchStoreByName} from '../../api';
const {width, height} = Dimensions.get('window');

export function SearchStore({navigation}) {
  const [searchValue, setSearchValue] = useState('');
  const [stores, setStores] = useState([]);

  useEffect(() => {
   if(searchValue !== ''){
    const fetchData = async () => {
      const pr = await searchStoreByName({searchValue});
      setStores(pr);
    };
    fetchData();
   }
  }, [searchValue]);

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.lightGray2,
            height: 40,
            marginHorizontal: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
          }}>
          <AntDesign name="search1" size={25} color={COLOR.BLACK} />
          <TextInput
            placeholder="Bạn đang muốn ăn gì ?"
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
        <TouchableOpacity>
          <AntDesign name="ellipsis1" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
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
              <Text style={FONTS.tagNameItem}>Ưu đãi đến 35k</Text>
            </View>
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
            <Text
              style={{
                color: COLOR.lightGray,
                flexWrap: 'wrap-reverse',
                fontSize: 17,
              }}>
              1.3 km
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
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView horizontal>
        {renderMyFoodsectionIntoColumn(stores)}
      </ScrollView>
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
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLOR.lightGray3,
    height: 60,
    backgroundColor: COLOR.WHITE,
  },
});
