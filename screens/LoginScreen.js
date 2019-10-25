import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Container,
  Card,
  CardItem,
  Body,
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
  Linking,
  AsyncStorage
} from 'react-native';
import { jsxExpressionContainer } from '@babel/types';
import api from '../utils/apiCaller'

const Base64 = require('js-base64').Base64;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      isLoggedIn: false
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e });
  }

  callAPI = async () => {
    try{
      let user = await api.callLogin({username: this.state.username, password: this.state.password});
      await this.storeToken(Base64.encode(JSON.stringify(user)))
      await this.getToken()
      this.props.navigation.navigate("Main")
    }
    catch{
      this.setState({message: "Invalid credentials"})
    }
  }

  storeToken = async (token) => {
    try {
      console.log("Storing token")
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log("Error storing")
    }
  }

  getToken = async () => {
    try {
      console.log("Reading token")
      let val = await AsyncStorage.getItem('token');
      console.log(Base64.decode(val))
      return val;
    } catch (error) {
      console.log("Error Geting token")
      return;
    }
  }

  removeToken = async () => {
    try {
      console.log("Reading token")
      await AsyncStorage.removeItem('token');
    } catch (error) {
      // Error saving data
    }
  }

  render() {
    const { navigate } = this.props.navigation;
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
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={this.handleUsernameChange} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={this.handlePasswordChange} />
              </Item>
              <Button style={styles.buttonLogin} onPress={this.callAPI}>
                <Text style={{ textAlign: "center" }}>Login</Text>
              </Button>
            </Form>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
              <Button style={styles.buttonSigup} onPress={() => { navigate('Register') }}>
                <Text style={{ textAlign: "center" }}>SignUp</Text>
              </Button>
              <Text style={{ textDecorationLine: 'underline', color: '#0000FF' }} onPress={this.callAPI}>Forgot Your{"\n"} Password?</Text>
            </View>
            <Text>{this.state.message}</Text>
            {/* <Button style={styles.buttonSigup} onPress={() => {api.getUserById("testYoshida1") }}>
              <Text style={{ textAlign: "center" }}>GET</Text>
            </Button>
            <Button style={styles.buttonSigup} onPress={() => {api.createUser({username:"Hi", userId: "testYoshida1", newField: "haha"}) }}>
              <Text style={{ textAlign: "center" }}>POST</Text>
            </Button>
            <Button style={styles.buttonSigup} onPress={() => {api.updateUser("testYoshida1",{field3:"555555555", username: "testYoshida1"}) }}>
              <Text style={{ textAlign: "center" }}>PUT</Text>
            </Button>
            <Button style={styles.buttonSigup} onPress={() => {api.getAllUser()}}>
              <Text style={{ textAlign: "center" }}>GETALL</Text>
            </Button> */}
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
