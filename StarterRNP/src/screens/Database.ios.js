import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import SendIntentAndroid from 'react-native-send-intent';
import moment from 'moment';
import { phonecall } from 'react-native-communications';
import { firebaseApp } from '../app.js';
import firebase from 'firebase';
import { InfoBox, TitleBox, Input, Button2 } from './common';
import ModalPicker from 'react-native-modal-picker';
import Api from './api';
var PushNotification = require('react-native-push-notification');
const { height, width } = Dimensions.get('window');
const Item = Picker.Item;
let i = 1;

export default class Home extends Component {
  static navigatorButtons = {
    rightButtons:[
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
    this.state = {
      diachi: '',
      content: '',
      plan: '',
      selectedStatus: '',
      date: moment().format(),
      code: '',
      name: '',
      address: '',
      dating: '',
      employ: this.props.salerName,
      phone: '',
      thisCustomerId: '',
      auth: '',
      birthday: '',
      alarm: 'OFF'
    };
    this._get('auth');
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated:true
      });
    }
  }
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  call() {
    Communications.phonecall('0123456789')
  }
  saveCustomer() {
    this.postData()
  }
  nextCustomer() {
    //post dữ liệu khách trước lên Databse
    this.postData();
    //lưu lịch sử:
    // if (this.state.thisCustomerId !== '') {
    //   const rootRef2 = firebaseApp.database().ref('history/'+this.state.date+ '/' + this.props.salerName);
    //   rootRef2.push({
    //     id: this.state.thisCustomerId,
    //     phone: this.state.phone,
    //     status: this.state.selectedStatus,
    //     time: moment().format('LTS'),
    //     name: this.state.name
    //   });
    // }
    this.setState({ content: '', plan: '', alarm: 'OFF' });
    //lấy liệu dữ liệu khách mới
    Api.post('/new-customer', { auth: this.state.auth }).then((responseData) => {
    	console.log(responseData);
      this.setState({
        name: responseData.data.name,
        address: responseData.data.address,
        phone: responseData.data.phone,
        birthday: responseData.data.birthday,
        code: responseData.data.code,
        selectedStatus: responseData.data.status,
        thisCustomerId: responseData.data.id
      });
    })
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
  };
  postData() {
    if (this.state.thisCustomerId != '') {
      //up DB
      Api.post('/update-customer', {
        auth: this.state.auth,
        customer_id: this.state.thisCustomerId,
        status: this.state.selectedStatus,
        plan: this.state.plan,
        dating_at: this.state.date
      });
      //up nội dung
      console.log("id khách:" + this.state.thisCustomerId);
      Api.post('/insert-future', {
        auth: this.state.auth,
        customer_id: this.state.thisCustomerId,
        content: this.state.content,
       })
      //up firebase
      // console.log("data has updated");
      // const rootRef = firebaseApp.database().ref('customers/'+this.state.thisCustomerId);
      // rootRef.update({
      //   status: this.state.selectedStatus,
      //   employ_status: this.state.employ + "_" + this.state.selectedStatus,
      //   plan: this.state.plan,
      //   dating: this.state.date
      // });
      // rootRef.child('content').push({ id:'1', text: this.state.content})
      // rootRef.child('employ_phone').set(this.state.employ + "_" + this.state.phone);
      // rootRef.child('employ_name').set(this.state.employ + "_" + this.state.name);
      // rootRef.child('employ_status').set(this.state.employ + "_" + this.state.selectedStatus);
    }
  }
  alarmSwitch() {
    if (this.state.alarm == 'OFF') {
      this.setState({ alarm: 'ON' });
      console.log(new Date(this.state.date));
      PushNotification.localNotificationSchedule({
        id: this.state.phone,
        title: "Super Saler Dr-Spiller",
        message: "Gọi lại cho khách hàng "+this.state.name+" - "+this.state.phone,
        date: new Date(this.state.date)
      });
    } else {
      this.setState({ alarm: 'OFF' });
      PushNotification.cancelLocalNotifications({id: this.state.phone });
    }
  }
  render() {
    let index = 0;
        const pickerData = [
            { key: index++, label:"Không thành công", value:"Không thành công" },
            { key: index++, label: "Đã hẹn", value: "Đã hẹn" },
            { key: index++, label: "Đã demo", value: "Đã demo" },
            { key: index++, label: "Dữ liệu lỗi", value: "Dữ liệu lỗi" }
        ];
    return (
      <View style={styles.container}>
      <ScrollView >
        <View style={{ flexDirection: 'row', width: width }}>
          <View style={{ flex: 1 }}>
              <InfoBox title='Tên KH:' content={this.state.name} />
              <InfoBox title='Số điện thoại:' content={this.state.phone} />
              <InfoBox title='Mã NV cũ:' content={this.state.code} />
          </View>
          <View style={{ flex: 1 }}>
              <InfoBox title='Cơ sở:' content={this.state.address} />
              <InfoBox title='Ngày sinh:' content={this.state.birthday} />
          </View>
        </View>
        <InfoBox title='Nhân viên:' content={this.state.employ} />

        <Input
          title='Nội dung cuộc gọi:'
          placeholder='Nội dung cuộc gọi...'
          value={this.state.content}
          onChangeText={(content) => this.setState({ content })}
        />
        <Input
          title='Lưu ý:'
          placeholder='Lưu ý riêng với từng khách...'
          onChangeText={(plan) => this.setState({ plan })}
          value={this.state.plan}
        />
        <TitleBox title='Trạng thái:'>
          <ModalPicker
            data={pickerData}
            initValue={this.state.status}
            onChange={(data)=>{ this.setState({textInputValue:data.label, selectedStatus: data.value})}}>

            <TextInput
                style={{padding:10, height:40, width: width /2}}
                editable={false}
                placeholder="Cập nhật trạng thái"
                value={this.state.textInputValue} />

          </ModalPicker>
        </TitleBox>
        <TitleBox title="Hẹn giờ gọi lại:">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <DatePicker
              style={{ width: 200, height: 50, marginBottom: 7, alignSelf: 'center', marginTop: 10 }}
              mode="datetime"
              date={this.state.date}
              duration={300}
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
              onDateChange={(date) => { this.setState({ date: date }); }}
            />
            <View style={{ width: width*1/3, height: 50 }}>
              <Button2
                title={this.state.alarm}
                onPress={() => { this.alarmSwitch(); }}
              />
            </View>
            <View style={{ width: width*1/3 }}>
            </View>
          </View>
          </TitleBox>

      </ScrollView>
      <ActionButton buttonColor="#32B34E">
        <ActionButton.Item buttonColor="#32B34E" title="Gọi" onPress={() => phonecall(this.state.phone, true)}>
          <Icon name="ios-phone-portrait" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      <View style={styles.button1}>
        <Button2
          title='Lưu'
          onPress={() => { this.saveCustomer(); }}
        />
        <Button2
          title='Lưu & chuyển'
          onPress={() => { this.nextCustomer(); }}
        />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button1: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 3,
    justifyContent: 'space-around',
    backgroundColor: '#CACACA'
  },
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
});
