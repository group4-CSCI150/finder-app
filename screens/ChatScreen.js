import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  Easing,
  RefreshControl,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../components/Header';
import api from '../utils/apiCaller';

function getChatUpdate() {
  return [
    {
      _id: 1,
      text: 'Hello',
      createdAt: new Date(),
      user: { _id: 2 }
    },
    {
      _id: 2,
      text: 'World',
      createdAt: new Date(),
      user: { _id: 2 }
    },
  ]
}

/*
navigation parameters:
  'name': String, required. Name of person being chatted with
  'username': String, required. Username of person being chatted with

*/
export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.getMessages = this.getMessages.bind(this); // remember to bind class methods
    this.headerTitle = this.props.navigation.getParam('name', 'Finder')
    this.messageCount = 0;    // Variable used to assign _id to messages

    this.state = {
      messages: [],
      componentHasLoaded: false,
    }

    this.otherUser = {
      _id: 2,
      name: this.props.navigation.getParam('name', '?'),
      avatar: 'https://placeimg.com/140/140/any',
      username: this.props.navigation.getParam('username', '?'),
    }
  }

  async componentDidMount() {
    user = await api.getSelf();
    this.thisUser = {
      _id: 1,
      name: user.name,
      avatar: 'https://placeimg.com/140/140/any', // placeholder for actual avatar
      username: user.username,
    }

    // Set up polling for chat updates
    /*
    this.listener = setInterval(() => {
      //api.getChatUpdate();
      newMessages = getChatUpdate();
      if (newMessages.length > 0) { // If there are new messages
        // Add _id and user properties to each new message
        for (let i = 0; i < newMessages.length; i++) {
          this.messageCount++;
          newMessages[i]._id = this.messageCount;
          newMessages[i].user = this.otherUser;
        }
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, newMessages)
        }));
      }
    }, 6000);
    */

    // Should be able to save and load previous messages
    this.setState({
      messages: [
        {
          _id: this.messageCount,
          text: 'Hello world',
          createdAt: new Date(),
          user: this.otherUser,
        },
      ],
      componentHasLoaded: true,
    });
  }

  componentWillUnmount() {
    clearInterval(this.listener);
  }

  onSend(messages = []) {
    // First, append new message to GiftedChat
    console.log(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    // Send to api
    message = messages[0];    
    api.sendMessage({
      to: this.otherUser.username,
      from: this.thisUser.username,
      text: message.text,
    }).then( (response) => {
      console.log(response);
    }).catch( (error) => {
      console.log('Error sending message');
      console.log(error);
    })
  }

  getMessages() {
    api.getMessages({username: this.thisUser}).then( (newMessages) => {
      if (newMessages.length > 0) { // If there are new messages
        // Add _id and user properties to each new message
        for (let i = 0; i < newMessages.length; i++) {
          this.messageCount++;
          newMessages[i]._id = this.messageCount;
          newMessages[i].user = this.otherUser;
        }
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, newMessages)
        }));
      }
    })
  }

  render() {
    if (!this.state.componentHasLoaded) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Header title={this.headerTitle} back={true}/>
          <ActivityIndicator />
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Header title={this.headerTitle} back={true} actions={[{name: 'Get New Messages', action: this.getMessages}]}/>
          <GiftedChat 
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)} 
            user={this.thisUser}
          />
        </SafeAreaView>
      );
    }
  }
}