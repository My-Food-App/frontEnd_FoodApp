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
  findStoreByUserId,
  findProductByIdStore,
  getOrderByStoreId,
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

export function Statistical() {

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

  const renderHighestRevenueStore = () =>{

      const data = {
        labels: ['Cơm cô 3','Cơm cô 6','Cơm bình dân Q 7','Cơm bình dân Q 1','Cơm 74'],
        datasets: [
          {
            data: [1046700,637560,520320,321050,236300],
          },
        ],
      };
      const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
          />
        </View>
      );
 
  }
  return (
    <ScrollView
      style={styles.container}>
        {renderHeader()}
      <Text style={styles.title}>Top 5 cửa hàng có doanh thu lớn nhất</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>{renderHighestRevenueStore()}</ScrollView>
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
    fontSize:22,
    marginLeft:15,
    marginTop:10,
    color:COLOR.BLACK,
    fontWeight:'700'
  }
});

