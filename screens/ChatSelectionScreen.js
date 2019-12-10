import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  Easing,
  RefreshControl,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import ScreenContainer from '../components/ScreenContainer';
import ChatStorage from '../utils/chatStorage';
import Header from '../components/Header';
import FadeInView from '../components/FadeInView';
import OptionsModal from '../components/OptionsModal';

DEBUG = false;

/*
props:
    user: object, required. user has attribute username
*/
class ChatSession extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            modalVisible: false,
        }
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(val) {
        this.setState({ modalVisible: val })
    }

    render() {
        return (
            <View style={{width: '100%', height: 100}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{width: '66%', height: 100}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <View>
                                <OptionsModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} actions={[{
                                    name: 'Delete Chat',
                                    action: async () => { await ChatStorage.deleteChatSession(this.props.user.username); this.props.refreshChats();},
                                    iconName: Platform.OS === 'ios' ? 'ios-remove-circle' : 'md-remove-circle'
                                }]}/>
                                <TouchableOpacity onPress={() => {this.setModalVisible(true)}}>
                                    <Ionicons name={Platform.OS === "ios" ? "ios-more" : "md-more"} size={50} color={'#E0E0E0'} />
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../images/stock_photo.jpg')} 
                                style={{width: 60, height: 60, marginLeft: 10, borderRadius: 30, borderColor: 'white'}}
                            />
                            <Text style={{color: '#E0E0E0', marginLeft: 15, fontSize: 25, fontWeight: 'bold'}}>{this.props.user.username}</Text>
                        </View>
                    </View>
                    <View style={{width: '33%', height: 100}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{marginRight: 20}} onPress={this.props.onPress}>
                                <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'} size={50} color={'#E0E0E0'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


class ChatSelectionScreen extends React.Component  {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { 
            pageLoaded: false,
            chatSessions: [],
            refreshing: false,
        }

        this.refreshChats = this.refreshChats.bind(this);
    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', (payload) => {
            console.log('Chat selection screen in focus');
            this.refreshChats();
        });
        let chatSessions = await this.getChatSessions();
        this.setState({
            chatSessions: this.chatSessions,
            pageLoaded: true,
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    async getChatSessions() {
        users = await ChatStorage.getChatSessions();

        var i = -1;
        let chatSessions = users.map( (username) => {
            i++;
            return <ChatSession key={i} user={{username: username}} refreshChats={this.refreshChats}
                                onPress={() => {this.props.navigation.navigate('Chat', {name: username, username: username})}}/>
        });

        // Debug purposes only
        if (DEBUG) {
            chatSessions.push( <ChatSession key={1} user={{username: 'Brandon'}} onPress={() => {this.props.navigation.navigate('Chat', {name: 'Brandon', username: 'Brandon'})}} /> )
        }
        
        return chatSessions;
    }

    async refreshChats() {
        this.setState({ refreshing: true });
        let chatSessions = await this.getChatSessions();
        this.setState({ 
            refreshing: false,
            chatSessions: chatSessions,
        });
    }

    render() {
        if (!this.state.pageLoaded) {
            return (
                <ScreenContainer>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color={'#E0E0E0'} />
                    </View>
                </ScreenContainer>
            );
        }
        return (
            <ScreenContainer>
                <FadeInView>
                    <Header title={' '} />
                    <View style={{padding: 15}}>
                        <Text style={{color: '#E0E0E0', fontSize: 40}}>Messages</Text>
                        <View style={{width: '90%', height: 2, borderRadius: 1, borderColor: 'transparent', backgroundColor: 'rgba(200, 200, 200, 0.75)'}} />
                    </View>
                    <ScrollView style={{minHeight: '100%'}}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.refreshChats} tintColor={'#E0E0E0'}/>}
                    >
                        {this.state.chatSessions}
                    </ScrollView>
                </FadeInView>
            </ScreenContainer>
        );
    }
}

export default withNavigation(ChatSelectionScreen);
