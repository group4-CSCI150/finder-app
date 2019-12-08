import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import OptionsModal from './OptionsModal';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';


var HEADER_HEIGHT = 50;

/*
Props:
    back - Boolean, optional. If true, adds back button.
    
    actions - Array, optional. If passed, includes icon on right side that renders 
              a modal displaying a list of actions.
        actions is an array of objects of the form:
        {
            name: 'Name of option',
            action: function() { 'action taken on press' },
            iconName: 'Ionicons-name' // Name to use for Ionicons component
        }
    
    title - String, optional. If passed, displays string in middle of header. Must be short or will overflow.
*/
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.setModalVisible = this.setModalVisible.bind(this);
        this.state = {
            modalVisible: false,
        }

        // Add back button if requested by props
        if (props.back) {
            this.leftContent =
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => { if (props.navigation) props.navigation.goBack() }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Ionicons name="ios-arrow-back" size={HEADER_HEIGHT * 0.8} color="white" />
                            <Text style={[styles.headerText,{marginLeft: 10}]}>Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        }

        this.middleContent =
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.headerText}>{props.title ? props.title : 'Finder'}</Text>
            </View>
            
        if (props.actions) {
            this.rightContent =
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 15 }}>
                    <TouchableOpacity onPress={() => { this.setModalVisible(true); }}>
                        <Ionicons name={Platform.OS === "ios" ? "ios-more" : "md-more"} size={HEADER_HEIGHT} color="white" />
                    </TouchableOpacity>
                </View>;
        }
    }

    setModalVisible(val) {
        this.setState({
            modalVisible: val,
        })
    }

    render() {
        return (
            //<LinearGradient colors={["#4A0000", "#720000"]} style={{paddingTop: Constants.statusBarHeight}}>
            <View style={{paddingTop: Constants.statusBarHeight}}>
                <View style={{ width: '100%', height: HEADER_HEIGHT }}>
                    <OptionsModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} actions={this.props.actions} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.headerContent}>
                            {this.leftContent}
                        </View>
                        <View style={styles.headerContent}>
                            {this.middleContent}
                        </View>
                        <View style={styles.headerContent}>
                            {this.rightContent}
                        </View>
                    </View>
                </View>
            </View>
            //</LinearGradient>
        );
    }
}


export default withNavigation(Header);



var styles = StyleSheet.create({
    headerContent: {
        width: '33%',
        height: HEADER_HEIGHT,
    },
    headerText: {
        fontSize: HEADER_HEIGHT * 0.5,
        color: 'white'
    }
});