import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const width = Dimensions.get('screen').width;
import {data} from '../data/data';
import {MyModal} from '../../components';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {createStore} from '../../api';

export function MyStoreInfomation({navigation}) {
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tag, setTag] = useState('');
  const [user, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(
    'https://i.pinimg.com/564x/12/86/36/128636a28b06856235a0f1244b0dd249.jpg',
  );

  //for address

  const [dataCountries, setDataCountries] = useState([]);
  const [codeCountries, setCodeCountries] = useState('VN');
  const [dataCities, setDataCities] = useState([]);
  const [codeCities, setCodeCities] = useState('');
  const [dataCounties, setDataCounties] = useState([]);
  const [codeCounties, setCodeCounties] = useState('');
  const [dataWards, setDataWards] = useState([]);
  const [codeWards, setCodeWards] = useState('');
  const [address, setAddress] = useState('');
  const [numberHouse, setNumberHouse] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      console.log('User ====>', result);
      setUserId(JSON.parse(result)._id);
      setUser(JSON.parse(result)); 
      setEmail(JSON.parse(result).email)
      setPhone(JSON.parse(result).phone)
    });
  }, []);

  // for address

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/countries.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        // this.setState({ dataCountries: Object.values(responseJson) });
        setDataCountries(responseJson);
        //  console.log('dataCountries', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/tinh_tp.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        setDataCities(Object.values(responseJson));
        //      console.log('datacity', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/quan_huyen.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        setDataCounties(Object.values(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/xa_phuong.json',
    ) //eslint-disable-line
      .then(response => response.json())
      .then(responseJson => {
        setDataWards(Object.values(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  //

  // for  address

  function renderlistCities() {
    if (dataCities && codeCountries === 'VN') {
      return dataCities.map((item, key) => (
        <Picker.Item label={item.name} value={item.code} key={key} />
      ));
    }
    return <Picker.Item label={'Không có dữ liệu'} value={'noData'} />;
  }

  function renderlistCounties() {
    if (dataCounties && codeCountries === 'VN') {
      const filteredDataCounties = dataCounties.filter(item => {
        return item.parent_code === codeCities;
      });
      return filteredDataCounties.map((item, key) => (
        <Picker.Item label={item.name} value={item.code} key={key} />
      ));
    }
    return <Picker.Item label={'Không có dữ liệu'} value={'noData'} />;
  }

  function renderlistWards() {
    if (dataWards && codeCountries === 'VN') {
      const filteredDataWards = dataWards.filter(item => {
        return item.parent_code === codeCounties;
      });
      return filteredDataWards.map((item, key) => (
        <Picker.Item label={item.name} value={item.path_with_type} key={key} />
      ));
    }
    return <Picker.Item label={'Không có dữ liệu'} value={'noData'} />;
  }
  //

  const openCallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      //  console.log("response=", response);
      if (response.didCancel) {
        console.log('user cancel');
      } else if (response.errorMessage) {
        console.log('error message:', response.errorMessage);
      } else {
        const source = 'data:image/jpeg;base64,' + response.assets[0].base64;
        setImageUri(source);
      }
    });
  };

  const handleCreateStore = () => {
    console.log('ADD');
    if (address !== '') {
      const image = imageUri;
      createStore({name, description, userId, email, phone, address, image});
      setImageUri('https://i.pinimg.com/564x/12/86/36/128636a28b06856235a0f1244b0dd249.jpg');

      navigation.navigate('Tabs');
    } else {
      const image = imageUri;
      const address = user.address;
      if(user.address !== ""){
        createStore({name, description, userId, email, phone, address, image});
      navigation.navigate('Tabs');
      setImageUri('https://i.pinimg.com/564x/12/86/36/128636a28b06856235a0f1244b0dd249.jpg');
      }
      else{
          Alert.alert("Nhập địa chỉ của shop")
      }
    }
  };

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{marginLeft: SIZES.base}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLOR.BLACK,
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
          Tạo của hàng
        </Text>

        <TouchableOpacity
          style={{marginRigth: SIZES.base}}
          onPress={() => console.log('Click More')}>
          <Image
            source={icons.more_icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLOR.BLACK,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  const renderModalPickAddress = () => {
    return (
      <MyModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            height: 350,
            width: 350,
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
              Chọn địa chỉ
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{}}>
              <Icon name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Tỉnh/Thành Phố</Text>
              <Picker
                selectedValue={codeCities}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => {
                  setCodeCities(itemValue);
                }}>
                {renderlistCities()}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Quận/Huyện</Text>
              <Picker
                selectedValue={codeCounties}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) =>
                  setCodeCounties(itemValue)
                }>
                {renderlistCounties()}
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Phường/Xã</Text>
              <Picker
                selectedValue={codeWards}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) =>
                  setCodeWards(itemValue)
                }>
                {renderlistWards()}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{width: 120, fontSize: 16}}>Số nhà</Text>
              <TextInput
                placeholder="Số nhà ..."
                value={numberHouse}
                onChangeText={setNumberHouse}
                style={{
                  width: 200,
                  borderWidth: 1,
                  borderRadius: 15,
                  height: 45,
                }}></TextInput>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setAddress(numberHouse + ', ' + codeWards);
              setModalVisible(false);
            }}
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
  function renderContent() {
    return (
      <View style={styles.containerContent}>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Tên Shop:</Text>
          <TextInput
            placeholder="Tên Shop"
            value={name}
            onChangeText={setName}
            style={styles.textInput}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Mô tả</Text>
          <TextInput
            placeholder="Mô tả"
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inforContent}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textImfor}>Địa chỉ lấy hàng:</Text>
          {address == '' && (
            <Text style={styles.textImfor}>{user.address}</Text>
          )}
          {address !== '' && <Text style={styles.textImfor}>{address}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Email:</Text>
          <TextInput
            style={styles.textImfor}
            value={email}
            onChangeText={setEmail}></TextInput>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inforContent}>
          <Text style={styles.textImfor}>Số điện thoại:</Text>
          <TextInput
            style={styles.textImfor}
            value={phone}
            onChangeText={setPhone}></TextInput>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openCallery}
          style={{height: 120, width: 120, alignSelf: 'center'}}>
          {imageUri && (
            <Image
              style={{height: 120, width: 120, borderRadius: 10}}
              source={{
                uri: imageUri,
              }}
            />
          )}
          {imageUri == '' && (
            <Icon
              name="image"
              size={100}
              color={COLOR.BLACK}
              style={{alignSelf: 'center'}}
            />
          )}
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={handleCreateStore} style={styles.btnSave}>
            <Text style={styles.txtSave}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR.GREY_LIGHT,
      }}>
      {renderModalPickAddress()}
      <View>{renderHeader()}</View>
      <ScrollView>{renderContent()}</ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    backgroundColor: COLOR.WHITE,
    width: width,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inforContent: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray4,
    marginVertical: 10,
  },
  textImfor: {
    fontSize: 20,
    color: COLOR.BLACK,
    marginBottom: 10,
  },
  textInput: {
    marginTop: -10,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    height: 80,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    marginBottom: 10,
  },
  txtSave: {
    alignSelf: 'center',
    fontSize: 24,
    color: COLOR.WHITE,
  },
  btnSave: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: COLOR.MAIN,
    height: 50,
    width: 100,
    borderRadius: 10,
  },
});
