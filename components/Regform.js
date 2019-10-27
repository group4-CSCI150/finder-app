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
import ValidationComponent from 'react-native-form-validator';

var ToS = [
	{label: "Term of Service", value: 0},
]

export default class RegForm extends ValidationComponent {
	constructor(props){
		super(props);
		this.state = {text_username: ''};
		this.state = {text_DOB: ''};
		this.state = {text_email: ''};
		this.state = {text_password: ''};
		this.state = {text_confirmPW: ''};
		this.chkInfo = this.chkInfo.bind(this);
	}
	chkInfo() {
		const fsEmail = this.validate({
			text_email: {email: true}
		});
		this.setState({fsEmail})
	}
 render() {
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
			<View style={style.containerTextInput}>
				<Text style={{ marginTop: 10 }}>Username:</Text>
				<TextInput 
					style={style.textInput} 
					placeholder="Fresno State Username " 
					onChangeText={(text_username) => this.setState({text_username})}
					value={this.state.text_username}
					underlineColorAndroid={'transparent'}
				/>
				<Text>Email:</Text>
				<TextInput 
					style={style.textInput} 
					placeholder="Fresno State Email" 
					onChangeText={(email) => this.setState({text_email :email})}
					value={this.state.text_email}
					underlineColorAndroid={'transparent'}
				/>
				<Text>Date of Birth:</Text>
				<TextInput 
					style={style.textInput} 
					onChangeText={(text_DOB) => this.setState({text_DOB})}
					value={this.state.text_DOB}
					underlineColorAndroid={'transparent'}
				/>
				<Text>Password:</Text>
				<TextInput 
					secureTextEntry={true} 
					style={style.textInput} 
					placeholder="*********" 
					onChangeText={(text_password) => this.setState({text_password})}
					value={this.state.text_password}
					underlineColorAndroid={'transparent'}
				/>
				<Text>Confirm Password:</Text>
				<TextInput 
					secureTextEntry={true} 
					style={style.textInput} 
					placeholder="*********" 
					onChangeText={(text_confirmPW) => this.setState({text_confirmPW})}
					value={this.state.text_confirmPW}
					underlineColorAndroid={'transparent'}
					/>
				<RadioForm
						radio_props={ToS}
						onPress={(value) => 1}
				/>	
				<TouchableOpacity style={style.button} onPress={this.chkInfo}>
					<Text style={style.btnText}>Sign Up</Text>
				</TouchableOpacity>
					{this.isFieldInError('text_email') && this.getErrorsInField('text_email').map(errorMessage => <Text>{errorMessage}</Text>)}
				<Text>
					{this.getErrorMessages()}
			  	</Text>
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

