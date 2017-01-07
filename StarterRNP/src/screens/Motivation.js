import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';

export default class Motivation extends Component {
  static navigatorButtons = {
    rightButtons:[
      {
        icon: require('../../img/back.png'),
        id: 'back'
      }]
  };
  static navigatorStyle = {
    navBarBackgroundColor: '#607797',
    navBarTextColor: 'white',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };
  render() {
    return (
      <View>
        <Swiper style={styles.wrapper} height={height/2-70} horizontal={true} autoplay>
          <View style={styles.slide1}>
            <Text style={styles.text}>Dont Give Up</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>You Must Be The Best</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And Keep Smiling :)</Text>
          </View>
        </Swiper>

        <Swiper style={styles.wrapper} height={height/2}
          autoplay
          autoplayTimeout={2}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../res/img/motivation2.jpg')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../res/img/motivation3.jpg')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../res/img/motivation4.jpg')} />
          </View>
        </Swiper>
      </View>
    );
  }
}
const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}
