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
} from 'react-native';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {userInfor, data, dataActivities} from '../../data/data';
import {getUserbyId, updateAccount} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MyModal} from '../../components';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
const {width, height} = Dimensions.get('window');

export const Account = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [newphone, setNewphone] = useState('');
  const [newBirthday, setNewBirthday] = useState('');

  const [modalFullnameVisible, setModalFullnameVisible] = useState(false);
  const [modalPhoneVisible, setModalPhoneVisible] = useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modaBirthdayVisible, setModalBirthdayVisible] = useState(false);
  const [modalAddressVisible, setModalAddressVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  //for address

  const [dataCountries, setDataCountries] = useState([]);
  const [codeCountries, setCodeCountries] = useState('VN');
  const [dataCities, setDataCities] = useState([]);
  const [codeCities, setCodeCities] = useState('');
  const [dataCounties, setDataCounties] = useState([]);
  const [codeCounties, setCodeCounties] = useState('');
  const [dataWards, setDataWards] = useState([]);
  const [codeWards, setCodeWards] = useState('');
  const [newAddress, setNewAddress] = useState('');
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

  console.log('--------------------------------');
  useEffect(() => {
    AsyncStorage.getItem('user').then(result => {
      console.log(result);
      setUser(JSON.parse(result));
    });
  }, []);

  useEffect(() => {
    if (user) {
      const id = user._id;
      const fetchData = async () => {
        const pr = await getUserbyId({id});
        setFullname(pr.fullname);
        setEmail(pr.email);
        setPhone(pr.phone);
        setAddress(pr.address);
        setBirthday(pr.birthday);
        setPassword(pr.password);
      };
      fetchData();
    }
  }, [user]);

  const handleLogout = async () => {
    await AsyncStorage.setItem('notifi', '0');
    await AsyncStorage.setItem('cart', '[]').then(() => {
      navigation.navigate('Login');
    });
  };

  const loaddingAccount = async () => {
    if (user) {
      const id = user._id;
      const fetchData = async () => {
        const pr = await getUserbyId({id});
        setFullname(pr.fullname);
        setEmail(pr.email);
        setPhone(pr.phone);
        setAddress(pr.address);
        setBirthday(pr.birthday);
        setPassword(pr.password);
      };
      fetchData();
    }
  };

  const handleUpdateName = async () => {
    if (newFullname !== '' && newFullname.trim().length > 6) {
      const id = user._id;
      const fullname = newFullname;
      await updateAccount({id, fullname});
      setNewFullname('');
      setModalFullnameVisible(false);
      await loaddingAccount();
    } else {
      Alert.alert('Tên không được bỏ trống và phải lớn hơn 6 ký tự');
    }
  };

  const handleUpdatePhone = async () => {
    if (newphone !== '' && newphone.trim().length == 10) {
      const id = user._id;
      const phone = newphone;
      await updateAccount({id, phone});
      setNewphone('');
      setModalPhoneVisible(false);
      await loaddingAccount();
    } else {
      Alert.alert('Số điện thoại không hợp lệ');
    }
  };
  const handleUpdateEmail = async () => {
    if (newEmail !== '' && newEmail.trim().length >= 6) {
      const id = user._id;
      const email = newEmail;
      await updateAccount({id, email});
      setNewEmail('');
      setModalEmailVisible(false);
      await loaddingAccount();
    } else {
      Alert.alert('Email không hợp lệ');
    }
  };
  const handleUpdateAddress = async () => {
    if (numberHouse == '' && numberHouse.trim().length == 0) {
      Alert.alert('Nhập số nhà');
    } else {
      if (newAddress !== '' && newAddress.trim().length > 0) {
        const id = user._id;
        const address = newAddress;
        await updateAccount({id, address});
        setNewAddress('');
        setModalAddressVisible(false);
        await loaddingAccount();
      } else {
        Alert.alert('Địa chỉ không hợp lệ');
      }
    }
  };
  const handleUpdateBirthDay = async ({date}) => {
    setDate(date);
    const id = user._id;
    const birthday = date;
    await updateAccount({id, birthday});
    setOpen(false);
    await loaddingAccount();
    
  };
  const handleUpdatePassword = async () => {};

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

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
          flex: 1,
          paddingHorizontal: 25,
          alignItems: 'center',
          borderBottomColor: COLOR.lightGray3,
        }}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK}}>
          Thông tin tài khoản
        </Text>
        <TouchableOpacity style={{}}>
          <Image
            source={icons.setting_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderInforUser() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{height: 130, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: user.avatar,
            }}
            resizeMode="cover"
            style={{
              // tintColor: "green",
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalFullnameVisible(true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 30,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Tên</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>{fullname}</Text>
          </View>
          <Image
            source={icons.pen_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalPhoneVisible(true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 30,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>
              Số điện thoại
            </Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>{phone}</Text>
          </View>
          <Image
            source={icons.pen_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalEmailVisible(true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 30,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Email</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>{email}</Text>
          </View>
          <Image
            source={icons.pen_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalAddressVisible(true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 30,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>Địa chỉ</Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18, width: 300}}>
              {address}
            </Text>
          </View>
          <FontAwesome5 name="map-marker-alt" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 30,
            height: 80,
            alignItems: 'center',
            borderColor: COLOR.lightGray5,
            borderWidth: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLOR.GREY_DARK, fontSize: 16}}>
              Ngày sinh
            </Text>
            <Text style={{color: COLOR.BLACK, fontSize: 18}}>
              {moment(birthday).format('DD-MM-YYYY')}
            </Text>
          </View>
          <Image
            source={icons.pen_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const renderFullnameModal = () => {
    return (
      <MyModal
        visible={modalFullnameVisible}
        onRequestClose={() => {
          setModalFullnameVisible(false);
        }}>
        <View
          style={{
            height: 170,
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
                marginLeft: 10,
              }}>
              Đổi tên
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalFullnameVisible(false);
                setNewFullname('');
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <TextInput
              value={newFullname}
              onChangeText={setNewFullname}
              style={styles.input}
            />
          </View>
          <View
            style={{
              height: 55,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                setModalFullnameVisible(false);
                setNewFullname('');
              }}>
              <Text style={styles.txtInBtn}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdateName} style={styles.btnPost}>
              <Text style={styles.txtInBtn}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MyModal>
    );
  };

  const renderPhoneModal = () => {
    return (
      <MyModal
        visible={modalPhoneVisible}
        onRequestClose={() => {
          setModalPhoneVisible(false);
        }}>
        <View
          style={{
            height: 170,
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
                marginLeft: 10,
              }}>
              Cập nhật điện thoại
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalPhoneVisible(false);
                setNewphone('');
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <TextInput
              value={newphone}
              onChangeText={setNewphone}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              height: 55,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                setModalPhoneVisible(false);
                setNewphone('');
              }}>
              <Text style={styles.txtInBtn}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdatePhone}
              style={styles.btnPost}>
              <Text style={styles.txtInBtn}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MyModal>
    );
  };

  const renderEmailModal = () => {
    return (
      <MyModal
        visible={modalEmailVisible}
        onRequestClose={() => {
          setModalEmailVisible(false);
        }}>
        <View
          style={{
            height: 170,
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
                marginLeft: 10,
              }}>
              Cập nhật email
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalEmailVisible(false);
                setNewEmail('');
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <TextInput
              value={newEmail}
              onChangeText={setNewEmail}
              style={styles.input}
            />
          </View>
          <View
            style={{
              height: 55,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                setModalEmailVisible(false);
                setNewEmail('');
              }}>
              <Text style={styles.txtInBtn}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateEmail}
              style={styles.btnPost}>
              <Text style={styles.txtInBtn}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MyModal>
    );
  };

  function renderActivities() {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 60,
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: COLOR.WHITE,
          }}>
          <Text style={{color: COLOR.BLACK, fontSize: 18}}>Đổi mật khẩu</Text>
          <Image
            source={icons.next_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 60,
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
            backgroundColor: COLOR.WHITE,
          }}>
          <Text style={{color: COLOR.BLACK, fontSize: 18}}>Xóa tài khoản</Text>
          <Image
            source={icons.next_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.WHITE,
            marginVertical: 20,
            height: 60,
          }}>
          <Text style={{color: 'red', fontSize: 20}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderModalPickAddress = () => {
    return (
      <MyModal
        visible={modalAddressVisible}
        onRequestClose={() => {
          setModalAddressVisible(false);
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
                setModalAddressVisible(false);
                setNewAddress('')
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
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
              setNewAddress(numberHouse + ', ' + codeWards);
              handleUpdateAddress();
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

  if (user) {
    return (
      <ScrollView style={styles.container}>
        {renderFullnameModal()}
        {renderPhoneModal()}
        {renderEmailModal()}
        {renderModalPickAddress()}
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          locale={'eng'}
          // is24hourSource={'locale'}
          onConfirm={date => {
            handleUpdateBirthDay({date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
          title="Chọn ngày sinh"
          confirmText="Xác nhận"
          cancelText="Hủy"
        />

        <View style={{height: 50, backgroundColor: COLOR.WHITE}}>
          {renderHeader()}
        </View>
        <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
          {renderInforUser()}
        </View>
        <Text
          style={{lineHeight: 20, marginHorizontal: 20, marginVertical: 10}}>
          * Các thông tin này sẽ không được hiển thị hoặc chia sẽ cho bất kỳ ai
          khác ngoài bạn!
        </Text>
        <View style={{flex: 1}}>{renderActivities()}</View>
      </ScrollView>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  btnCancel: {
    backgroundColor: COLOR.ORGANGE,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnPost: {
    backgroundColor: COLOR.GREEN2,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtInBtn: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 10,
  },
});
