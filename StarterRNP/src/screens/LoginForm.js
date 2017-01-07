/**
 * @file LoginForm.js
 *
 * @author Nguyen Thanh Trung
 * @version 1.0.0
 *
 * @DESCRIPTION
 *
 * Just a PlayGround for react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LoginBackground, LoginInput, Button3 } from './common/';

class LoginForm extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props);
    this.state = {
      failedAuthenticationText: ''
    };
  }
  login() {
    this.props.navigator.push({
      title: 'Database',
      screen: 'screen.Database',
    });
  }
  render() {
    const container = {
      flex: 1
    };

    const emptyView = {
      flex: 2
    };

    const backgroundContainer = {
      flexDirection: 'column'
    };

    const inputContainer = {
      flex: 4,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    };

    const failedAuthenticationTextStyle = {
      color: 'red',
      fontSize: 17,
      fontWeight: 'bold'
    };

    const createAccountTextStyle = {
      color: '#eee',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 15,
      elevation: 1.5
    };

    return (
      <View style={container}>
        <LoginBackground style={backgroundContainer}>
          <View style={emptyView} />
          <View style={inputContainer}>
            <LoginInput
              inputHeight={55}
              inputWidth={280}
              label='username@gmail.com'
              icon='user-circle-o'
              spacing={0}
            />
            <LoginInput
              inputHeight={55}
              inputWidth={280}
              label='**********'
              icon='lock'
              isSecure
            />
            <Text style={failedAuthenticationTextStyle}>{this.state.failedAuthenticationText}</Text>
            <Button3
              label='login'
              onHandlePress={() => this.Login()}
            />
            <Text
              onPress={() => console.log('Create an account pressed.')}
              style={createAccountTextStyle}
            >
              Create an account
            </Text>
          </View>
          <View style={emptyView} />
        </LoginBackground>
      </View>
    );
  }
}

export default LoginForm;
