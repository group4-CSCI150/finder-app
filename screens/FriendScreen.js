import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Text,
  Button,
} from 'native-base';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import { jsxExpressionContainer } from '@babel/types';
import api from '../utils/apiCaller'
import token from '../utils/tokenFunctions'
import validator from 'validator';


export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  getToken() {
    return token.getToken();
  }
  getUserById() {
    return api.getUserById();
  }

  async getFriend() {
    let pass = await this.getToken();
    if (pass) {
      console.log(pass)
      let user = await this.getUserById();
      this.setState({displayFriend: user });
    }
  }
  render() {
    this.getFriend();
    let listFriend 
    if (this.state.displayFriend) {
      listFriend = <Text> {this.state.displayFriend} </Text>;
    }
    return (
    <ScrollView style={style.container}>
    <View style = {style.list}>{listFriend}</View>
    </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTextInput: {
    borderRadius: 4,
    borderWidth: 0.5,
    marginHorizontal: 16,
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    color: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#214786',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    paddingLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  button: {
    width: 50,
    padding: 20,
    borderRadius: 4,
    backgroundColor: 'green',
    marginTop: 20,
    left: 20,
    marginBottom: 10,
    borderRadius: 60,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 15
  },

  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 15,
    color: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    position: "relative",
    height: 40,
    width: 40,
    marginLeft: 15,
    marginTop: 15,
  },
  list: {
    padding: 50,
    height: 120,
    width: 120,
    marginTop: 15,
    marginLeft: 15,
  }

});