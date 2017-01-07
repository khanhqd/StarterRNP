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
import { Card, CardSection, Input, Button2, InfoBox, TitleBox } from './common';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-simple-modal';
import { firebaseApp } from '../app.js';
var {height, width} = Dimensions.get('window');

export default class Checklist extends Component {
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
    this.state={
      content :'',
      openModal:false,
      newContent: '',
      contentSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.items = [];
    this.itemsRef = firebaseApp.database().ref("todo");
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
        openModal:false
      })
    }
  }
  removeContent(rowData) {
    this.itemsRef.child(rowData.id).remove();
  }
  renderRow(rowData) {
      return (
          <View style={{flexDirection:'row', height:60, alignItems:'center', backgroundColor:'white', borderWidth:0.5, borderRadius:10, margin:5, elevation:2}}>
            <View style={{flex:5, marginLeft:30}}>
              <Text style={{fontSize:16, color:"black"}}>{rowData.text.content}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.removeContent(rowData)}
              style={{flex:1, marginRight:10}}>
              <Image
                style={{height:30, width:30, alignSelf:'flex-end'}}
                source={require('../../res/img/remove-icon.png')}/>
            </TouchableOpacity>

          </View>
      );
    }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView >
        <ListView
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
    flex: 1,
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
  input: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:16,
  },

});
