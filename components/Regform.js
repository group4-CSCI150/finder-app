import React from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	Alert,
	TextInput,
	TouchableOpacity,
	ScrollView
} from 'react-native';

function Separator() {
	return <View style={style.separator} />;
}

export default function RegForm() {
	return (
		<ScrollView style={style.container}>
			<View style={style.containerHeader}>
				<Text style={style.header}>Register Page</Text>
			</View>
			<Separator />

			<View style={style.containerTextInput}>
				<Text style={{ marginTop: 10 }}>
					Username:
 			</Text>

				<TextInput style={style.textinput} placeholder="Fresno State Username "
					underlineColorAndroid={'transparent'}
				/>

				<Text>
					Email:
  			</Text>

				<TextInput style={style.textinput} placeholder="Fresno State Email"
					underlineColorAndroid={'transparent'}
				/>

				<Text>
					Password:
  			</Text>

				<TextInput style={style.textinput} placeholder=" "
					underlineColorAndroid={'transparent'}
				/>

				<Text>
					Confirm Password:
  			</Text>

				<TextInput style={style.textinput} placeholder=" "
					underlineColorAndroid={'transparent'}
				/>

				<TouchableOpacity style={style.button}>
					<Text
						style={style.btntext}>Sign Up
       			</Text>
				</TouchableOpacity>
			</View>
			
		</ScrollView>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 0,
	},
	containerTextInput: {
		borderRadius: 4,
		borderWidth: 0.5,
		marginHorizontal: 16,
		paddingLeft: 60,
		paddingRight: 60,
	},
	header: {
		fontSize: 24,
		color: '#FFFFFF',
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		backgroundColor: '#214786',
		paddingTop: 15,
		paddingBottom: 15,
		marginBottom: 10,
		borderBottomColor: '#FFFFFF',
		borderBottomWidth: 1,
		textAlign: "center"
	},
	button: {
		alignSelf: 'stretch',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#214786',
		marginTop: 5,
		marginBottom: 10,
	},
	btntext: {
		color: '#fff',
		fontWeight: 'bold',
	},

	textinput: {
		alignSelf: 'stretch',
		height: 40,
		marginBottom: 30,
		color: '#000',
		borderBottomWidth: 1,
		backgroundColor: '#f8f8f8',
	}
});

