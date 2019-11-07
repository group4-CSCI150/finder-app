import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
} from 'react-native';

import Header from '../components/Header';
import FriendRecommendation from '../components/FriendRecommendation';

export default function SearchScreen(props) {
    return (
        <View>
            <Header />
            <FriendRecommendation />
        </View>
    );
}