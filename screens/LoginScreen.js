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
} from 'react-native';
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
    };
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
      let user = await api.callLogin({ username: this.state.username, password: this.state.password });
      await token.storeToken(Base64.encode(JSON.stringify(user)))
      await token.getToken()
      this.props.navigation.navigate("Main")
    }
    catch{
      this.setState({ message: "Invalid credentials" })
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let error;
    if (this.state.message) {
      error = <Text style={{ textAlign: "center", backgroundColor: "red" }}>{this.state.message}</Text>

    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            <Image source={require('../images/bulldog.png')} style={{ width: 40, height: 40 }} />
            Login
          </Text>
        </View>
        <Container>
          <Card style={{ paddingBottom: 20 }}>
            {error}
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={this.handleUsernameChange} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={this.handlePasswordChange} />
              </Item>
              <Button style={styles.buttonLogin} onPress={this._submit}>
                <Text style={{ textAlign: "center" }}>Login</Text>
              </Button>
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
