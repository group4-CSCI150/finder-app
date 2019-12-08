import React, { useState } from 'react';
import {
    SafeAreaView,
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

import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';


export default function AdvancedSearchScreen(props) {
    return (
        <ScreenContainer>
            <Header back={true} />
            <View>
                <Text style={{color: '#E0E0E0'}}>TODO: Implement advanced search</Text>
            </View>
        </ScreenContainer>
    );
}