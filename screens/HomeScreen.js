import React, {useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import token from '../utils/tokenFunctions'

import FadeInView from '../components/FadeInView';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function ActivityFeed(props) {
  [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }
  /*
  const onRefresh = useCallback(() => {

  });*/

  return (
    <View>
      <View style={{padding: 15}}>
        <Text style={[styles.text, {fontSize: 40}]}>Notifications</Text>
        <View style={{width: '90%', height: 2, borderRadius: 1, borderColor: 'transparent', backgroundColor: 'rgba(200, 200, 200, 0.75)'}} />
      </View>

      <ScrollView style={{minHeight: '100%', padding: 15}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#E0E0E0'} />
        }>
        <View style={{marginTop: 30}}>
          <Text style={[styles.text, {fontSize: 20}]}>
            This is where new events, unread chat messages, etc. will be displayed.
          </Text> 
        </View>
      </ScrollView>
    </View>
  );
}

export default function HomeScreen(props) {
  const { navigate } = props.navigation;

  logout = async () => {
    await token.removeToken()
    navigate('LoginNav')
  }
  return ( 
    <ScreenContainer>
      <FadeInView>
        <Header title={' '} actions={[{name:'Logout', action: logout, iconName: Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}]}/>        
        <ActivityFeed />
      </FadeInView>
    </ScreenContainer>
  );
}

import Constants from 'expo-constants';

const styles = StyleSheet.create({
  text: {
    color: '#E0E0E0',
  }
});
