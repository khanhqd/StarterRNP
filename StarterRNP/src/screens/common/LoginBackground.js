/**
 * @file LoginBackground.js
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
import { View, Dimensions, StatusBar } from 'react-native';

const { maxHeight, maxWidth } = Dimensions.get('window');

const LoginBackground = (props) => {
    const { backgroundContainer } = styles;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
           backgroundColor="white"
           barStyle="light-content"
        />
        <View style={backgroundContainer}>
          {props.children}
        </View>
      </View>
    );
};

const styles = {
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: maxHeight,
    width: maxWidth
  }
};

export { LoginBackground };
