import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button2 = ({ props, onPress, title }) => {
  return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}>
        <Text style={styles.text}>{title}
        </Text>
      </TouchableOpacity>
  )
}
const styles={
  button: {
    flex:1,
    alignSelf:'stretch',
    backgroundColor:'#607797',
    borderRadius:5,
    borderWidth:1,
    borderColor:'grey',
    marginLeft:5,
    marginRight:5,
    elevation:3
  },
  text:{
    alignSelf:'center',
    color:'white',
    fontSize:16,
    fontWeight:'bold',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'transparent'
  }
}

export {Button2} ;
