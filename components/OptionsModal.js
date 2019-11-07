import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    Modal,
    Animated,
    Easing,
    Dimensions,
    StyleSheet
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import SlideInFromBottomView from './SlideInFromBottomView';


var OPTION_HEIGHT = 80;


function Background(props) {
    [opacity, setOpacity] = useState(new Animated.Value(0.0));

    useEffect( () => {
        //var newToValue = props.visible ? 0.5 : 0.0;
        Animated.timing(
            opacity,
            {
                toValue: 0.5,
                duration: 200,
                easing: Easing.out(Easing.ease)
            }
        ).start(); 
    });

    return (
        <Animated.View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#555', opacity: opacity}} />
    );
}

function Option(props) {
    return (
        <TouchableOpacity onPress={() => { props.close(); if (props.action) props.action(); }}>
            <View style={{width: '100%', height: OPTION_HEIGHT}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: '30%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name={props.iconName ? props.iconName : 'md-close'} size={OPTION_HEIGHT} color='white'/>
                        </View>
                    </View>
                    <View style={{width: '70%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.optionText}>{props.isClose ? 'Close' : props.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function ModalActions(props) {
    var i = -1;
    var actions = props.actions.map( (action) => {
        i++;
        return (
            <Option {...props} name={action.name} key={i} />
        );
    });

    i++;
    actions.push(
        <Option {...props} isClose={true} key={i} />
    )

    var heightOfOptions = actions.length * OPTION_HEIGHT;
    var heightOfScreen = Dimensions.get('window').height;

    return (
        <View>
            <TouchableWithoutFeedback onPress={props.close}>
                <View style={{width: '100%', height: heightOfScreen-heightOfOptions}} />
            </TouchableWithoutFeedback>
            <SlideInFromBottomView style={{width: '100%', height:heightOfOptions, backgroundColor: '#333'}}>
                {actions}
            </SlideInFromBottomView>
        </View>
    );
}

/*
props.actions is an array of objects of the form:
{
    name: 'Name of option',
    action: function() { 'action taken on press' },
    iconName: 'Ionicons-name' // Name to use for Ionicons component
}
*/
export default function OptionsModal(props) {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <Background visible={props.modalVisible} />
            <ModalActions actions={props.actions} close={() => {props.setModalVisible(false);}}/>
        </Modal>
    );
}

var styles = StyleSheet.create({
    optionText: {
        fontSize: 30,
        color: 'white'
    },
});