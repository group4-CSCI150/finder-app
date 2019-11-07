import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {StyleSheet,
        Text,
        TextInput,
        ScrollView,
        View,
        Image,
        TouchableOpacity,
        KeyboardAvoidingView,
      } from 'react-native'; 


export default class profilePage extends Component{
  constructor(props){
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);


    this.state = {
      name: "Name",
      desc: "Bio",
      tag: "Interest",
      isEdit: false,  // editablity of text input - true when edit
      isMulti: true,  // make able to do multiple lines when input text
      buttonName: "Edit Profile", // default - on button press, title will change to confirm changes
      pressStatus: false, // for changing color of button when edit
      changeButton: false, // change button style depending on if view or edit screen
    };
  }
 
  handleEdit(){       // if isEdit initially false -> switch to edit page
    this.setState({isEdit: true});
    this.setState({buttonName: "Confirm"});
    this.setState({pressStatus: true}); // change to edit text style
    this.setState({changeButton: true});  // confirm changes button style
  }

  handleSave(){     // if isEdit initially true -> confirm changes and switch to viewing
    this.setState({isEdit: false});
    this.setState({buttonName: "Edit Profile"});
    this.setState({pressStatus: false});  // change to view only style
    this.setState({changeButton: false}); // edit button style
  }

 // display view profile as default - on button press, be able to edit the text fields
  render(){
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding">
      <View style={style.header}>
        <Text style={style.headerFont}>My Profile</Text>       
    
        <View style={style.profilepicWrap}>
            <Image source={require('../images/bulldog.png')} style={style.profilepic}/>
        </View>   

   
        <TextInput editable={this.state.isEdit} 
                  multiline={this.state.isMulti}
                  style={this.state.pressStatus ? style.textInput_style: style.default_profile}
                  onChangeText={(name) => this.setState({name})}> 
                      {this.state.name}</TextInput>
        <TextInput editable={this.state.isEdit} 
                  multiline={this.state.isMulti}
                  style={this.state.pressStatus ? style.textInput_style: style.default_profile}
                  onChangeText={(desc) => this.setState({desc})}>
                      {this.state.desc}</TextInput>
        <TextInput editable={this.state.isEdit}
                  multiline={this.state.isMulti} 
                  style={this.state.pressStatus ? style.textInput_style: style.default_profile}
                  onChangeText={(tag) => this.setState({tag})}>
                      {this.state.tag}</TextInput>
        
        <TouchableOpacity style={this.state.changeButton ? style.buttonConfirmContainer: style.buttonEditContainer} 
                          onPress={this.state.isEdit ? this.handleSave: this.handleEdit}>
        <Text style={style.buttonFont}>{this.state.buttonName}</Text>
        </TouchableOpacity>
      
      </View>
      </KeyboardAvoidingView>
     
      );
  }

}



// STYLE
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonEditContainer: {
    height: 30,
    paddingVertical: 20,
    backgroundColor: '#dc143c',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 70,    
    width: '60%'
  },

  buttonConfirmContainer: {
    height: 30,
    paddingVertical: 20, 
    backgroundColor: '#214786',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 45,    
    width: '60%'
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: '#ffffff',  
    borderColor: '#214786',
    borderWidth: 5
  },

  profilepicWrap: { // square profile pic
    width: 225,
    height: 225,
    borderColor: '#214786',   
    borderWidth: 1
  },

  profilepic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',    
    borderWidth: 4
  },

  textInput_style: {
    height: 40,
    width: 250,
    margin: 5,  
    padding: 5, 
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20, 
  },
    
// Text styles
  headerFont: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    color: '#000',   
    fontWeight: 'bold'
  },

  default_profile: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: '#000',   
  },

  buttonFont: {
    textAlign: "center",
    color: '#fff',
    fontSize: 20
  },
});

