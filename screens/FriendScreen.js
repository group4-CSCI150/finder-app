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
    this.setState({data: user.users});
  }

 render() {
  logout = async () => {
    await token.removeToken()
    navigate('LoginNav')
  }
   var i = -1;
   console.log("Data:", this.state.data);
    const newArray = this.state.data.map((friend) => {
    i++;
    return (
      <TouchableOpacity key={i} onPress={ () => {this.props.navigation.navigate('ViewFriendProfile', {user: friend, isFriend: true})} }>
        <View style={{width: '100%', height: 80}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text style={{color: '#E0E0E0', marginLeft: 20, fontSize: 30}} >{friend.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  })

    return (
    <ScreenContainer>    
      <Header back={true} title="Friend List" actions={[{name:'Logout', action: logout, iconName: Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}]}/>
      <ScrollView>
        <View style={style.friendDisplay}>
          {newArray} 
        </View>
      </ScrollView>
    </ScreenContainer>
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