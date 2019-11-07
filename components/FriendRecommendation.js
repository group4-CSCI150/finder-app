import React, { useState } from 'react';
import {
    View,
    Image
} from 'react-native';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
async function loadFriendRecommendation() {
    /*
    Placeholder definition
    */
    await wait(2000);
  
    return {
      id: 1,
      name: 'Test User',
      img1: 'image uri',
      tags: ['coding']
    };
}


var FRIEND_REC_WIDTH;
var FRIEND_REC_HEIGHT;

function FriendRecommendationDisplay(props) {
    //[friendLoaded, setFriendLoaded] = useState(false);
    //[friendData, setFriendData] = useState(false);

    if (!props.friendLoaded) {
        return (
            <View style={{width: FRIEND_REC_WIDTH, height: FRIEND_REC_HEIGHT, borderRadius: 10}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading</Text>
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={{width: FRIEND_REC_WIDTH, height: FRIEND_REC_HEIGHT, borderRadius: 10}}>
                <View>
                    <Image source={require('../images/stock_photo.jpg')} style={{width: '100%', height: '100%'}} />
                </View>
                <View>
                    <View>
                        <Text>props.friendData.name</Text>
                    </View>
                    <View>
                        <Text>props.friendData.tags</Text>
                    </View>
                </View>
            </View>
        );
    }
}


var BUTTONS_HEIGHT = 80;
/*

*/
function FriendRecommendationButtons(props) {

    return (
        <View style={{width: '100%', height: BUTTONS_HEIGHT}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <TouchableOpacity>
                    <View>
                        <Ionicons name='md-close' size={20} color='red' />
                        <Text>Button</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function FriendRecommendation(props) {
    [friendLoaded, setFriendLoaded] = useState(false);
    [friendData, setFriendData] = useState({});

    return (
        <View>
            <FriendRecommendationDisplay friendLoaded={friendLoaded} friendData={friendData} />
            <FriendRecommendationButtons />
        </View>
    );
}