import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Container,
  Card,
  Text,
  Input,
  Form,
  Button,
  Item,
  Label,
  Row
} from 'native-base';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import Header from '../components/Header'

import { jsxExpressionContainer } from '@babel/types';
import api from '../utils/apiCaller'
import token from '../utils/tokenFunctions'
var validator = require('validator');

const Base64 = require('js-base64').Base64;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      editable: true,
      hasMounted: false,
    };
  }

  async componentDidMount() {
    let tok = await this.getToken();
    console.log(tok);
    if (tok) {
      let res = await api.callLoginToken( {username: tok.user.username, token: tok.token} );
      if (res.message === "Success") {
        console.log(tok)
        this.props.navigation.navigate("MainNav")
      }
      else {
        this.setState({
          hasMounted: true
        })
      }
    }
    else {
      this.setState({
        hasMounted: true
      })
    }

  }

  getToken() {
    return token.getToken();
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e });
  }

  _submit = async () => {
    try {
      if (validator.isEmpty(this.state.username) || validator.isEmpty(this.state.password)) {
        this.setState({ message: "Credentials cannot be empty" })
        return;
      }
      this.setState({ editable: false })
      let response = await api.callLogin({ username: this.state.username, password: this.state.password });
      await token.removeToken();
      await token.storeToken(response);
      this.props.navigation.navigate("MainNav");
    }
    catch{
      this.setState({ editable: true })
      this.setState({ message: "Invalid credentials" })
    }
  }

  render() {
    if (!this.state.hasMounted) {
      return (
        <ActivityIndicator />
      );
    }

    const { navigate } = this.props.navigation;
    let error;
    if (this.state.message) {
      error = <Text style={{ textAlign: "center", backgroundColor: "red" }}>{this.state.message}</Text>
    }
    let loading;
    if (!this.state.editable) {
      loading = <ActivityIndicator size="large" color="#0000ff" />
    }

    return (
      <ScrollView style={styles.container}>
        <Header title="Login"/>
        <Container>
          <Card style={{ paddingBottom: 20 }}>
            {error}
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input editable={this.state.editable} onChangeText={this.handleUsernameChange} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input editable={this.state.editable} secureTextEntry={true} onChangeText={this.handlePasswordChange} />
              </Item>
              <Button style={styles.buttonLogin} onPress={this._submit}>
                <Text style={{ textAlign: "center" }}>Login</Text>
              </Button>
              {loading}
            </Form>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
              <Button style={styles.buttonSigup} onPress={() => { navigate('Register') }}>
                <Text style={{ textAlign: "center" }}>SignUp</Text>
              </Button>
              <Text style={{ textDecorationLine: 'underline', color: '#0000FF' }}>Forgot Your{"\n"} Password?</Text>
            </View>
          </Card>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#214786',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: "center",
    paddingRight: 45
  },
  buttonLogin: {
    backgroundColor: '#214786',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    width: '90%'
  },
  buttonSigup: {
    backgroundColor: '#ac1a2f',
    alignSelf: "center",
    justifyContent: "center",
    width: '30%'
  }
});
