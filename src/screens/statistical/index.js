import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import {myStore, dataDetail} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {Button} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {
getOrders,getUsers
} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function Statistical() {

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState([]);
  const [listOrderId, setListOrderId] = useState([]);

  const [ordersWithMonth, setOrdersWithMonth] = useState([]);
  const [usersWithMonth1, setUsersWithMonth1] = useState([]);
  const [usersWithMonth2, setUsersWithMonth2] = useState([]);
  const [usersWithMonth3, setUsersWithMonth3] = useState([]);
  const [usersWithMonth4, setUsersWithMonth4] = useState([]);
  const [usersWithMonth5, setUsersWithMonth5] = useState([]);
  const [usersWithMonth6, setUsersWithMonth6] = useState([]);
  const [usersWithMonth7, setUsersWithMonth7] = useState([]);
  const [usersWithMonth8, setUsersWithMonth8] = useState([]);
  const [usersWithMonth9, setUsersWithMonth9] = useState([]);
  const [usersWithMonth10, setUsersWithMonth10] = useState([]);
  const [usersWithMonth11, setUsersWithMonth11] = useState([]);
  const [usersWithMonth12, setUsersWithMonth12] = useState([]);

  const [dateTime, setDateTime] = useState(
    moment(Date.now()).format('MM-YYYY'),
  );
 
  // function convertArray(arr) {
  //   let values = [];
  //   let counts = [];
  //   let countObj = {};
  //   for (let i = 0; i < arr.length; i++) {
  //     let val = arr[i];
  //     if (!countObj[val]) {
  //       countObj[val] = 1;
  //       values.push(val);
  //     } else {
  //       countObj[val]++;
  //     }
  //   }
  //   for (const key in countObj) {
  //     counts.push(countObj[key]);
  //   }
  //   let result = [values, counts];
  // return result;
  // }

  useEffect(() => {  
      const fetchData = async () => {
        const pr = await getOrders();
        setOrders(pr);
       
      };
      fetchData();
 
  }, []);

  useEffect(() => {  
    const fetchData = async () => {
      const pr = await getUsers();
      setUsers(pr);
     
    };
    fetchData();

}, []);

  // setOrderSuccess(orders.filter(checkStatus1));
  //   function checkStatus1(item) {
  //     return item.status == 'Đã giao';
  //   }
  useEffect(() => {
   setOrderSuccess(orders.filter(checkStatus1));
    function checkStatus1(item) {
      return item.status == 'Đã giao';
    }
  }, [orders]);

  useEffect(() => {
    let list = ordersWithMonth.map(item => item.name)
    setListOrderId(list)
   }, [ordersWithMonth]);

   useEffect(() => {
    setUsersWithMonth1(users.filter(checkMonth1));
    function checkMonth1(item) {
      return moment(item.created_date).format('MM-YYYY') == '01-2023';
    }

    setUsersWithMonth2(users.filter(checkMonth2));
    function checkMonth2(item) {
      return moment(item.created_date).format('MM-YYYY') == '02-2023';
    }

    setUsersWithMonth3(users.filter(checkMonth3));
    function checkMonth3(item) {
      return moment(item.created_date).format('MM-YYYY') == '03-2023';
    }

    setUsersWithMonth4(users.filter(checkMonth4));
    function checkMonth4(item) {
      return moment(item.created_date).format('MM-YYYY') == '04-2023';
    }

    setUsersWithMonth5(users.filter(checkMonth5));
    function checkMonth5(item) {
      return moment(item.created_date).format('MM-YYYY') == '05-2023';
    }

    setUsersWithMonth6(users.filter(checkMonth6));
    function checkMonth6(item) {
      return moment(item.created_date).format('MM-YYYY') == '06-2023';
    }

    setUsersWithMonth7(users.filter(checkMonth7));
    function checkMonth7(item) {
      return moment(item.created_date).format('MM-YYYY') == '07-2023';
    }

    setUsersWithMonth8(users.filter(checkMonth8));
    function checkMonth8(item) {
      return moment(item.created_date).format('MM-YYYY') == '08-2023';
    }

    setUsersWithMonth9(users.filter(checkMonth9));
    function checkMonth9(item) {
      return moment(item.created_date).format('MM-YYYY') == '09-2023';
    }

    setUsersWithMonth10(users.filter(checkMonth10));
    function checkMonth10(item) {
      return moment(item.created_date).format('MM-YYYY') == '10-2023';
    }

    setUsersWithMonth11(users.filter(checkMonth11));
    function checkMonth11(item) {
      return moment(item.created_date).format('MM-YYYY') == '11-2023';
    }

    setUsersWithMonth12(users.filter(checkMonth12));
    function checkMonth12(item) {
      return moment(item.created_date).format('MM-YYYY') == '12-2023';
    }
  }, [users]);

  useEffect(() => {
    setOrdersWithMonth(orderSuccess.filter(checkMonth));
    function checkMonth(item) {
      return moment(item.created_date).format('MM-YYYY') == dateTime;
    }
  },[dateTime,orderSuccess])

  function countElements(arr) {
    let counts = {};
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let countArr = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
    let valuesArr = countArr.map(item => item[0]);
    let quantitiesArr = countArr.map(item => item[1]);
    return [valuesArr, quantitiesArr];
  }


  if(listOrderId){
     let result = countElements(listOrderId);
// console.log("ARRAY: " + result[1]);
  }

  function getTopThreeNamesWithTotalPrice(arr) {
    const nameTotalMap = {};
    
    // Tính tổng totalPrice cho từng name
    arr.forEach(item => {
      if (nameTotalMap[item.name]) {
        nameTotalMap[item.name] += item.totalPrice;
      } else {
        nameTotalMap[item.name] = item.totalPrice;
      }
    });
    
    // Sắp xếp các name theo tổng totalPrice giảm dần
    const sortedNames = Object.keys(nameTotalMap).sort((a, b) => nameTotalMap[b] - nameTotalMap[a]);
    
    // Lấy 3 name có tổng totalPrice lớn nhất
    const topThreeNames = sortedNames.slice(0, 3);
    
    // Tạo mảng chứa name và mảng chứa tổng totalPrice của name
    const names = [];
    const totalPrices = [];
    
    // Lấy tên và tổng totalPrice tương ứng với topThreeNames
    topThreeNames.forEach(name => {
      names.push(name);
      totalPrices.push(nameTotalMap[name]);
    });
    
    return [names, totalPrices];
  }


  const [names, totalPrices] = getTopThreeNamesWithTotalPrice(ordersWithMonth);
  console.log('Names:', names);
  console.log('Total Prices:', totalPrices);

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
          Thống kê
        </Text>
      </View>
    );
  }

  const renderHighestOrderOfStore = () =>{

      const data = {
        labels: countElements(listOrderId)[0],
        datasets: [
          {
            data: countElements(listOrderId)[1],
          },
        ],
      };
      const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 255, 0.8)`,
        labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      };
      return (
        <View style={styles.barChar}>
          <BarChart
            style={{marginVertical: 8, borderRadius: 16}}
            data={data}
            width={width-20} // from react-native
            height={550}
            yAxisInterval={1} // optional, defaults to 1
            fromZero={true}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            showValuesOnTopOfBars={true}
            xLabelsOffset={-10}
            yLabelsOffset={30}
          />
        </View>
      );
 
  }

  const renderHighestRevenueStore = () =>{

    const data = {
      labels: names,
      datasets: [
        {
          data: totalPrices,
        },
      ],
    };
    const chartConfig = {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 255, 0.8)`,
      labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    };
    return (
      <View style={styles.barChar}>
        <BarChart
          style={{marginVertical: 8, borderRadius: 16}}
          data={data}
          width={width-20} // from react-native
          height={550}
          yAxisInterval={1} // optional, defaults to 1
          fromZero={true}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
          showValuesOnTopOfBars={true}
          xLabelsOffset={-10}
          yLabelsOffset={20}
        />
      </View>
    );

}

  const renderStatiscalUser = () =>{

    const data = {
      labels: [
        '01-2023',
        '02-2023',
        '03-2023',
        '04-2023',
        '05-2023',
        '06-2023',
        '07-2023',
        '08-2023',
        '09-2023',
        '10-2023',
        '11-2023',
        '12-2023',
      ],
      datasets: [
        {
          data: [usersWithMonth1.length,usersWithMonth2.length,usersWithMonth3.length,usersWithMonth4.length,usersWithMonth5.length,usersWithMonth6.length,usersWithMonth7.length,usersWithMonth8.length,usersWithMonth9.length,usersWithMonth10.length,usersWithMonth11.length,usersWithMonth12.length],
        },
      ],
    };
    const chartConfig = {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 255, 0.8)`,
      labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    };
    return (
      <View style={styles.barChar}>
        <BarChart
          style={{marginVertical: 8, borderRadius: 16}}
          data={data}
          width={570} // from react-native
          height={550}
          yAxisInterval={1} // optional, defaults to 1
          fromZero={true}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
          showValuesOnTopOfBars={true}
          xLabelsOffset={-10}
          yLabelsOffset={30}
        />
      </View>
    );

}


const dataTime = [
  {label: '01-2023', value: '01-2023'},
  {label: '02-2023', value: '02-2023'},
  {label: '03-2023', value: '03-2023'},
  {label: '04-2023', value: '04-2023'},
  {label: '05-2023', value: '05-2023'},
  {label: '06-2023', value: '06-2023'},
  {label: '07-2023', value: '07-2023'},
  {label: '08-2023', value: '08-2023'},
  {label: '09-2023', value: '09-2023'},
  {label: '10-2023', value: '10-2023'},
  {label: '11-2023', value: '11-2023'},
  {label: '12-2023', value: '12-2023'},
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
        value={dateTime}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setDateTime(item.value);
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

  return (
    <ScrollView
      style={styles.container}>
        {renderHeader()}
      <Text style={styles.title}>Top 3 cửa hàng có nhiều đơn đặt hàng nhất</Text>
      <DropdownComponent data={dataTime} setStyle={styles.dropdownDisCount} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>{renderHighestOrderOfStore()}</ScrollView>
      <Text style={styles.title}>Top 3 cửa hàng có doanh thu cao nhất</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>{renderHighestRevenueStore()}</ScrollView>
      <Text style={styles.title}>Số lượng tài khoản đăng ký trong 12 tháng</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>{renderStatiscalUser()}</ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
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
  barChar: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title:{
    fontSize:20,
    marginLeft:15,
    marginTop:10,
    color:COLOR.BLACK,
    fontWeight:'700'
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
    marginLeft:10
  },
});

