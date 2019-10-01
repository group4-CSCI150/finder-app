import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Container, Card, CardItem, Body, Text, Input, Form, Button, Item, Label } from 'native-base';
import {
  Image,
  Platform,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackgound
} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            <Image source={require('../images/bulldog.png')} style={{ width: 40, height: 40 }} />
            Login
          </Text>
        </View>
        <Container>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={this.handleEmailChange}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={this.handlePasswordChange}/>
            </Item>
            <Button style={styles.button}>
              <Text style={{ textAlign: "center" }}>Login</Text>
            </Button>
          </Form>
        </Container>


        <Text>email: {this.state.email}</Text>
        <Text>pasword: {this.state.password}</Text>

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
  button: {
    backgroundColor: '#214786',
    alignSelf: "center",
    justifyContent: "center",
    margin: 5,
    width: '90%'
  }
});
