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
    obj = new Edit();
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

        <Button style={style.buttonStyle} onPress={() => obj.Edit}>
          <Text style={style.buttonFont}>Edit Profile</Text>
        </Button>

      </View>
      </View>
    );
  }
}

class Edit extends Component{

}

// STYLE
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttoncontainer: {
    height: 25,
    paddingVertical: 20,
    backgroundColor: '#dc143c',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 60,
    width: '60%'
  },

    header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 30,
      backgroundColor: '#ffffff',  
      borderColor: '#214786',
      borderWidth: 5
    },

    profilepicWrap: {
      width: 200,
      height: 200,
      borderRadius: 190,
      borderColor: '#214786',   
      borderWidth: 2
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

    // added temporarily
    buttonStyle: {
      backgroundColor: '#dc143c',
      alignSelf: "center",
      justifyContent: "center",
      marginTop: 45,
      width: '60%'
    },
    // added temporarily
    
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
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 26,
      color: '#000',   
    },

    buttonFont: {
      textAlign: "center",
      color: '#fff',
      fontSize: 20
    }
});

