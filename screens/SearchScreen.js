import React from 'react';
import {
    Platform,
} from 'react-native';

import Header from '../components/Header';
import FriendRecommendation from '../components/FriendRecommendation';
import FadeInView from '../components/FadeInView';
import ScreenContainer from '../components/ScreenContainer';
import token from '../utils/tokenFunctions'


export default function SearchScreen(props) {
    const { navigate } = props.navigation;

    logout = async () => {
        await token.removeToken()
        navigate('LoginNav')
    }
    return (
        <ScreenContainer>
            <FadeInView>
                <Header actions={[{name:'Logout', action: logout, iconName: Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}]}/>
                <FriendRecommendation />
            </FadeInView>
        </ScreenContainer>
    );
}