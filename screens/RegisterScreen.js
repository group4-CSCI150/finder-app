import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Regform from '../components/Regform';

import { MonoText } from '../components/StyledText';

export default function RegisterScreen() {
  return (
    <View style={style.container}>
      <Regform />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
