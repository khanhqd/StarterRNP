/**
 * @file Button.js
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
import { TouchableOpacity, Text } from 'react-native';

const Button3 = ({ label, onHandlePress, buttonColor, buttonHeight, buttonWidth, spacing }) => {
    const { buttonContainer, labelContainer } = styles;

    return (
      <TouchableOpacity
        onPress={onHandlePress}
        style={[
          buttonContainer,
          { backgroundColor: '#607797' || buttonColor,
            height: 45 || buttonHeight,
            width: 300 || buttonWidth,
            marginTop: 15 || spacing
          }]}
      >
        <Text style={labelContainer}>
          {label.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
};

const styles = {
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 1.5
  },
  labelContainer: {
    color: '#eee',
    fontSize: 16
  }
};

export { Button3 };
