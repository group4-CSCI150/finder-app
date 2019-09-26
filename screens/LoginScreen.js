import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: "Login"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
