import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Button,
    TouchableHighlight,
    Alert,
    Modal,
    Animated,
    Easing,
    Dimensions
} from 'react-native'; 

/*
function Option(props) {
    if (props.isClose === true) {
        return (
            <View style={{width: '100%', height: 40}}>
                <View><Text>Icon</Text></View>
                <View><Text>Close</Text></View>
            </View>
        );
    }
    else {
        return (
            <View style={{width: '100%', height: 40}}>
                <View><Text>Icon</Text></View>
                <View><Text>{props.name}</Text></View>
            </View>
        );
    }
}

function Modal(props) {
    [bottom, setBottom] = useState(new Animated.Value(-50));
    [opacity, setOpacity] = useState(new Animated.Value(0.0));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                bottom,
                {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.out(Easing.ease)
                }
            ),
            Animated.timing(
                opacity,
                {
                    toValue: 1.0,
                    duration: 100,
                    easing: Easing.out(Easing.ease)

                }
            )
        ]).start();
    });

    var actions = props.actions.map( (action) => {
        return (
            <Option name={action.name} />
        );
    });

    actions.push(
        <Option isClose={true} />
    )

    var heightOfOptions = actions.length * 40;
    var heightOfScreen = Dimensions.get('window').height;
    //var heightOfExit = heightOfScreen - heightOfOptions;

    if (props.visible === true) {
        return (
            <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#777', opacity: opacity}}>
                <View style={{height: heightOfScreen-heightOfOptions}} />
                <View style={{height: heightOfOptions, bottom: bottom}}>
                    {actions}
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={{position: 'absolute', width: 0, height: 0}} />
        );
    }
}
*/


function Background(props) {
    [opacity, setOpacity] = useState(new Animated.Value(0.0));

    useEffect( () => {
        Animated.timing(
            opacity,
            {
                toValue: 0.5,
                duration: 200,
                easing: Easing.out(Easing.ease)
            }
        )
    });

    if (props.visible) {
        return (
            <View></View>
        );
    }
    else {
        return (
            <View></View>
        );
    }
}



/*
props.actions is an array of objects 
*/
export default function Header(props) {

    [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{width: '100%', height: 50}}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <Text>Hello World!</Text>

                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Home</Text>
                <Text>Help</Text>
                <Button title={'Push me'} onPress={() => {setModalVisible(true);}} />
            </View>
        </View>
    );
}