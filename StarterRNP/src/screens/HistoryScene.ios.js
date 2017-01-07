import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ListView,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
import { Card, Button2 } from './common';
const { width } = Dimensions.get('window');

import DatePicker from 'react-native-datepicker';
const moment = require('moment');
const data = [];
import Api from './api';

export default class HistoryScene extends Component {
  static navigatorButtons = {

    leftButtons:[
      {
        icon: require('../../img/back.png'),
        id: 'back'
      }]
  };
  static navigatorStyle = {
    navBarBackgroundColor: '#607797',
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
          auth: '1',
          dateTo: moment().format('YYYY-MM-DD'),
          thisPage: 1,
          lastPage: null,
          nextPageURL: null,
          prevPageURL: null,
          currentPageNumber: 1,
          dataSource: new ListView.DataSource({
                  rowHasChanged: (row1, row2) => row1 !== row2,
                }),
        };
      this._renderRow = this._renderRow.bind(this);
      this._get('auth');
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  _get = async (key) => {
    try {
      var value = await AsyncStorage.getItem(key);
      if (value !== null){
        this.setState({ auth: value });
        console.log(this.state.auth)
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  componentWillMount(){

  }
  onNavigatorEvent(event) {
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
    console.log("auth history là"+this.state.auth);
    Api.post('/my-history?page=1', {
      auth: this.state.auth,
    }).then((responseData) =>{
      console.log(responseData);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data.data),
        thisPage: responseData.data.current_page,
        nextPageURL: responseData.data.next_page_url,
        prevPageURL: responseData.data.prev_page_url,
        lastPage: responseData.data.last_page,
        });
    }).catch( (ex) => {
      console.log(ex)
    });
  }
  previousPage() {
    if (this.state.prevPageURL != null) {
      var items = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      Api.post('/my-history?page='+(this.state.thisPage - 1), {
        auth: this.state.auth
      }).then((Data) =>{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(Data.data.data),
          thisPage: Data.data.current_page,
          nextPageURL: Data.data.next_page_url,
          prevPageURL: Data.data.prev_page_url,
          });
      })
    }
  }
  nextPage() {
    console.log(this.state.nextPageURL);
    if (this.state.nextPageURL != null) {
      var items = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      this.setState({ currentPageNumber: this.state.currentPageNumber++ });
      Api.post('/my-history?page='+(this.state.thisPage + 1), {
        auth: this.state.auth,
      }).then((Data) =>{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(Data.data.data),
          thisPage: Data.data.current_page,
          nextPageURL: Data.data.next_page_url,
          prevPageURL: Data.data.prev_page_url,
          });
      })
    }
  }
  _renderRow(data) {
      return (
        <Card>
            <TouchableOpacity
              onPress={() => {
                this.props.navigator.push({
                  title: 'CustomerDetail',
                  screen: 'screen.CustomerDetail',
                  passProps: { keyID: data.customer_id, auth:this.state.auth ,salerName: this.props.salerName }
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#CFD8DC'
          }}>
                <View style={[styles.viewText,{flex: 2.5}]}>
                  <Text style={styles.text}>{data.updated_at}</Text>
                </View>
                <View style={[styles.viewText,{flex: 2}]}>
                  <Text style={styles.text}>{data.customer.phone}</Text>
                </View>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={styles.text}>{data.customer.name}</Text>
                </View>
                <View style={[styles.viewText,{flex: 1.5}]}>
                  <Text style={styles.text}>{data.customer.status}</Text>
                </View>
              </TouchableOpacity>
        </Card>
      );
    }
  render() {
    return (
      <View style={styles.container}>
        <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          alignSelf: 'center',
          width: width - 20
      }}>
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
          </View>
            <View style={styles.firstRow}>
                <View style={[styles.viewText,{flex: 2.5}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Giờ</Text>
                </View>
                <View style={[styles.viewText,{flex: 2}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>SDT</Text>
                </View>
                <View style={[styles.viewText,{flex: 3}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Tên</Text>
                </View>
                <View style={[styles.viewText,{flex: 1.5}]}>
                  <Text style={[styles.text,{fontWeight:'bold', color:'white',fontSize:16}]}>Trạng thái</Text>
                </View>
            </View>
           <ListView
             dataSource={this.state.dataSource}
             enableEmptySections={true}
             renderRow={(data) => this._renderRow(data)}
           />

        <View style={styles.button1}>
          <Button2
            title='Trang trước'
            onPress={() => { this.previousPage(); }}
          />
          <View style={{ backgroundColor:'white', borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius: 10, width: 50 }}>
           <Text style={{color: 'black', fontWeight:'bold'}}>
             {this.state.thisPage} / {this.state.lastPage}
           </Text>
          </View>
          <Button2
            title='Trang sau'
            onPress={() => { this.nextPage(); }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewText: {
    height:40,
    justifyContent:'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    alignItems:'center'
  },
  text: {
    padding: 3,
    fontSize: 14,
    backgroundColor:'transparent'
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
    borderWidth: 0.5,
    borderColor: 'grey',
    justifyContent: 'center',
    backgroundColor: '#607797'
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
  },
  button1: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 3,
    justifyContent: 'space-around',
    backgroundColor: '#CACACA'
  }
})
