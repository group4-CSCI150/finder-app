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
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import FadeInView from './FadeInView';
import MyButton from './MyButton';
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

var styles = StyleSheet.create({
    text: {
        color: '#E0E0E0',
    }
})

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
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size='large' color={'#E0E0E0'} />
                        <Text style={styles.text}>Loading</Text>
                    </View>
                </View>
            );
        }
        else {
            // Special case: If no friends were recommended
            if (this.props.friendData.length === 0) {
                return (
                    <View style={{width: '100%', height: FRIEND_REC_HEIGHT + 20}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#E0E0E0', fontSize: 25}}>
                                No recommendations were found. Is your profile set up yet?
                            </Text>
                        </View>
                    </View>
                );
            }
            var i = -1;
            var friends = this.props.friendData.map( (friend) => {
                i++;
                return (
                    <FadeInView key={i} initialLeft={0} style={{width: Dimensions.get('window').width, height: FRIEND_REC_HEIGHT + 20}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{overflow: 'hidden', width: FRIEND_REC_WIDTH, height: FRIEND_REC_HEIGHT, borderWidth: 1, 
                                        borderColor: 'transparent', borderRadius: 25}} {...this._panResponder.panHandlers}>
                                <View style={{width: '100%', height: '80%'}}>
                                    <Image source={require('../images/stock_photo.jpg')} style={{width: '100%', height: '100%'}} /> 
                                </View>
                                <View style={{width: '100%', height: '20%', backgroundColor: 'rgba(200, 200, 200, 0.25)'}}>
                                    <View style={{flex: 1, justifyContent: 'space-evenly', marginLeft: 10}}>
                                        <Text style={[styles.text, {fontSize: 25}]}>{friend.name ? friend.name : 'Error: no name'}</Text>
                                        <Text style={styles.text}>{friend.tags ? 'Likes ' + friend.tags.join(', ') : 'Error: no tags'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </FadeInView>
                );
            });
            return (
                <View style={{width: this.props.friendData.length * this.windowWidth, height: FRIEND_REC_HEIGHT + 20, overflow: 'visible'}}>
                    <View style={{position: 'absolute', bottom: 0, left: 2, zIndex: 1}}>
                        <Text style={styles.text}>{this.props.currentFriendIndex + 1}/{friends.length}</Text>
                    </View>
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
                        <Ionicons style={{textAlign: 'center'}} name={action.iconName} size={BUTTONS_HEIGHT * 0.5} color={action.color ? action.color : '#E0E0E0'}/>
                        <Text style={[styles.text, {fontSize: BUTTONS_HEIGHT * 0.25, textAlign: 'center'}]}>
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
            setFriendData([]);
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
                if (friendData.length == 0) {
                    return;
                }
                await api.addFriend(friendData[currentFriendIndex].username)
                setShouldRefresh(true); setFriendLoaded(false);
            }
        },
        {
            iconName: Platform.OS === 'ios' ? 'ios-eye' : 'md-eye',
            actionName: 'View Profile',
            action: function() {
                // Special case: If friendData didn't return anything
                if (friendData.length > 0) {
                    props.navigation.navigate('GuestProfile', { user: friendData[currentFriendIndex] });
                }
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
                <View style={{width: '100%', height: 150}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <MyButton title='Advanced Search' onPress={function() {props.navigation.navigate('AdvancedSearch')}}/>
                    </View>
                </View>
                <View style={{width: 0, height: 150}} />
            </ScrollView>
        </View>
    );
}

export default withNavigation(FriendRecommendation);