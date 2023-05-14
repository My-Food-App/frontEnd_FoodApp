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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {getStores,searchStoreByName} from '../../api';
const {width, height} = Dimensions.get('window');

export function ManagerStore({navigation}) {
  const [stores, setStores] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchModalVisiable, setSearchModalVisiable] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [storesSearch, setStoresSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pr = await getStores();
      setStores(pr);
    };
    fetchData();
  }, [load]);

  useEffect(() => {
    const fetchData = async () => {
      const pr = await searchStoreByName({searchValue});
      setStoresSearch(pr);
    };
    fetchData();
  }, [searchValue]);

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setLoad(!load);
          }}>
          <Text
            style={{
              fontSize: 22,
              color: COLOR.BLACK,
              fontWeight: '700',
              alignSelf: 'center',
            }}>
            Quản lý cửa hàng
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderStore = data => {
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
            height: 70,
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('ManageStoreDetail', {data: item})
          }>
          {/* Book Cover */}
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: 60,
              height: 60,
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
              width: 300,
              height: 50,
              marginLeft: 20,
            }}>
            <Text style={styles.fullname}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.address}>
              {item.address}
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

  return (
    <View style={styles.container}>
      {renderHeader()}
      <TouchableOpacity
        style={{zIndex: 10}}
        onPress={() => {
          setSearchModalVisiable(!searchModalVisiable);
        }}>
        <Ionicons
          name="search"
          size={40}
          style={styles.findIcon}
          color={COLOR.BLACK}
        />
      </TouchableOpacity>
      {searchModalVisiable && (
        <View style={styles.searchContainer}>
          <TextInput 
          style={styles.search}
          placeholder="Nhập tên ..." 
          value={searchValue}
          onChangeText={setSearchValue}
          />
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderStore(storesSearch ? storesSearch : stores)}
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
    justifyContent: 'center',
    width: width,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLOR.lightGray3,
    height: 50,
    backgroundColor: COLOR.WHITE,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
  },
  fullname: {
    fontSize: 20,
    color: COLOR.BLACK,
  },
  address: {
    fontSize: 16,
  },
  findIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  searchContainer: {
    height: 70,
    justifyContent: 'center',
  },
  search:{
    marginLeft:10,
    borderRadius:10,
    borderWidth:1,
    width:300,
    fontSize:18
  }
});
