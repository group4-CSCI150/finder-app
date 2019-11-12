import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';

import Header from '../components/Header';
import FriendRecommendation from '../components/FriendRecommendation';

export default function SearchScreen(props) {
    return (
        <SafeAreaView style={{marginBottom: 80}}>
            <Header />
            <FriendRecommendation />
        </SafeAreaView>
    );
}