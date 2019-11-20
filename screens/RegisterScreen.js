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
import Header from '../components/Header';

import { jsxExpressionContainer } from '@babel/types';
import api from '../utils/apiCaller'
import validator from 'validator';

var ToS = [
  { label: "Term of Service", value: "0", width: 10 },
]

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      DOB: "",
      email: "",
      password: "",
      confirmPW: "",
      check: 0,
      editable: true
    };
  }

  signUp = async () => {
    var emailDomain = this.state.email.split('@');
    var formatDate = this.state.DOB.split('-');
    try {
      if (validator.isEmpty(this.state.username) || validator.isEmpty(this.state.DOB) || validator.isEmpty(this.state.email) || validator.isEmpty(this.state.password) || validator.isEmpty(this.state.confirmPW)) {
        this.setState({ message: "Fields cannot be empty" });
        return;
      }
      else if (emailDomain[1] != "mail.fresnostate.edu") {
        this.setState({ message: "Not a Fresno State Email" })
        return
      }
      else if (isNaN(formatDate[0]) || formatDate[0].length != 2 || isNaN(formatDate[1]) || formatDate[1].length != 2 || isNaN(formatDate[2]) || formatDate[2].length != 4) {
        this.setState({ message: "Not a valid date" });
        return;
      }
      else if (this.state.password != this.state.confirmPW) {
        this.setState({ message: "Password do not match" })
        return;
      }
      else if (this.state.check == 0) {
        this.setState({ message: "Please check Term of Service" })
        return;
      }
      this.setState({ editable: false })
      let user = await api.createUser({ username: this.state.username, DOB: this.state.DOB, email: this.state.email, password: this.state.password });
      this.setState({ editable: true })
      this.props.navigation.navigate("Login")
    }
    catch{
      this.setState({ editable: true })
      this.setState({ message: "Something went wrong. Please reload and try again." });
    }
  }
  render() {
    const { navigate } = this.props.navigation;

    logout = async () => {
      await token.removeToken()
      navigate('LoginNav')
    }

    let error;
    if (this.state.message) {
      error = <Text style={{ textAlign: "center", backgroundColor: "red" }}>{this.state.message}</Text>
    }
    let loading;
    if (!this.state.editable) {
      loading = <ActivityIndicator size="large" color="#0000ff" />
    }
    return (
      <ScrollView style={style.container}>
        <Header title="Register" back={true}/>
        <View>{error}</View>
        <View style={style.containerTextInput}>
          <Text style={{ marginTop: 10 }}>Username:</Text>
          <TextInput
            editable={this.state.editable}
            style={style.textInput}
            placeholder="Fresno State Username "
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            underlineColorAndroid={'transparent'}
          />
          <Text>Email:</Text>
          <TextInput
            editable={this.state.editable}
            style={style.textInput}
            placeholder="Fresno State Email"
            onChangeText={(email) => this.setState({ email: email })}
            value={this.state.email}
            underlineColorAndroid={'transparent'}
          />
          <Text>Date of Birth:</Text>
          <TextInput
            editable={this.state.editable}
            style={style.textInput}
            placeholder="mm-dd-yyyy"
            onChangeText={(DOB) => this.setState({ DOB })}
            value={this.state.DOB}
            underlineColorAndroid={'transparent'}
          />
          <Text>Password:</Text>
          <TextInput
            editable={this.state.editable}
            secureTextEntry={true}
            style={style.textInput}
            placeholder="*********"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            underlineColorAndroid={'transparent'}
          />
          <Text>Confirm Password:</Text>
          <TextInput
            editable={this.state.editable}
            secureTextEntry={true}
            style={style.textInput}
            placeholder="*********"
            onChangeText={(confirmPW) => this.setState({ confirmPW })}
            value={this.state.confirmPW}
            underlineColorAndroid={'transparent'}
          />
          <RadioForm
            radio_props={ToS}
            initial={1}
            onPress={value => { this.setState({ value: value }) }}
            onPress={() => { this.setState({ check: 1 }) }}
          />
          <Button style={style.button} onPress={this.signUp}>
            <Text style={style.btnText}>Sign Up</Text>
          </Button>
          {loading}
        </View>
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
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ac1a2f',
    marginTop: 5,
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
  }

});