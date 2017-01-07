import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Dimensions,
  TextInput,
  Picker,
  ScrollView,
  ListView,
  Image
} from 'react-native';
import { Card, CardSection, Input, Button2, InfoBox, InfoBox2, TitleBox } from './common';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { phonecall } from 'react-native-communications';
import Modal from 'react-native-simple-modal';
import { firebaseApp } from '../app.js';
import moment from 'moment';
var {height, width} = Dimensions.get('window');
import Api from './api';
import ModalPicker from 'react-native-modal-picker';
import DatePicker from 'react-native-datepicker';
var PushNotification = require('react-native-push-notification');
const Item = Picker.Item;

export default class CustomerDetail extends Component {
  static navigatorButtons = {
    rightButtons:[
      {
        icon: require('../../img/save-icon.png'),
        id: 'save'
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
    this.state={
      date: moment().format('llll'),
      alarm: 'OFF',
      diachi:'',
      content :'',
      plan: '',
      lastTime:'',
      openModal:false,
      newContent: '',
      name: '',
      address: '',
      phone: '',
      dob: '',
      dating: '',
      employ: '',
      status: '',
      contentSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
    Api.post('/customer', { auth: this.props.auth, id: this.props.keyID }).then((responseData) => {
    	console.log(responseData);
      this.setState({
        name: responseData.data.name,
        address: responseData.data.address,
        phone: responseData.data.phone,
        dob: responseData.data.birthday,
        code: responseData.data.email,
        status: responseData.data.status,
        thisCustomerId: responseData.data.id,
        plan: responseData.data.plan,
        contentSource: this.state.contentSource.cloneWithRows(responseData.data.futures)
      });
    })
    // this.setState({
    //   name: data.name,
    //   address: data.address,
    //   dating: data.dating,
    //   employ: data.employ,
    //   phone: data.phone,
    //   dob: data.dob,
    //   status: data.status,
    //   code: data.code,
    //   plan: data.plan
    // });
  }
  onNavigatorEvent(event) {
    if (event.id === 'save') {
      //update thông tin
      Api.post('/update-customer', {
        auth: this.props.auth,
        customer_id: this.props.keyID,
        status: this.state.status,
        plan: this.state.plan
      });
    }
  }
  call() {
    Communications.phonecall('0123456789')
  }
  alarmSwitch() {
    if (this.state.alarm == 'OFF') {
      this.setState({ alarm: 'ON' });
      console.log(new Date(this.state.date));
      PushNotification.localNotificationSchedule({
        id: this.state.phone,
        title: "Super Saler Dr-Spiller",
        message: "Gọi lại cho khách hàng " + this.state.name + "- " + this.state.phone,
        date: new Date(this.state.date)
      });
    } else {
      this.setState({ alarm: 'OFF' });
      PushNotification.cancelLocalNotifications({id: this.state.phone });
    }
  }
  resetContentSource() {
    Api.post('/customer', { auth: this.props.auth, id: this.props.keyID }).then((responseData) => {
      console.log(responseData);
      this.setState({
        contentSource: this.state.contentSource.cloneWithRows(responseData.data.futures)
      });
    });
  }
  addContent() {
    if(this.state.newContent !== '') {
      console.log("nội dung mới:"+this.state.newContent);
      console.log("id khách:"+this.props.keyID);
      Api.post('/insert-future', {
        auth: this.props.auth,
        customer_id: this.props.keyID,
        content: this.state.newContent,
      }).then((responseData) => {
      	console.log(responseData);
      });
      this.resetContentSource();
      this.setState({
        openModal: false
      })
    }
  }
  removeContent(rowData) {
    console.log("id content xóa:"+rowData.id);
    Api.post('/delete-future', {
      auth: this.props.auth,
      id: rowData.id,
    }).then((responseData) => {
      console.log(responseData);
    });
    this.resetContentSource();
  }
  onValueChange(key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
  renderRow(rowData) {
      return (
        <View style={{flexDirection:'row', width:width-33, height: 80}}>
          <TouchableOpacity onPress={() => this.removeContent(rowData)} style={{justifyContent:'center', alignItems:'center'}}>
            <Image
              style={{height:30, width:30}}
              source={require('../../res/img/remove-icon.png')}/>
          </TouchableOpacity>
          <TitleBox title={rowData.created_at} >
              <Text style={{color: 'rgb(1, 94, 170)', fontSize:16, width: width-30}}>{rowData.content}
              </Text>
          </TitleBox>
        </View>
      );
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
        <View style={{flexDirection:'row', width:width}}>
          <View style={{flex:1}}>
              <InfoBox title='Mã NV cũ:' content={this.state.code} />
              <InfoBox title='Họ tên:' content={this.state.name} />
              <InfoBox title='Điện thoại:' content={this.state.phone} />
          </View>
          <View style={{flex:1}}>
              <InfoBox title='Cơ sở:' content={this.state.address} />
              <InfoBox title='Lịch hẹn:' content={this.state.dating} />
              <InfoBox title='Ngày sinh:' content={this.state.dob} />
          </View>
        </View>
        <TitleBox title='Trạng Thái:'>
          <ModalPicker
            data={pickerData}
            initValue={this.state.status}
            onChange={(data)=>{ this.setState({textInputValue:data.label, status: data.value})}}>

            <TextInput
                style={{padding:10, height:40, width: width/2, color: 'rgb(1, 94, 170)'}}
                editable={false}
                value={this.state.status} />

          </ModalPicker>
        </TitleBox>
        <Input
          title='Lưu ý:'
          onChangeText={(plan) => this.setState({ plan })}
          value={this.state.plan}
        />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.contentSource}
          renderRow={this.renderRow.bind(this)}
          />
        <TitleBox title="Hẹn giờ gọi lại:">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <DatePicker
              style={{ width: 200, height: 50, marginBottom: 7, alignSelf: 'center', marginTop: 10 }}
              mode="datetime"
              date={this.state.date}
              duration={300}
              format="llll"
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
        <ActionButton buttonColor="#3288b3">
          <ActionButton.Item buttonColor="#32B34E" title="Gọi" onPress={() => phonecall(this.state.phone, true)}>
            <Icon name="ios-phone-portrait" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#e0882c" title="Thêm nội dung" onPress={() => {this.setState({openModal: true})}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        <Modal
            open={this.state.openModal}
            modalDidOpen={() => console.log('modal did open')}
            modalDidClose={() => this.setState({openModal: false})}
            closeOnTouchOutside={true}
            style={{alignItems: 'center'}}>
            <View>
                  <Text style={{fontSize: 20, marginBottom: 10, fontWeight:'bold'}}>Thêm nội dung mới:</Text>
                  <TextInput
                    placeholder="nội dung..."
                    style={styles.input}
                    value={this.state.newContent}
                    onChangeText={(content) => this.setState({newContent: content})}/>
                    <View style={{flexDirection:'row'}}>
                      <Button2
                        onPress={() => this.setState({openModal: false})}
                        title='Cancel'/>
                      <Button2
                        onPress={() => this.addContent()}
                        title='OK'/>
                    </View>
               </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#CACACA',
    flex:1,
    paddingTop:5
  },
  titleContainer:{
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  textTitle:{
    color:'black',
    paddingLeft:20,
    fontSize:15,
    fontWeight:'bold'
  },
  textBox:{
    fontSize:15,
    padding:10,
    paddingLeft:30
  },
  box:{
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 5,
    marginVertical: 1,
    overflow: 'hidden',
  },
  picker: {
    width: width,
    backgroundColor:'white',
    paddingLeft:30,
  },
  input: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:16,
    height: 200,
    backgroundColor:'white',
    borderRadius:10
  },
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },

});
