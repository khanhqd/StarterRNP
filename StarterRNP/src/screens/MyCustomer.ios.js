import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Dimensions,
  Image,
  TextInput,
  Picker,
  AsyncStorage
} from 'react-native';
import { firebaseApp } from '../app.js';
import { Card, CardSection, Input, Button2, InfoBox, TitleBox, Spinner } from './common';
import ModalPicker from 'react-native-modal-picker';
import Api from './api';

const { width } = Dimensions.get('window');
const Item = Picker.Item;

export default class MyCustomer extends Component {
  static navigatorButtons = {
    rightButtons: [
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
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
          finder: null,
          finderType: 'all',
          auth: '',
          thisPage: 1,
          lastPage: null,
          nextPageURL: null,
          prevPageURL: null,
          currentPageNumber: 1,
          loading: false,
          dataSource: new ListView.DataSource({
                  rowHasChanged: (row1, row2) => row1 !== row2,
                }),
        };
        this._renderRow = this._renderRow.bind(this);
        this._get('auth');
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
  componentDidMount() {
    // this.searchBegin()
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated: true
      });
    }
  }
  searchBegin() {
    var items = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
    // reset biến hiển thị:
    this.setState({
      thisPage: 1,
      currentPageNumber: 1,
      lastPage: null,
      loading: true,
      finder: null,
      finderType: 'all',
    })
    // tìm kiếm
    if (this.state.finderType != 'all') {
      console.log("auth là" +this.state.auth);
      Api.post('/my-customer?page=1', {
        auth: this.state.auth,
        search: this.state.finderType,
        key: this.state.finder
      }).then((responseData) =>{
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
    } else {
      Api.post('/my-customer?page=1', {
        auth: this.state.auth
      }).then((responseData) =>{
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
    };
    this.setState({
      loading: false
    });
  }
  // _goToDetail(key) {
  //   console.log(key)
  //   this.props.navigator.push({
  //     title: 'CustomerDetail',
  //     screen: 'screen.CustomerDetail',
  //     passProps: { key: key }
  //   });
  // }
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
  _renderRow(data) {
      return (
          <Card>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigator.push({
                    title: 'CustomerDetail',
                    screen: 'screen.CustomerDetail',
                    passProps: { keyID: data.id, auth:this.state.auth ,salerName: this.props.salerName }
                  });
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#CFD8DC'
            }}>
                  <View style={[styles.viewText,{flex: 2}]}>
                    <Text style={styles.text}>{data.id}</Text>
                  </View>
                  <View style={[styles.viewText,{flex: 3}]}>
                    <Text style={styles.text}>{data.name}</Text>
                  </View>
                  <View style={[styles.viewText,{flex: 3}]}>
                    <Text style={styles.text}>{data.phone}</Text>
                  </View>
                  <View style={[styles.viewText,{flex: 2}]}>
                    <Text style={styles.text}>{data.status}</Text>
                  </View>
                </TouchableOpacity>
          </Card>
      );
    }
  previousPage() {
    if (this.state.prevPageURL != null) {
      var items = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      Api.post('/my-customer?page='+(this.state.thisPage - 1), {
        auth: this.state.auth,
        search: this.state.finderType,
        key: this.state.finder
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
    console.log(this.state.currentPageNumber);
    if (this.state.nextPageURL != null) {
      var items = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      Api.post('/my-customer?page='+(this.state.thisPage + 1), {
        auth: this.state.auth,
        search: this.state.finderType,
        key: this.state.finder
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
  renderLoading() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    } else {
      return null
    }
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
                <TextInput
                  placeholder="Tìm kiếm..."
                  style={styles.input}
                  value={this.state.finder}
                  onChangeText={(finder) => this.setState({ finder })}
                />
                <Picker
                    style={{ width: width * 0.4 }}
                    selectedValue={this.state.finderType}
                    onValueChange={this.onValueChange.bind(this, 'finderType')}
                >
                    <Item label="Số điện thoại" value="phone" />
                    <Item label="Tên" value="name" />
                    <Item label="Trạng thái" value="status" />
                    <Item label="Tất cả" value="all" />
                </Picker>

                <Button2
                  title='Tìm'
                  onPress={() => this.searchBegin()}
                />
            </View>
            </View>
              <View style={styles.firstRow}>
                  <View style={[styles.viewText, { flex: 2 }]}>
                    <Text
                    style={[styles.text, { fontWeight: 'bold', color:'white', fontSize:16}]}>Mã</Text>
                  </View>
                  <View style={[styles.viewText,{flex: 3}]}>
                    <Text
                    style={[styles.text, { fontWeight: 'bold', color: 'white', fontSize:16}]}>Tên</Text>
                  </View>
                  <View style={[styles.viewText,{flex: 3}]}>
                    <Text
                    style={[styles.text, { fontWeight: 'bold', color: 'white', fontSize:16}]}>SĐT</Text>
                  </View>
                  <View style={[styles.viewText,{ flex: 2}]}>
                    <Text
                    style={[styles.text, { fontWeight: 'bold', color: 'white', fontSize:16}]}>Tình trạng</Text>
                  </View>
              </View>
            {this.renderLoading()}
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
    borderWidth: 0.5,
    borderColor: 'grey',
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    padding: 3,
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  container:{
    backgroundColor: '#CACACA',
    flex: 1,
  },
  firstRow:{
    marginLeft: 5,
    marginRight:5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: '#607797',
    elevation:2
  },
  input: {
    color: '#000',
    marginRight: 5,
    marginLeft: 5,
    fontSize:15,
    height: 40,
    width: width*0.4,
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor:'#ccc'
  },
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    elevation: 2
  },
  button1: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 3,
    justifyContent: 'space-around',
    backgroundColor: '#CACACA'
  }
})
