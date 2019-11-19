import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    PanResponder,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import FadeInFromRightView from './FadeInFromRightView';

class ImageSwiperContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: 0,
            left: new Animated.Value(0),
        };

        this.sendMessage = props.sendMessage;
        this.numOfImages = props.imgUris.length;
        this.windowWidth = Dimensions.get('window').width;
        this.setCurrentImage = this.setCurrentImage.bind(this);     // Note: need to bind class methods

        /*
        Placeholder: instead of rendering Image components, render stock photos
        */
        var imageKey = -1;
        this.images = props.imgUris.map( (imgUri) => {
            imageKey++;
            return (
                <View key={imageKey} style={{width: this.windowWidth, height: '100%', padding: 0, margin: 0, backgroundColor: 'white'}}>
                    <FadeInFromRightView>
                        <Image source={require('../images/stock_photo.jpg')} style={{width: '100%', height: '100%', borderTopWidth: 10, borderColor: 'black'}} />
                    </FadeInFromRightView>
                </View>
            );
        });

        this._panResponder = PanResponder.create({
            // Ask to be the responder, don't capture nested responders:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

            onPanResponderGrant: (evt, gestureState) => {
                //props.sendMessage(evt, gestureState, "Gesture has started");
            },
            onPanResponderMove: (evt, gestureState) => {
                //props.sendMessage(evt, gestureState, "Gesture has moved");
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // props.sendMessage(evt, gestureState, "Gesture has been released");

                // On swipe left
                if (this.state.currentImage < this.numOfImages - 1 && gestureState.vx < -1) {
                    this.setState((state, props) => {
                        return {currentImage: state.currentImage + 1};
                    });
                }

                // On swipe right
                if (this.state.currentImage > 0 && gestureState.vx > 1) {
                    this.setState((state, props) => {
                        return {currentImage: state.currentImage - 1};
                    });
                }
            },
        });
    }

    setCurrentImage(imageKey) {
        this.setState({
            currentImage: imageKey
        });
    }
    
    componentDidUpdate() {
        // Change left positioning value depending on which image is currently being displayed.
        var newLeftValue = this.state.currentImage * this.windowWidth * -1;
        Animated.timing(
            this.state.left,
            {
                toValue: newLeftValue,
                duration: 250,
                easing: Easing.out(Easing.cubic),
            }
        ).start()
    }
    
    render() {
        return (
            <View style={{overflow: 'visible', height: 500, width: this.windowWidth * this.numOfImages}} {...this._panResponder.panHandlers}>
                <View style={{position: 'absolute', width: this.windowWidth, height: 400, top: 0, left: 0}}>
                </View>
                <Animated.View style={{overflow: 'visible', backgroundColor: 'red', flex: 1, flexDirection: 'row', 
                                       left: this.state.left}}>
                    {this.images}
                </Animated.View>
                <ImageSwiperNav numOfImages={this.numOfImages} setCurrentImage={this.setCurrentImage} currentImage={this.state.currentImage}
                                sendMessage={this.sendMessage}/>
            </View>
        );
    }
}

class ImageSwiperNav extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        var imageNavs = [];
        for (var i = 0; i < this.props.numOfImages; i++) {
            imageNavs.push(<ImageSwiperNavBall key={i} index={i} currentImage={this.props.currentImage} 
                                               sendMessage={this.props.sendMessage} setCurrentImage={this.props.setCurrentImage}/>);
        }
        return (
            <View style={{position: 'absolute', width: Dimensions.get('window').width, height: 50, bottom: 25}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    {imageNavs}
                </View>
            </View>
        );
    }
}

class ImageSwiperNavBall extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.backgroundColor = new Animated.Value(50);
        this.opacity = new Animated.Value(1),
        
        this.state = {
            isPressed: false,
            isCurrentImage: false,
        };

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // props.sendMessage(evt, gestureState, "Gesture in ball has started");
                this.setState({
                    isPressed: true,
                });
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // props.sendMessage(evt, gestureState, "Gesture in ball has been released");
                this.setState({
                    isPressed: false,
                });

                props.setCurrentImage(props.index);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, must reset isPressed state
                this.setState({
                    isPressed: false,
                });
            },
        });
    }

    componentDidMount() {
        if (this.props.currentImage === this.props.index) {
            Animated.timing(
                this.backgroundColor,
                {
                    toValue: 125,
                    duration: 100,
                    easing: Easing.out(Easing.cubic),
                }
            ).start()
        }
        else {
            Animated.timing(
                this.backgroundColor,
                {
                    toValue: 50,
                    duration: 100,
                    easing: Easing.out(Easing.cubic),
                }
            ).start()
        }
    }
    
    componentDidUpdate() {
        // backgroundColor not animating?
        if (this.props.currentImage === this.props.index) {
            Animated.timing(
                this.backgroundColor,
                {
                    toValue: 125,
                    duration: 100,
                    easing: Easing.out(Easing.cubic),
                }
            ).start()
        }
        else {
            Animated.timing(
                this.backgroundColor,
                {
                    toValue: 50,
                    duration: 100,
                    easing: Easing.out(Easing.cubic),
                }
            ).start()
        }
        
        // Opacity animations
        if (this.state.isPressed) {
            Animated.timing(
                this.opacity,
                {
                    toValue: 0.4,
                    duration: 200,
                    easing: Easing.out(Easing.cubic),
                }
            ).start()
        }
        else {
            Animated.timing(
                this.opacity,
                {
                    toValue: 0.8,
                    duration: 200,
                    easing: Easing.out(Easing.cubic),
                }
            ).start()
        }
    }

    render() {
        return (
            <View style={{width: 50, height: 50}} {...this._panResponder.panHandlers}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View 
                        style={{opacity: this.opacity, width: 20, height: 20, borderRadius: 50, 
                        backgroundColor: this.backgroundColor}}
                    />
                </View>
            </View>
        );
    }
}


/*
Props:
    imgUris - Array, required. Contains strings of image uri's to be displayed.
*/
export default function ImageSwiper(props) {
    // For PanResponder debug purposes
    [msg, setMsg] = useState('');
    function handleEvent(evt, gestureState, msg) {
        setMsg(msg + " " + gestureState.x0 + " " + gestureState.dx + " " + gestureState.vx);
    }

    return (
        <View>
            <ImageSwiperContainer sendMessage={handleEvent} imgUris={props.imgUris}/>
            <View style={{position: 'absolute', bottom: 0, left: 20}}><Text>{msg}</Text></View>
        </View>
    );
}