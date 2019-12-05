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
  ActivityIndicator,
  FlatList,
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
import Header from '../components/Header';
import {Select, SelectTextBox, Option, OptionList} from 'react-native-chooser';

export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const user = await api.getFriends()
    this.setState({data: user.users});
  };
 render() {
  logout = async () => {
    await token.removeToken()
    navigate('LoginNav')
  }
   var i = -1;
     const newArray = this.state.data.map((friend) => {
    i++;
    return (
      <Text key={i} style={style.texstyle} >{friend.name}</Text>
    );
  })

    return (
    <ScrollView style={style.container}>    
    <Header title="Friends"/>
    <View style={style.header}></View>
    <View style={style.friendDisplay}>
      {newArray} 
    </View>
    </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendDisplay: {
    borderRadius: 4,
    borderWidth: 0.5,
    marginHorizontal: 16,
    paddingLeft: 100,
    paddingRight: 60,
  },
  texstyle: {
    fontSize: 24,
  }
});