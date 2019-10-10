import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  ScrollView
} from 'react-native';


export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = { text_name: '' };
    this.state = { text_desc: '' };
    this.state = { text_tag: '' };
  }

  render() {
    return (
      <ScrollView style={style.container}>
        <View style={style.header}>

          <Text style={style.headerFont}>My Profile</Text>

          <View style={style.profilepicWrap}>
            <Image source={require('../images/bulldog.png')} style={style.profilepic} />
          </View>

          <TextInput style={style.textInput_style}
            placeholder="Name"
            onChangeText={(text_name) => this.setState({ text_name })}
            value={this.state.text_name}
          />

          <TextInput style={style.textInput_style}
            placeholder="Description (i.e. major)"
            onChangeText={(text_desc) => this.setState({ text_desc })}
            value={this.state.text_desc}
          />

          <TextInput style={style.textInput_style}
            placeholder="Tags (your interests)"
            onChangeText={(text_tag) => this.setState({ text_tag })}
            value={this.state.text_tag}
          />
          <Button
            onPress={() => {
              alert('Confirmed Profile');
            }}
            title="Confirm"
          />

        </View>
      </ScrollView>
    );
  }
}

// STYLE
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 42,
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

  // Text styles
  headerFont: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold'
  }
});


//AppRegistry.registerComponent('profile', () => profile);