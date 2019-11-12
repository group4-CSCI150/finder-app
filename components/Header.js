import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import OptionsModal from './OptionsModal';


var HEADER_HEIGHT = 50;


function Header(props) {

    [modalVisible, setModalVisible] = useState(false);


    // Add back button if requested by props
    if (props.back) {
        var leftContent =
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10 }}>
                <TouchableOpacity onPress={() => { if (props.navigation) props.navigation.goBack() }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Ionicons name="ios-arrow-back" size={HEADER_HEIGHT} />
                        <Text style={styles.headerText}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
    }

    var middleContent =
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.headerText}>{props.title ? props.title : 'Finder'}</Text>
        </View>
        
    if (props.actions) {
        var rightContent =
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                <TouchableOpacity onPress={() => { setModalVisible(true); }}>
                    <Ionicons name="md-cog" size={HEADER_HEIGHT} color="black" />
                </TouchableOpacity>
            </View>;
    }

    return (
        <View style={{ width: '100%', height: HEADER_HEIGHT }}>
            <OptionsModal modalVisible={modalVisible} setModalVisible={setModalVisible} actions={props.actions} />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.headerContent}>
                    {leftContent}
                </View>
                <View style={styles.headerContent}>
                    {middleContent}
                </View>
                <View style={styles.headerContent}>
                    {rightContent}
                </View>
            </View>
        </View>
    );
}

export default withNavigation(Header);



var styles = StyleSheet.create({
    headerContent: {
        width: '33%',
        height: HEADER_HEIGHT,
    },
    headerText: {
        fontSize: HEADER_HEIGHT * 0.5,
    }
});