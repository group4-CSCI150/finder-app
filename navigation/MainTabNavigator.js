import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Constants from 'expo-constants';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendScreen from '../screens/FriendScreen';
import SearchScreen from '../screens/SearchScreen';
import AdvancedSearchScreen from '../screens/AdvancedSearchScreen';
import GuestProfileScreen from '../screens/GuestProfileScreen';
import ChatSelectionScreen from '../screens/ChatSelectionScreen';
import ChatScreen from '../screens/ChatScreen';


const config = {
  headerMode: 'none',
  headerVisible: false,
  headerStyle: { marginTop: Constants.statusBarHeight },
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    AdvancedSearch: AdvancedSearchScreen,
    GuestProfile: GuestProfileScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-search`
          : 'md-search'
      }
    />
  ),
};

SearchStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Friend: FriendScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const ChatStack = createStackNavigator(
  {
    ChatSelection: ChatSelectionScreen,
    Chat: ChatScreen,
  },
  config
);

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} />
  ),
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  ProfileStack,
  ChatStack,
});

tabNavigator.path = '';

export default tabNavigator;
