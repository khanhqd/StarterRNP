import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text
} from 'react-native';
var {height, width} = Dimensions.get('window');
import styles from './Styles.js';
class InfoBox extends Component {
  render(){
    return(
    <View style={styles.box}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{this.props.title}</Text>
      </View>
      <Text style={styles.textBox}>{this.props.content}</Text>
    </View>
    )
  }
}
export { InfoBox }
