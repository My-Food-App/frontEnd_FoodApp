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
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import socket from '../../api/socket';

import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {getUsers,searchAccount} from '../../api';
const {width, height} = Dimensions.get('window');

export function ManagerAccount({navigation}) {
  const [subTab, setSubTab] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [accountsWithRole, setAccountsWithRole] = useState([]);
  const [role, setRole] = useState('user');
  const [searchModalVisiable, setSearchModalVisiable] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [accountsSearch, setAccountsSearch] = useState(null);

  useEffect(() => {
     console.log('ACCOUNT ==========',);
    fetchData();
  }, [role,subTab]);

  useEffect(() => { 
    socket.on("LOAD_LIST_ACCOUNT", function () {
      console.log('LOAD_LIST_ACCOUNT');
      fetchData();
    });
  }, []);

  useEffect(() => {
   if(searchValue){
    const fetchData = async () => {   
      const pr = await searchAccount({keyWord:searchValue});
      setAccountsSearch(pr);
    };
    fetchData();
   }
  }, [searchValue]);

 // console.log('ACCOUNT ==========', accounts);
 //console.log('ACCOUNTSearch ==========', accountsSearch);

  useEffect(() => {
   if(!accountsSearch){
    console.log('1111111111111111',);
    setAccountsWithRole(accounts.filter(checkRole));
    function checkRole(item) {
      return item.role == role;
    }

   }

   else{
   
    setAccountsWithRole(accountsSearch.filter(checkRole));
    function checkRole(item) {
      return item.role == role;
      
    }
    console.log('22222222222222',);
  }
  }, [accounts,role,accountsSearch,subTab]);

  const fetchData = async () => {
    const pr = await getUsers();
    setAccounts(pr);
  };

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text
          style={{
            fontSize: 22,
            color: COLOR.BLACK,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Quản lý tài khoản
        </Text>
      </View>
    );
  }

  const renderTabs = () => {
    return (
      <ScrollView
        horizontal
        style={styles.tabsContainer}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            setSubTab(1);
            setRole('user');
          }}
          style={{
            width: width * 0.5,
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
            Người dùng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSubTab(2);
            setRole('shipper');
          }}
          style={{
            width: width * 0.5,
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
            Shipper
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const [refreshing, setRefreshing] = useState(false);
  const loadData = async () => {
    // Tải thêm dữ liệu từ server
    // Sau đó cập nhật state `data` với dữ liệu mới

    const fetchData = async () => {
      const pr = await getUsers();
      setAccounts(pr);
    };
    fetchData();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderUser = data => {
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
            navigation.navigate('ManagerAccountDetail', {data: item})
          }>
          {/* Book Cover */}
          <Image
            source={{
              uri: item.avatar,
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
              width: 200,
              height: 50,
              marginLeft: 20,
            }}>
            <Text style={styles.fullname}>{item.fullname}</Text>
            <Text style={styles.fullname}>{item.phone}</Text>
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
            // onEndReachedThreshold={0.1}
            // onEndReached={loadMoreData}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View style={{height: 50}}>{renderTabs()}</View>
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
          placeholder="Nhập tên, email, số điện thoại ..." 
          value={searchValue}
          onChangeText={setSearchValue}
          />
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        //  refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        {renderUser(accountsWithRole)}
      </ScrollView>

      {subTab == 2 && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateShipper');
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    position: 'relative',
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
  iconAdd: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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
