import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'

import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import api from '../utils/apiCaller'
import token from '../utils/tokenFunctions'
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';

export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: [],
    };
  }
  
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const user = await api.getFriends()
    console.log(user)
    this.setState({ data: user.users });
  };


  render() {
    logout = async () => {
      await token.removeToken()
      navigate('LoginNav')
    }
    var i = -1;
    const friendList = this.state.data.map((friend) => {
      i++;
      return (
        <ListItem key={i}
          title={friend.name}
          subtitle={friend.description}
          bottomDivider
          leftAvatar={ {source:require('../images/stock_photo.jpg')}}
          onPress={() => {
            this.props.navigation.navigate('ViewFriendProfile', { user: friend, isFriend: true });
          }} />
      );
    })

    return (
      <ScrollView style={style.container}>
        <Header back={true} title="Friend List" actions={[{ name: 'Logout', action: logout, iconName: Platform.OS === "ios" ? "ios-log-out" : "md-log-out" }]} />
        <View style={style.header}>
          {friendList}
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