import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import { Input, Button, Title, Description } from "../../components";
import { Authentication } from "../../layouts";
import { User, Key, Mail } from "../../icons";
import { COLOR } from "../../constants";
import {register} from "../../api";
import { ScrollView } from "react-native-gesture-handler";
import {MyModal} from '../../components';

export function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [created_date, setCreated_date] = useState('1/1/2022');

    const default1 = 'Address';

    // for address 

    const [modalVisible, setModalVisible] = useState(false);

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

    const handleRegister = async () => {
        await register({username,password,email,created_date,fullname,phone,navigation,address})
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(phone);
        console.log(fullname);
       
    }
    const handleLogin = async () => {
       
        navigation.navigate("Login");
    }
    return (
        <Authentication>
            {renderModalPickAddress()}
            <Title>Tạo tài khoản mới</Title>
            <Description>Vui lòng nhập tên của bạn, email và mật khẩu để tạo tài khoản mới!</Description>
            <Input onChangeText={setUsername} style={styles.username} icon={<User/>} placeholder="User Name"/>
            <Input onChangeText={setFullName} style={styles.fullName} icon={<User/>} placeholder="Full Name"/>
            <Input onChangeText={setEmail} style={styles.email} icon={<Mail/>} placeholder="Email"/>
            <Input onChangeText={setPassword} style={styles.password} icon={<Key/>} secureTextEntry placeholder="Password"/>
            <Input onChangeText={setPhoneNumber} style={styles.phoneNumber} icon={<Key/>} placeholder="Phone number"/>
            {address =='' && <TouchableOpacity
            onPress={()=>{
                setModalVisible(true)
            }}
                style={{backgroundColor: COLOR.GREY_LIGHT,
                    width: '100%',
                    color: COLOR.BLACK,
                    height: 50,
                    borderRadius: 10,
                    paddingLeft: 40,
                    paddingRight: 10,
                    fontSize:16,
                    marginTop:10,
                    justifyContent :'center'
                }}
            >
                <Text style={{fontSize:18, color:COLOR.lightGray4}}>{default1}</Text>
            </TouchableOpacity>}
            {address !=='' && <TouchableOpacity
            onPress={()=>{
                setModalVisible(true)
            }}
                style={{backgroundColor: COLOR.GREY_LIGHT,
                    width: '100%',
                    color: COLOR.BLACK,
                    height: 50,
                    borderRadius: 10,
                    paddingLeft: 40,
                    paddingRight: 10,
                    fontSize:16,
                    marginTop:10,
                    justifyContent :'center'
                }}
            >
                <Text style={{fontSize:18, color:COLOR.lightGray4}}>{address}</Text>
            </TouchableOpacity>}
            <Button dark style={styles.register} onPress={handleRegister}>đăng ký</Button>
            <View style={styles.containerPrivace}>
                <Text style={styles.acceptRule}>Bằng cách nhấn vào “ĐĂNG KÝ” bạn chấp nhận </Text>
                <TouchableOpacity style={styles.containerTermAndPrivace}>
                    <Text style={styles.termAndPrivace}>điều khoản </Text>
                </TouchableOpacity>
                <Text style={styles.span}>và </Text>
                <TouchableOpacity style={styles.containerTermAndPrivace}>
                    <Text style={styles.termAndPrivace}>dịch vụ </Text>
                </TouchableOpacity>
                <Text style={styles.span}>của chúng tôi.</Text>
            </View>
            <View style={styles.haveAccount}>
                <Text style={styles.textHaveAccount}>Bạn đã có tài khoản?</Text>
            </View>
            <Button onPress={handleLogin}>Đăng nhập</Button>
            
        </Authentication>
    )
}

const styles = StyleSheet.create({
    descriptionForm: {
        fontSize: 12,
        color:'#7D8FAB'
    },
    username: {
        marginTop: 10
    },
    fullName: {
        marginTop: 10
    },
    email: {
        marginTop: 10
    },
    password: {
        marginTop: 10
    },
    phoneNumber: {
        marginTop: 10
    },
    register: {
        marginTop: 8, 
        marginBottom: 18
    },
    haveAccount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginBottom: 10,
        paddingTop: 5,
    },
    containerPrivace: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center'
    },
    textHaveAccount: {
        color: '#7D8FAB'
    },
    acceptRule: {
        paddingTop: 5,
        color: '#7D8FAB',
        fontSize: 13,
        fontWeight: '300'
    },
    containerTermAndPrivace: {
        paddingTop: 5
    },
    termAndPrivace: {
        fontWeight: '700',
        color: COLOR.SOFT 
    },
    span: {
        paddingTop: 5,
        color: COLOR.SOFT
    }
})
