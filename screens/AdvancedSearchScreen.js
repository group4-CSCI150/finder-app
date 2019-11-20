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



export default function AdvancedSearchScreen(props) {
    return (
        <SafeAreaView>
            <Header back={true} />
            <View>
                <View>
                    
                </View>
                <Text>TODO: Implement advanced search</Text>
            </View>
        </SafeAreaView>
    );
}