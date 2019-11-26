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
  // friendList() {
  //   return api.getFriends()
  // }
  fetchData = async () => {
    const user = await fetch("https://us-central1-test150project.cloudfunctions.net/api/user");
    const json = await user.json();
    this.setState({data: json.users});
    // let user = await this.friendList();
    // this.setState({data: user.users})
  };
  
 render() {
  logout = async () => {
    await token.removeToken()
    navigate('LoginNav')
  }
    separate = () => {
      <View style ={{
        height: 1,
      }}
      />
    }

    return (
    <ScrollView style={style.container}>    
    <Header title="Friends"/>
    <View style={style.header}></View>
    <View style={style.friendDisplay}>
    <FlatList 
      data = {this.state.data}
      keyExtractor = {(item, index) => 'key'+index}
      renderItem = {({ item }) =>
      <Text> {item.user.friends}</Text>
      }
      ItemSeparatorComponent={this.separate}
    />
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
  header: {
    textAlign: "center",
    fontSize: 24,
    color: '#FFFFFF',
    borderColor: '#d6d7da',
    backgroundColor: '#214786',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    paddingLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
});