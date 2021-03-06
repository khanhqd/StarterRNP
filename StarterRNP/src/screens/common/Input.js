import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import CardSection from './CardSection';

const Input = ({ title, value, onChangeText, placeholder}) => {
  return(
    <View style={styles.box}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <View style={styles.contentBox}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}/>
      </View>
    </View>
  )
}
const styles = {
  input: {
    color: 'rgb(1, 94, 170)',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:15,
    lineHeight:25,
    flex:3
  },
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
  contentBox:{
    paddingLeft:20,
    height:80
  }
};
export { Input };
