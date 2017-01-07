import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text, color }) => {
  return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { borderColor: color }]}>
        <Text style={[styles.text, { color }]}>{text}
        </Text>
      </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    color: '#1C2436',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { Button } ;
