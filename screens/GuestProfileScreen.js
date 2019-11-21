import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Platform,
} from 'react-native';

import ImageSwiper from '../components/ImageSwiper';
import Header from '../components/Header';

// TODO: Style with react-native-linear-gradient
function Divider(props) {
    return (
        <View style={{width: '100%', height: 5}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '75%', height: 5, backgroundColor: 'black', borderRadius: 2.5}} />
            </View>
        </View>
    );
}

/*
Navigation Parameters:
    user - Object, required. Contains all information required in a user profile.
    Is of the form:
    {
        name: String. User's full name
        tags: Array of Strings.
        description: String. User's profile description
        major: String. User's major
    }
*/
export default function GuestProfileScreen(props) {
    var user = props.navigation.getParam('user', {});
    
    var name = user.name ? user.name : 'No name';
    var tags = user.tags ? user.tags.join(', ') : 'No tags';
    return (
        <SafeAreaView style={{marginBottom: 50}}>
            <Header back={true} actions={[{name: 'Add Friend', iconName: Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}]} />
            <ScrollView>
                <ImageSwiper height={400} imgUris={['uri1', 'uri2', 'uri3']} />
                <View style={{margin: 20}}>
                    <View>
                        <Text>{name}</Text>
                    </View>
                    <View>
                        <Text>{user.major ? props.user.major : 'No major'}</Text>
                    </View>
                    <View>
                        <Text>{tags}</Text>
                    </View>
                </View>
                <Divider />
                <View style={{margin: 20}}>
                    <Text>{user.description ? user.description : 'No description'}</Text>
                </View>
                <Divider />
                <View style={{margin: 20}}>
                    <View>
                        <Text>{name} likes:</Text>
                    </View>
                    <View>
                        <Text>{tags}</Text>
                    </View>
                </View>
                <View><Text>Add Friend!</Text></View>
            </ScrollView>
        </SafeAreaView>
    );
}