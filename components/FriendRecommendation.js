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
    Animated,
    Easing,
    PanResponder,
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
    var users = await api.getRecommendations();
    return users;
}


var FRIEND_REC_WIDTH = Dimensions.get('window').width * 0.75;
var FRIEND_REC_HEIGHT = FRIEND_REC_WIDTH * 1.5;

class FriendRecommendationDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        
        this.state = {
            left: new Animated.Value(0)
        };
        
        this.windowWidth = Dimensions.get('window').width;

        this._panResponder = PanResponder.create({
            // Ask to be the responder, don't capture nested responders:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

            onPanResponderGrant: (evt, gestureState) => {
                //props.sendMessage(evt, gestureState, "Gesture has started");
            },
            onPanResponderMove: (evt, gestureState) => {
                //props.sendMessage(evt, gestureState, "Gesture has moved");
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // props.sendMessage(evt, gestureState, "Gesture has been released");

                // On swipe left
                if (this.props.currentFriendIndex < this.props.friendData.length - 1 && gestureState.vx < -1) {
                    this.props.setCurrentFriendIndex(this.props.currentFriendIndex + 1);
                }
                // On swipe right
                else if (this.props.currentFriendIndex > 0 && gestureState.vx > 1) {
                    this.props.setCurrentFriendIndex(this.props.currentFriendIndex - 1);
                }
            },
        });
    }

    componentDidUpdate() {
        // Change left positioning value depending on which image is currently being displayed.
        var newLeftValue = this.props.currentFriendIndex * this.windowWidth * -1;
        Animated.timing(
            this.state.left,
            {
                toValue: newLeftValue,
                duration: 250,
                easing: Easing.out(Easing.cubic),
            }
        ).start()
    }

    render() {
        if (!this.props.friendLoaded) {
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
            var i = -1;
            var friends = this.props.friendData.map( (friend) => {
                i++;
                return (
                    <FadeInFromRightView key={i} initialLeft={0} style={{width: Dimensions.get('window').width, height: FRIEND_REC_HEIGHT + 20}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{overflow: 'hidden', width: FRIEND_REC_WIDTH, height: FRIEND_REC_HEIGHT, borderWidth: 1, 
                                        borderColor: 'black', borderRadius: 30, backgroundColor: '#DDD'}} {...this._panResponder.panHandlers}>
                                <View style={{width: '100%', height: '80%'}}>
                                    <Image source={require('../images/stock_photo.jpg')} style={{width: '100%', height: '100%'}} /> 
                                </View>
                                <View style={{width: '100%', height: '20%'}}>
                                    <Text>{friend.name ? friend.name : 'Error: no name'}</Text>
                                    <Text>{friend.tags ? 'Likes ' + friend.tags.join(', ') : 'Error: no tags'}</Text>
                                </View>
                            </View>
                        </View>
                    </FadeInFromRightView>
                );
            });
            return (
                <View style={{width: this.props.friendData.length * this.windowWidth, height: FRIEND_REC_HEIGHT + 20, overflow: 'visible'}}>
                    <Animated.View style={{flex: 1, flexDirection: 'row', left: this.state.left}}>
                        {friends}
                    </Animated.View>
                </View>
            );
        }
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
    [friendData, setFriendData] = useState([]);
    [currentFriendIndex, setCurrentFriendIndex] = useState(0);
    [refreshing, setRefreshing] = useState(false);

    if (shouldRefresh) {
        loadFriendRecommendation().then( (data) => {
                setFriendData(data.users);
                setShouldRefresh(false);
                setFriendLoaded(true);
                setRefreshing(false);
            }
        ).catch( (e) => {
            console.log('Could not load recommendation');
            console.log(e);
            setFriendData([{name: 'Error'}, {name: 'Could not load recommendations'}]);
            setFriendLoaded(true);
            setShouldRefresh(false);
            setRefreshing(false);
        });
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
            action: async function() {
                await api.addFriend(friendData[currentFriendIndex].username)
                setShouldRefresh(true); setFriendLoaded(false);
            }
        },
        {
            iconName: Platform.OS === 'ios' ? 'ios-eye' : 'md-eye',
            actionName: 'View Profile',
            action: function() {
                props.navigation.navigate('GuestProfile', { user: friendData[currentFriendIndex] });
            }
        }
    ];

    return (
        <View>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <FriendRecommendationDisplay friendLoaded={friendLoaded} friendData={friendData} 
                                             currentFriendIndex={currentFriendIndex} setCurrentFriendIndex={setCurrentFriendIndex}
                />
                <FriendRecommendationButtons actions={actions}/>
                <View style={{width: '100%', height: 200}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <MyButton title='Advanced Search' onPress={function() {props.navigation.navigate('AdvancedSearch')}}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default withNavigation(FriendRecommendation);