import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';

import Header from '../components/Header';
import FriendRecommendation from '../components/FriendRecommendation';

import token from '../utils/tokenFunctions'


export default function SearchScreen(props) {
    const { navigate } = props.navigation;

    logout = async () => {
        await token.removeToken()
        navigate('LoginNav')
    }
    return (
        <SafeAreaView style={{ marginBottom: 80 }}>
            <Header actions={[{name:'Logout', action: logout }]}/>
            <FriendRecommendation />
        </SafeAreaView>
    );
}