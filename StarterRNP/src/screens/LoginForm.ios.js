
import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { LoginBackground, LoginInput, Button3, Spinner } from './common/';
import Api from './api';

class LoginForm extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      pass: '',
      loading: false,
      statusLogin: false
    };
  }
  login() {
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email +'@gmail.com', this.state.pass)
      .then(this.onLoginFirebaseSuccess.bind(this))
      .catch(() => {
        this.setState({ error: 'Đăng nhập thất bại!!!', loading: false });
      });
  }

  onLoginFirebaseSuccess() {
    console.log("Firebase success");
    Api.post('/login', {username: this.state.email, password: this.state.pass })
    .then((responseData) =>{
      this.setState({ statusLogin: responseData.status });
      this.onLoginDatabaseSuccess();
      this._set('auth', responseData.data.remember);
      this._set('username', responseData.data.username)
    });
  }
  _set = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error.message);
    }
  };
  onLoginDatabaseSuccess() {
    console.log("DB success");
    if(this.state.statusLogin == true) {
      this.setState=({
        loading: false
      });
      this.props.navigator.push({
        title: 'SuperSaler',
        screen: 'screen.Home',
        passProps: { salerName: this.state.email }
      });
    } else {
      this.setState=({
        loading: false,
        error: 'Đăng nhập thất bại!!!'
      });
    }
  }
  renderButton() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    } else {
      return (
        <Button3
          label='login'
          onHandlePress={() => this.login()}
        />
      )
    }
  }


  render() {
    const container = {
      flex: 1
    };

    const emptyView = {
      flex: 2,
      justifyContent:'center',
      alignItems:'center'
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

    const createAccountTextStyle = {
      color: 'rgb(252, 201, 165)',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 15,
      elevation: 1.5
    };

    return (
      <View style={container}>
        <LoginBackground style={backgroundContainer}>
          <View style={emptyView}>
            <Image
            resizeMode="stretch"
            source={require('../../img/logo-drspiller.png')}/>
          </View>
          <View style={inputContainer}>
            <LoginInput
              inputHeight={55}
              inputWidth={280}
              label='username@gmail.com'
              icon='user-circle-o'
              spacing={0}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <LoginInput
              inputHeight={55}
              inputWidth={280}
              label='**********'
              icon='lock'
              isSecure
              onChangeText={(pass) => this.setState({ pass })}
              value={this.state.pass}
            />

            {this.renderButton()}
            <Text
              style={createAccountTextStyle}
            >
              {this.state.error}
            </Text>
          </View>
          <View style={emptyView} />
        </LoginBackground>
      </View>
    );
  }
}

export default LoginForm;
