import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import FadeInFromRightView from './FadeInFromRightView';
import { Ionicons } from '@expo/vector-icons';
import api from '../utils/apiCaller';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
async function loadFriendRecommendation() {
    /*
    Placeholder definition
    */
    await wait(1000);
  
    return {
      id: 1,
      name: 'Test User',
      img1: 'image uri',
      tags: ['coding']
    };
}


var FRIEND_REC_WIDTH = Dimensions.get('window').width * 0.75;
var FRIEND_REC_HEIGHT = FRIEND_REC_WIDTH * 1.5;

function FriendRecommendationDisplay(props) {
    if (!props.friendLoaded) {
        return (
            <View style={{width: Dimensions.get('window').width, height: FRIEND_REC_HEIGHT + 20}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{overflow: 'hidden', width: FRIEND_REC_WIDTH, height: FRIEND_REC_HEIGHT, borderWidth: 1, borderColor: 'black', borderRadius: 30, backgroundColor: '#DDD'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size='large' />
                            <Text>Loading</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    else {
        return (
            <FadeInFromRightView style={{width: Dimensions.get('window').width, height: FRIEND_REC_HEIGHT + 20}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{overflow: 'hidden', width: FRIEND_REC_WIDTH, height: FRIEND_REC_HEIGHT, borderWidth: 1, borderColor: 'black', borderRadius: 30, backgroundColor: '#DDD'}}>
                        <View style={{width: '100%', height: '80%'}}>
                            <Image source={require('../images/stock_photo.jpg')} style={{width: '100%', height: '100%'}} /> 
                        </View>
                        <View style={{width: '100%', height: '20%'}}>
                            <Text>{props.friendData.name}</Text>
                            <Text>{props.friendData.tags}</Text>
                        </View>
                    </View>
                </View>
            </FadeInFromRightView>
        );
    }
}


var BUTTONS_HEIGHT = 80;
/*
    props.actions is an array of objects of the form:
    {
        iconName:         String - Ionicons name of object,
        actionName:       String - Text to be displayed under icon,
        action:           Function - to be executed upon press,
        color (optional): String - Optional coloring of icon. Default is black
    }
*/
function FriendRecommendationButtons(props) {
    var buttons = [];
    if (props.actions) {
        var i = -1;
        buttons = props.actions.map ( (action) => {
            i++;
            return (
                <TouchableOpacity onPress={action.action ? action.action : function() {} } key={i}>
                    <View style={{width: 75, height: BUTTONS_HEIGHT}}>
                        <Ionicons style={{textAlign: 'center'}} name={action.iconName} size={BUTTONS_HEIGHT * 0.5} color={action.color ? action.color : 'black'}/>
                        <Text style={{fontSize: BUTTONS_HEIGHT * 0.25, textAlign: 'center'}}>
                            {action.actionName}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    return (
        <View style={{width: '100%', height: BUTTONS_HEIGHT}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                {buttons}
            </View>
        </View>
    );
}

function MyButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress ? props.onPress : function() {}}>
            <View style={{width: 200, height: 80, borderRadius: 30, borderColor: 'black', borderWidth: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        {props.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function FriendRecommendation(props) {
    [friendLoaded, setFriendLoaded] = useState(false);
    [shouldRefresh, setShouldRefresh] = useState(true);
    [friendData, setFriendData] = useState({});
    [refreshing, setRefreshing] = useState(false);

    if (shouldRefresh) {
        loadFriendRecommendation().then( (data) => {
                setFriendData(data);
                setShouldRefresh(false);
                setFriendLoaded(true);
                setRefreshing(false);
            }
        )
    }

    function onRefresh() {
        setRefreshing(true);
        setShouldRefresh(true);
        setFriendLoaded(false);
    }

    var actions = [
        {
            iconName: Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh',
            actionName: 'Refresh',
            action: function() { setShouldRefresh(true); setFriendLoaded(false); }
        },
        {
            iconName: Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add',
            actionName: 'Add Friend',
            action: function() {}
        },
        {
            iconName: Platform.OS === 'ios' ? 'ios-eye' : 'md-eye',
            actionName: 'View Profile'
        }
    ];

    return (
        <FadeInFromRightView>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <FriendRecommendationDisplay friendLoaded={friendLoaded} friendData={friendData} />
                <FriendRecommendationButtons actions={actions}/>
                <View style={{width: '100%', height: 200}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <MyButton title='Advanced Search' onPress={function() {props.navigation.navigate('AdvancedSearch')}}/>
                    </View>
                </View>
            </ScrollView>
        </FadeInFromRightView>
    );
}

export default withNavigation(FriendRecommendation);