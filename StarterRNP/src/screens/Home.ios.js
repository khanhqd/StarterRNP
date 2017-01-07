import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Home extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#607797',
    navBarTextColor: 'white',
    statusBarTextColorScheme: 'light',
    navBarHidden: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      salerName: this.props.salerName
    };
  }
  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
  }
  navigateScence() {

  }
  navigateScence0() {
    this.props.navigator.resetTo({
      title: 'Trang Chủ',
      screen: 'screen.Home',
      passProps: { salerName: this.state.email }
    });
  }
  navigateScence1() {
    this.props.navigator.push({
      title: 'Dữ liệu khách hàng',
      screen: 'screen.Database',
      passProps: { salerName: this.props.salerName }
    });

  }
  navigateScence2() {
    this.props.navigator.push({
      title: 'Khách của tôi',
      screen: 'screen.MyCustomer',
      animated: true,
      passProps: { salerName: this.props.salerName }
    });
  }
  navigateScence3() {
    this.props.navigator.push({
      title: 'Lịch sử',
      screen: 'screen.HistoryScene',
      passProps: { salerName: this.props.salerName }
    });
  }
  navigateScence3b() {
    this.props.navigator.push({
      title: 'Lịch hẹn',
      screen: 'screen.DatingScene',
      passProps: { salerName: this.props.salerName }
    });
  }
  navigateScence4() {
    this.props.navigator.push({
      title: 'Checklist',
      screen: 'screen.Checklist',
      passProps: { salerName: this.props.salerName }
    });
  }
  navigateScence5() {
    this.props.navigator.push({
      title: 'Tạo động lực',
      screen: 'screen.Motivation'
    });
  }
  navigateScence6() {
    this.props.navigator.push({
      title: 'Tiến độ',
      screen: 'screen.Target'
    });
  }
  logOut() {
    this.props.navigator.resetTo({
      screen: 'screen.LoginForm'
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>

        <Image
          style={styles.drawerImageContainer}
          source={require('../../res/img/life_under_the_ocean-wide.jpg')}
          resizeMode='stretch'
        >
          <Image
            style={styles.avatarContainer}
            source={require('../../res/img/avt-icon.png')}
            resizeMode='stretch'
          />
            <View style={styles.profileContainer}>
              <Text style={styles.profileStyle}>Dr-Spiller Salers</Text>
            </View>
        </Image>

        <ScrollView style={styles.drawerContainer}>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence1()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/database.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Dữ liệu KH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence2()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/mycustomer.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Khách của tôi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence3()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/history.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Lịch sử</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence3b()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/history.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Lịch hẹn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence4()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/check-list.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Check List</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence5()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/motivation.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Tạo động lực</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => this.navigateScence6()}
            >
              <Image
                style={styles.navigateIcon}
                source={require('../../res/img/target.png')}
                resizeMode='contain'
              />
            <Text style={styles.navigateText}>Tiến độ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => this.logOut()}
            >
              <Image
                style={styles.logoutIcon}
                source={require('../../res/img/logout.png')}
                resizeMode='contain'
              />
            <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  drawerImageContainer: {
    height: 200,
    width: null,
    justifyContent: 'space-around'
  },
  avatarContainer: {
    margin: 20,
    height: 100,
    width: 100,
    borderWidth: 4,
    borderColor: '#eee'
  },
  profileContainer: {
    margin: 20,
    backgroundColor: 'transparent',
    shadowOpacity: 5,
    shadowColor: 'grey',
    paddingLeft: 50
  },
  profileStyle: {
    color: '#eee',
    fontSize: 20,
    fontWeight: '600'
  },
  navigateButton: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#607797',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigateText: {
    fontSize: 20,
    color: '#616161',
    flex: 6
  },
  logoutText: {
    fontSize: 20,
    color: '#eee',
    flex: 6
  },
  logoutIcon: {
    height: 30,
    width: 30,
    tintColor: '#eee',
    flex: 2
  },
  navigateIcon: {
    height: 30,
    width: 30,
    tintColor: '#616161',
    flex: 2
  },
});
