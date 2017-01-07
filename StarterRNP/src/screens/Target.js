import React , { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
  LayoutAnimation
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Card, CardSection, Input, Button2, InfoBox, TitleBox } from './common';
var {height, width} = Dimensions.get('window');

export default class Target extends Component {
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
  componentWillUpdate(){
    LayoutAnimation.spring()
  }
  constructor(props) {
    super(props);
    this.state = {
      target1: "30/50",
      target2: "20/25",
      target3: "5/10",
      value1: (3/5*100),
      value2: (20/25*100),
      value3: (5/10*100)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', width:width , justifyContent: 'space-around',padding: 20}}>
          <Button2
            onPress={() => {this.setState({
              target1: "30/50",
              target2: "20/25",
              target3: "5/10",
              value1: (3/5*100),
              value2: (20/25*100),
              value3: (5/10*100)})}}
            title="Today"/>
          <Button2
          onPress={() => {this.setState({
              target1: "200/350",
              target2: "120/175",
              target3: "35/70",
              value1: (20/35*100),
              value2: (120/175*100),
              value3: (35/70*100)})}}
            title="ThisWeek"/>
          <Button2
          onPress={() => {this.setState({
              target1: "750/1400",
              target2: "450/560",
              target3: "140/280",
              value1: (750/1400*100),
              value2: (450/560*100),
              value3: (140/280*100)})}}
            title="ThisMonth"/>
        </View>
        <ScrollView style={{width:width-30,marginLeft:15, height:height-177, borderWidth:2, borderRadius: 2}}>
            <View style={styles.view}>
              <Text style={styles.text}>Total call access</Text>
              <View style={styles.box}>
                  <Text style={styles.text2}>{this.state.target1}
                  </Text>
                  <AnimatedCircularProgress
                      size={120}
                      width={60}
                      fill={this.state.value1}
                      tintColor="#00AA00"
                      backgroundColor='rgb(211, 217, 209)' />
              </View>
            </View>

            <View style={styles.view}>
              <Text style={styles.text}>Success Call</Text>
              <View style={styles.box}>
                  <Text style={styles.text2}>{this.state.target2}
                  </Text>
                  <AnimatedCircularProgress
                      size={120}
                      width={60}
                      fill={this.state.value2}
                      tintColor="#00AA00"
                      backgroundColor='rgb(211, 217, 209)' />
                </View>
            </View>

              <View style={styles.view}>
                <Text style={styles.text}>Customer who buy</Text>
                <View style={styles.box}>
                    <Text style={styles.text2}>{this.state.target3}
                    </Text>
                    <AnimatedCircularProgress
                        size={120}
                        width={60}
                        fill={this.state.value3}
                        tintColor="#00AA00"
                        backgroundColor='rgb(211, 217, 209)' />
                </View>
              </View>
        </ScrollView>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
    container:{
      backgroundColor: '#CACACA',
      flex:1
    },
    view:{
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 5,
      elevation:2
    },
    button: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 10,
      marginTop: 10,
      color: 'blue'
    },
    box:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      height:150
    },
    text:{
      marginLeft: 40,
      paddingTop:10,
      color:'black',
      fontSize: 14,
      fontWeight: 'bold'
    },
    text2:{
      color:'red',
      fontSize: 18,
      fontWeight: 'bold'
    },
    });
