import React, {useState} from 'react';
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
import {Input} from '../../components';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
const {width, height} = Dimensions.get('window');
export function CreateProduct({navigation}) {
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

  const DropdownComponent = ({data,setStyle}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { fontSize: 18,
            fontWeight: '400',
            color: COLOR.BLACK,}]}>
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
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
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
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Tên sản phẩm:</Text>
          <Input style={{marginTop: 10}} placeholder="Tên sản phẩm..." />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Loại sản phẩm:</Text>
          <DropdownComponent data={data} setStyle={styles.dropdown}/>
          
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Số Lượng:</Text>
          <Input
            style={{marginTop: 10}}
            placeholder="Số lượng..."
            keyboardType="numeric"
          />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Giá:</Text>
          <Input
            style={{marginTop: 10}}
            placeholder="Giá..."
            keyboardType="numeric"
          />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Giảm giá:</Text>
          <DropdownComponent data={data} setStyle={styles.dropdownDisCount}/>
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Mô tả:</Text>
          <TextInput
            style={styles.areaTextInput}
            placeholder="Mô tả..."
            multiline
          />
        </View>
        <View style={styles.itemInContent}>
          <Text style={styles.textTitle}>Hình ảnh sản phẩm:</Text>
          <TouchableOpacity>
          <Icon name="image" size={100} color={COLOR.BLACK} style={{alignSelf:'center'}} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  const renderFooter = () =>{
    return(<View style={styles.footerContainer}>
        <TouchableOpacity style={styles.btnCancel}>
            <Text style={styles.txtInBtn}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPost}>
            <Text style={styles.txtInBtn}>Đăng bài</Text>
        </TouchableOpacity>
    </View>)
  }
  return (

      <View style={styles.container}>
        <View>{renderHeader()}</View>
        <View style={{flex:1}}>{renderCotent()}</View>
        {renderFooter()}
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.WHITE
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
    marginTop:10
  },
  dropdownDisCount: {
    height: 60,
    width:200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop:10
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
  footerContainer:{
    height:80,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:20
  },
  btnCancel:{
    backgroundColor:COLOR.ORGANGE,
    height:45,
    width:110,
    borderRadius:10,
    justifyContent : 'center'
  },
  btnPost:{
    backgroundColor:COLOR.GREEN2,
    height:45,
    width:110,
    borderRadius:10,
    justifyContent : 'center',
  },
  txtInBtn:{
    color:COLOR.WHITE,
    fontSize:18,
    fontWeight:'700',
    alignSelf:'center',
   
  }

});
