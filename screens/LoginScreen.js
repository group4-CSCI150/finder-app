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
  Linking
} from 'react-native';
import { jsxExpressionContainer } from '@babel/types';
import {getUserById} from '../utils/apiCaller'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      isLoggedIn: false
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e });
  }

  callAPI = async () => {
    try {
      const users = await fetch('https://us-central1-test150project.cloudfunctions.net/api/user/test1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await users.json();
      this.setState({ message: JSON.stringify(json) });
    }
    catch {
      this.setState({message: "Something went wrong plz try again"})
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if(!this.state.isLoggedIn){}
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
                <Input onChangeText={this.handleEmailChange} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={this.handlePasswordChange} />
              </Item>
              <Button style={styles.buttonLogin} onPress={() => { navigate('Main')}}>
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
