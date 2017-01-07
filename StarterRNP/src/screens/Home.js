import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/navicon_menu.png'),
      id: 'menu'
    }],
  };
  static navigatorStyle = {
    navBarBackgroundColor: '#336600',
    navBarTextColor: 'white',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
  }
  onPress0() {
    this.props.navigator.push({
      title: 'Database',
      screen: 'screen.Database',
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'burlywood' }}>
          < Image
          style={{ height: height/3, width: width }}
          source={require('../../res/img/motivation4.jpg')}/>
        </View>
        <View style={{ flex: 1, backgroundColor: '#0f4d92', flexDirection: 'row' }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 35, color: 'white' }}> Hôm nay bạn đã gọi 0 cuộc!</Text>
            <Text style={{ fontSize: 35, color: 'white' }}> Chiến tiếp thôi!</Text>
          </View>
          <TouchableOpacity
          onPress={this.onPress0.bind(this)}
          style={styles.goDatabase} >
            <Text style={{ fontSize: 30, color: 'white' }}>Database</Text>
            <Text style={{ fontSize: 15, color: 'white' }}>Click here!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box1}>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>
            TRÊN CON ĐƯỜNG THÀNH CÔNG
          </Text>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>
          KHÔNG CÓ DẤU CHÂN
          </Text>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>
          CỦA KẺ LƯỜI BIẾNG
          </Text>
          <Text style={{ color: 'black', fontSize: 13 }}>
                             P/S: HỌ ĐI ÔTÔ MÀ!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goDatabase: {
    flex: 1,
    backgroundColor: 'darkseagreen',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box1: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center' }
});
