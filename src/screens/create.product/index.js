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
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Input} from '../../components';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createProduct,getCategories} from '../../api';
import socket from '../../api/socket';

const {width, height} = Dimensions.get('window');
export function CreateProduct({navigation, route}) {
  const [idStore, setIdStore] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUri, setImageUri] = useState('');
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState('');
  useEffect(() => {
    let {store} = route.params;
    setIdStore(store._id);
  }, [idStore]);

  useEffect(() => {
    const fetchData = async () => {
      const pr = await getCategories();
      setCategories(pr);
    };
    fetchData();
  }, []);

  console.log("CATEGORY======",category)

console.log("DISCOUNT======",discount)

  const handleCreateProduct = () => {
    socket.emit('CHANGE_LIST_PRODUCT')
    console.log('Create Product');
    if(imageUri){
      const image = imageUri
      createProduct({name, description, idStore, price,image,discount,category}).then(() => {
        navigation.goBack();
        setImageUri("")
      });
    }else{
      createProduct({name, description, idStore, price,discount,category}).then(() => {
        navigation.goBack();
      });

    }
  };


  const openCamera = () => {
    const options = {
      storageOptions:{
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true
    }
    launchCamera(options, response =>{
    //  console.log("response=", response);
      if(response.didCancel) {
        console.log("user cancel")
      }else if(response.errorMessage){
        console.log("error message:", response.errorMessage)
      }else {
        const source = 'data:image/jpeg;base64,'+response.assets[0].base64
        setImageUri(source)
      }
    })
  }

  const openCallery = () => {
    const options = {
      storageOptions:{
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true
    }
    launchImageLibrary(options, response =>{
    //  console.log("response=", response);
      if(response.didCancel) {
        console.log("user cancel")
      }else if(response.errorMessage){
        console.log("error message:", response.errorMessage)
      }else {
        const source = 'data:image/jpeg;base64,'+response.assets[0].base64
        setImageUri(source)
      }
    })
  }

  console.log('STORE========>', idStore);
  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: COLOR.BLACK}}>Đăng sản phẩm</Text>
        <TouchableOpacity style={{}}>
          <Entypo name="dots-three-horizontal" size={30} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    );
  }

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const dataDiscount = [
    {label: '0 %', value: 0},
    {label: '5 %', value: 5},
    {label: '10 %', value: 10},
    {label: '15 %', value: 15},
    {label: '20 %', value: 20},
    {label: '25 %', value: 25},
    {label: '30 %', value: 30},
    {label: '35 %', value: 35},
    {label: '40 %', value: 40},
  ];


  const DropdownComponent = ({data, setStyle}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text
            style={[
              styles.label,
              isFocus && {fontSize: 18, fontWeight: '400', color: COLOR.BLACK},
            ]}>
            Chọn
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[setStyle, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Chọn' : '...'}
          searchPlaceholder="Search..."
          value={discount}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setDiscount(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  const DropdownComponent2 = ({data, setStyle}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text
            style={[
              styles.label,
              isFocus && {fontSize: 18, fontWeight: '400', color: COLOR.BLACK},
            ]}>
            Chọn
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[setStyle, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!isFocus ? 'Chọn' : '...'}
          searchPlaceholder="Search..."
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategory(item.name);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  function renderCotent() {
    return (
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Tên sản phẩm:</Text>
          <Input
            style={{marginTop: 10}}
            placeholder="Tên sản phẩm..."
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Loại sản phẩm:</Text>
          <DropdownComponent2 data={categories} setStyle={styles.dropdownDisCount} />
        </View>

        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Giá:</Text>
          <Input
            style={{marginTop: 10}}
            placeholder="Giá..."
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Giảm giá:</Text>
          <DropdownComponent data={dataDiscount} setStyle={styles.dropdownDisCount} />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Mô tả:</Text>
          <TextInput
            style={styles.areaTextInput}
            placeholder="Mô tả..."
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Hình ảnh sản phẩm:</Text>
          <TouchableOpacity
            onPress={openCallery}
            style={{height:120,width:120,alignSelf:'center'}}
          >
            {imageUri && (
              <Image
                style={{height: 120, width: 120, borderRadius:10}}
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
        </View>
      </ScrollView>
    );
  }
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.btnCancel}
          onPress={() => navigation.goBack()}>
          <Text style={styles.txtInBtn}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPost}>
          <Text style={styles.txtInBtn} onPress={handleCreateProduct}>
            Đăng
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>{renderHeader()}</View>
      <View style={{flex: 1}}>{renderCotent()}</View>
      {renderFooter()}
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
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLOR.lightGray3,
    height: 50,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  itemInContent: {
    justifyContent: 'center',
    marginTop: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLOR.BLACK,
  },
  areaTextInput: {
    marginTop: 10,
    height: 100,
    backgroundColor: COLOR.GREY_LIGHT,
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 10,
    fontSize: 16,
  },
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  dropdownDisCount: {
    height: 60,
    width: 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  footerContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnCancel: {
    backgroundColor: COLOR.ORGANGE,
    height: 45,
    width: 110,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnPost: {
    backgroundColor: COLOR.GREEN2,
    height: 45,
    width: 110,
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
