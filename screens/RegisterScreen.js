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

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
    </View>
  );
}

RegisterScreen.navigationOptions = {
  title: "Register"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
