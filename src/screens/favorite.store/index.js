import React, { useState } from 'react';
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
import {COLOR, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');
export function FavoriteStore({navigation}) {
    const [orders, setOrders] = useState(null)
    function renderHeader() {
        return (
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: COLOR.BLACK, fontWeight: '600'}}>
             Đơn hàng của tôi
            </Text>
            <TouchableOpacity>
              <Icon name="ellipsis-h" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
        );
      }
     
 if(orders) {
    return (
        <View
          style={styles.container}>
          {renderHeader()}
        </View>
      )
 }
  else {
    return (<View style={{alignItems:'center',}}>
        {renderHeader()}
        <Icon name="heart" size={100} color={COLOR.MAIN} style={{marginTop:20}}/>
        <Text style={{fontSize:18, marginTop:20}}>Chỉ cần nhấn vào biểu tượng trái tim trong mỗi trang cảu nhà hàng và quán bạn lưu sẽ ở đây.</Text>
    </View>)
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
      },
      headerContainer: {
        width:width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: COLOR.lightGray3,
        height: 50,
        backgroundColor: COLOR.WHITE,
      },
      tabsContainer: {
        width: width,
        height: 50,
        flexDirection: 'row',
        paddingHorizontal:10
      },
})