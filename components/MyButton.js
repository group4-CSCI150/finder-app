import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/*
props:
    onPress: function, optional. Function executed on press
    title: string, required. Text to be displayed in button
    iconName: string, optional. If passed, renders Ionicons
    iconOnLeft: bool, optional. If true, icon rendered to the left of the text. Default is false.
    iconSize: int, optional. Determines size of icon
*/
export default function MyButton(props) {
    var text = <Text style={{color: '#FF6017', fontFamily: 'Arial', fontSize: 20, fontWeight: 'bold'}}>
                   {props.title}
               </Text>
    var icon = props.iconName ? <Ionicons name={props.iconName} size={props.iconSize ? props.iconSize : 25} color={'#FF6017'}/> : <View />

    var content = props.iconName ? 
        props.iconOnLeft ? 
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                {icon}
                {text}
            </View>
            :
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                {text}
                {icon}
            </View>
        :
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            {text}
        </View>
    
    return (
        <TouchableOpacity onPress={props.onPress ? props.onPress : function() {}}>
            <View style={{width: 200, height: 70, borderRadius: 50, borderColor: '#FF6017', borderWidth: 2, backgroundColor: 'white'}}>
                {content}
            </View>
        </TouchableOpacity>
    );
    
}