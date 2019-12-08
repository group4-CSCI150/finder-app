import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ImageSwiper from '../components/ImageSwiper';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import MyButton from '../components/MyButton';
import api from '../utils/apiCaller';
import ChatStorage from '../utils/chatStorage';

function Divider(props) {
    return (
        <View style={{width: '100%', height: 5}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{width: '80%', height: 2, marginLeft: 10, backgroundColor: 'rgba(190, 190, 190, 0.75)', borderColor: 'transparent', borderRadius: 1.5}}/>
            </View>
        </View>
    );
}

var styles = StyleSheet.create({
    text: {
        color: '#E0E0E0'
    }
});

/*
Navigation Parameters:
    user - Object, required. Contains all information required in a user profile.
    Is of the form:
    {
        username: String. username of the user
        name: String. User's full name
        tags: Array of Strings.
        description: String. User's profile description
        major: String. User's major
    }
*/
export default function GuestProfileScreen(props) {
    var user = props.navigation.getParam('user', {});
    var isFriend = props.navigation.getParam('isFriend', false);
    
    var name = user.name ? user.name : 'No name';
    var age = user.age ? user.age : '?';
    var major = user.major ? user.major : 'No major';
    var tags = user.tags ? user.tags.join(', ') : 'No tags';

    var headerActions = []

    if (isFriend) {
        headerActions = [
            {
                name: 'Send Message', iconName: Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles',
                action: async () => { 
                    await ChatStorage.createChatSession(user.username);
                    props.navigation.navigate('ChatSelection');
                }
            }
        ];
    }
    else {
        headerActions = [
            {name: 'Add Friend', iconName: Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'},
            //action: api.addFriend(user.username)},
            {name: 'Report', iconName: Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'}
            //action: api.sendReport(user.username)},
        ];
    }

    return (
        <ScreenContainer>
            <Header back={true} actions={headerActions} />
            <ScrollView style={{minHeight: '100%'}} bounces={false}>
                <ImageSwiper height={450} imgUris={['uri1', 'uri2', 'uri3']} />
                <View style={{width: '100%', height: 120, paddingLeft: 10}}>
                    <View style={{width: '100%', height: 60}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={[styles.text, {fontSize: 40}]}>{name}</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 60}}>
                        <View style={{marginLeft: 40, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Ionicons name={Platform.OS === 'ios' ? 'ios-school' : 'md-school'} size={40} color='#CCCCCC' />
                            <Text style={[styles.text, {color: '#CCCCCC', fontSize: 25, marginLeft: 20}]}>{major}</Text>
                        </View>
                    </View>
                </View>

                <Divider />

                <View style={{margin: 20}}>
                    <Text style={[styles.text, {fontSize: 18}]}>{user.description ? user.description : 'No description available.'}</Text>
                </View>

                <Divider />

                <View style={{margin: 20}}>
                    <View>
                        <Text style={[styles.text, {fontSize:20}]}>{name} likes:</Text>
                    </View>
                    <View>
                        <Text style={[styles.text, {fontSize: 18}]}>{tags}</Text>
                    </View>
                </View>

                {!isFriend ? 
                    <View style={{width: '100%', height: 100}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <MyButton title={"Add Friend"} iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} 
                                    iconOnLeft={true} iconSize={30}/>
                        </View>
                    </View>
                    : 
                    <View style={{width: '100%', height: 100}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <MyButton title={"Send Message"} iconName={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'} 
                                    iconOnLeft={true} iconSize={30}
                                    onPress={async () => { 
                                        await ChatStorage.createChatSession(user.username);
                                        props.navigation.navigate('ChatSelection');
                                    }}/>
                        </View>
                    </View>}
                
                <View style={{width: 0, height: 150}} />
            </ScrollView>
        </ScreenContainer>
    );
}