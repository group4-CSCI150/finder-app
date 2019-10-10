import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Constants from 'expo-constants';
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const config = {
  headerMode: 'none',
  headerVisible: false,
  headerStyle: { marginTop: Constants.statusBarHeight },
}


const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  config
);

export default LoginNavigator;
