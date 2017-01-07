/**
 * @file LoginInput.js
 *
 * @author Nguyen Thanh Trung
 * @version 1.0.0
 *
 * @DESCRIPTION
 *
 * Just a PlayGround for react-native
 * @flow
 */

import React from 'react';
import { TextInput, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const LoginInput = ({
  icon,
  size,
  onChangeText,
  value,
  label,
  isSecure,
  inputHeight,
  inputWidth,
  spacing }) => {
    const { container, iconContainer, inputContainer } = styles;

    return (
      <View
        style={[
          container,
          { height: inputHeight,
            width: inputWidth,
            marginTop: 15 ||
            spacing
          }]}
      >
        <View style={iconContainer}>
          <FontAwesomeIcon
            name={icon}
            size={30 || size}
            color={'#607797'}
          />
        </View>
          <TextInput
            style={inputContainer}
            onChangeText={onChangeText}
            value={value}
            placeholder={label}
            placeholderTextColor='#607797'
            underlineColorAndroid='transparent'
            secureTextEntry={false || isSecure}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={40}
          />
      </View>
    );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomWidth: 1.9,
    borderBottomColor: '#eee',
    overflow: 'hidden'
  },
  iconContainer: {
    flex: 2,
    height: null,
    width: null,
    marginLeft: 5
  },
  inputContainer: {
    flex: 8,
    borderWidth: 0,
    color: '#607797',
    fontSize: 20,
    marginRight: 5
  }
};

export { LoginInput };
