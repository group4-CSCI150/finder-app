import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/* Sample Apps */
import NavigatorSampleScreen from './samples/Navigator.js';
import TextInputSampleScreen from './samples/TextInput.js';
import ButtonSampleScreen from './samples/Button.js';
import ScrollViewSampleScreen from './samples/ScrollView.js';
import FlatListSampleScreen from './samples/FlatList.js';

import DrawerApp from './DrawerApp.js';
import AuthApp from './AuthApp.js';

class HomeScreen extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Navigator Sample"
          onPress={() => this.props.navigation.navigate('NavigatorSample')}
        />
        <Button
          title="Text Input Sample"
          onPress={() => this.props.navigation.navigate('TextInputSample')}
        />
        <Button
          title="Button Sample"
          onPress={() => this.props.navigation.navigate('ButtonSample')}
        />
        <Button
          title="ScrollView Sample"
          onPress={() => this.props.navigation.navigate('ScrollViewSample')}
        />
        <Button
          title="FlatList Sample"
          onPress={() => this.props.navigation.navigate('FlatListSample')}
        />
      </View>
    );
  }
}

// Create stack navigator with two screens
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    NavigatorSample: {
      screen: NavigatorSampleScreen,
    },
    TextInputSample: {
      screen: TextInputSampleScreen,
    },
    ButtonSample: {
      screen: ButtonSampleScreen,
    },
    ScrollViewSample: {
      screen: ScrollViewSampleScreen,
    },
    FlatListSample: {
      screen: FlatListSampleScreen,
    }
  }, 
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

class ReactSamplesApp extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default AuthApp;