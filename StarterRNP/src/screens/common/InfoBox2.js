import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
var {height, width} = Dimensions.get('window');

class InfoBox2 extends Component {
  render(){
    return(
    <View style={styles.box}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{this.props.title}</Text>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image
            style={{height:30, width:30, alignSelf:'flex-end'}}
            source={require('../../../res/img/remove-icon.png')}/>
        </TouchableOpacity>
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
    color:'black'
  },
};
export {InfoBox2};
