import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {StyleSheet,
        Text,
        TextInput,
        View,
        Image,
        Button,
        TouchableOpacity,
      } from 'react-native'; 

export default class showProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "name",
      desc: "description",
      tag: "tag",
    };
  }

  render(){
    return(
      <View style={style.container}>
      <View style={style.header}>

        <Text style={style.headerFont}>My Profile</Text>       

        <View style={style.profilepicWrap}>
            <Image source={require('../images/bulldog.png')} style={style.profilepic}/>
        </View>   

        <Text style={style.default_profile}>{this.state.name}</Text>
        <Text style={style.default_profile}>{this.state.desc}</Text>
        <Text style={style.default_profile}>{this.state.tag}</Text>

        <TouchableOpacity style={style.buttonContainer} onPress={() => alert('Go to Edit')}>
          <Text style={style.buttonFont}>Edit Profile</Text>
        </TouchableOpacity>

      </View>
      </View>
    );
  }
}

// STYLE
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    height: 30,
    paddingVertical: 20,
    backgroundColor: '#dc143c',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 70,
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

    profilepicWrap: {
      width: 250,
      height: 250,
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
      height: 50,
      width: 250,
      margin: 10,
      padding: 10,
      borderColor: 'black',
      borderWidth: 1,
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
      fontSize: 25,
      color: '#000',   
    },

    buttonFont: {
      textAlign: "center",
      color: '#fff',
      fontSize: 20
    }
});

