import {
  StyleSheet,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({

  box:{
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 5,
    marginVertical: 1,
    overflow: 'hidden',
    elevation:1
  },
  titleContainer:{
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation:1
  },

  textTitle:{
    color:'black',
    paddingLeft:20,
    fontSize:15,
    fontWeight:'bold'
  },
  text:{
    fontSize:15,
    textAlign:'center',
  },
  textBox:{
    fontSize:15,
    padding:10,
    paddingLeft:30
  },
});

module.exports = styles
