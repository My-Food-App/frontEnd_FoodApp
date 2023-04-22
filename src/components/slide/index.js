import React, {Component, createRef,useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
let CurrentSlide = 0;
let IntervalTime = 4000;


export default class Slider extends Component {
    
  flatList = createRef();

  // TODO _goToNextPage()
  _goToNextPage = () => {
    if (CurrentSlide >= this.state.link.length-1) CurrentSlide = 0;

    this.flatList.current.scrollToIndex({
      index: ++CurrentSlide,
      animated: true,
    });
  };

  _startAutoPlay = () => {
    this._timerId = setInterval(this._goToNextPage, IntervalTime);
  };

  _stopAutoPlay = () => {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };


  componentDidMount() {
    this._stopAutoPlay();
    this._startAutoPlay();
  }

  componentWillUnmount() {
    this._stopAutoPlay();
  }

  // TODO _renderItem()
  _renderItem({item, index}) {
    return <Image source={{uri: item}} style={styles.sliderItems} />;
  }

  // TODO _keyExtractor()
  _keyExtractor(item, index) {
    // console.log(item);
    return index.toString();
  }
  state = {
    link: [
      'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-0_1630563211.jpg',
      'https://dulichkhampha24.com/wp-content/uploads/2022/10/com-tam-ngon-da-nang-4-3.jpg',
      'https://i.pinimg.com/564x/c9/07/9d/c9079d25d2278acd93cf9f7d53d38294.jpg',
      'https://i.pinimg.com/564x/5b/20/3b/5b203bfbc13f517dcf536a09ddb823f6.jpg',
      'https://i.pinimg.com/564x/ee/8f/03/ee8f036c6dfbb464866d788bd0ff36c0.jpg',
    ],
  };

  render() {
    return (
      <View style={{backgroundColor:'white'}}>
        <FlatList
          style={{
            height:170
            // TODO Remove extera global padding
            // marginLeft: -size.padding,
            // marginRight: -size.padding,
          }}
          data={this.state.link}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
          horizontal={true}
          flatListRef={React.createRef()}
          ref={this.flatList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderItems: {
    marginHorizontal: width*0.05,
    height: 170,
    width: Dimensions.get('window').width*0.9,
    borderRadius:10
  },
});