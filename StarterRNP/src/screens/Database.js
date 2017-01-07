import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Text
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-action-button';
import SendIntentAndroid from 'react-native-send-intent';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebaseApp } from '../app.js';
import firebase from 'firebase';
import { InfoBox, TitleBox, Input, Button2 } from './common';

const { height, width } = Dimensions.get('window');
const Item = Picker.Item;
let i = 1;

export default class Home extends Component {
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
      diachi: '',
      content: '',
      plan: '',
      selectedStatus: '',
      date: moment().format('YYYY-MM-DD'),
      code: '',
      name: '',
      address: '',
      dating: '',
      employ: 'Hiền',
      phone: '',
      thisCustomerId: ''
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  call() {
    SendIntentAndroid.sendPhoneDial(this.state.phone);
  }
  backCustomer() {
    this.props.navigator.push({
      title: 'History',
      screen: 'screen.HistoryScene',
    });
  }
  nextCustomer() {
    //post dữ liệu khách trước lên Databse
    this.postData();
    //lưu lịch sử:
    if (this.state.thisCustomerId !== '') {
      const rootRef2 = firebaseApp.database().ref('history/'+this.state.date);
      rootRef2.push({
        id: this.state.thisCustomerId,
        phone: this.state.phone,
        status: this.state.selectedStatus,
        time: moment().format('LTS')
      });
    }
    //lấy liệu dữ liệu khách mới
    const rootRef = firebaseApp.database().ref('customers');
    const queryRef = rootRef.orderByChild('status').equalTo('Chưa gọi').limitToFirst(1);
    queryRef.once('child_added', snap => {
      const data = snap.val();
      this.setState({
        name: data.name,
        address: data.address,
        dating: data.dating,
        phone: data.phone,
        dob: data.dob,
        code: data.id,
        selectedStatus: data.status,
        thisCustomerId: snap.key
      });
      //pending status:
      rootRef.child(snap.key).child('status').set('Pending');
      rootRef.child(snap.key).child('employ').set(this.state.employ);
    });

  }
  postData() {
    if (this.state.thisCustomerId != '') {
      const rootRef = firebaseApp.database().ref('customers/'+this.state.thisCustomerId);
      rootRef.update({
        status: this.state.selectedStatus,
        employ_status: this.state.employ + "_" + this.state.selectedStatus,
        plan: this.state.plan,
        dating: this.state.date
      });
      rootRef.child('content').push({ id:'1', text: this.state.content})
      rootRef.child('employ_phone').set(this.state.employ + "_" + this.state.phone);
      rootRef.child('employ_name').set(this.state.employ + "_" + this.state.name);
      rootRef.child('employ_status').set(this.state.employ + "_" + this.state.selectedStatus);
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView >
        <View style={{ flexDirection: 'row', width: width }}>
          <View style={{ flex: 1 }}>
              <InfoBox title='Tên KH:' content={this.state.name} />
              <InfoBox title='Số điện thoại:' content={this.state.phone} />
              <InfoBox title='Mã:' content={this.state.code} />
          </View>
          <View style={{ flex: 1 }}>
              <InfoBox title='Địa chỉ:' content={this.state.address} />
              <InfoBox title='Ngày sinh:' content={this.state.dob} />
          </View>
        </View>
        <InfoBox title='Nhân viên:' content={this.state.employ} />
        <TitleBox title='Trạng thái:'>
          <Picker
              selectedValue={this.state.selectedStatus}
              onValueChange={this.onValueChange.bind(this, 'selectedStatus')}
          >
              <Item label="Không thành công" value="Không thành công" />
              <Item label="Đã hẹn" value="Đã hẹn" />
              <Item label="Đã demo" value="Đã demo" />
              <Item label="Đã mua hàng" value="Đã mua hàng" />
              <Item label="Dữ liệu lỗi" value="Dữ liệu lỗi" />

          </Picker>
        </TitleBox>
        <Input
          title='Nội dung cuộc gọi:'
          placeholder='Nội dung cuộc gọi...'
          value={this.state.content}
          onChangeText={(content) => this.setState({ content })}
        />
        <Input
          title='Kế hoạch:'
          placeholder='Kế hoạch cho lần gọi tới...'
          onChangeText={(plan) => this.setState({ plan })}
          value={this.state.plan}
        />
        <TitleBox title="Alarm to call again:">
          <DatePicker
            style={{ width: 200, height: 50, marginBottom: 7, alignSelf: 'center', marginTop: 10 }}
            mode="date"
            date={this.state.date}
            duration={300}
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
            onDateChange={(date) => { this.setState({ date: date }); }}
          />
          </TitleBox>

      </ScrollView>
      <ActionButton buttonColor="#32B34E">
        <ActionButton.Item buttonColor="#32B34E" onPress={() => this.call()}>
          <Icon name="phone" size={30} />
        </ActionButton.Item>
      </ActionButton>
      <View style={styles.button1}>
        <Button2
          title='Lịch sử'
          onPress={() => { this.backCustomer(); }}
        />
        <Button2
          title='NEXT'
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
  }
});
