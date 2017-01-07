import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ListView,
  Dimensions,
  Image
} from 'react-native';
import { Card, Button2 } from './common';
const { width } = Dimensions.get('window');
import { firebaseApp } from '../app.js';

import DatePicker from 'react-native-datepicker';
const moment = require('moment');
const data = [];

export default class HistoryScene extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/navicon_menu.png'),
      id: 'menu'
    }],
    rightButtons:[
      {
        icon: require('../../img/back.png'),
        id: 'back'
      }]
  };
  static navigatorStyle = {
    navBarBackgroundColor: '#336600',
    navBarTextColor: 'white',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  };
  constructor(props) {
    super(props);
    this.state = {
          dateTo: moment().format('YYYY-MM-DD'),
          dataSource: new ListView.DataSource({
                  rowHasChanged: (row1, row2) => row1 !== row2,
                }),
        };
        this._renderRow = this._renderRow.bind(this);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentDidMount(){
    this.searchBegin()
  }
  onNavigatorEvent(event) {
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated:true
      });
    }
  }
  searchBegin() {
    var items = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
    const rootRef = firebaseApp.database().ref('history');
    const filterRef = rootRef.child(this.state.dateTo);
    filterRef.once('value', (snap) => {
      // get children as an array
      console.log(snap.val())
      snap.forEach((child) => {
        items.push({
          time: child.val().time,
          phone: child.val().phone,
          status: child.val().status,
          name: child.val().name
          id: child.val().id
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
      });
    });
  }

  _renderRow(data) {
      return (
        <Card>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigator.push({
                    title: 'CustomerDetail',
                    screen: 'screen.CustomerDetail',
                    passProps: { keyID: data.id }
                  });
                }}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#CFD8DC'}}>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={styles.text}>{data.phone}</Text>
                </View>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={styles.text}>{data.name}</Text>
                </View>
                <View style={[styles.viewText,{flex: 2}]}>
                  <Text style={styles.text}>{data.status}</Text>
                </View>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={styles.text}>{data.time}</Text>
                </View>
              </TouchableOpacity>
        </Card>
      );
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10, alignSelf: 'center', width:width-20}}>
          <View style={styles.searchbar}>
              <DatePicker
                    style={{width: 250, height: 40, marginBottom:7, marginTop: 10}}
                    mode="date"
                    date={this.state.dateTo}
                    duration={300}
                    placeholder="Đến ngày"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            backgroundColor: '#eee',
                            borderRadius: 5
                        }
                    }}
                    onDateChange={(dateTo) => {this.setState({dateTo: dateTo})}}
              />
              <Button2
                title='OK'
                onPress={() => this.searchBegin()}
              />
          </View>
            <View style={styles.firstRow}>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Phone</Text>
                </View>
                <View style={[styles.viewText,{flex: 2}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Name</Text>
                </View>
                <View style={[styles.viewText,{flex: 2}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Status</Text>
                </View>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Time</Text>
                </View>
            </View>
           <ListView
             dataSource={this.state.dataSource}
             enableEmptySections={true}
             renderRow={(data) => this._renderRow(data)}
           />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewText: {
    height:40,
    borderWidth:0.25,
    borderColor:'grey',
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    padding: 3,
    fontSize: 14,
  },
  container:{
    backgroundColor: '#CACACA',
    flex: 1
  },
  firstRow:{
    marginLeft: 5,
    marginRight:5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#CFD8DC',
    backgroundColor: '#32B34E'
  },
    searchbar:{
    backgroundColor:'white',
    borderRadius:10,
    height:45,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:'grey',
    elevation:2,
    padding: 5,
    marginBottom: 5
  }
})
