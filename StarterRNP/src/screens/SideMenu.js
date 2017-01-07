import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default class SideMenu extends Component {
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
    this._toggleDrawer();
    this.props.navigator.resetTo({
      title: 'Home',
      screen: 'screen.Home',
    });
  }
  navigateScence1() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
    this.props.navigator.push({
      title: 'Database',
      screen: 'screen.Database',
    });
  }
  navigateScence2() {
    this._toggleDrawer();
    this.props.navigator.push({
      title: 'MyCustomer',
      screen: 'screen.MyCustomer',
      animated: true
    });
  }
  navigateScence3() {
    this._toggleDrawer();
    this.props.navigator.push({
      title: 'HistoryScene',
      screen: 'screen.HistoryScene',
    });
  }
  navigateScence4() {
    this._toggleDrawer();
    this.props.navigator.push({
      title: 'Checklist',
      screen: 'screen.Checklist',
    });
  }
  render() {
    return (
      <ScrollView style={styles.drawerContainer}>
        <Image
          style={styles.drawerImageContainer}
          source={require('../../res/img/life_under_the_ocean-wide.jpg')}
          resizeMode='stretch'
        >
          <Image
            style={styles.avatarContainer}
            source={require('../../res/img/admin-Khanh.png')}
            resizeMode='stretch'
          />
            <View style={styles.profileContainer}>
              <Text style={styles.profileStyle}>Admin SuperSaler</Text>
            </View>
          </Image>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => this.navigateScence0('home')}
          >
            <Image
              style={styles.navigateIcon}
              source={require('../../res/img/home-ixon.png')}
              resizeMode='contain'
            />
          <Text style={styles.navigateText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => this.navigateScence1()}
          >
            <Image
              style={styles.navigateIcon}
              source={require('../../res/img/database.png')}
              resizeMode='contain'
            />
          <Text style={styles.navigateText}>Database</Text>
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
          <Text style={styles.navigateText}>My Customer</Text>
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
          <Text style={styles.navigateText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => this.navigateScence()}
          >
            <Image
              style={styles.navigateIcon}
              source={require('../../res/img/motivation.png')}
              resizeMode='contain'
            />
          <Text style={styles.navigateText}>Motivation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => this.navigateScence()}
          >
            <Image
              style={styles.navigateIcon}
              source={require('../../res/img/target.png')}
              resizeMode='contain'
            />
          <Text style={styles.navigateText}>Target</Text>
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
            style={styles.logoutButton}
            onPress={() => this.navigateScence()}
          >
            <Image
              style={styles.logoutIcon}
              source={require('../../res/img/logout.png')}
              resizeMode='contain'
            />
          <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    width: width*3/4
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
    margin: 20
  },
  profileStyle: {
    color: '#eee',
    fontSize: 25,
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
    backgroundColor: '#22993C',
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
