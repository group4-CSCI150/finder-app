import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Regform from '../components/Regform';

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