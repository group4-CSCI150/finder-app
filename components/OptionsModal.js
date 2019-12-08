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
    StyleSheet,
    Platform,
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import SlideInFromBottomView from './SlideInFromBottomView';


var OPTION_HEIGHT = 70;


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
    var dashedLine = props.isClose ? 
        <View style={{width: '100%', height: 0, borderStyle: 'dashed', borderColor: '#222', borderWidth: 1}} /> 
        : <View />

    var iconName = props.iconName ? props.iconName : "md-close"; 

    return (
        <TouchableOpacity onPress={() => {if (props.action) {props.action()}; props.close() }}>
            <View style={{width: '100%', height: OPTION_HEIGHT}}>
                {dashedLine}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: '30%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name={iconName} size={OPTION_HEIGHT * 0.5} color='white'/>
                        </View>
                    </View>
                    <View style={{width: '70%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'left'}}>
                            <Text style={{fontSize: 25, color: 'white'}}>{props.isClose ? 'Close' : props.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function ModalActions(props) {
    var i = -1;
    var actions = [];
    if (props.actions) {
        actions = props.actions.map( (action) => {
            i++;
            return (
                <Option {...props} name={action.name} action={action.action} iconName={action.iconName} key={i} />
            );
        });
    }
    i++;
    actions.push(
        <Option {...props} isClose={true} key={i} />
    )
    
    var heightOfOptions = actions.length * OPTION_HEIGHT;
    var heightOfScreen = Dimensions.get('window').height;
    if (Platform.OS === 'android') {
        // TODO: Fix options clipping on android
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={props.close}>
                <View style={{width: '100%', height: heightOfScreen-heightOfOptions}} />
            </TouchableWithoutFeedback>
            <SlideInFromBottomView style={{width: '100%', height:heightOfOptions, backgroundColor: '#444'}}>
                {actions}
            </SlideInFromBottomView>
        </View>
    );
}


/*
Props:
    actions - Array, required.
        actions is an array of objects of the form:
        {
            name: 'Name of option',
            action: function() { 'action taken on press' },
            iconName: 'Ionicons-name' // Name to use for Ionicons component
        }

    modalVisible - Boolean, required. Tells whether or not the modal should be visible (true -> modal is visible)
    setModalVisible - Function, required. Takes a single boolean argument that updates visibility of modal.
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
    closeOptionContainer: {
        borderColor: '#222', 
        borderStyle: 'dotted', 
        borderTopWidth: 1,
    }
});