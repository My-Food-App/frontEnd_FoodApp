import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';

export function AddressPicker() {
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

  // render
  // console.log('datacity======', dataCities);
  function renderlistCountries() {
    return dataCountries.map((item, key) => (
      <Picker.Item label={item.name} value={item.code} key={key} />
    ));
  }

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

  console.log(
    'PATH=====================================================================',
    numberHouse+", "+codeWards,
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Picker
        selectedValue={codeCountries}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setCodeCountries(itemValue)}>
        {renderlistCountries()}
      </Picker> */}

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
          onValueChange={(itemValue, itemIndex) => setCodeCounties(itemValue)}>
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
          onValueChange={(itemValue, itemIndex) => setCodeWards(itemValue)}>
          {renderlistWards()}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{width: 120, fontSize: 16}}>Phường/Xã</Text>
        <TextInput placeholder='Số nhà ...' value={numberHouse} onChangeText={setNumberHouse} style={{width:200, borderWidth:1, borderRadius:15,height:45}}></TextInput>
      </View>
    </View>
  );
}
