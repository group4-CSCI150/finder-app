import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
} from 'react-native';

import ImageSwiper from '../components/ImageSwiper';
import Header from '../components/Header';

// TODO: Style with react-native-linear-gradient
function Divider(props) {
    return (
        <View style={{width: '100%', height: 5, backgroundColor: 'black', borderRadius: 2.5}} />
    );
}


/*
    Props:
    user - an object containing all information required in a user profile.
    Is of the form:
    {
        name: String. User's full name,

    }
*/
export default function GuestProfileScreen(props) {
    return (
        <SafeAreaView>
            <Header back={true} actions={[{name: 'Test'}]} />
            <ImageSwiper />
            <View>
                <View>
                    <Text>{props.user.name}</Text>
                </View>
                <View>
                    <Text>{props.user.major}</Text>
                </View>
                <View>
                    <Text>{props.user.tags}</Text>
                </View>
            </View>
            <Divider />
            <View>
                <Text>{props.user.description}</Text>
            </View>
            <View>
                <View>
                    <Text>{props.user.name} likes:</Text>
                </View>
                <View>
                    <Text>{props.user.tags}</Text>
                </View>
            </View>

            <View><Text>Add Friend!</Text></View>
        </SafeAreaView>
    );
}