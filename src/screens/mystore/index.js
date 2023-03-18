import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
const width = Dimensions.get('screen').width;
import {data} from '../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';

export function MyStore({navigation}) {
  const [productInMyStore, setProductInMyStore] = useState('');
  const handleCreateStore = () =>{
      navigation.navigate("MyStoreInfomation")
  }
  if (productInMyStore) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>myStore!</Text>
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.containerAddStore}>
          <Text style={[FONTS.titleFont]}>
            Bạn chưa có sản phẩm nào để bán, vui lòng tạo cửa hàng để bắt đầu
            hoạt động kinh doanh của mình.
          </Text>
        </View>
        <View style={styles.containerAddStore}>
        <Button children={'Tạo cửa hàng '} onPress={handleCreateStore} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerAddStore:{
    marginVertical:50,
    marginHorizontal:16
  }
})
