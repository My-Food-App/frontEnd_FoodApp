import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import {Input, Button, Title, Description} from '../../components';
import {Authentication} from '../../layouts';
import {User, Key, Mail} from '../../icons';
import {COLOR} from '../../constants';
import {register, getUsers} from '../../api';
import {ScrollView} from 'react-native-gesture-handler';
import {MyModal} from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';


export function Register({navigation}) {
  const [username, setUsername] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [created_date, setCreated_date] = useState('1/1/2022');
  const [accounts, setAccounts] = useState([]);
  const [listUserName, setListUserName] = useState([]);
  const [listEmail, setListEmail] = useState([]);
  const [listPhone, setListPhone] = useState([]);

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorUserName, setErrorUserName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [errorValidateEmail, setErrorValidateEmail] = useState('');
  const [errorValidatePhone, setErrorValidatePhone] = useState('');
  const [errorValidateUserName, setErrorValidateUserName] = useState('');


  

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

  useEffect(() => {
    const fetchData = async () => {
      const pr = await getUsers();
      // setAccounts(pr.map(item => item.username));
      setListUserName(pr.map(item => item.username))
      setListEmail(pr.map(item => item.email))
      setListPhone(pr.map(item => item.phone))
    };
    fetchData();
  }, []);
 // console.log('ACCOUNT ==========', accounts);
 console.log('UserName ==========', listUserName);
 console.log('Email ==========', listEmail);
 console.log('Phone ==========', listPhone);

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

  // validation
  const checkUserName = data => listUserName.includes(data);
  const chekEmail = data => listEmail.includes(data);
  const chekPhone = data => listPhone.includes(data);
  const checkPassword = data => data.length>=6

 const validateEmail = data =>(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(data)
 const validatePhone = data =>(/(0[3|5|7|8|9])+([0-9]{8})\b/).test(data)
 const validateUserName = data =>(/^[a-zA-Z0-9_-]{6,16}$/).test(data)



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
   if(errorEmail == '' && errorPassword =='' && errorUserName == '' && errorPhone =='' && address !=='' && errorValidateEmail =='' && errorValidatePhone == '' && errorValidateUserName =='') {
    await register({
      username,
      password,
      email,
      created_date,
      fullname,
      phone,
      navigation,
      address,
    });
   }
   else{
    Alert.alert('Thông tin thiếu hoặc không hợp lệ')
    return;
   }
    
  };
  const handleLogin = async () => {
    navigation.navigate('Login');
  };
  return (
    <Authentication>
      {renderModalPickAddress()}
      <Title>Tạo tài khoản mới</Title>
      <Description>
        Vui lòng nhập tên của bạn, email và mật khẩu để tạo tài khoản mới!
      </Description>
      <Input
        onChangeText={(text) =>{
            setUsername(text)
            setErrorUserName(checkUserName(text) == true ? 'Tên đăng nhập đã tồn tại': '')
            setErrorValidateUserName(validateUserName(text) == false ? 'Tên đăng nhập phải từ 6 đến 16 ký tự và ko chứa ký tự đặc biệt': '')
        }}
        style={styles.username}
        icon={<FontAwesome5 name="user-alt" size={20} color={COLOR.BLACK} />}
        placeholder="User Name"
      />
      {errorUserName !== '' && <Text style={{color:COLOR.RED}}>{errorUserName}</Text>}
      {errorValidateUserName !== '' && <Text style={{color:COLOR.RED}}>{errorValidateUserName}</Text>}
      <Input
        onChangeText={setFullName}
        style={styles.fullName}
        icon={<FontAwesome5 name="user-alt" size={20} color={COLOR.BLACK} />}
        placeholder="Full Name"
      />
      <Input
        onChangeText={(text)=>{
          setEmail(text)
          setErrorEmail(chekEmail(text) == true ? 'Email đã tồn tại':'')
          setErrorValidateEmail(validateEmail(text) == false ? 'Email sai định dạng':'')
        }}
        style={styles.email}
        icon={<Entypo name="mail" size={20} color={COLOR.BLACK} />}
        placeholder="Email"
      />
      {errorEmail !== '' && <Text style={{color:COLOR.RED}}>{errorEmail}</Text>}
      {errorValidateEmail !== '' && <Text style={{color:COLOR.RED}}>{errorValidateEmail}</Text>}
      <Input
        onChangeText={(text)=>{
            setPassword(text)
            setErrorPassword(checkPassword(text) == true ? '':'Mật khẩu phải lớn hơn 6 ký tự')
        }}
        style={styles.password}
        icon={<FontAwesome5 name="key" size={20} color={COLOR.BLACK} />}
        secureTextEntry
        placeholder="Password"
      />
      {errorPassword !== '' && <Text style={{color:COLOR.RED}}>{errorPassword}</Text>}
      <Input
        onChangeText={(text) =>{
          setPhoneNumber(text)
          setErrorPhone(chekPhone(text) == true ? 'Số điện thoại đã tồn tại':'')
          setErrorValidatePhone(validatePhone(text) == false ? 'Số điện thoại không hợp lệ':'')
        }}
        style={styles.phoneNumber}
        icon={<FontAwesome5 name="phone-alt" size={20} color={COLOR.BLACK} />}
        placeholder="Phone number"
      />
      {errorPhone !== '' && <Text style={{color:COLOR.RED}}>{errorPhone}</Text>}
      {errorValidatePhone !== '' && <Text style={{color:COLOR.RED}}>{errorValidatePhone}</Text>}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {address == '' && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: COLOR.GREY_LIGHT,
              width: '100%',
              color: COLOR.BLACK,
              height: 50,
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 10,
              fontSize: 16,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name="map-marker-alt"
              size={20}
              color={COLOR.BLACK}
              style={{}}
            />
            <Text
              style={{fontSize: 18, color: COLOR.lightGray4, marginLeft: 10}}>
              {default1}
            </Text>
          </TouchableOpacity>
        )}
        {address !== '' && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: COLOR.GREY_LIGHT,
              width: '100%',
              color: COLOR.BLACK,
              height: 50,
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 10,
              fontSize: 16,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name="map-marker-alt"
              size={20}
              color={COLOR.BLACK}
              style={{}}
            />
            <Text
              style={{fontSize: 18, color: COLOR.lightGray4, marginLeft: 10}}>
              {address}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Button dark style={styles.register} onPress={handleRegister}>
        đăng ký
      </Button>
      <View style={styles.containerPrivace}>
        <Text style={styles.acceptRule}>
          Bằng cách nhấn vào “ĐĂNG KÝ” bạn chấp nhận{' '}
        </Text>
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
  );
}

const styles = StyleSheet.create({
  descriptionForm: {
    fontSize: 12,
    color: '#7D8FAB',
  },
  username: {
    marginTop: 10,
  },
  fullName: {
    marginTop: 10,
  },
  email: {
    marginTop: 10,
  },
  password: {
    marginTop: 10,
  },
  phoneNumber: {
    marginTop: 10,
  },
  register: {
    marginTop: 8,
    marginBottom: 18,
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
    alignItems: 'center',
  },
  textHaveAccount: {
    color: '#7D8FAB',
  },
  acceptRule: {
    paddingTop: 5,
    color: '#7D8FAB',
    fontSize: 13,
    fontWeight: '300',
  },
  containerTermAndPrivace: {
    paddingTop: 5,
  },
  termAndPrivace: {
    fontWeight: '700',
    color: COLOR.SOFT,
  },
  span: {
    paddingTop: 5,
    color: COLOR.SOFT,
  },
});
