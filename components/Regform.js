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
	StyleSheet,
	View,
	SafeAreaView,
	Alert,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	Linking,
	CheckBox
} from 'react-native';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel
} from 'react-native-simple-radio-button';
import { jsxExpressionContainer } from '@babel/types';
import api from '../utils/apiCaller'
import token from '../utils/tokenFunctions'
import validator from 'validator';


const Base64 = require('js-base64').Base64;


var ToS = [
	{label: "Term of Service", value: "0"},
]


export default class RegForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			DOB: "",
			email: "",
			password: "",
			confirmPW: ""
		};
	}

	signUp = async () => {
		// var emailDomain = this.state.email.split('@')[1].trim();
		try {
		  if (validator.isEmpty(this.state.username) || validator.isEmpty(this.state.DOB) || validator.isEmail(this.state.email) || validator.isEmpty(this.state.password) || validator.isEmpty(this.state.confirmPW)) {
			this.setState({ message: "Fields cannot be empty" });
			return;
		  }
		 if (validator.isAfter(this.state.DOB["01/01/1940"])) {
			  this.setState({message: "Not a valid date"});
			  return;
		  }
		  if (validator.isEmail(this.state.email)) {
			  this.setState({message: "Not a valid email"});
			  return;
		  }
		  else if (emailDomain != "mail.fresnostate.edu") {
				this.setState({message:"Not a Fresno State Email"})
		  }
		  let user = await api.createUser({username: this.state.username, DOB: this.state.DOB, email: this.state.email, password: this.state.password, confirmPW: this.state.confirmPW});
		  await token.storeToken(Base64.encode(JSON.stringify(user)));
		  await token.getToken();
		  this.props.navigation.navigate("Main");
		}
		catch{
		  this.setState({ message: "Invalid credentials" });
		}
	  }
 render() {
    let error;
    if (this.state.message) {
      error = <Text style={{ textAlign: "center", backgroundColor: "red" }}>{this.state.message}</Text>
	}

	return (
		<ScrollView style={style.container}>
			<View style={style.containerHeader}>
				<Text style={style.header}>
					<Image 
						style = {style.image} 
						source={require('../images/bulldog.png')} 
						resizeMode="contain" 
					/>
					Register Page
				</Text>
			</View>
			<View>{error}</View>
			<View style={style.containerTextInput}>
			<Text style={{ marginTop: 10 }}>Username:</Text>
			<TextInput 
				style={style.textInput} 
				placeholder="Fresno State Username " 
				onChangeText={(username) => this.setState({username})}
				value={this.state.username}
				underlineColorAndroid={'transparent'}
			/>
			<Text>Email:</Text>
			<TextInput 
				style={style.textInput} 
				placeholder="Fresno State Email" 
				onChangeText={(email) => this.setState({email :email})}
				value={this.state.email}
				underlineColorAndroid={'transparent'}
			/>
			<Text>Date of Birth:</Text>
			<TextInput 
				style={style.textInput} 
				placeholder="mm-dd-yyyy" 
				onChangeText={(DOB) => this.setState({DOB})}
				value={this.state.DOB}
				underlineColorAndroid={'transparent'}
			/>
			<Text>Password:</Text>
			<TextInput 
				secureTextEntry={true} 
				style={style.textInput} 
				placeholder="*********" 
				onChangeText={(password) => this.setState({password})}
				value={this.state.password}
				underlineColorAndroid={'transparent'}
			/>
			<Text>Confirm Password:</Text>
			<TextInput 
				secureTextEntry={true} 
				style={style.textInput} 
				placeholder="*********" 
				onChangeText={(confirmPW) => this.setState({confirmPW})}
				value={this.state.confirmPW}
				underlineColorAndroid={'transparent'}
				/>
				<RadioForm
				radio_props={ToS}
				initial={1}
				onPress={value => {this.setState({value:value})}}
			  />	
			 <Button style={style.button} onPress={this.signUp}>
				 <Text style={style.btnText}>Sign Up</Text>
			 </Button>
				
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

