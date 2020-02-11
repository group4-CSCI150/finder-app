import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';


export default function ScreenContainer(props) {
    return (
        <LinearGradient style={{flex: 1, minHeight: '100%'}} colors={["#8A0012", "#300059"]} start={[0, 0]} end={[0, 1]}>
            {props.children}
        </LinearGradient>
    );
}