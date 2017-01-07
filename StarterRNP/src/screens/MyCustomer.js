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
  Picker
} from 'react-native';
import { firebaseApp } from '../app.js';
import { Card, CardSection, Input, Button2, InfoBox, TitleBox } from './common';

const { width } = Dimensions.get('window');
const Item = Picker.Item;

export default class MyCustomer extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/navicon_menu.png'),
      id: 'menu'
    }],
    rightButtons: [
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
          finder: 'Hiền',
          finderType: 'employ',
          dataSource: new ListView.DataSource({
                  rowHasChanged: (row1, row2) => row1 !== row2,
                }),
        };
        this._renderRow = this._renderRow.bind(this);
  }
  componentDidMount() {
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
        animated: true
      });
    }
  }
  searchBegin() {
    var items = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
    if (this.state.finderType !== 'employ') {
      const rootRef = firebaseApp.database().ref('customers');
      const filterRef = rootRef.orderByChild(this.state.finderType).equalTo('Hiền_' + this.state.finder);
      filterRef.once('value', (snap) => {
        // get children as an array
        snap.forEach((child) => {
          items.push({
            key: child.key,
            name: child.val().name,
            phone: child.val().phone,
            status: child.val().status,
            address: child.val().address,
            dating: child.val().dating,
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
          });
        });
      });
    } else {
      const rootRef = firebaseApp.database().ref('customers');
      const filterRef = rootRef.orderByChild('employ').equalTo('Hiền');
      filterRef.once('value', (snap) => {
        // get children as an array
        snap.forEach((child) => {
          items.push({
            key: child.key,
            name: child.val().name,
            phone: child.val().phone,
            status: child.val().status,
            address: child.val().address,
            dating: child.val().dating,
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
          });
        });
      });
    }
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
                    passProps: { keyID: data.key }
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
                    <Text style={styles.text}>{data.key}</Text>
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
                    <Item label="Số điện thoại" value="employ_phone" />
                    <Item label="Tên" value="employ_name" />
                    <Item label="Trạng thái" value="employ_status" />
                    <Item label="Tất cả" value="employ" />
                </Picker>
                <Button2
                  title='OK'
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
           <ListView
             dataSource={this.state.dataSource}
             enableEmptySections={true}
             renderRow={(data) => this._renderRow(data)}
           />

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
    flex: 1,
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
    backgroundColor: '#32B34E',
    elevation:2
  },
  input: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:15,
    lineHeight:17,
    width: width*0.4
  },
  searchbar:{
  backgroundColor:'white',
  borderRadius:10,
  height:45,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  borderColor:'grey',
  elevation:2
  }
})
