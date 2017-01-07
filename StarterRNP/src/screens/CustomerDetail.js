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
import Modal from 'react-native-simple-modal';
import { firebaseApp } from '../app.js';
var {height, width} = Dimensions.get('window');
const Item = Picker.Item;

export default class CustomerDetail extends Component {
  static navigatorButtons = {
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
    this.state={
      diachi:'',
      content :'',
      plan: '',
      lastTime:'16/12',
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
    this.items = [];
    this.itemsRef = firebaseApp.database().ref("customers/"+ this.props.keyID + "/content");
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentWillMount() {
    const rootRef = firebaseApp.database().ref('customers');
    const queryRef = rootRef.child(this.props.keyID);
    queryRef.once('value', snap => {
      const data = snap.val();
      this.setState({
        name: data.name,
        address: data.address,
        dating: data.dating,
        employ: data.employ,
        phone: data.phone,
        dob: data.dob,
        status: data.status,
        code: data.code
      });
    })
  }
  onNavigatorEvent(event) {
    if (event.id === 'back') {
      this.props.navigator.pop({
        animated:true
      });
      const rootRef = firebaseApp.database().ref('customers/'+this.props.keyID);
      rootRef.update({
        status: this.state.status,
        employ_status: this.state.employ + "_" + this.state.selectedStatus,
      });
    }
  }
  componentDidMount() {
    this.itemsRef.on('child_added',(dataSnapshot) => {
      this.items.push({id: dataSnapshot.key, text:dataSnapshot.val()});
      this.setState({
        contentSource: this.state.contentSource.cloneWithRows(this.items)
      })
    });
    this.itemsRef.on('child_removed',(dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
      this.setState({
        contentSource: this.state.contentSource.cloneWithRows(this.items)
      })
    });
  }
  addContent() {
    if(this.state.newContent !== '') {
      this.itemsRef.push({
        content: this.state.newContent
      })
      this.setState({
        newContent: '',
        openModal: false
      })
    }
  }
  removeContent(rowData) {
    this.itemsRef.child(rowData.id).remove();
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
          <TitleBox title='Nội dung cuộc gọi:'>
              <Text style={{color:'black', fontSize:16, width: width-30}}>{rowData.text.content}
              </Text>
          </TitleBox>
        </View>
      );
    }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView >
        <View style={{flexDirection:'row', width:width}}>
          <View style={{flex:1}}>
              <InfoBox title='Mã KH:' content={this.state.code} />
              <InfoBox title='Họ tên:' content={this.state.name} />
              <InfoBox title='Điện thoại' content={this.state.phone} />
          </View>
          <View style={{flex:1}}>
              <InfoBox title='Địa chỉ:' content={this.state.address} />
              <InfoBox title='Email:' content='none' />
              <InfoBox title='Ngày sinh:' content={this.state.dob} />
          </View>
        </View>
        <InfoBox title='Nhân viên phụ trách:' content={this.state.employ} />
        <TitleBox title='Trạng Thái:'>
          <Picker
              style={styles.picker}
              selectedValue={this.state.status}
              onValueChange={this.onValueChange.bind(this, 'status')}>
              <Item label="Không thành công" value="Không thành công" />
              <Item label="Đã hẹn" value="Đã hẹn" />
              <Item label="Đã demo" value="Đã demo" />
              <Item label="Đã mua hàng" value="Đã mua hàng" />
              <Item label="Dữ liệu lỗi" value="Dữ liệu lỗi" />
          </Picker>
        </TitleBox>
        <InfoBox title='Nội dung cuộc gọi ({this.state.lastTime}):' content='Muốn mua tủ lạnh' />
        <InfoBox title='Kế hoạch:' content='Cần tư vấn đến ĐMX' />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.contentSource}
          renderRow={this.renderRow.bind(this)}
          />
      </ScrollView>
        <ActionButton
          buttonColor="#32B34E"
          onPress={() => {this.setState({openModal: true})}}
          />
        <Modal
            open={this.state.openModal}
            modalDidOpen={() => console.log('modal did open')}
            modalDidClose={() => this.setState({openModal: false})}
            closeOnTouchOutside={true}
            style={{alignItems: 'center'}}>
            <View >
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
  },

});
