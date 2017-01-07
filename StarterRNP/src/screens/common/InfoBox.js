import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text
} from 'react-native';
var {height, width} = Dimensions.get('window');

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
const styles = {
  box:{
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 5,
    marginVertical: 1,
    overflow: 'hidden',
    elevation:2
  },
  titleContainer:{
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation:1
  },

  textTitle:{
    color:'black',
    paddingLeft:20,
    fontSize:15,
    fontWeight:'bold'
  },
  textBox:{
    fontSize:15,
    padding:10,
    paddingLeft:30,
    color: 'rgb(1, 94, 170)'
  },
};
export {InfoBox};
